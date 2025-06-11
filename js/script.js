// script.js: Menampilkan kitab dari JSON
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("kitab-container");

  if (container) {
    fetch("data/kitab.json")
      .then(response => response.json())
      .then(data => {
        data.kitab.forEach(item => {
          const div = document.createElement("div");
          div.className = "kitab-item";

          if (item.link_pdf) {
            div.innerHTML = `<h3>${item.judul}</h3><a href="${item.link_pdf}" target="_blank">Lihat PDF</a>`;
          } else {
            div.innerHTML = `<h3>${item.judul}</h3><p>${item.deskripsi}</p>`;
          }

          container.appendChild(div);
        });
      })
      .catch(error => {
        container.innerHTML = "<p>Gagal memuat daftar kitab.</p>";
        console.error(error);
      });
  }
});

// Menampilkan daftar dengan judul yang bisa diklik untuk menampilkan isi arab kanan-kiri selang-seling
function loadExpandableList(url, containerId) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById(containerId);

      data.forEach((item, index) => {
        const title = document.createElement('h3');
        title.textContent = item.judul;
        title.className = 'judul-expandable';
        title.style.cursor = 'pointer';

        const isiDiv = document.createElement('div');
        isiDiv.style.display = 'none';

        item.isi.forEach((line, i) => {
          const lineDiv = document.createElement('div');
          lineDiv.className = 'baris-arab ' + (i % 2 === 0 ? 'kanan' : 'kiri');
          lineDiv.textContent = line;
          isiDiv.appendChild(lineDiv);
        });

        title.addEventListener('click', () => {
          isiDiv.style.display = isiDiv.style.display === 'none' ? 'block' : 'none';
        });

        container.appendChild(title);
        container.appendChild(isiDiv);
      });
    })
    .catch(err => console.error("Gagal memuat data:", err));
}

// Berita
function loadBerita(url, containerId) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById(containerId);

      data.forEach(item => {
        const wrapper = document.createElement('div');
        wrapper.className = 'berita-item';

        const img = document.createElement('img');
        img.src = item.gambar;
        img.alt = item.nama;
        img.className = 'berita-img';

        const info = document.createElement('div');
        info.className = 'berita-info';

        const judul = document.createElement('h3');
        judul.textContent = item.nama;

        const link = document.createElement('a');
        link.href = item.lokasi;
        link.textContent = "Lihat Lokasi";
        link.target = "_blank";

        info.appendChild(judul);
        info.appendChild(link);

        wrapper.appendChild(img);
        wrapper.appendChild(info);
        container.appendChild(wrapper);
      });
    })
    .catch(err => console.error("Gagal memuat berita:", err));
}