// 1. อนิเมชั่นตัวเลขค่าหัว (Bounty Counter)
document.addEventListener("DOMContentLoaded", () => {
    const bountyElement = document.getElementById("bounty-number");
    const targetBounty = 3000000000; // ค่าหัว 3 พันล้าน
    let currentBounty = 0;
    
    // ตั้งความเร็วในการรันตัวเลข (ยิ่งค่าน้อยยิ่งนาน)
    const increment = targetBounty / 100; 

    const updateBounty = () => {
        currentBounty += increment;
        if (currentBounty < targetBounty) {
            // ใส่ลูกน้ำ (,) ให้ตัวเลข
            bountyElement.innerText = "฿ " + Math.ceil(currentBounty).toLocaleString();
            requestAnimationFrame(updateBounty);
        } else {
            bountyElement.innerText = "฿ 3,000,000,000";
        }
    };

    // เริ่มรันตัวเลขทันทีที่โหลดหน้าเว็บเสร็จ
    updateBounty();
});

// 2. เอฟเฟกต์ 3D Tilt เวลาขยับเมาส์
const card = document.querySelector(".card-container");
const bgGlow1 = document.querySelector(".bg-glow");
const bgGlow2 = document.querySelector(".bg-glow-2");

// เช็คว่าไม่ได้อยู่ในหน้าจอมือถือ (เพราะมือถือใช้เมาส์ hover ไม่ได้)
if (window.innerWidth > 768) {
    document.addEventListener("mousemove", (e) => {
        let xAxis = (window.innerWidth / 2 - e.pageX) / 40; // ปรับความแรงการเอียงแนวนอน
        let yAxis = (window.innerHeight / 2 - e.pageY) / 40; // ปรับความแรงการเอียงแนวตั้ง
        
        // ทำให้การ์ดเอียงตามเมาส์
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        
        // ทำให้แสงพื้นหลังขยับตามเมาส์เป็น Parallax
        bgGlow1.style.transform = `translate(${xAxis * 2}px, ${yAxis * 2}px)`;
        bgGlow2.style.transform = `translate(${-xAxis * 2}px, ${-yAxis * 2}px)`;
    });

    // คืนค่ากลับที่เดิมเมื่อเมาส์ออกจากหน้าจอ
    document.addEventListener("mouseleave", () => {
        card.style.transition = "transform 0.5s ease";
        card.style.transform = `rotateY(0deg) rotateX(0deg)`;
        
        bgGlow1.style.transform = `translate(0px, 0px)`;
        bgGlow2.style.transform = `translate(0px, 0px)`;
    });

    // ปิด transition ตอนขยับเมาส์เพื่อให้ลื่นไหล
    document.addEventListener("mouseenter", () => {
        card.style.transition = "none";
    });
}