// scroling
document.addEventListener("DOMContentLoaded", function () {
  // Seleksi semua elemen yang akan dianimasikan berdasarkan kelas dan ID
  const elements = document.querySelectorAll(".judul-home, .p-home, .more-btn");

  // Membuat instance IntersectionObserver
  const observer = new IntersectionObserver(
    (entries) => {
      // Iterasi melalui setiap entri yang diamati
      entries.forEach((entry) => {
        // Jika elemen masuk ke dalam viewport dan belum dianimasikan
        if (entry.isIntersecting && entry.target.dataset.animated === "false") {
          // Ubah data-animated menjadi true
          entry.target.dataset.animated = "true";
          // Hentikan observasi elemen ini karena tidak perlu dianimasikan lagi
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  // Mulai observasi setiap elemen yang dipilih
  elements.forEach((element) => {
    observer.observe(element);
  });
});

let userInteracted = false; // Flag untuk interaksi pengguna

// Selector untuk slider dan thumbnail
const items = document.querySelectorAll(".slider .list .item");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const thumbnails = document.querySelectorAll(".thumbnail .item");

// Config parameter
let countItem = items.length;
let itemActive = 0;

// Event handler untuk tombol next
next.onclick = function () {
  itemActive++;
  if (itemActive >= countItem) {
    itemActive = 0;
  }
  showSlider();
};

// Event handler untuk tombol prev
prev.onclick = function () {
  itemActive--;
  if (itemActive < 0) {
    itemActive = countItem - 1;
  }
  showSlider();
};

// Auto run slider setiap 5 detik
let refreshInterval = setInterval(() => {
  userInteracted = false; // Reset flag sebelum klik otomatis
  next.click();
}, 5000);

// Fungsi untuk menampilkan slider
function showSlider() {
  // Remove class active dari item dan thumbnail yang lama
  let itemActiveOld = document.querySelector(".slider .list .item.active");
  let thumbnailActiveOld = document.querySelector(".thumbnail .item.active");
  if (itemActiveOld) itemActiveOld.classList.remove("active");
  if (thumbnailActiveOld) thumbnailActiveOld.classList.remove("active");

  // Tambahkan class active ke item dan thumbnail yang baru
  items[itemActive].classList.add("active");
  thumbnails[itemActive].classList.add("active");

  // Reset interval untuk slider
  clearInterval(refreshInterval);
  refreshInterval = setInterval(() => {
    userInteracted = false; // Reset flag sebelum klik otomatis
    next.click();
  }, 5000);
}

// Event handler untuk klik thumbnail
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    itemActive = index;
    userInteracted = true; // Tandai interaksi pengguna
    showSlider();
  });
});

// Selector untuk menu hamburger
const menu = document.querySelector("#hamburger");
const ul = document.querySelector(".ul");

// Event handler untuk klik menu hamburger
menu.addEventListener("click", () => {
  userInteracted = true; // Tandai interaksi pengguna
  ul.classList.toggle("active");
});

// Event handler untuk klik di luar menu
document.addEventListener("click", function (e) {
  if (
    !menu.contains(e.target) && // Jika klik tidak pada menu
    !ul.contains(e.target) && // dan tidak pada ul
    ul.classList.contains("active") && // dan ul sedang aktif
    userInteracted // Hanya jika interaksi berasal dari pengguna
  ) {
    ul.classList.remove("active");
  }
  userInteracted = true; // Setiap klik dari pengguna tandai interaksi
});
