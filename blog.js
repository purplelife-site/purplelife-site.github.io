const blogPosts = [
  {
    title: "ทดสอบ",
    date: "14 มิถุนายน 2568",
    dateISO: "2025-06-14",
    category: "",
    author: "saransak_l",
    image: "assets/NICKIN_Banner.png",
    content: (post) => `
      <h1>${post.title}</h1>
      <p class="date">${post.date}</p>
      <p class="category">หมวดหมู่: <span>${post.category}</span></p>
      <p class="author">โดย <a href="/author.html?slug=${slugify(post.author)}">${post.author}</a></p>
      <br><hr><br>
      <p>
        การทดสอบโพสต์
      </p>
    `
  },
];

blogPosts.sort((a, b) => new Date(b.dateISO) - new Date(a.dateISO));

// ฟังก์ชันแปลงชื่อโพสต์เป็น slug ใช้กับ URL hash
function slugify(text) {
  return text.trim().toLowerCase()
    .replace(/\s+/g, '-') // ช่องว่างเป็น -
    .replace(/[^\w\u0E00-\u0E7F-]+/g, ''); // ✅ อนุญาตอักษรไทย (U+0E00–U+0E7F)
}


function generateBlogCards() {
  const blogGrid = document.getElementById("blogGrid");
  blogGrid.innerHTML = "";

  blogPosts.forEach((post, index) => {
    const card = document.createElement("div");
    card.className = "blog-card";

    card.innerHTML = `
      <img src="${post.image}" alt="${post.title}">
      <div class="blog-info">
        <h3>${post.title}</h3>
        <p class="date">${post.date}</p>
        <p class="category">หมวดหมู่: <span>${post.category}</span></p>
      </div>
    `;

    card.onclick = () => openModal(index);
    blogGrid.appendChild(card);
  });
}



// เปิด modal แสดงเนื้อหาโพสต์
function openModal(index) {
  const modal = document.getElementById("blog-modal");
  const modalBody = document.getElementById("modal-body");
  const post = blogPosts[index];
  const slug = encodeURIComponent(slugify(post.title)); // ใช้ encode
  window.location.hash = slug;

  const pageUrl = window.location.href;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
  const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(pageUrl)}`;

  modalBody.innerHTML = `
    ${post.content(post)}
    <div class="share-buttons">
      <br>
      <hr>
      <br>
      <p class="share-label">แชร์โพสต์:</p>
      <a class="share-btn fb" href="${facebookUrl}" target="_blank"><i class="fab fa-facebook"></i> เฟซบุ๊ก</a>
      <a class="share-btn twt" href="${twitterUrl}" target="_blank"><i class="fab fa-twitter"></i> ทวิตเตอร์</a>
      <a class="share-btn" href="#" onclick="copyLink(event)">คัดลอกลิงค์</a>
      <span id="copy-status" style="margin-left: 10px; color: green;"></span>
    </div>
  `;

  modal.style.display = "flex";
}

// ฟังก์ชันคัดลอกลิงก์ URL ปัจจุบันลงคลิปบอร์ด
function copyLink(event) {
  event.preventDefault();
  const url = window.location.href;

  navigator.clipboard.writeText(url)
    .then(() => {
      const status = document.getElementById("copy-status");
      status.textContent = "คัดลอกแล้ว!";
      setTimeout(() => status.textContent = "", 2000);
    })
    .catch(() => {
      const status = document.getElementById("copy-status");
      status.textContent = "คัดลอกไม่ได้!";
    });
}

// ปิด modal และลบ hash ออกจาก URL
function closeModal() {
  document.getElementById("blog-modal").style.display = "none";
  history.pushState("", document.title, window.location.pathname + window.location.search);
}

// เมื่อโหลดหน้าเว็บ
window.onload = () => {
  // เรียงโพสต์ใหม่ล่าสุดก่อนเก่า
  blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

  generateBlogCards();

  // ถ้ามี hash ใน URL ให้เปิดโพสต์นั้นอัตโนมัติ
  const hash = decodeURIComponent(window.location.hash.substring(1)); // decode ก่อนใช้
if (hash) {
  const index = blogPosts.findIndex(post => slugify(post.title) === hash);
  if (index !== -1) {
    openModal(index);
  }
}
};
