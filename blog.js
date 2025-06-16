const blogPosts = [
  {
    title: "ปลุกไฟในการเรียน ด้วยเพลงเพราะๆ ที่กระตุ้นสมอง",
    date: "15 มิถุนายน 2568",
    dateISO: "2025-06-15",
    tags: ["#การเรียน", "#ฟังเพลง", "#แรงบันดาลใจ"],
    author: "saransak",
    image: "assets/NICKIN_Banner.png",
    content: (post) => `
      <p class="date">${post.date}</p>
      <h1>${post.title}</h1>
      <p class="tags">${post.tags.map(tag => `<span>${tag}</span>`).join(" ")}</p>
      <p class="author">โดย <a href="/author.html?slug=${slugify(post.author)}">@${post.author}</a></p>
      <br><hr><br>

      <p>
        เคยรู้สึกหมดไฟกับการเรียนไหม? บางครั้งเราไม่ได้ต้องการอะไรมากไปกว่ากำลังใจเล็ก ๆ และเสียงดนตรีดี ๆ
        <br>
        ผมขอแนะนำเพลย์ลิสต์ที่ช่วยให้สมองตื่นตัว จิตใจสงบ และพร้อมลุยกับหนังสือ
        <br>
        <br>
        ลองเปิดตอนอ่านหนังสือดู แล้วจะรู้ว่า “ไฟในการเรียน” ไม่ได้หายไปไหน แค่รอให้เราจุดมันขึ้นมาเอง
      </p>

      <br>
      <h2>ฟังเพลย์ลิสต์บน Spotify ได้ที่นี่</h2>
      <br>
      <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/2sIsrIcVERcpQ35oaCZgtR?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    `
  },
  {
    title: "แมพโรงเรียนโดนแบน แต่ไม่เป็นไร",
    date: "14 มิถุนายน 2568",
    dateISO: "2025-06-14",
    tags: ["#เทคโนโลยี", "#Roblox"],
    author: "saransak",
    image: "assets/Screenshot%202025-06-14%20173005.png",
    content: (post) => `
      <p class="date">${post.date}</p>
      <h1>${post.title}</h1>
      <p class="tags">${post.tags.map(tag => `<span>${tag}</span>`).join(" ")}</p>
      <p class="author">โดย <a href="/author.html?slug=${slugify(post.author)}">@${post.author}</a></p>
      <br><hr><br>

      <p>
        <img src="${post.image}">
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


function applyFilters() {
  // ลบบรรทัดนี้ออก
  // const selectedTag = document.getElementById("tagFilter").value;
  
  const searchKeyword = document.getElementById("searchInput").value.toLowerCase();

  let filtered = blogPosts.filter(post => {
    // ไม่ต้องเช็ค tag
    const searchMatch = post.title.toLowerCase().includes(searchKeyword);
    return searchMatch;
  });

  generateBlogCards(filtered);
}


// ปรับลบ event listener ของ sortOrder ที่เหลือ
document.getElementById("searchInput").addEventListener("input", applyFilters);

// --- ลบ event listener ของ sortOrder
// document.getElementById("sortOrder").removeEventListener("change", applyFilters);


// ส่วน window.onload ให้ลบการเรียง sortOrder และ event listener sortOrder ออกด้วย

window.onload = () => {
  // ลบ event listener ของ sortOrder
  // document.getElementById("sortOrder").addEventListener("change", ...);


  // เรียก generateBlogCards ตามลำดับเดิม (ตาม array blogPosts ที่มีอยู่)
  generateBlogCards();

  // ถ้ามี hash ใน URL ให้เปิดโพสต์นั้นอัตโนมัติ
  const hash = decodeURIComponent(window.location.hash.substring(1)); // decode ก่อนใช้
  if (hash) {
    const index = blogPosts.findIndex(post => slugify(post.title) === hash);
    if (index !== -1) {
      openModal(index);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
  generateBlogCards();

  const hash = decodeURIComponent(window.location.hash.substring(1));
  if (hash) {
    const index = blogPosts.findIndex(post => slugify(post.title) === hash);
    if (index !== -1) {
      openModal(index);
    }
  }

  document.getElementById("tagFilter")?.addEventListener("change", applyFilters);
  document.getElementById("searchInput")?.addEventListener("input", applyFilters);
});

};


// ปรับฟังก์ชัน generateBlogCards ให้รับ argument
function generateBlogCards(posts = blogPosts) {
  if (!Array.isArray(posts) || posts.length === 0) return;

  const blogGrid = document.getElementById("blogGrid");
  if (!blogGrid) return;

  blogGrid.innerHTML = "";
  posts.forEach((post, index) => {
    const card = document.createElement("div");
    card.className = "blog-card";
    card.innerHTML = `
      <img src="${post.image}" alt="${post.title}">
      <div class="blog-info">
        <p class="tags">${post.tags.map(tag => `<span>${tag}</span>`).join(" ")}</p>
        <h3>${post.title}</h3>
        <p class="date">${post.date}</p>
        <p class="read-btn">อ่านโพสต์ <span>&#11208;</span></p>
      </div>
    `;
    card.onclick = () => openModal(index);
    blogGrid.appendChild(card);
  });
}



// Event listeners
document.getElementById("searchInput").addEventListener("input", applyFilters);





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
      <a class="share-btn fb" title="Fcebook" href="${facebookUrl}" target="_blank"><img src="assets/icons/facebook.png"></a>
      <a class="share-btn twt" title="Twitter" href="${twitterUrl}" target="_blank"><img src="assets/icons/twitter-2.png"></a>
    </div>
  `;


  // ตั้งค่าเริ่มต้นก่อนแสดง animation
  const modalContent = modal.querySelector(".modal-content");
  modalContent.style.opacity = 0;
  modalContent.style.transform = "scale(0.95)";

  // แสดง modal และเล่น animation
  modal.style.display = "flex";
  modal.classList.add("show");
  modalContent.classList.add("show");
}

function closeModal() {
  const modal = document.getElementById("blog-modal");
  const modalContent = modal.querySelector(".modal-content");

  // ลบคลาส show เพื่อเล่น animation ออก
  modal.classList.remove("show");
  modalContent.classList.remove("show");

  // ซ่อน modal หลัง animation 300ms
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);

  history.pushState("", document.title, window.location.pathname + window.location.search);
}