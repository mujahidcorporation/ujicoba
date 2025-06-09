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


// Daftar kitab (judul + link PDF)
function loadKitab(url, containerId) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById(containerId);

      data.forEach(item => {
        const li = document.createElement('li');
        li.className = 'kitab-item';

        const judul = document.createElement('h3');
        judul.textContent = item.judul;

        const link = document.createElement('a');
        link.href = item.link;
        link.target = '_blank';
        link.textContent = '📖 Buka PDF';
        link.className = 'btn-pdf';

        li.appendChild(judul);
        li.appendChild(link);
        list.appendChild(li);
      });
    })
    .catch(err => console.error("Gagal memuat data kitab:", err));
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
