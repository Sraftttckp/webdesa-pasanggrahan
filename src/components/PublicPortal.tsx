import React, { useState, useRef } from 'react';
import { 
  Trees, Leaf, MapPin, Users, Video, 
  ChevronRight, ChevronLeft, Send, X, Phone, Mail,
  Store, UserCheck, Download, Plus, Trash2, 
  LayoutDashboard, FileText, Lock, ArrowLeft,
  Sprout, Mountain, Droplets, Sparkles, Maximize2,
  Sun, Wind, Bird, ShieldCheck, Cloud,
  Layers, Sliders, Radio, AlertTriangle, CheckCircle, RefreshCw,
  Eye, Compass, Globe, Waves, Flower2, Camera, Home, Menu, User, Gauge,
  Heart, ExternalLink, Shield
} from 'lucide-react';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';

// --- STYLES ANIMASI INLINE CSS & TRANSISI SMOOTH POP-UP ---
const AnimationStyles = () => (
  <style>{`
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes popIn {
      0% { 
        opacity: 0; 
        transform: scale(0.92) translateY(10px); 
      }
      100% { 
        opacity: 1; 
        transform: scale(1) translateY(0); 
      }
    }
    @keyframes floatSlow {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes pulseGlow {
      0%, 100% { opacity: 0.4; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.05); }
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .animate-fade-in {
      animation: fadeIn 0.4s ease-out forwards;
    }
    .animate-pop-in {
      animation: popIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .animate-float {
      animation: floatSlow 4s ease-in-out infinite;
    }
    .animate-pulse-glow {
      animation: pulseGlow 3s ease-in-out infinite;
    }
    /* Scrollbar halus untuk slider CCTV & Konten */
    .cctv-scroll-container {
      scroll-behavior: smooth;
    }
    .cctv-scroll-container::-webkit-scrollbar {
      height: 6px;
    }
    .cctv-scroll-container::-webkit-scrollbar-track {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 10px;
    }
    .cctv-scroll-container::-webkit-scrollbar-thumb {
      background: #059669;
      border-radius: 10px;
    }
    .cctv-scroll-container::-webkit-scrollbar-thumb:hover {
      background: #10b981;
    }
  `}</style>
);

// --- TYPES ---
interface WargaData {
  id: number;
  nik: string;
  nama: string;
  rtRw: string;
  usia: number;
  kategoriUsia: 'Anak' | 'Produktif' | 'Lansia';
  statusBantuan: 'Penerima PKH' | 'Non-Bantuan';
}

interface EkoUmkmItem {
  id: number;
  nama: string;
  pemilik: string;
  wa: string;
  kategori: string;
  harga: string;
  lokasi: string;
  gambar: string;
  deskripsi: string;
  detailLengkap: string;
}

interface BeritaKonservasi {
  id: number;
  kategori: string;
  judul: string;
  kutipan: string;
  detail: string;
  tanggal: string;
  penulis: string;
  gambar: string;
}

interface PengaduanLingkungan {
  id: number;
  nama: string;
  hp: string;
  kategori: string;
  lokasi: string;
  isi: string;
  tanggal: string;
  status: 'PENDING' | 'DIPROSES' | 'SELESAI';
}

interface LocationPin {
  id: number;
  nama: string;
  kategori: 'Wisata' | 'Kuliner' | 'Fasilitas / Posko';
  alamat: string;
  deskripsi: string;
  sektor: string;
  lat: number;
  lng: number;
  statusSensor?: string;
  pinPos: { top: string; left: string };
}

interface CCTVPoint {
  id: number;
  nama: string;
  lokasi: string;
  status: 'ONLINE' | 'OFFLINE';
  streamUrl: string;
  deskripsi: string;
  fps: number;
  pinPos: { top: string; left: string };
}

interface TempatWisata {
  id: number;
  nama: string;
  kategori: string;
  lokasi: string;
  hargaTiket: string;
  gambar: string;
  deskripsi: string;
  fiturUtama: { label: string; icon: React.ReactNode }[];
}

interface AparatDesa {
  id: number;
  nama: string;
  jabatan: string;
  nip: string;
  telepon: string;
}

interface ZonaWilayah {
  id: string;
  nama: string;
  kategori: 'Konservasi Utama' | 'Sumber Mata Air' | 'Pemukiman & Eko-UMKM';
  luas: string;
  tingkatResapan: string;
  risikoErosi: 'Sangat Rendah' | 'Rendah' | 'Sedang';
  jumlahPohon: string;
  sensorUtama: string;
  warnaTema: string;
  overlayStyle: { top: string; left: string; width: string; height: string };
  deskripsi: string;
}

// --- LOGO TEMA KONSERVASI ORGANIK ---
const LogoKonservasi = () => (
  <div className="w-11 h-11 rounded-[1.25rem] bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-800 border border-emerald-300/60 flex items-center justify-center p-1 shadow-lg hover:scale-105 transition-transform duration-300 relative group">
    <div className="w-full h-full bg-emerald-950/40 rounded-[1rem] flex items-center justify-center relative overflow-hidden backdrop-blur-sm">
      <Trees className="w-6 h-6 text-emerald-200 stroke-[2.2]" />
      <Leaf className="w-3.5 h-3.5 text-emerald-300 absolute -bottom-0.5 -right-0.5 animate-pulse" />
      <Flower2 className="w-3 h-3 text-amber-300 absolute -top-0.5 -left-0.5 opacity-80" />
    </div>
  </div>
);

// --- DATA INITIAL REAL ---
const STATS_POPULASI_REAL = {
  totalPenduduk: 21969,
  kelahiranTahunIni: 120,
  kematianTahunIni: 35,
  jumlahKK: 5.771,
  luasRTH: '142 Ha',
  pohonTertanam: 12450
};

const DATA_TREN_PENDUDUK = [
  { tahun: '2022', jumlah: 20100 },
  { tahun: '2023', jumlah: 20600 },
  { tahun: '2024', jumlah: 21100 },
  { tahun: '2025', jumlah: 21500 },
  { tahun: '2026', jumlah: 21969 },
];

const DATA_KELAHIRAN_KEMATIAN = [
  { bulan: 'Jan', lahir: 28, mati: 7 },
  { bulan: 'Feb', lahir: 32, mati: 9 },
  { bulan: 'Mar', lahir: 25, mati: 6 },
  { bulan: 'Apr', lahir: 35, mati: 8 },
  { bulan: 'Mei', lahir: 30, mati: 5 },
];

const INITIAL_WARGA: WargaData[] = [
  { id: 1, nik: '3273012304890001', nama: 'Budi Santoso', rtRw: 'RT 01 / RW 03', usia: 34, kategoriUsia: 'Produktif', statusBantuan: 'Non-Bantuan' },
  { id: 2, nik: '3273015410650003', nama: 'Asep Saepuloh', rtRw: 'RT 02 / RW 01', usia: 58, kategoriUsia: 'Produktif', statusBantuan: 'Penerima PKH' },
  { id: 3, nik: '3273011201400002', nama: 'Euis Karlina', rtRw: 'RT 03 / RW 05', usia: 67, kategoriUsia: 'Lansia', statusBantuan: 'Penerima PKH' },
  { id: 4, nik: '3273011908120005', nama: 'Rizky Febrian', rtRw: 'RT 01 / RW 02', usia: 12, kategoriUsia: 'Anak', statusBantuan: 'Non-Bantuan' }
];

const INITIAL_APARAT: AparatDesa[] = [
  { id: 1, nama: 'Abriwansyah Fitri, AP, S.Sos., M.AP', jabatan: 'Camat Ujungberung', nip: '19740512 199803 1 004', telepon: '081223456789' },
  { id: 2, nama: 'Ulfah Sari, SE., Ak., M.M.', jabatan: 'Lurah Pasanggrahan', nip: '19820815 200604 1 002', telepon: '081398765432' }
];

const INITIAL_WISATA: TempatWisata[] = [
  {
    id: 1,
    nama: 'Curug Cilengkrang (Wisata Air Manglayang)',
    kategori: 'Wisata Air & Waterfall',
    lokasi: 'Kaki Gunung Manglayang, Sektor Pasanggrahan',
    hargaTiket: 'Rp 10.000 / Orang',
    gambar: '/curug-cilengkrang-bandung.jpg', // <-- Cukup tulis nama filenya aja diawali '/'
    deskripsi: 'Wisata air terjun ikonik Gunung Manglayang...',
    fiturUtama: [ 
      { label: '6 Air Terjun Alami', icon: <Waves className="w-3.5 h-3.5 text-teal-600" /> },
      { label: 'Mata Air Pegunungan Jernih', icon: <Droplets className="w-3.5 h-3.5 text-cyan-600" /> },
      { label: 'Jalur Trekking Asri', icon: <Trees className="w-3.5 h-3.5 text-emerald-600" /> },
      { label: 'Keanekaragaman Burung', icon: <Bird className="w-3.5 h-3.5 text-amber-600" /> },
      { label: 'Spot Foto Komposisi Alam', icon: <Sparkles className="w-3.5 h-3.5 text-amber-500" /> }
    ]
  },
  {
    id: 2,
    nama: 'Wisata Alam & Camping Batu Kuda Manglayang',
    kategori: 'Hutan Pinus & Ekowisata',
    lokasi: 'Lereng Timur Pasanggrahan',
    hargaTiket: 'Rp 15.000 / Orang',
    gambar: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop',
    deskripsi: 'Kawasan konservasi hutan pinus rindang. Tempat favorit warga untuk camping, hammock-an, dan menikmati udara segar.',
    fiturUtama: [
      { label: 'Camping Ground Hutan Pinus', icon: <Trees className="w-3.5 h-3.5 text-emerald-600" /> },
      { label: 'Udara Pegunungan Segar', icon: <Wind className="w-3.5 h-3.5 text-teal-500" /> },
      { label: 'Sewa Hammock & Tenda', icon: <Sprout className="w-3.5 h-3.5 text-teal-600" /> },
      { label: 'Situs Bersejarah Batu Kuda', icon: <Mountain className="w-3.5 h-3.5 text-slate-700" /> }
    ]
  },
  {
    id: 3, // Sesuaikan ID-nya
  nama: 'Wisata Alam Gunung Manglayang',
  kategori: 'Pegunungan & Camping Ground',
  lokasi: 'Desa Pasanggrahan, Ujungberung, Bandung',
  hargaTiket: 'Rp 15.000 / Orang',
  gambar: '/gunung-manglayang.jpg', // <-- Tinggal panggil nama file yang ada di folder public
  deskripsi: 'Pemandangan indah pegunungan yang asri dengan udara sejuk dan area camping favorit warga Bandung.',
  fiturUtama: [
      { label: 'Hutan Hujan Tropis', icon: <Trees className="w-3.5 h-3.5 text-emerald-700" /> },
      { label: 'Jalur Edukasi Ekologi', icon: <Mountain className="w-3.5 h-3.5 text-emerald-600" /> },
      { label: 'Panorama City View', icon: <Globe className="w-3.5 h-3.5 text-blue-500" /> },
      { label: 'Flora Endemik', icon: <Flower2 className="w-3.5 h-3.5 text-rose-500" /> }
    ]
  },
  {
   id: 4, // Sesuaikan ID urutannya
  nama: 'Bukit Papanggungan',
  kategori: 'Perbukitan & Sunrise Point',
  lokasi: 'Kawasan Pasanggrahan, Ujungberung, Bandung',
  hargaTiket: 'Gratis / Parkir Saja',
  gambar: '/Bukit-Papanggungan.jpg', // <-- Nama file dari folder public
  deskripsi: 'Spot foto dan sunrise terbaik dengan pemandangan lautan awan serta panorama pegunungan yang memanjakan mata.',
  fiturUtama: [
      { label: 'View Lautan Awan', icon: <Cloud className="w-3.5 h-3.5 text-sky-500" /> },
      { label: 'Spot Sunrise', icon: <Sun className="w-3.5 h-3.5 text-amber-500" /> },
      { label: 'Panorama 360°', icon: <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> }
    ]
  }
];

const INITIAL_BERITA: BeritaKonservasi[] = [
  {
    id: 1,
    kategori: 'Reboisasi & Konservasi',
    judul: 'Penanaman 5.000 Bibit Pohon di Kaki Lereng Hutan',
    kutipan: 'Pemerintah Kelurahan Pasanggrahan bersama komunitas pegiat lingkungan menggelar aksi penanaman pohon masal.',
    detail: 'Kegiatan penanaman pohon ini melibatkan lebih dari 300 warga lokal dan relawan lingkungan. Spesies pohon yang ditanam meliputi Mahoni, Suren, dan Kopi Arabika untuk memperkuat daya resap tanah.',
    tanggal: '05 Agustus 2026',
    penulis: 'Tim Konservasi Desa',
    gambar: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    kategori: 'Pengelolaan Mata Air Manglayang',
    judul: 'Layanan Pasokan Air Bersih & Depot',
    kutipan: 'Sistem pengolahan air bersih berbasis konservasi alami untuk keberlanjutan air warga.',
    detail: 'Program pengelolaan air bersih berbasis sumber daya alam Gunung manglayang ini menyediakan pasokan air higienis untuk kebutuhan depot isi ulang dan warga. Air dialirkan dan diproses secara higienis melalui pipa bertekanan tinggi untuk menjaga mutu serta kesegarannya.',
    tanggal: '07 Agustus 2026',
    penulis: 'Tim Distribusi Air',
    gambar: 'Pengolahan-air.jpg'
  }
];

const INITIAL_UMKM: EkoUmkmItem[] = [
  { 
    id: 1, 
    nama: 'Kopi Arabika Konservasi Manglayang', 
    pemilik: 'Kelompok Tani Hutan Mandiri',
    wa: '6281234567890',
    kategori: 'Hasil Hutan Non-Kayu', 
    harga: 'Rp 45.000 / 250gr', 
    lokasi: 'Pasanggrahan RW 02',
    gambar: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500',
    deskripsi: 'Kopi dipanen dari sistem tumpangsari konservasi pohon hutan, membantu menjaga kerapatan pohon.',
    detailLengkap: 'Kopi Arabika murni 100% dipetik dari tanaman kopi tumpangsari vegetasi hutan Pasanggrahan. Diproses secara natural dengan rasa nikmat khas lereng Manglayang.'
  },
  { 
    id: 2, 
    nama: 'Bibit Pohon Mahoni & Suren Organik', 
    pemilik: 'Pembibitan Eco-Pasanggrahan',
    wa: '6281987654321',
    kategori: 'Tanaman Reboisasi', 
    harga: 'Rp 15.000 / Batang', 
    lokasi: 'RT 01 / RW 01, Pasanggrahan',
    gambar: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=500',
    deskripsi: 'Bibit siap tanam berumur 6 bulan dengan kualitas unggul, cocok untuk program adopsi pohon.',
    detailLengkap: 'Bibit tanaman berukuran 40-60cm dalam polybag siap tanam. Bebas dari pupuk kimia sintetis.'
  },
  { 
    id: 3, 
    nama: 'Pupuk Kompos Organik Super', 
    pemilik: 'Bank Sampah Desa',
    wa: '6285712345678',
    kategori: 'Olahan Lingkungan', 
    harga: 'Rp 20.000 / 5kg', 
    lokasi: 'Pusat Pengolahan Sampah RW 03',
    gambar: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500',
    deskripsi: 'Pupuk organik murni hasil pengolahan limbah rumah tangga warga desa.',
    detailLengkap: 'Dihasilkan dari fermentasi limbah organik dapur warga dengan mikroorganisme teruji.'
  }
];

const LOKASI_PASANGGRAHAN: LocationPin[] = [
  {
    id: 1,
    nama: 'Kantor Kelurahan Pasanggrahan',
    kategori: 'Fasilitas / Posko',
    alamat: 'Jl. Pasanggrahan No. 24, Ujungberung, Kota Bandung',
    deskripsi: 'Pusat pelayanan publik administrasi kelurahan & posko edukasi konservasi air.',
    sektor: 'Sektor 1: Pusat Layanan Publik',
    lat: -6.9032,
    lng: 107.7121,
    statusSensor: 'Debit Resapan Normal (98%)',
    pinPos: { top: '68%', left: '38%' }
  },
  {
    id: 2,
    nama: 'Zona Konservasi Hutan Lereng',
    kategori: 'Wisata',
    alamat: 'Kawasan Kaki Lereng RW 05, Pasanggrahan',
    deskripsi: 'Area utama reboisasi masal, sabuk hijau pencegah erosi, dan jalur edutrip ekologi.',
    sektor: 'Sektor 2: Area Konservasi Hutan',
    lat: -6.8920,
    lng: 107.7210,
    statusSensor: 'Kerapatan Vegetasi High (87%)',
    pinPos: { top: '28%', left: '68%' }
  },
  {
    id: 3,
    nama: 'Sentra Pembibitan & Eko-UMKM RW 03',
    kategori: 'Kuliner',
    alamat: 'Jl. Cilengkrang 1, Pasanggrahan, Ujungberung',
    deskripsi: 'Pusat budidaya bibit mahoni, suren, serta olahan Kopi Arabika.',
    sektor: 'Sektor 3: Pekarangan Warga & Eko-UMKM',
    lat: -6.9085,
    lng: 107.7155,
    statusSensor: 'Produksi Kompos Aktif',
    pinPos: { top: '52%', left: '48%' }
  }
];

const INITIAL_CCTV: CCTVPoint[] = [
  { 
    id: 1, 
    nama: 'CCTV 01 - Pos Pantau Hutan Lereng', 
    lokasi: 'Jalur Pendakian & Lereng RW 05', 
    status: 'ONLINE', 
    streamUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop',
    deskripsi: 'Memantau tutupan vegetasi hutan hujan tropis, kerapatan pohon reboisasi, dan aktivitas lingkungan.',
    fps: 30,
    pinPos: { top: '25%', left: '72%' }
  },
  { 
    id: 2, 
    nama: 'CCTV 02 - Wisata Air Curug Cilengkrang', 
    lokasi: 'Kawasan Wisata Air & Stream Curug Cilengkrang', 
    status: 'ONLINE', 
    streamUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&auto=format&fit=crop',
    deskripsi: 'Monitoring debit air terjun alami, kejernihan hulu sungai, serta keselamatan pengunjung.',
    fps: 60,
    pinPos: { top: '38%', left: '80%' }
  },
  { 
    id: 3, 
    nama: 'CCTV 03 - Kantor Kelurahan Pasanggrahan', 
    lokasi: 'Jl. Pasanggrahan No. 24, Ujungberung', 
    status: 'ONLINE', 
    streamUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop',
    deskripsi: 'Pemantauan area pelayanan publik kantor kelurahan, keamanan gerbang utama, dan aktivitas warga.',
    fps: 25,
    pinPos: { top: '65%', left: '35%' }
  },
  { 
    id: 4, 
    nama: 'CCTV 04 - Sentra Eko-UMKM & Pembibitan', 
    lokasi: 'Kawasan Galeri UMKM & Kebun Bibit RW 03', 
    status: 'ONLINE', 
    streamUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500',
    deskripsi: 'Pengawasan kebun pembibitan mahoni/suren, komposting mandiri, serta transaksi Eko-UMKM.',
    fps: 30,
    pinPos: { top: '55%', left: '50%' }
  },
  { 
    id: 5, 
    nama: 'CCTV 05 - Posko Pengolahan Sumber Mata Air', 
    lokasi: 'Mata Air Pasanggrahan, Bandung Timur', 
    status: 'ONLINE', 
    streamUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop',
    deskripsi: 'Monitoring kondisi debit resapan mata air pegunungan dan kebersihan lingkungan sekitar.',
    fps: 24,
    pinPos: { top: '42%', left: '60%' }
  }
];

const ZONA_PASANGGRAHAN: ZonaWilayah[] = [
  {
    id: 'zona-1',
    nama: 'Zona 1: Sabuk Hijau & Hutan Lindung Manglayang',
    kategori: 'Konservasi Utama',
    luas: '85 Hektar',
    tingkatResapan: '95% Optimal',
    risikoErosi: 'Sangat Rendah',
    jumlahPohon: '8.400 Pohon',
    sensorUtama: 'NDVI Vegetasi: 0.88 | Kelembaban: 82%',
    warnaTema: 'border-emerald-500 bg-emerald-500/20 text-emerald-950 font-bold',
    overlayStyle: { top: '15%', left: '55%', width: '38%', height: '35%' },
    deskripsi: 'Kawasan sabuk hijau hutan hujan lereng. Tempat perlindungan flora endemik, reboisasi tanaman keras, dan pencegah bahaya banjir erosi.'
  },
  {
    id: 'zona-2',
    nama: 'Zona 2: Hulu Mata Air & Wisata Curug Cilengkrang',
    kategori: 'Sumber Mata Air',
    luas: '32 Hektar',
    tingkatResapan: '98% Sangat Tinggi',
    risikoErosi: 'Rendah',
    jumlahPohon: '2.800 Pohon',
    sensorUtama: 'Debit Air: 14.2 L/s | pH: 7.2 Jernih',
    warnaTema: 'border-cyan-500 bg-cyan-500/25 text-cyan-950 font-bold',
    overlayStyle: { top: '35%', left: '65%', width: '28%', height: '30%' },
    deskripsi: 'Ekosistem hulu sungai pegunungan dengan 6 tingkatan air terjun alami. Menjadi penyuplai pasokan air bersih alami warga desa.'
  },
  {
    id: 'zona-3',
    nama: 'Zona 3: Pemukiman Warga & Sentra Eko-UMKM',
    kategori: 'Pemukiman & Eko-UMKM',
    luas: '25 Hektar',
    tingkatResapan: '78% Stabil',
    risikoErosi: 'Sangat Rendah',
    jumlahPohon: '1.250 Pohon Tumpangsari',
    sensorUtama: 'Pengolahan Kompos: Aktif | Kualitas Udara: 18°C',
    warnaTema: 'border-amber-500 bg-amber-500/25 text-amber-950 font-bold',
    overlayStyle: { top: '50%', left: '25%', width: '35%', height: '38%' },
    deskripsi: 'Kawasan pemukiman hijau warga dan perkebunan tumpangsari. Tempat pengolahan Kopi Arabika, pembibitan, dan bank sampah.'
  }
];

export function PublicPortal() {
  const [currentView, setCurrentView] = useState<'PUBLIC' | 'ADMIN_LOGIN' | 'ADMIN_DASHBOARD'>('PUBLIC');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cctvContainerRef = useRef<HTMLDivElement>(null);

  const scrollCctv = (direction: 'left' | 'right') => {
    if (cctvContainerRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      cctvContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const [showZones, setShowZones] = useState<boolean>(true);
  const [showSensors, setShowSensors] = useState<boolean>(true);
  const [showPins, setShowPins] = useState<boolean>(true);
  const [showCCTVOverlay, setShowCCTVOverlay] = useState<boolean>(true);
  const [activeZone, setActiveZone] = useState<ZonaWilayah>(ZONA_PASANGGRAHAN[0]);

  const [adminUsername, setAdminUsername] = useState<string>('');
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  const [adminActiveTab, setAdminActiveTab] = useState<
    'dashboard' | 'demografi' | 'umkm' | 'pengaduan' | 'cctv' | 'berita' | 'aparat'
  >('dashboard');

  const [listWarga, setListWarga] = useState<WargaData[]>(INITIAL_WARGA);
  const [listUmkm, setListUmkm] = useState<EkoUmkmItem[]>(INITIAL_UMKM);
  const [listBerita, setListBerita] = useState<BeritaKonservasi[]>(INITIAL_BERITA);
  const [listWisata] = useState<TempatWisata[]>(INITIAL_WISATA);
  const [listAparat] = useState<AparatDesa[]>(INITIAL_APARAT);
  const [listCctv] = useState<CCTVPoint[]>(INITIAL_CCTV);
  
  const [listPengaduan, setListPengaduan] = useState<PengaduanLingkungan[]>([
    { id: 1, nama: 'Budi Santoso', hp: '08123456789', kategori: 'Kebersihan & Sampah', lokasi: 'Sempadan Sungai RW 02', isi: 'Terdapat tumpukan limbah organik di dekat mata air, mohon edukasi warga setempat.', tanggal: '04 Agustus 2026', status: 'PENDING' },
    { id: 2, nama: 'Siti Rahma', hp: '08987654321', kategori: 'Kerusakan Mata Air', lokasi: 'RW 01 Pasanggrahan', isi: 'Debit air di penampungan utama menurun, perlu pemeriksaan sistem saluran resapan.', tanggal: '02 Agustus 2026', status: 'DIPROSES' }
  ]);

  // Modals / Pop-ups State
  const [selectedUmkm, setSelectedUmkm] = useState<EkoUmkmItem | null>(null);
  const [selectedBerita, setSelectedBerita] = useState<BeritaKonservasi | null>(null);
  const [selectedWisata, setSelectedWisata] = useState<TempatWisata | null>(null);
  const [selectedCCTVModal, setSelectedCCTVModal] = useState<CCTVPoint | null>(null);

  const [activeLocation, setActiveLocation] = useState<LocationPin | null>(null);
  const [formData, setFormData] = useState({ nama: '', hp: '', kategori: 'Isu Lingkungan / Penebangan Illegal', lokasi: '', isi: '' });

  const [showAddWargaModal, setShowAddWargaModal] = useState(false);
  const [newWarga, setNewWarga] = useState({ nik: '', nama: '', rtRw: 'RT 01 / RW 01', usia: 25, statusBantuan: 'Non-Bantuan' as const });

  const [showAddUmkmModal, setShowAddUmkmModal] = useState(false);
  const [newUmkm, setNewUmkm] = useState({ nama: '', pemilik: '', wa: '6281234567890', kategori: 'Hasil Hutan Non-Kayu', harga: '', lokasi: '', deskripsi: '', detailLengkap: '', gambar: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500' });

  const [showAddBeritaModal, setShowAddBeritaModal] = useState(false);
  const [newBerita, setNewBerita] = useState({ judul: '', kategori: 'Kegiatan Desa', kutipan: '', detail: '', penulis: 'Admin Desa', gambar: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop' });

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUsername === 'admin' && adminPassword === 'pasanggrahan2026') {
      setCurrentView('ADMIN_DASHBOARD');
      setLoginError('');
    } else {
      setLoginError('Username atau Password Admin Salah!');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.nama && formData.isi) {
      const newPengaduan: PengaduanLingkungan = {
        id: Date.now(),
        nama: formData.nama,
        hp: formData.hp,
        kategori: formData.kategori,
        lokasi: formData.lokasi || 'Kawasan Pasanggrahan',
        isi: formData.isi,
        tanggal: '05 Agustus 2026',
        status: 'PENDING'
      };
      setListPengaduan([newPengaduan, ...listPengaduan]);
      alert('Laporan Lingkungan Anda Berhasil Dikirim!');
      setFormData({ nama: '', hp: '', kategori: 'Isu Lingkungan / Penebangan Illegal', lokasi: '', isi: '' });
    }
  };

  const handleAddWarga = (e: React.FormEvent) => {
    e.preventDefault();
    const katUsia = newWarga.usia < 18 ? 'Anak' : newWarga.usia >= 60 ? 'Lansia' : 'Produktif';
    const data: WargaData = {
      id: Date.now(),
      nik: newWarga.nik || '327301990000' + Math.floor(Math.random() * 90 + 10),
      nama: newWarga.nama,
      rtRw: newWarga.rtRw,
      usia: Number(newWarga.usia),
      kategoriUsia: katUsia,
      statusBantuan: newWarga.statusBantuan
    };
    setListWarga([data, ...listWarga]);
    setShowAddWargaModal(false);
    setNewWarga({ nik: '', nama: '', rtRw: 'RT 01 / RW 01', usia: 25, statusBantuan: 'Non-Bantuan' });
  };

  const handleAddUmkm = (e: React.FormEvent) => {
    e.preventDefault();
    const data: EkoUmkmItem = { id: Date.now(), ...newUmkm };
    setListUmkm([data, ...listUmkm]);
    setShowAddUmkmModal(false);
    setNewUmkm({ nama: '', pemilik: '', wa: '6281234567890', kategori: 'Hasil Hutan Non-Kayu', harga: '', lokasi: '', deskripsi: '', detailLengkap: '', gambar: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500' });
  };

  const handleAddBerita = (e: React.FormEvent) => {
    e.preventDefault();
    const data: BeritaKonservasi = { id: Date.now(), ...newBerita, tanggal: '05 Agustus 2026' };
    setListBerita([data, ...listBerita]);
    setShowAddBeritaModal(false);
    setNewBerita({ judul: '', kategori: 'Kegiatan Desa', kutipan: '', detail: '', penulis: 'Admin Desa', gambar: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop' });
  };

  const handleUpdatePengaduanStatus = (id: number, status: 'PENDING' | 'DIPROSES' | 'SELESAI') => {
    setListPengaduan(listPengaduan.map(p => p.id === id ? { ...p, status } : p));
  };

  const handleDeleteWarga = (id: number) => setListWarga(listWarga.filter(w => w.id !== id));
  const handleDeleteUmkm = (id: number) => setListUmkm(listUmkm.filter(u => u.id !== id));
  const handleDeleteBerita = (id: number) => setListBerita(listBerita.filter(b => b.id !== id));

  // =========================================================================
  // VIEW 1: ADMIN LOGIN PAGE
  // =========================================================================
  if (currentView === 'ADMIN_LOGIN') {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-6 relative font-sans text-slate-800 overflow-hidden">
        <AnimationStyles />
        <button 
          onClick={() => setCurrentView('PUBLIC')}
          className="absolute top-8 left-8 bg-white hover:bg-emerald-50 text-emerald-900 font-bold px-4 py-2.5 rounded-2xl border border-emerald-200 shadow-sm transition flex items-center gap-2 text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Portal Warga
        </button>

        <div className="bg-white/95 backdrop-blur-xl rounded-[3rem] p-8 sm:p-10 max-w-md w-full shadow-2xl border border-emerald-200 space-y-6 relative overflow-hidden animate-fade-in-up">
          <div className="text-center space-y-3 relative z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-700 text-white rounded-3xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/30">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">Portal Admin Pasanggrahan</h2>
              <p className="text-xs text-emerald-700 font-semibold mt-1">Sistem Informasi Kelurahan &amp; Konservasi Wilayah</p>
            </div>
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-bold p-3 rounded-2xl text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 relative z-10">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Username Admin</label>
              <input 
                type="text" 
                required
                placeholder="Masukkan username (admin)" 
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                className="w-full bg-slate-50 border border-emerald-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Password</label>
              <input 
                type="password" 
                required
                placeholder="Masukkan password (pasanggrahan2026)" 
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full bg-slate-50 border border-emerald-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white font-black py-3.5 rounded-2xl shadow-lg shadow-emerald-700/30 transition text-sm tracking-wide flex items-center justify-center gap-2"
            >
              <Leaf className="w-4 h-4 text-emerald-300" /> Masuk Dashboard Admin
            </button>
          </form>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: ADMIN DASHBOARD FULL PAGE
  // =========================================================================
  if (currentView === 'ADMIN_DASHBOARD') {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
        <AnimationStyles />
        <header className="bg-white border-b border-emerald-100 px-8 py-4 flex justify-between items-center sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <LogoKonservasi />
            <div>
              <h1 className="font-black text-xl text-slate-900 leading-tight">Dashboard Kelurahan Pasanggrahan</h1>
              <p className="text-xs text-emerald-700 font-semibold">Sistem Informasi Desa Digital &amp; Konservasi Manglayang</p>
            </div>
          </div>

          <button 
            onClick={() => setCurrentView('PUBLIC')}
            className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-extrabold px-5 py-2 rounded-2xl text-xs flex items-center gap-2 transition"
          >
            <UserCheck className="w-4 h-4" /> Lihat Portal Publik
          </button>
        </header>

        <div className="flex flex-1 flex-col lg:flex-row">
          <aside className="w-full lg:w-64 bg-white border-r border-slate-200 p-6 space-y-6 shrink-0 flex flex-col justify-between">
            <div className="space-y-6">
              <nav className="space-y-1 text-xs font-bold text-slate-600">
                <button 
                  onClick={() => setAdminActiveTab('dashboard')} 
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl transition ${
                    adminActiveTab === 'dashboard' ? 'bg-emerald-100 text-emerald-900 font-extrabold' : 'hover:bg-slate-100'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-emerald-700" /> Dashboard Utama
                </button>
                <button 
                  onClick={() => setAdminActiveTab('demografi')} 
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl transition ${
                    adminActiveTab === 'demografi' ? 'bg-emerald-100 text-emerald-900 font-extrabold' : 'hover:bg-slate-100'
                  }`}
                >
                  <Users className="w-4 h-4 text-emerald-700" /> Data Demografi
                </button>
                <button 
                  onClick={() => setAdminActiveTab('umkm')} 
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl transition ${
                    adminActiveTab === 'umkm' ? 'bg-emerald-100 text-emerald-900 font-extrabold' : 'hover:bg-slate-100'
                  }`}
                >
                  <Store className="w-4 h-4 text-emerald-700" /> Katalog Eko-UMKM
                </button>
                <button 
                  onClick={() => setAdminActiveTab('pengaduan')} 
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl transition ${
                    adminActiveTab === 'pengaduan' ? 'bg-emerald-100 text-emerald-900 font-extrabold' : 'hover:bg-slate-100'
                  }`}
                >
                  <FileText className="w-4 h-4 text-emerald-700" /> Laporan Lingkungan
                </button>
                <button 
                  onClick={() => setAdminActiveTab('cctv')} 
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl transition ${
                    adminActiveTab === 'cctv' ? 'bg-emerald-100 text-emerald-900 font-extrabold' : 'hover:bg-slate-100'
                  }`}
                >
                  <Video className="w-4 h-4 text-emerald-700" /> CCTV Konservasi
                </button>
                <button 
                  onClick={() => setAdminActiveTab('berita')} 
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl transition ${
                    adminActiveTab === 'berita' ? 'bg-emerald-100 text-emerald-900 font-extrabold' : 'hover:bg-slate-100'
                  }`}
                >
                  <FileText className="w-4 h-4 text-emerald-700" /> Berita &amp; Mading
                </button>
              </nav>
            </div>

            <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-black text-slate-900">Admin Pasanggrahan</p>
                <p className="text-[10px] text-slate-400">admin@pasanggrahan.go.id</p>
              </div>
              <button 
                onClick={() => setCurrentView('PUBLIC')} 
                className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-2xl transition"
                title="Logout"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </aside>

          <main className="flex-1 p-6 lg:p-10 space-y-8 overflow-y-auto animate-fade-in">
            {adminActiveTab === 'dashboard' && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900">Ringkasan Konservasi &amp; Wilayah</h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Kelurahan Pasanggrahan, Ujungberung, Kota Bandung</p>
                  </div>

                  <button className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-2.5 rounded-2xl text-xs flex items-center gap-2 shadow-sm transition self-start">
                    <Download className="w-4 h-4" /> Export Laporan Data
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div onClick={() => setAdminActiveTab('umkm')} className="bg-white p-6 rounded-[2rem] border border-emerald-100 shadow-sm flex items-center gap-4 cursor-pointer hover:border-emerald-500 transition">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <Store className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold">Katalog UMKM Aktif</p>
                      <h4 className="text-2xl font-black text-slate-900">{listUmkm.length} Usaha Terdaftar</h4>
                    </div>
                  </div>

                  <div onClick={() => setAdminActiveTab('pengaduan')} className="bg-white p-6 rounded-[2rem] border border-amber-100 shadow-sm flex items-center gap-4 cursor-pointer hover:border-amber-500 transition">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold">Laporan Masuk</p>
                      <h4 className="text-2xl font-black text-slate-900">{listPengaduan.length} Laporan Warga</h4>
                    </div>
                  </div>

                  <div onClick={() => setAdminActiveTab('cctv')} className="bg-white p-6 rounded-[2rem] border border-blue-100 shadow-sm flex items-center gap-4 cursor-pointer hover:border-blue-500 transition">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                      <Video className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold">Kamera CCTV Daring</p>
                      <h4 className="text-2xl font-black text-slate-900">{listCctv.length} Titik Monitor</h4>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm space-y-4">
                    <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <Sprout className="w-4 h-4 text-emerald-600" /> Tren Pertumbuhan Penduduk Pasanggrahan
                    </h3>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={DATA_TREN_PENDUDUK}>
                          <XAxis dataKey="tahun" stroke="#64748b" fontSize={11} />
                          <YAxis stroke="#64748b" fontSize={11} />
                          <Tooltip />
                          <Line type="monotone" dataKey="jumlah" stroke="#059669" strokeWidth={3} dot={{ r: 5 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm space-y-4">
                    <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-600" /> Kelahiran vs Kematian (Bulanan)
                    </h3>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={DATA_KELAHIRAN_KEMATIAN}>
                          <XAxis dataKey="bulan" stroke="#64748b" fontSize={11} />
                          <YAxis stroke="#64748b" fontSize={11} />
                          <Tooltip />
                          <Bar dataKey="lahir" fill="#059669" radius={[4, 4, 0, 0]} name="Kelahiran" />
                          <Bar dataKey="mati" fill="#ef4444" radius={[4, 4, 0, 0]} name="Kematian" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {adminActiveTab === 'demografi' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900">Kelola Data Demografi Penduduk</h2>
                    <p className="text-xs text-slate-500 font-medium">Monitoring kelompok usia &amp; status bantuan warga Pasanggrahan.</p>
                  </div>
                  <button onClick={() => setShowAddWargaModal(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2 shadow transition">
                    <Plus className="w-4 h-4" /> Tambah Warga Baru
                  </button>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-emerald-50/50 border-b border-emerald-100 text-emerald-900 text-[11px] font-extrabold uppercase">
                        <th className="p-4">NIK</th>
                        <th className="p-4">Nama Lengkap</th>
                        <th className="p-4">RT / RW</th>
                        <th className="p-4">Usia</th>
                        <th className="p-4">Kategori</th>
                        <th className="p-4">Status Bantuan</th>
                        <th className="p-4 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                      {listWarga.map((warga) => (
                        <tr key={warga.id} className="hover:bg-slate-50 transition">
                          <td className="p-4 font-mono text-slate-500">{warga.nik}</td>
                          <td className="p-4 font-bold text-slate-900">{warga.nama}</td>
                          <td className="p-4">{warga.rtRw}</td>
                          <td className="p-4">{warga.usia} thn</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                              warga.kategoriUsia === 'Anak' ? 'bg-blue-100 text-blue-800' :
                              warga.kategoriUsia === 'Produktif' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {warga.kategoriUsia}
                            </span>
                          </td>
                          <td className="p-4">{warga.statusBantuan}</td>
                          <td className="p-4 text-center">
                            <button onClick={() => handleDeleteWarga(warga.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-xl transition" title="Hapus Data">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {adminActiveTab === 'umkm' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900">Katalog Eko-UMKM Pasanggrahan</h2>
                    <p className="text-xs text-slate-500 font-medium">Kelola produk lokal hasil hutan non-kayu &amp; budidaya warga.</p>
                  </div>
                  <button onClick={() => setShowAddUmkmModal(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2 shadow transition">
                    <Plus className="w-4 h-4" /> Tambah Produk
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listUmkm.map((u) => (
                    <div key={u.id} className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3 relative shadow-sm">
                      <img src={u.gambar} alt={u.nama} className="w-full h-40 object-cover rounded-2xl" />
                      <div>
                        <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">{u.kategori}</span>
                        <h3 className="font-bold text-sm text-slate-900 mt-2">{u.nama}</h3>
                        <p className="text-xs text-slate-500">{u.pemilik} • {u.lokasi}</p>
                        <p className="text-emerald-700 font-black text-sm mt-1">{u.harga}</p>
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex justify-end">
                        <button onClick={() => handleDeleteUmkm(u.id)} className="text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1">
                          <Trash2 className="w-3.5 h-3.5" /> Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {adminActiveTab === 'pengaduan' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-black text-slate-900">Laporan Isu Lingkungan Warga</h2>
                <div className="space-y-4">
                  {listPengaduan.map((lapor) => (
                    <div key={lapor.id} className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3 shadow-sm">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-slate-900">{lapor.nama} ({lapor.hp})</h3>
                        <select value={lapor.status} onChange={(e) => handleUpdatePengaduanStatus(lapor.id, e.target.value as any)} className="bg-slate-50 border rounded-xl px-3 py-1 text-xs font-bold">
                          <option value="PENDING">PENDING</option>
                          <option value="DIPROSES">DIPROSES</option>
                          <option value="SELESAI">SELESAI</option>
                        </select>
                      </div>
                      <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl">{lapor.isi}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {adminActiveTab === 'cctv' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-black text-slate-900">Titik CCTV Pantauan Kawasan (5 Kamera)</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {listCctv.map((cam) => (
                    <div 
                      key={cam.id} 
                      onClick={() => setSelectedCCTVModal(cam)}
                      className="bg-white p-5 rounded-3xl border border-slate-200 space-y-3 shadow-sm cursor-pointer hover:border-emerald-500 transition group"
                    >
                      <div className="relative overflow-hidden rounded-2xl h-40">
                        <img src={cam.streamUrl} alt={cam.nama} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                        <span className="absolute top-2 right-2 bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span> LIVE
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-slate-900">{cam.nama}</h3>
                      <p className="text-xs text-slate-500">{cam.lokasi}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {adminActiveTab === 'berita' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-black text-slate-900">Mading &amp; Berita Desa</h2>
                  <button onClick={() => setShowAddBeritaModal(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2 shadow">
                    <Plus className="w-4 h-4" /> Tambah Berita
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {listBerita.map((b) => (
                    <div key={b.id} className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3 shadow-sm">
                      <img src={b.gambar} alt={b.judul} className="w-full h-44 object-cover rounded-2xl" />
                      <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">{b.kategori}</span>
                      <h3 className="font-bold text-base text-slate-900">{b.judul}</h3>
                      <p className="text-xs text-slate-600 line-clamp-2">{b.kutipan}</p>
                      <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-[10px] text-slate-400">{b.tanggal}</span>
                        <button onClick={() => handleDeleteBerita(b.id)} className="text-red-500 hover:bg-red-50 px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1">
                          <Trash2 className="w-3.5 h-3.5" /> Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 3: PUBLIC LANDING PAGE
  // =========================================================================
  return (
    <div className="scroll-smooth min-h-screen bg-[#fcfdfc] text-slate-800 font-sans flex flex-col justify-between selection:bg-emerald-500 selection:text-white relative overflow-x-clip">
      <AnimationStyles />

      <div>
        {/* NAVBAR UTAMA (Mading dan Aparat telah dihapus dari sini agar tidak menumpuk) */}
        <nav className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-emerald-100/60 px-4 sm:px-6 py-3.5 transition-all duration-300 shadow-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <LogoKonservasi />
              <div>
                <h1 className="font-black text-base sm:text-lg leading-tight text-slate-900 flex items-center gap-1.5">
                  Desa Pasanggrahan <Leaf className="w-4 h-4 text-emerald-600 fill-emerald-600 inline shrink-0" />
                </h1>
                <p className="text-[10px] text-slate-500 font-bold tracking-wider uppercase flex items-center gap-1">
                  <Trees className="w-3 h-3 text-emerald-600 inline" /> Kec. Ujungberung, Kota Bandung
                </p>
              </div>
            </div>
            
            {/* Navigasi Desktop yang Ringkas (Tanpa Mading & Aparat) */}
            <div className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-600">
              <a href="#hero" className="hover:text-emerald-700 transition flex items-center gap-1">
                <Sun className="w-3.5 h-3.5 text-emerald-600" /> Beranda
              </a>
              <a href="#profil-alam" className="hover:text-emerald-700 transition flex items-center gap-1">
                <Mountain className="w-3.5 h-3.5 text-emerald-600" /> Profil
              </a>
              <a href="#wisata" className="hover:text-emerald-700 transition flex items-center gap-1">
                <Waves className="w-3.5 h-3.5 text-emerald-600" /> Wisata & Curug
              </a>
              <a href="#demografi-real" className="hover:text-emerald-700 transition flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-emerald-600" /> Populasi
              </a>
              <a href="#peta" className="hover:text-emerald-700 transition flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Pemetaan Map
              </a>
              <a href="#umkm" className="hover:text-emerald-700 transition flex items-center gap-1">
                <Flower2 className="w-3.5 h-3.5 text-emerald-600" /> Eko-UMKM
              </a>
              <a href="#cctv" className="hover:text-emerald-700 transition flex items-center gap-1">
                <Camera className="w-3.5 h-3.5 text-emerald-600" /> CCTV LIVE
              </a>
              <a href="#lapornya" className="hover:text-emerald-700 transition flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-emerald-600" /> Lapor
              </a>
              
              <button 
                onClick={() => setCurrentView('ADMIN_LOGIN')}
                className="bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 rounded-xl transition shadow-sm flex items-center gap-1.5 font-extrabold ml-2 text-xs"
              >
                <LayoutDashboard className="w-3.5 h-3.5" /> Portal Admin
              </button>
            </div>

            {/* Tombol Mobile */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-2xl bg-emerald-50 text-emerald-900 hover:bg-emerald-100 transition"
              aria-label="Toggle Menu Mobile"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Menu Dropdown Mobile (Ringkas) */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-3 pt-3 border-t border-emerald-100 flex flex-col space-y-2 px-2 pb-3 font-extrabold text-emerald-900 text-sm bg-white rounded-3xl p-4 shadow-xl animate-fade-in-up">
              <a href="#hero" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-emerald-50 flex items-center gap-2">
                <Sun className="w-4 h-4 text-emerald-600" /> Beranda
              </a>
              <a href="#profil-alam" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-emerald-50 flex items-center gap-2">
                <Mountain className="w-4 h-4 text-emerald-600" /> Profil Alam
              </a>
              <a href="#wisata" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-emerald-50 flex items-center gap-2">
                <Waves className="w-4 h-4 text-emerald-600" /> Wisata Alam
              </a>
              <a href="#demografi-real" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-emerald-50 flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" /> Populasi Warga
              </a>
              <a href="#peta" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-emerald-50 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" /> Pemetaan Map
              </a>
              <a href="#umkm" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-emerald-50 flex items-center gap-2">
                <Flower2 className="w-4 h-4 text-emerald-600" /> Eko-UMKM
              </a>
              <a href="#cctv" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-emerald-50 flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-600" /> CCTV LIVE
              </a>
              <a href="#lapornya" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-emerald-50 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" /> Lapor
              </a>
              <button 
                onClick={() => { setIsMobileMenuOpen(false); setCurrentView('ADMIN_LOGIN'); }}
                className="w-full text-center bg-emerald-800 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 shadow"
              >
                <LayoutDashboard className="w-4 h-4" /> Portal Admin
              </button>
            </div>
          )}
        </nav>

        {/* 🌿 1. BAGIAN BERANDA 🌿 */}
        <section 
          id="hero" 
          className="relative py-16 lg:py-24 px-6 overflow-hidden bg-transparent text-slate-800 animate-fade-in max-w-7xl mx-auto"
        >
          <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50/90 border border-emerald-200 text-emerald-800 text-xs font-extrabold shadow-sm animate-float">
                <Sparkles className="w-4 h-4 text-emerald-600" /> Portal Resmi Kelurahan Pasanggrahan, Ujungberung
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
                Harmoni Konservasi &amp; Ekosistem <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800">
                  Kelurahan Pasanggrahan
                </span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
                Portal Terpadu Desa Pasanggrahan, Ujungberung. Menjelajahi keindahan alami Curug Cilengkrang, tutupan hutan Gunung Manglayang, pemberdayaan Eko-UMKM, serta pemantauan live CCTV.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#peta" className="bg-emerald-700 hover:bg-emerald-800 text-white font-black px-7 py-3.5 rounded-2xl transition-all duration-300 text-xs uppercase tracking-wider shadow-lg shadow-emerald-700/20 flex items-center gap-2">
                  <Compass className="w-4 h-4" /> Buka Peta &amp; Pantau
                </a>
                <a href="#wisata" className="bg-white hover:bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold px-7 py-3.5 rounded-2xl transition-all duration-300 text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm">
                  <Waves className="w-4 h-4 text-emerald-600" /> Jelajahi Wisata
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative animate-fade-in-up">
              <div className="relative rounded-[3rem] overflow-hidden border-8 border-emerald-100 shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop" 
                  alt="Panorama Lereng Pegunungan Pasanggrahan" 
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-emerald-100 shadow-lg text-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <Mountain className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">Kaki Gunung Manglayang</h4>
                      <p className="text-[11px] text-emerald-700 font-medium">Udara Segar &amp; Panorama Alam Asri</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-12 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 backdrop-blur-md p-5 rounded-3xl border border-emerald-200 shadow-sm text-center">
              <p className="text-xs text-emerald-800 font-bold uppercase">Luas RTH</p>
              <p className="text-xl font-black text-emerald-950 mt-1">142 Hektar</p>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50/50 backdrop-blur-md p-5 rounded-3xl border border-teal-200 shadow-sm text-center">
              <p className="text-xs text-teal-800 font-bold uppercase">Kamera Live</p>
              <p className="text-xl font-black text-teal-950 mt-1">5 Titik CCTV</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-green-50/50 backdrop-blur-md p-5 rounded-3xl border border-emerald-200 shadow-sm text-center">
              <p className="text-xs text-emerald-800 font-bold uppercase">Pohon Tertanam</p>
              <p className="text-xl font-black text-emerald-950 mt-1">12.450+</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-teal-50/50 backdrop-blur-md p-5 rounded-3xl border border-green-200 shadow-sm text-center">
              <p className="text-xs text-green-800 font-bold uppercase">Air Terjun</p>
              <p className="text-xl font-black text-green-950 mt-1">6 Tingkatan</p>
            </div>
          </div>
        </section>

        {/* SECTION PROFIL ALAM */}
        <section id="profil-alam" className="py-20 px-6 max-w-7xl mx-auto space-y-10 animate-fade-in-up">
          <div className="bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/40 rounded-[3.5rem] border border-emerald-200 p-8 sm:p-12 shadow-sm relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-extrabold border border-emerald-300">
                  <Sparkles className="w-4 h-4 text-emerald-600" /> Profil Alam &amp; Nuansa Gunung Manglayang
                </div>

                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
                  Ketenangan Alami &amp; Pesona Pegunungan Pasanggrahan
                </h2>

                <p className="text-slate-600 text-sm leading-relaxed">
                  Kelurahan Pasanggrahan terletak tepat di bawah naungan lereng <strong className="text-emerald-800">Gunung Manglayang</strong>. Kawasan ini memancarkan nuansa alam pegunungan yang sangat kental dengan hembusan angin sejuk, pepohonan pinus yang menjulang tinggi, serta gemericik aliran sungai pegunungan yang jernih.
                </p>

                <p className="text-slate-600 text-sm leading-relaxed">
                  Keberadaan ekosistem ini menjadikan Pasanggrahan sebagai salah satu benteng konservasi penting di Kota Bandung Timur, tempat di mana kelestarian hutan, fauna endemik, serta tradisi tumpangsari Eko-UMKM warga hidup berdampingan secara harmonis.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
                  <div className="bg-white/90 p-4 rounded-2xl border border-emerald-200 flex items-center gap-3 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Wind className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">Udara Sejuk</h4>
                      <p className="text-[10px] text-emerald-700 font-medium">Bebas polusi kota</p>
                    </div>
                  </div>

                  <div className="bg-white/90 p-4 rounded-2xl border border-teal-200 flex items-center gap-3 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Droplets className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">Mata Air Alami</h4>
                      <p className="text-[10px] text-teal-700 font-medium">Sumber air melimpah</p>
                    </div>
                  </div>

                  <div className="bg-white/90 p-4 rounded-2xl border border-green-200 flex items-center gap-3 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-green-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Bird className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">Fauna &amp; Flora</h4>
                      <p className="text-[10px] text-green-700 font-medium">Keanekaragaman hayati</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="relative rounded-[2.5rem] overflow-hidden border-4 border-emerald-100 shadow-xl group">
                  <img 
                    src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop" 
                    alt="Nuansa Hutan Pinus Pegunungan Pasanggrahan" 
                    className="w-full h-[360px] object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent"></div>

                  <div className="absolute top-4 right-4 bg-emerald-600 text-white p-2.5 rounded-2xl shadow-lg animate-float">
                    <Flower2 className="w-5 h-5" />
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-emerald-200 text-slate-800 space-y-1 shadow">
                    <p className="text-xs font-black text-emerald-900 flex items-center gap-1.5">
                      <Trees className="w-4 h-4 text-emerald-600" /> Hutan Pinus &amp; Vegetasi Alami
                    </p>
                    <p className="text-[11px] text-slate-600">
                      Keasrian lereng yang dijaga ketat oleh warga dan pemerintah Pasanggrahan.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION DESTINASI WISATA */}
        <section id="wisata" className="py-16 px-6 max-w-7xl mx-auto space-y-12 animate-fade-in-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-emerald-200 pb-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-emerald-700 tracking-wider uppercase flex items-center gap-1.5">
                <Waves className="w-4 h-4 text-emerald-600" /> Ekosistem Air Terjun &amp; Pegunungan
              </span>
              <h2 className="text-3xl font-black text-slate-900 flex items-center gap-2">
                Tempat Wisata Alam &amp; Curug di Pasanggrahan <Flower2 className="w-6 h-6 text-emerald-600" />
              </h2>
            </div>
            <p className="text-xs text-slate-600 font-medium max-w-md">
              Kaya akan hulu air jernih dan <strong className="text-emerald-800">Wisata Air Curug Cilengkrang</strong> (6 tingkatan air terjun alami) serta kawasan camping hutan pinus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {listWisata.map((w) => (
              <div 
                key={w.id} 
                onClick={() => setSelectedWisata(w)}
                className="bg-white rounded-[2.8rem] border border-emerald-200 overflow-hidden hover:border-emerald-500 hover:shadow-xl cursor-pointer transition-all duration-500 group flex flex-col justify-between"
              >
                <div>
                  <div className="h-64 overflow-hidden relative">
                    <img src={w.gambar} alt={w.nama} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/20 to-transparent"></div>
                    <span className="absolute top-4 left-4 text-xs font-extrabold px-3.5 py-1 bg-emerald-700/90 backdrop-blur-md text-white rounded-full shadow-md flex items-center gap-1">
                      <Trees className="w-3.5 h-3.5 text-emerald-200" /> {w.kategori}
                    </span>
                    <span className="absolute bottom-4 left-4 text-xs font-mono font-bold text-emerald-200 flex items-center gap-1 bg-emerald-950/70 backdrop-blur-sm px-3 py-1 rounded-full border border-emerald-800">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {w.lokasi}
                    </span>
                  </div>

                  <div className="p-6 sm:p-8 space-y-3">
                    <h3 className="font-black text-xl text-slate-900 group-hover:text-emerald-700 transition">{w.nama}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{w.deskripsi}</p>
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                      {w.fiturUtama.map((fitur, idx) => (
                        <span key={idx} className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-xl flex items-center gap-1.5">
                          {fitur.icon} {fitur.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 sm:px-8 pb-6 pt-3 border-t border-emerald-100 flex justify-between items-center bg-emerald-50/40">
                  <span className="text-xs font-black text-slate-900">Tiket: {w.hargaTiket}</span>
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Lihat Info Lengkap <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION POPULASI & INDIKATOR LINGKUNGAN */}
        <section id="demografi-real" className="py-16 bg-emerald-50/40 border-y border-emerald-200 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-xl mx-auto mb-12 space-y-1">
              <span className="text-[11px] font-extrabold text-emerald-700 tracking-wider uppercase flex items-center justify-center gap-1">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" /> Data Sosiologis &amp; Ekologis
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center justify-center gap-2">
                Demografi &amp; Luas Ruang Terbuka Hijau <Sun className="w-6 h-6 text-emerald-600" />
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white border border-emerald-200 p-6 rounded-[2.5rem] text-center space-y-2 shadow-sm">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
                  <Users className="w-6 h-6" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900">{STATS_POPULASI_REAL.totalPenduduk.toLocaleString('id-ID')}</p>
                <p className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Total Penduduk (Jiwa)</p>
              </div>

              <div className="bg-white border border-teal-200 p-6 rounded-[2.5rem] text-center space-y-2 shadow-sm">
                <div className="w-12 h-12 bg-teal-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
                  <Home className="w-6 h-6" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900">{STATS_POPULASI_REAL.jumlahKK.toLocaleString('id-ID')}</p>
                <p className="text-[11px] font-bold text-teal-800 uppercase tracking-wider">Kepala Keluarga (KK)</p>
              </div>

              <div className="bg-white border border-emerald-200 p-6 rounded-[2.5rem] text-center space-y-2 shadow-sm">
                <div className="w-12 h-12 bg-emerald-700 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
                  <Trees className="w-6 h-6" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900">{STATS_POPULASI_REAL.luasRTH}</p>
                <p className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Ruang Terbuka Hijau</p>
              </div>

              <div className="bg-white border border-green-200 p-6 rounded-[2.5rem] text-center space-y-2 shadow-sm">
                <div className="w-12 h-12 bg-green-700 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
                  <Sprout className="w-6 h-6" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900">+{STATS_POPULASI_REAL.pohonTertanam.toLocaleString('id-ID')}</p>
                <p className="text-[11px] font-bold text-green-800 uppercase tracking-wider">Pohon Tumpangsari</p>
              </div>
            </div>
          </div>
        </section>

        {/* 🗺️ SECTION PETA: PETA TIDAK BISA DIGESER 🗺️ */}
        <section id="peta" className="py-20 px-6 max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold text-emerald-700 tracking-wider uppercase flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-emerald-600" /> Pemetaan Interaktif &amp; Telemetri Alam
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 flex items-center gap-2">
                Peta Zona Wilayah &amp; Alat Pantauan Desa <Mountain className="w-6 h-6 text-emerald-700" />
              </h2>
            </div>
            
            <span className="text-xs bg-emerald-50 text-emerald-900 border border-emerald-200 font-extrabold px-4 py-2 rounded-2xl flex items-center gap-1.5 self-start shadow-sm">
              <Globe className="w-4 h-4 text-emerald-700" /> Sektor Pasanggrahan: 6°54'11"S 107°42'43"E
            </span>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-[3.5rem] border border-emerald-200 shadow-xl space-y-6 text-slate-800 relative overflow-hidden">
            <div className="bg-emerald-50/50 p-4 rounded-[2rem] border border-emerald-200 flex flex-wrap items-center justify-between gap-4 z-25 relative">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-black text-slate-900">Sakelar Modul Layers:</span>
              </div>

              <div className="flex items-center gap-2 flex-wrap text-xs">
                <button 
                  onClick={() => setShowZones(!showZones)}
                  className={`px-3.5 py-2 rounded-xl font-extrabold transition border flex items-center gap-1.5 ${
                    showZones ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm' : 'bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-50'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" /> Zona Wilayah: {showZones ? 'NYALA' : 'HILANG'}
                </button>

                <button 
                  onClick={() => setShowSensors(!showSensors)}
                  className={`px-3.5 py-2 rounded-xl font-extrabold transition border flex items-center gap-1.5 ${
                    showSensors ? 'bg-teal-600 text-white border-teal-500 shadow-sm' : 'bg-white text-teal-800 border-teal-200 hover:bg-teal-50'
                  }`}
                >
                  <Gauge className="w-3.5 h-3.5" /> Sensor Alam: {showSensors ? 'NYALA' : 'HILANG'}
                </button>

                <button 
                  onClick={() => setShowPins(!showPins)}
                  className={`px-3.5 py-2 rounded-xl font-extrabold transition border flex items-center gap-1.5 ${
                    showPins ? 'bg-green-600 text-white border-green-500 shadow-sm' : 'bg-white text-green-800 border-green-200 hover:bg-green-50'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" /> Pin Posko: {showPins ? 'NYALA' : 'HILANG'}
                </button>

                <button 
                  onClick={() => setShowCCTVOverlay(!showCCTVOverlay)}
                  className={`px-3.5 py-2 rounded-xl font-extrabold transition border flex items-center gap-1.5 ${
                    showCCTVOverlay ? 'bg-emerald-700 text-white border-emerald-600 shadow-sm' : 'bg-white text-emerald-900 border-emerald-200 hover:bg-emerald-50'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" /> Kamera CCTV: {showCCTVOverlay ? 'NYALA' : 'HILANG'}
                </button>
              </div>
            </div>

            <div className="relative rounded-[2.5rem] overflow-hidden border border-emerald-200 bg-emerald-950 h-[520px] w-full shadow-inner select-none">
              <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-200 text-[10px] font-mono text-emerald-900 flex items-center gap-1.5 shadow">
                <Lock className="w-3 h-3 text-emerald-600" /> PETA STATIS TERTANAM
              </div>

              {showZones && ZONA_PASANGGRAHAN.map((zona) => {
                const isSelected = activeZone?.id === zona.id;
                return (
                  <div
                    key={zona.id}
                    onClick={() => setActiveZone(zona)}
                    style={{
                      top: zona.overlayStyle.top,
                      left: zona.overlayStyle.left,
                      width: zona.overlayStyle.width,
                      height: zona.overlayStyle.height,
                    }}
                    className={`absolute z-20 rounded-3xl border-2 cursor-pointer transition-all duration-300 p-3 backdrop-blur-[2px] flex flex-col justify-between shadow-lg ${zona.warnaTema} ${
                      isSelected ? 'ring-4 ring-emerald-400 scale-105 z-30 shadow-2xl' : 'hover:scale-100 opacity-90'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-200 shadow">
                        {zona.kategori}
                      </span>
                      {isSelected && <Sparkles className="w-4 h-4 text-emerald-300 animate-spin" />}
                    </div>
                    <div>
                      <p className="text-xs font-black drop-shadow-sm text-slate-900">{zona.nama}</p>
                      <p className="text-[10px] font-mono text-slate-800">{zona.luas} • {zona.tingkatResapan}</p>
                    </div>
                  </div>
                );
              })}

              {showPins && LOKASI_PASANGGRAHAN.map((loc) => {
                const isActive = activeLocation?.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setActiveLocation(loc)}
                    style={{ top: loc.pinPos.top, left: loc.pinPos.left }}
                    className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group flex flex-col items-center cursor-pointer"
                  >
                    <div className={`relative flex items-center justify-center p-2.5 rounded-full shadow-2xl border-2 transition-transform duration-300 ${
                      isActive ? 'bg-emerald-500 border-white scale-125 ring-4 ring-emerald-400/40' : 'bg-emerald-700 border-white hover:scale-110'
                    }`}>
                      <MapPin className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white'}`} />
                    </div>
                    <span className={`mt-1 text-[9px] font-black px-2 py-0.5 rounded-lg shadow-md backdrop-blur-md whitespace-nowrap border ${
                      isActive ? 'bg-emerald-600 text-white border-white' : 'bg-white/95 text-emerald-900 border-emerald-200'
                    }`}>
                      {loc.nama}
                    </span>
                  </button>
                );
              })}

              {showCCTVOverlay && listCctv.map((cam) => (
                <button
                  key={cam.id}
                  onClick={() => setSelectedCCTVModal(cam)}
                  style={{ top: cam.pinPos.top, left: cam.pinPos.left }}
                  className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center cursor-pointer"
                  title={`Buka Stream: ${cam.nama}`}
                >
                  <div className="w-7 h-7 rounded-full bg-teal-600 border-2 border-white flex items-center justify-center text-white shadow-lg hover:scale-125 transition">
                    <Camera className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[8px] font-bold bg-white text-teal-800 px-1.5 py-0.5 rounded mt-0.5 border border-teal-200 shadow-sm">
                    CCTV 0{cam.id}
                  </span>
                </button>
              ))}

              <iframe
                title="Peta Kelurahan Pasanggrahan Ujungberung Bandung"
                src="https://www.openstreetmap.org/export/embed.html?bbox=107.6950%2C-6.9200%2C107.7350%2C-6.8800&amp;layer=mapnik&amp;marker=-6.9032%2C107.7121"
                className="absolute inset-0 w-full h-full border-0 grayscale-[15%] contrast-[105%] brightness-[95%] pointer-events-none"
              ></iframe>

              {showZones && activeZone && (
                <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:max-w-md bg-white/95 backdrop-blur-xl p-5 rounded-[2rem] border border-emerald-200 shadow-2xl space-y-2 z-30 animate-fade-in-up">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase px-3 py-0.5 rounded-full bg-emerald-600 text-white">
                      {activeZone.kategori}
                    </span>
                  </div>
                  <h4 className="font-black text-base text-slate-900 flex items-center gap-2">
                    <Trees className="w-4 h-4 text-emerald-600 shrink-0" /> {activeZone.nama}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{activeZone.deskripsi}</p>
                </div>
              )}
            </div>

            {showSensors && (
              <div className="space-y-4 pt-4 border-t border-emerald-100 animate-fade-in-up">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Radio className="w-4 h-4 text-emerald-600 animate-pulse" /> Alat Pantauan Telemetri Real-Time Desa
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-700 flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    <RefreshCw className="w-3 h-3 animate-spin" /> Update Otomatis Tiap 5m
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-emerald-50/40 p-4 rounded-2xl border border-emerald-200 space-y-2 relative overflow-hidden shadow-sm">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-extrabold text-emerald-900 flex items-center gap-1">
                        <Waves className="w-4 h-4 text-emerald-600" /> Sensor Debit Curug
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    </div>
                    <p className="text-2xl font-black text-slate-900">14.2 <span className="text-xs font-normal text-slate-500">Liter / Detik</span></p>
                  </div>

                  <div className="bg-teal-50/40 p-4 rounded-2xl border border-teal-200 space-y-2 relative overflow-hidden shadow-sm">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-extrabold text-teal-900 flex items-center gap-1">
                        <Droplets className="w-4 h-4 text-teal-600" /> Moisture Lereng
                      </span>
                      <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping"></span>
                    </div>
                    <p className="text-2xl font-black text-slate-900">76% <span className="text-xs font-normal text-slate-500">Kelembaban</span></p>
                  </div>

                  <div className="bg-green-50/40 p-4 rounded-2xl border border-green-200 space-y-2 relative overflow-hidden shadow-sm">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-extrabold text-green-900 flex items-center gap-1">
                        <Trees className="w-4 h-4 text-green-600" /> Indeks Vegetasi
                      </span>
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                    </div>
                    <p className="text-2xl font-black text-slate-900">0.84 <span className="text-xs font-normal text-slate-500">NDVI</span></p>
                  </div>

                  <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-300 space-y-2 relative overflow-hidden shadow-sm">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-extrabold text-emerald-900 flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4 text-emerald-700" /> Status EWS
                      </span>
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-2xl font-black text-emerald-700">AMAN</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* KATALOG EKO-UMKM */}
        <section id="umkm" className="py-20 px-6 max-w-7xl mx-auto border-t border-emerald-100">
          <div className="mb-10 space-y-2">
            <span className="text-xs font-extrabold text-emerald-700 tracking-wider uppercase flex items-center gap-1">
              <Store className="w-4 h-4 text-emerald-600" /> Hasil Bumi &amp; Produk Warga
            </span>
            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-2">
              Katalog Eko-UMKM Pasanggrahan <Flower2 className="w-6 h-6 text-emerald-600" />
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {listUmkm.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedUmkm(item)}
                className="bg-white rounded-[2.5rem] border border-emerald-200 overflow-hidden hover:border-emerald-500 cursor-pointer transition-all duration-300 group shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="h-52 overflow-hidden relative">
                    <img src={item.gambar} alt={item.nama} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-4 left-4 text-xs font-extrabold px-3 py-1 bg-white/95 backdrop-blur-md text-emerald-900 rounded-full border border-emerald-200 shadow-sm flex items-center gap-1">
                      <Sprout className="w-3.5 h-3.5 text-emerald-600" /> {item.kategori}
                    </span>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="font-black text-lg text-slate-900 group-hover:text-emerald-700 transition">{item.nama}</h3>
                    <p className="text-emerald-800 text-xs font-medium">Pengelola: {item.pemilik}</p>
                    <p className="text-slate-600 text-xs line-clamp-2">{item.deskripsi}</p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-emerald-100 flex justify-between items-center bg-emerald-50/30">
                  <span className="text-base font-black text-slate-900">{item.harga}</span>
                  <span className="text-xs bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-3.5 py-2 rounded-2xl transition flex items-center gap-1.5 shadow-sm">
                    <Eye className="w-3.5 h-3.5" /> Detail Produk
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MONITORING 5 CCTV LIVE */}
        <section id="cctv" className="py-20 px-6 bg-emerald-950 text-white border-t border-emerald-900 rounded-t-[3.5rem] relative overflow-hidden">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-extrabold text-emerald-300 tracking-wider uppercase flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-emerald-300 animate-pulse" /> Live Monitoring Pengawasan Hutan &amp; Wilayah
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  5 Titik Kamera CCTV Daring Pasanggrahan
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => scrollCctv('left')}
                  className="p-3 rounded-2xl bg-emerald-900 hover:bg-emerald-800 text-white border border-emerald-800 transition"
                  aria-label="Geser Kiri"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => scrollCctv('right')}
                  className="p-3 rounded-2xl bg-emerald-900 hover:bg-emerald-800 text-white border border-emerald-800 transition"
                  aria-label="Geser Kanan"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div 
              ref={cctvContainerRef}
              className="flex gap-6 overflow-x-auto pb-4 pt-2 cctv-scroll-container snap-x"
            >
              {listCctv.map((cam) => (
                <div 
                  key={cam.id}
                  onClick={() => setSelectedCCTVModal(cam)}
                  className="min-w-[320px] sm:min-w-[360px] bg-emerald-900/60 rounded-[2.5rem] border border-emerald-800 overflow-hidden hover:border-emerald-500 transition cursor-pointer group snap-start flex flex-col justify-between shadow-xl backdrop-blur-sm"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden">
                      <img src={cam.streamUrl} alt={cam.nama} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent"></div>
                      
                      <div className="absolute top-4 left-4 bg-emerald-600/90 text-white text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1.5 shadow">
                        <span className="w-2 h-2 bg-white rounded-full animate-ping"></span> LIVE STREAMING
                      </div>

                      <div className="absolute top-4 right-4 bg-emerald-950/80 backdrop-blur-md px-2.5 py-1 rounded-xl text-[10px] font-mono text-emerald-300 border border-emerald-700">
                        {cam.fps} FPS
                      </div>
                    </div>

                    <div className="p-6 space-y-2">
                      <h3 className="font-bold text-base text-white group-hover:text-emerald-300 transition">{cam.nama}</h3>
                      <p className="text-xs text-emerald-200/80 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {cam.lokasi}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 border-t border-emerald-800/80 flex justify-between items-center text-xs">
                    <span className="text-emerald-300 font-extrabold flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" /> Status: {cam.status}
                    </span>
                    <span className="text-white font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Perbesar Layar <Maximize2 className="w-3.5 h-3.5 text-emerald-300" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 📰 SECTION MADING & BERITA DESA 📰 */}
        <section id="mading" className="py-20 px-6 max-w-7xl mx-auto space-y-10 animate-fade-in-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-emerald-200 pb-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-emerald-700 tracking-wider uppercase flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-600" /> Informasi Terkini Desa
              </span>
              <h2 className="text-3xl font-black text-slate-900">
                Mading Digital &amp; Berita Konservasi
              </h2>
            </div>
            <p className="text-xs text-slate-600 font-medium max-w-md">
              Kabar seputar program reboisasi, pengolahan air bersih, serta kegiatan warga Kelurahan Pasanggrahan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {listBerita.map((b) => (
              <div 
                key={b.id} 
                onClick={() => setSelectedBerita(b)}
                className="bg-white rounded-[2.5rem] border border-emerald-200 overflow-hidden hover:border-emerald-500 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl group flex flex-col justify-between"
              >
                <div>
                  <div className="h-56 overflow-hidden relative">
                    <img src={b.gambar} alt={b.judul} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <span className="absolute top-4 left-4 text-xs font-extrabold px-3.5 py-1 bg-emerald-700 text-white rounded-full shadow-md">
                      {b.kategori}
                    </span>
                  </div>

                  <div className="p-6 sm:p-8 space-y-3">
                    <span className="text-[10px] font-mono text-slate-400">{b.tanggal} • Oleh {b.penulis}</span>
                    <h3 className="font-black text-lg text-slate-900 group-hover:text-emerald-700 transition">{b.judul}</h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{b.kutipan}</p>
                  </div>
                </div>

                <div className="px-6 sm:px-8 pb-6 pt-3 border-t border-emerald-100 flex justify-between items-center bg-emerald-50/30">
                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                    Baca Selengkapnya <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 🏛️ SECTION APARAT KELURAHAN 🏛️ */}
        <section id="aparat" className="py-20 px-6 bg-emerald-50/50 border-y border-emerald-200">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-extrabold text-emerald-700 tracking-wider uppercase flex items-center justify-center gap-1.5">
                <UserCheck className="w-4 h-4 text-emerald-600" /> Struktur Kepemimpinan
              </span>
              <h2 className="text-3xl font-black text-slate-900">
                Aparat &amp; Pemerintahan Kelurahan
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {listAparat.map((ap) => (
                <div key={ap.id} className="bg-white p-8 rounded-[2.5rem] border border-emerald-200 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-black text-lg text-slate-900">{ap.nama}</h3>
                      <p className="text-xs font-bold text-emerald-700 mt-0.5">{ap.jabatan}</p>
                    </div>
                    <div className="space-y-1 pt-2 text-xs font-mono text-slate-600 border-t border-slate-100">
                      <p>NIP: {ap.nip}</p>
                      <p>Telp: {ap.telepon}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 📝 SECTION LAPORNYA / PENGADUAN 📝 */}
        <section id="lapornya" className="py-20 px-6 max-w-5xl mx-auto">
          <div className="bg-white p-8 sm:p-12 rounded-[3.5rem] border border-emerald-200 shadow-xl space-y-8 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-emerald-100/50 rounded-full blur-2xl pointer-events-none"></div>

            <div className="text-center max-w-lg mx-auto space-y-2">
              <span className="text-xs font-extrabold text-emerald-700 tracking-wider uppercase flex items-center justify-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-600" /> Layanan Pengaduan Warga
              </span>
              <h2 className="text-3xl font-black text-slate-900">
                Lapor Isu Lingkungan &amp; Konservasi
              </h2>
              <p className="text-xs text-slate-600">
                Sampaikan laporan seputar kebersihan mata air, kerusakan hutan, atau saran pembangunan wilayah Pasanggrahan.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Nama Lengkap</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Masukkan nama Anda" 
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    className="w-full bg-slate-50 border border-emerald-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Nomor WhatsApp / HP</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Contoh: 08123456789" 
                    value={formData.hp}
                    onChange={(e) => setFormData({ ...formData, hp: e.target.value })}
                    className="w-full bg-slate-50 border border-emerald-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Kategori Laporan</label>
                  <select 
                    value={formData.kategori}
                    onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                    className="w-full bg-slate-50 border border-emerald-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-semibold"
                  >
                    <option value="Isu Lingkungan / Penebangan Illegal">Isu Lingkungan / Penebangan Illegal</option>
                    <option value="Kebersihan & Sampah Mata Air">Kebersihan &amp; Sampah Mata Air</option>
                    <option value="Infrastruktur & Fasilitas Umum">Infrastruktur &amp; Fasilitas Umum</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Lokasi / RT-RW</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Contoh: Sempadan Sungai RW 02" 
                    value={formData.lokasi}
                    onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                    className="w-full bg-slate-50 border border-emerald-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Isi Laporan / Detail Aduan</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Jelaskan laporan atau keluhan Anda secara rinci..." 
                  value={formData.isi}
                  onChange={(e) => setFormData({ ...formData, isi: e.target.value })}
                  className="w-full bg-slate-50 border border-emerald-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-black py-4 rounded-2xl shadow-lg shadow-emerald-700/20 transition text-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Kirim Laporan Pengaduan Warga
              </button>
            </form>
          </div>
        </section>

      </div>

      {/* ========================================================================= */}
      {/* 🌿 BAGIAN FOOTER YANG TELAH DIPERBARUI & DIPERFESIONALKAN 🌿 */}
      {/* ========================================================================= */}
      <footer className="bg-emerald-950 text-emerald-100 pt-16 pb-12 px-6 border-t border-emerald-900 rounded-t-[3.5rem] mt-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            
            {/* Kolom 1: Profil & Identitas */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <LogoKonservasi />
                <div>
                  <h3 className="font-black text-lg text-white">Desa Pasanggrahan</h3>
                  <p className="text-[10px] text-emerald-300 font-semibold uppercase tracking-wider">Kec. Ujungberung, Kota Bandung</p>
                </div>
              </div>
              <p className="text-xs text-emerald-200/80 leading-relaxed">
                Pusat informasi digital kelurahan yang berfokus pada pelestarian alam lereng Gunung Manglayang, transparansi demografi, Eko-UMKM, dan pemantauan lingkungan berbasis telemetri real-time.
              </p>
              <div className="pt-1 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-[11px] font-mono font-bold text-emerald-300">Sistem Online &amp; EWS Aman</span>
              </div>
            </div>

            {/* Kolom 2: Tautan Cepat */}
            <div className="space-y-4">
              <h4 className="font-black text-sm text-white uppercase tracking-wider flex items-center gap-2 border-b border-emerald-900 pb-2">
                <Compass className="w-4 h-4 text-emerald-400" /> Navigasi Portal
              </h4>
              <ul className="space-y-2.5 text-xs font-semibold text-emerald-200/90">
                <li><a href="#hero" className="hover:text-white transition flex items-center gap-1.5"><ChevronRight className="w-3.5 h-3.5 text-emerald-400" /> Beranda Utama</a></li>
                <li><a href="#profil-alam" className="hover:text-white transition flex items-center gap-1.5"><ChevronRight className="w-3.5 h-3.5 text-emerald-400" /> Profil Alam Manglayang</a></li>
                <li><a href="#wisata" className="hover:text-white transition flex items-center gap-1.5"><ChevronRight className="w-3.5 h-3.5 text-emerald-400" /> Wisata &amp; Curug Cilengkrang</a></li>
                <li><a href="#demografi-real" className="hover:text-white transition flex items-center gap-1.5"><ChevronRight className="w-3.5 h-3.5 text-emerald-400" /> Data Populasi &amp; RTH</a></li>
                <li><a href="#peta" className="hover:text-white transition flex items-center gap-1.5"><ChevronRight className="w-3.5 h-3.5 text-emerald-400" /> Peta &amp; Sensor Telemetri</a></li>
              </ul>
            </div>

            {/* Kolom 3: Layanan & Produk */}
            <div className="space-y-4">
              <h4 className="font-black text-sm text-white uppercase tracking-wider flex items-center gap-2 border-b border-emerald-900 pb-2">
                <Store className="w-4 h-4 text-emerald-400" /> Layanan &amp; Publik
              </h4>
              <ul className="space-y-2.5 text-xs font-semibold text-emerald-200/90">
                <li><a href="#umkm" className="hover:text-white transition flex items-center gap-1.5"><ChevronRight className="w-3.5 h-3.5 text-emerald-400" /> Katalog Eko-UMKM Desa</a></li>
                <li><a href="#cctv" className="hover:text-white transition flex items-center gap-1.5"><ChevronRight className="w-3.5 h-3.5 text-emerald-400" /> Live CCTV Pengawasan</a></li>
                <li><a href="#mading" className="hover:text-white transition flex items-center gap-1.5"><ChevronRight className="w-3.5 h-3.5 text-emerald-400" /> Mading &amp; Berita Konservasi</a></li>
                <li><a href="#aparat" className="hover:text-white transition flex items-center gap-1.5"><ChevronRight className="w-3.5 h-3.5 text-emerald-400" /> Aparat &amp; Pemerintahan</a></li>
                <li><a href="#lapornya" className="hover:text-white transition flex items-center gap-1.5"><ChevronRight className="w-3.5 h-3.5 text-emerald-400" /> Lapor Isu Lingkungan</a></li>
              </ul>
            </div>

            {/* Kolom 4: Kontak Resmi */}
            <div className="space-y-4">
              <h4 className="font-black text-sm text-white uppercase tracking-wider flex items-center gap-2 border-b border-emerald-900 pb-2">
                <Phone className="w-4 h-4 text-emerald-400" /> Kontak &amp; Alamat
              </h4>
              <div className="space-y-3 text-xs text-emerald-200/90 font-medium">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Jl. Pasanggrahan No. 24, Kecamatan Ujungberung, Kota Bandung, Jawa Barat 40615</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>(022) 7801234 / 0812-2345-6789</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>kontak@pasanggrahan.bandung.go.id</span>
                </p>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-emerald-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300 font-medium">
            <p>&copy; 2026 Kelurahan Pasanggrahan, Ujungberung. Seluruh Hak Cipta Dilindungi.</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-[11px]">
                Dibuat dengan <Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" /> untuk Konservasi Manglayang
              </span>
              <button 
                onClick={() => setCurrentView('ADMIN_LOGIN')}
                className="bg-emerald-900/80 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-xl border border-emerald-800 transition text-[11px]"
              >
                Login Admin
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* --- MODAL DETAIL UMKM --- */}
      {selectedUmkm && (
        <div className="fixed inset-0 z-50 bg-emerald-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-[2.5rem] max-w-lg w-full p-6 sm:p-8 space-y-6 relative shadow-2xl border border-emerald-200 animate-pop-in text-slate-800">
            <button 
              onClick={() => setSelectedUmkm(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-emerald-50 text-emerald-900 hover:bg-emerald-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <img src={selectedUmkm.gambar} alt={selectedUmkm.nama} className="w-full h-56 object-cover rounded-2xl shadow-md" />
            
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">{selectedUmkm.kategori}</span>
              <h3 className="text-xl font-black text-slate-900">{selectedUmkm.nama}</h3>
              <p className="text-xs text-slate-500 font-medium">Pengelola: <strong className="text-slate-800">{selectedUmkm.pemilik}</strong> • {selectedUmkm.lokasi}</p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">{selectedUmkm.detailLengkap}</p>

            <div className="flex items-center justify-between pt-2">
              <span className="text-lg font-black text-slate-900">{selectedUmkm.harga}</span>
              <a 
                href={`https://wa.me/${selectedUmkm.wa}?text=Halo%2C%20saya%20tertarik%20membeli%20produk%20${encodeURIComponent(selectedUmkm.nama)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-3 rounded-2xl text-xs flex items-center gap-2 shadow transition"
              >
                <Phone className="w-4 h-4" /> Hubungi Penjual (WhatsApp)
              </a>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL DETAIL BERITA / MADING --- */}
      {selectedBerita && (
        <div className="fixed inset-0 z-50 bg-emerald-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-[2.5rem] max-w-2xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl border border-emerald-200 animate-pop-in text-slate-800 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedBerita(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-emerald-50 text-emerald-900 hover:bg-emerald-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <img src={selectedBerita.gambar} alt={selectedBerita.judul} className="w-full h-64 object-cover rounded-2xl shadow-md" />
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">{selectedBerita.kategori}</span>
                <span className="text-[10px] text-slate-400 font-mono">{selectedBerita.tanggal} • Oleh {selectedBerita.penulis}</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900">{selectedBerita.judul}</h3>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-100 whitespace-pre-line">{selectedBerita.detail}</p>

            <div className="flex justify-end pt-2">
              <button 
                onClick={() => setSelectedBerita(null)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-6 py-2.5 rounded-2xl text-xs transition"
              >
                Tutup Mading
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL DETAIL WISATA --- */}
      {selectedWisata && (
        <div className="fixed inset-0 z-50 bg-emerald-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-[2.5rem] max-w-xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl border border-emerald-200 animate-pop-in text-slate-800 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedWisata(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-emerald-50 text-emerald-900 hover:bg-emerald-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <img src={selectedWisata.gambar} alt={selectedWisata.nama} className="w-full h-60 object-cover rounded-2xl shadow-md" />
            
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold bg-emerald-700 text-white px-3 py-1 rounded-full">{selectedWisata.kategori}</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{selectedWisata.nama}</h3>
              <p className="text-xs text-emerald-800 font-mono font-bold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {selectedWisata.lokasi}
              </p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-emerald-50/40 p-4 rounded-2xl border border-emerald-100">{selectedWisata.deskripsi}</p>

            <div className="space-y-2">
              <h4 className="text-xs font-black text-slate-900 uppercase">Fitur &amp; Keunggulan Wisata:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedWisata.fiturUtama.map((f, idx) => (
                  <div key={idx} className="text-xs font-bold bg-white border border-emerald-200 p-2.5 rounded-xl flex items-center gap-2">
                    {f.icon} {f.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-xs font-black text-slate-900">Tiket Masuk: {selectedWisata.hargaTiket}</span>
              <button 
                onClick={() => setSelectedWisata(null)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-2.5 rounded-2xl text-xs transition shadow"
              >
                Tutup Info
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL CCTV LIVE --- */}
      {selectedCCTVModal && (
        <div className="fixed inset-0 z-50 bg-emerald-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-emerald-900 rounded-[3rem] max-w-2xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl border border-emerald-700 animate-pop-in text-white">
            <button 
              onClick={() => setSelectedCCTVModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-emerald-800 text-white hover:bg-emerald-700 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-600 rounded-full animate-ping"></span>
              <span className="text-xs font-black tracking-wider uppercase text-emerald-300">Live Streaming Kamera Konservasi</span>
            </div>

            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-emerald-700 shadow-inner">
              <img src={selectedCCTVModal.streamUrl} alt={selectedCCTVModal.nama} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 bg-emerald-950/80 backdrop-blur-md p-3 rounded-xl border border-emerald-700 text-xs font-mono flex justify-between items-center">
                <span>FPS: {selectedCCTVModal.fps}</span>
                <span>STATUS: {selectedCCTVModal.status}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black">{selectedCCTVModal.nama}</h3>
              <p className="text-xs text-emerald-200/90 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {selectedCCTVModal.lokasi}
              </p>
              <p className="text-xs text-emerald-100 bg-emerald-950/60 p-3 rounded-xl border border-emerald-800">
                {selectedCCTVModal.deskripsi}
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button 
                onClick={() => setSelectedCCTVModal(null)}
                className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-6 py-2.5 rounded-2xl text-xs transition shadow"
              >
                Tutup Monitor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL TAMBAH WARGA (ADMIN) --- */}
      {showAddWargaModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border">
            <h3 className="font-bold text-lg text-slate-900">Tambah Data Warga Baru</h3>
            <form onSubmit={handleAddWarga} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">NIK</label>
                <input type="text" placeholder="327301..." value={newWarga.nik} onChange={(e) => setNewWarga({ ...newWarga, nik: e.target.value })} className="w-full border p-2.5 rounded-xl" />
              </div>
              <div>
                <label className="block font-bold mb-1">Nama Lengkap</label>
                <input type="text" required placeholder="Nama warga" value={newWarga.nama} onChange={(e) => setNewWarga({ ...newWarga, nama: e.target.value })} className="w-full border p-2.5 rounded-xl" />
              </div>
              <div>
                <label className="block font-bold mb-1">RT / RW</label>
                <input type="text" placeholder="RT 01 / RW 01" value={newWarga.rtRw} onChange={(e) => setNewWarga({ ...newWarga, rtRw: e.target.value })} className="w-full border p-2.5 rounded-xl" />
              </div>
              <div>
                <label className="block font-bold mb-1">Usia</label>
                <input type="number" required placeholder="25" value={newWarga.usia} onChange={(e) => setNewWarga({ ...newWarga, usia: Number(e.target.value) })} className="w-full border p-2.5 rounded-xl" />
              </div>
              <div>
                <label className="block font-bold mb-1">Status Bantuan</label>
                <select value={newWarga.statusBantuan} onChange={(e) => setNewWarga({ ...newWarga, statusBantuan: e.target.value as any })} className="w-full border p-2.5 rounded-xl font-bold">
                  <option value="Non-Bantuan">Non-Bantuan</option>
                  <option value="Penerima PKH">Penerima PKH</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddWargaModal(false)} className="px-4 py-2 bg-slate-200 rounded-xl font-bold">Batal</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL TAMBAH UMKM (ADMIN) --- */}
      {showAddUmkmModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-lg text-slate-900">Tambah Produk Eko-UMKM</h3>
            <form onSubmit={handleAddUmkm} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Nama Produk</label>
                <input type="text" required placeholder="Kopi Arabika..." value={newUmkm.nama} onChange={(e) => setNewUmkm({ ...newUmkm, nama: e.target.value })} className="w-full border p-2.5 rounded-xl" />
              </div>
              <div>
                <label className="block font-bold mb-1">Nama Pemilik / Kelompok</label>
                <input type="text" required placeholder="Kelompok Tani..." value={newUmkm.pemilik} onChange={(e) => setNewUmkm({ ...newUmkm, pemilik: e.target.value })} className="w-full border p-2.5 rounded-xl" />
              </div>
              <div>
                <label className="block font-bold mb-1">No WhatsApp</label>
                <input type="text" required placeholder="6281234567890" value={newUmkm.wa} onChange={(e) => setNewUmkm({ ...newUmkm, wa: e.target.value })} className="w-full border p-2.5 rounded-xl" />
              </div>
              <div>
                <label className="block font-bold mb-1">Kategori</label>
                <input type="text" placeholder="Hasil Hutan Non-Kayu" value={newUmkm.kategori} onChange={(e) => setNewUmkm({ ...newUmkm, kategori: e.target.value })} className="w-full border p-2.5 rounded-xl" />
              </div>
              <div>
                <label className="block font-bold mb-1">Harga</label>
                <input type="text" required placeholder="Rp 45.000 / 250gr" value={newUmkm.harga} onChange={(e) => setNewUmkm({ ...newUmkm, harga: e.target.value })} className="w-full border p-2.5 rounded-xl" />
              </div>
              <div>
                <label className="block font-bold mb-1">Lokasi</label>
                <input type="text" placeholder="Pasanggrahan RW 02" value={newUmkm.lokasi} onChange={(e) => setNewUmkm({ ...newUmkm, lokasi: e.target.value })} className="w-full border p-2.5 rounded-xl" />
              </div>
              <div>
                <label className="block font-bold mb-1">Deskripsi Singkat</label>
                <textarea rows={2} placeholder="Deskripsi..." value={newUmkm.deskripsi} onChange={(e) => setNewUmkm({ ...newUmkm, deskripsi: e.target.value })} className="w-full border p-2.5 rounded-xl resize-none"></textarea>
              </div>
              <div>
                <label className="block font-bold mb-1">Detail Lengkap</label>
                <textarea rows={3} placeholder="Penjelasan lengkap..." value={newUmkm.detailLengkap} onChange={(e) => setNewUmkm({ ...newUmkm, detailLengkap: e.target.value })} className="w-full border p-2.5 rounded-xl resize-none"></textarea>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddUmkmModal(false)} className="px-4 py-2 bg-slate-200 rounded-xl font-bold">Batal</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold">Simpan Produk</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL TAMBAH BERITA (ADMIN) --- */}
      {showAddBeritaModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-lg text-slate-900">Tambah Berita / Mading Baru</h3>
            <form onSubmit={handleAddBerita} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Judul Berita</label>
                <input type="text" required placeholder="Judul kegiatan..." value={newBerita.judul} onChange={(e) => setNewBerita({ ...newBerita, judul: e.target.value })} className="w-full border p-2.5 rounded-xl" />
              </div>
              <div>
                <label className="block font-bold mb-1">Kategori</label>
                <input type="text" placeholder="Reboisasi & Konservasi" value={newBerita.kategori} onChange={(e) => setNewBerita({ ...newBerita, kategori: e.target.value })} className="w-full border p-2.5 rounded-xl" />
              </div>
              <div>
                <label className="block font-bold mb-1">Kutipan Singkat</label>
                <textarea rows={2} placeholder="Kutipan..." value={newBerita.kutipan} onChange={(e) => setNewBerita({ ...newBerita, kutipan: e.target.value })} className="w-full border p-2.5 rounded-xl resize-none"></textarea>
              </div>
              <div>
                <label className="block font-bold mb-1">Detail Berita</label>
                <textarea rows={4} placeholder="Isi detail berita..." value={newBerita.detail} onChange={(e) => setNewBerita({ ...newBerita, detail: e.target.value })} className="w-full border p-2.5 rounded-xl resize-none"></textarea>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddBeritaModal(false)} className="px-4 py-2 bg-slate-200 rounded-xl font-bold">Batal</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold">Publikasikan</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default PublicPortal;