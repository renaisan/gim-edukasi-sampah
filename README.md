# Eco-Sorter STEM — Website Edukasi Pilah Sampah
mpah.

## Menjalankan

```powershell
python -m http.server 3000
```

Lalu buka `http://localhost:3000`. File `game.html` adalah salinan `index.html`
(berguna jika tab `index.html` di VS Code masih menampilkan buffer lama).

## Fitur

- **Beranda** – kartu misi level dengan bintang dan tombol main.
- **Ensiklopedia** – 4 kategori sampah (Organik, Daur Ulang, B3, Residu), pencarian, filter chip, dan detail kategori.
- **Statistik belajar** – kartu poin/misi/akurasi/streak, grafik aktivitas, dan komposisi pilihan sampah.
- **Pencapaian** – 9 lencana dengan status tercapai / belum.
- **Permainan** – 6 benda per level, 4 tong sampah, nyawa, kombo, petunjuk, drag-and-drop, dan hasil akhir.
- Papan peringkat tidak dipakai. Sidebar hanya menampilkan navigasi, kartu level, dan tombol keluar.
- **Kuis harian** – 4 pertanyaan dengan umpan balik dan hadiah poin/koin.
- Progres tersimpan di `localStorage` (tombol "Keluar" menyediakan reset).

## File

- `index.html` / `game.html` – struktur halaman dan sprite ikon
- `styles.css` – sistem desain baru (warna, tipografi, responsif)
- `app.js` – data kategori/level/kuis, ilustrasi SVG, dan logika aplikasi
- `backup-versi-teal/` – cadangan versi desain sebelumnya
