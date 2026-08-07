import React, { useState, useEffect } from 'react';
import { 
  Trees, Leaf, Shield, MapPin, Users, Video, 
  ChevronRight, Send, X, Phone, Mail,
  Store, UserCheck, Download, Plus, Trash2, 
  LayoutDashboard, FileText, Lock, ArrowLeft,
  Sprout, Mountain, Droplets, Camera, ShoppingBag, Calendar, User,
  Home, Menu, Eye, Compass, Globe, Waves, Sparkles, Maximize2, Play,
  ArrowUp, Sun, Wind, CloudRain, Flower2, Bird, ShieldCheck, Cloud
} from 'lucide-react';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';

// --- STYLES ANIMASI INLINE CSS ---
const AnimationStyles = () => (
  <style>{`
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(24px);
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
    @keyframes floatSlow {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
    @keyframes pulseGlow {
      0%, 100% { opacity: 0.4; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.05); }
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .animate-fade-in {
      animation: fadeIn 0.5s ease-out forwards;
    }
    .animate-float {
      animation: floatSlow 4s ease-in-out infinite;
    }
    .animate-pulse-glow {
      animation: pulseGlow 3s ease-in-out infinite;
    }
    /* Hide scrollbar for Chrome, Safari and Opera */
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    /* Hide scrollbar for IE, Edge and Firefox */
    .no-scrollbar {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
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
}

interface CCTVPoint {
  id: number;
  nama: string;
  lokasi: string;
  status: 'ONLINE' | 'OFFLINE';
  streamUrl: string;
  deskripsi: string;
  fps: number;
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

// --- ORNAMEN DEKORATIF VEKTOR DAUN ORGANIK ---
const LeafVectorShape = ({ className = "w-12 h-12 text-emerald-400 opacity-20" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M50 5 C20 20, 5 45, 10 75 C15 90, 35 98, 50 95 C65 98, 85 90, 90 75 C95 45, 80 20, 50 5 Z M50 95 L50 25 M35 45 L50 35 M65 60 L50 50 M35 75 L50 65" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const OrganicBlobBg = () => (
  <svg className="absolute -z-10 top-0 right-0 w-96 h-96 opacity-15 pointer-events-none text-emerald-600 animate-float" viewBox="0 0 200 200">
    <path fill="currentColor" d="M38.1,-52.1C49.1,-43.3,57.7,-31.8,61.8,-18.8C65.8,-5.8,65.3,8.7,60.1,21.8C54.8,34.8,44.9,46.4,32.4,54.2C19.9,62,4.8,66,-10.8,66.8C-26.4,67.6,-42.5,65.2,-53.8,55.9C-65,46.6,-71.4,30.4,-72.1,14.3C-72.8,-1.8,-67.8,-17.8,-59.2,-31.2C-50.6,-44.6,-38.4,-55.4,-24.9,-60.1C-11.4,-64.8,3.4,-63.4,18.1,-59.6C32.8,-55.8,27.1,-60.9,38.1,-52.1Z" transform="translate(100 100)" />
  </svg>
);

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
  jumlahKK: 6420,
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

// --- DATA DESTINASI WISATA MANGLAYANG & WISATA AIR REAL ---
const INITIAL_WISATA: TempatWisata[] = [
  {
    id: 1,
    nama: 'Curug Cilengkrang (Wisata Air Manglayang)',
    kategori: 'Wisata Air & Waterfall',
    lokasi: 'Kaki Gunung Manglayang, Sektor Pasanggrahan',
    hargaTiket: 'Rp 10.000 / Orang',
    gambar: '/curug-cilengkrang-bandung.jpg',
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
    lokasi: 'Lereng Timur Gunung Manglayang',
    hargaTiket: 'Rp 15.000 / Orang',
    gambar: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop',
    deskripsi: 'Kawasan konservasi hutan pinus rindang dengan ikon batu megah menyerupai kuda. Tempat favorit warga Bandung untuk camping, hammock-an, dan menikmati udara segar bebas polusi.',
    fiturUtama: [
      { label: 'Camping Ground Hutan Pinus', icon: <Trees className="w-3.5 h-3.5 text-emerald-600" /> },
      { label: 'Udara Pegunungan Segar', icon: <Wind className="w-3.5 h-3.5 text-teal-500" /> },
      { label: 'Sewa Hammock & Tenda', icon: <Sprout className="w-3.5 h-3.5 text-teal-600" /> },
      { label: 'Situs Batu Kuda Bersejarah', icon: <Mountain className="w-3.5 h-3.5 text-slate-700" /> }
    ]
  },
  {
    id: 3,
    nama: 'Wisata Alam Gunung Manglayang (1818 mdpl)',
    kategori: 'Pegunungan & Camping Ground',
    lokasi: 'Desa Pasanggrahan, Ujungberung, Bandung',
    hargaTiket: 'Rp 15.000 / Orang',
    gambar: '/gunung-manglayang.jpg',
    deskripsi: 'Pemandangan indah pegunungan yang asri dengan udara sejuk dan area camping favorit warga Bandung.',
    fiturUtama: [
      { label: 'Hutan Hujan Tropis', icon: <Trees className="w-3.5 h-3.5 text-emerald-700" /> },
      { label: 'Jalur Pendakian Asri', icon: <Mountain className="w-3.5 h-3.5 text-emerald-600" /> },
      { label: 'Lanskap Kota Bandung', icon: <Globe className="w-3.5 h-3.5 text-blue-500" /> },
      { label: 'Flora Endemik Pegunungan', icon: <Flower2 className="w-3.5 h-3.5 text-rose-500" /> }
    ]
  },
  {
    id: 4,
    nama: 'Bukit Papanggungan Manglayang',
    kategori: 'Perbukitan & Sunrise Point',
    lokasi: 'Kawasan Pasanggrahan, Ujungberung, Bandung',
    hargaTiket: 'Gratis / Parkir Saja',
    gambar: '/Bukit-Papanggungan.jpg',
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
    judul: 'Penanaman 5.000 Bibit Pohon di Kaki Gunung Manglayang',
    kutipan: 'Pemerintah Kelurahan Pasanggrahan bersama komunitas pegiat lingkungan menggelar aksi penanaman pohon masal.',
    detail: 'Kegiatan penanaman pohon ini melibatkan lebih dari 300 warga lokal dan relawan lingkungan. Spesies pohon yang ditanam meliputi Mahoni, Suren, dan Kopi Arabika yang memiliki daya serap air tinggi.',
    tanggal: '05 Agustus 2026',
    penulis: 'Tim Konservasi Desa',
    gambar: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    kategori: 'Pengelolaan Mata Air Manglayang ',
    judul: 'Layanan Pasokan Air Bersih & Depot',
    kutipan: 'Menuju Desa Zero Waste, warga mengolah sampah dapur menjadi pupuk organik cair dan pupuk kompos bernilai tinggi.',
    detail: 'Program pengelolaan air bersih berbasis sumber daya alam Gunung manglayang ini menyediakan pasokan air higienis untuk kebutuhan depot isi ulang dan warga. Air dialirkan dan diproses secara higienis melalui pipa bertekanan tinggi untuk menjaga mutu serta kesegarannya.',
    tanggal: '07 Agustus 2026',
    penulis: 'Tim Distribusi Air Manglayang',
    gambar: '/Pengolahan-air.jpg'
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
    lokasi: 'Lereng Manglayang RW 02',
    gambar: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500',
    deskripsi: 'Kopi dipanen dari sistem tumpangsari konservasi pohon hutan, membantu menjaga kerapatan pohon.',
    detailLengkap: 'Kopi Arabika murni 100% dipetik dari tanaman kopi yang ditanam bersama vegetasi hutan lindung Gunung Manglayang.'
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
    detailLengkap: 'Bibit tanaman berukuran 40-60cm dalam polybag siap tanam. Bebas pestisida kimia dan dibudidayakan secara organik.'
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
    detailLengkap: 'Dihasilkan dari fermentasi limbah organik dapur warga dan kotoran ternak dengan formula starter mikrobiologi.'
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
    lng: 107.7121
  },
  {
    id: 2,
    nama: 'Zona Konservasi Lereng Manglayang',
    kategori: 'Wisata',
    alamat: 'Kawasan Kaki Gunung Manglayang RW 05, Pasanggrahan',
    deskripsi: 'Area utama reboisasi masal, sabuk hijau pencegah erosi, dan jalur edutrip ekologi.',
    sektor: 'Sektor 2: Area Konservasi Hutan',
    lat: -6.8920,
    lng: 107.7210
  },
  {
    id: 3,
    nama: 'Sentra Pembibitan & Eko-UMKM RW 03',
    kategori: 'Kuliner',
    alamat: 'Jl. Cilengkrang 1, Pasanggrahan, Ujungberung',
    deskripsi: 'Pusat budidaya bibit mahoni, suren, serta olahan Kopi Arabika Manglayang.',
    sektor: 'Sektor 3: Pekarangan Warga & Eko-UMKM',
    lat: -6.9085,
    lng: 107.7155
  }
];

// --- 5 TITIK CCTV REAL LENGKAP DENGAN GAMBAR DISESUAIKAN POIN WEBSITE ---
const INITIAL_CCTV: CCTVPoint[] = [
  { 
    id: 1, 
    nama: 'CCTV 01 - Pos Pantau Gunung Manglayang', 
    lokasi: 'Jalur Pendakian & Lereng Manglayang RW 05', 
    status: 'ONLINE', 
    streamUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop',
    deskripsi: 'Memantau tutupan vegetasi hutan hujan tropis Gunung Manglayang, kerapatan pohon reboisasi, dan aktivitas pendaki.',
    fps: 30
  },
  { 
    id: 2, 
    nama: 'CCTV 02 - Wisata Air Curug Cilengkrang', 
    lokasi: 'Kawasan Wisata Air & Stream Curug Cilengkrang', 
    status: 'ONLINE', 
    streamUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&auto=format&fit=crop',
    deskripsi: 'Monitoring debit air terjun alami, kejernihan hulu sungai Manglayang, serta keselamatan pengunjung wisata air.',
    fps: 60
  },
  { 
    id: 3, 
    nama: 'CCTV 03 - Kantor Kelurahan Pasanggrahan', 
    lokasi: 'Jl. Pasanggrahan No. 24, Ujungberung', 
    status: 'ONLINE', 
    streamUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop',
    deskripsi: 'Pemantauan area pelayanan publik kantor kelurahan, keamanan gerbang utama, dan arus lalu lintas warga.',
    fps: 25
  },
  { 
    id: 4, 
    nama: 'CCTV 04 - Sentra Eko-UMKM & Pembibitan', 
    lokasi: 'Kawasan Galeri UMKM & Kebun Bibit RW 03', 
    status: 'ONLINE', 
    streamUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop',
    deskripsi: 'Pengawasan kebun pembibitan mahoni/suren, komposting mandiri, serta aktivitas transaksi produk Eko-UMKM.',
    fps: 30
  },
  { 
    id: 5, 
    nama: 'CCTV 05 - Posko Sumber Pengolahan Sumber Mata Air', 
    lokasi: 'Mata air manglayang, Bandung Timur', 
    status: 'ONLINE', 
    streamUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop',
    deskripsi: 'Monitoring kondisi debit resapan mata air pegunungan, kerapatan lubang biopori, dan kebersihan lingkungan sekitar.',
    fps: 24
  }
];

export function PublicPortal() {
  const [currentView, setCurrentView] = useState<'PUBLIC' | 'ADMIN_LOGIN' | 'ADMIN_DASHBOARD'>('PUBLIC');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State Scroll To Top
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin Login State
  const [adminUsername, setAdminUsername] = useState<string>('');
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  // Admin Active Tab State
  const [adminActiveTab, setAdminActiveTab] = useState<
    'dashboard' | 'demografi' | 'umkm' | 'pengaduan' | 'cctv' | 'berita' | 'aparat' | 'pengaturan'
  >('dashboard');

  // DATA STATES
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

  // Selected Item Modals
  const [selectedUmkm, setSelectedUmkm] = useState<EkoUmkmItem | null>(null);
  const [selectedBerita, setSelectedBerita] = useState<BeritaKonservasi | null>(null);
  const [selectedWisata, setSelectedWisata] = useState<TempatWisata | null>(null);
  const [selectedCCTVModal, setSelectedCCTVModal] = useState<CCTVPoint | null>(null);

  const [activeLocation, setActiveLocation] = useState<LocationPin>(LOKASI_PASANGGRAHAN[0]);

  // Form Pengaduan Public State
  const [formData, setFormData] = useState({ nama: '', hp: '', kategori: 'Isu Lingkungan / Penebangan Illegal', lokasi: '', isi: '' });

  // Modals Input States
  const [showAddWargaModal, setShowAddWargaModal] = useState(false);
  const [newWarga, setNewWarga] = useState({ nik: '', nama: '', rtRw: 'RT 01 / RW 01', usia: 25, statusBantuan: 'Non-Bantuan' as const });

  const [showAddUmkmModal, setShowAddUmkmModal] = useState(false);
  const [newUmkm, setNewUmkm] = useState({ nama: '', pemilik: '', wa: '', kategori: 'Hasil Hutan Non-Kayu', harga: '', lokasi: '', deskripsi: '', detailLengkap: '', gambar: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500' });

  const [showAddBeritaModal, setShowAddBeritaModal] = useState(false);
  const [newBerita, setNewBerita] = useState({ judul: '', kategori: 'Kegiatan Desa', kutipan: '', detail: '', penulis: 'Admin Desa', gambar: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop' });

  // Handle Admin Login Action
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUsername === 'admin' && adminPassword === 'pasanggrahan2026') {
      setCurrentView('ADMIN_DASHBOARD');
      setLoginError('');
    } else {
      setLoginError('Username atau Password Admin Salah!');
    }
  };

  // Handle Pengaduan Submit
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

  // Admin Actions
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
    setNewUmkm({ nama: '', pemilik: '', wa: '', kategori: 'Hasil Hutan Non-Kayu', harga: '', lokasi: '', deskripsi: '', detailLengkap: '', gambar: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500' });
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
  // VIEW 1: DEDICATED ADMIN LOGIN PAGE
  // =========================================================================
  if (currentView === 'ADMIN_LOGIN') {
    return (
      <div className="min-h-screen bg-emerald-950/5 flex flex-col justify-center items-center p-6 relative font-sans text-slate-800 overflow-hidden">
        <AnimationStyles />
        <OrganicBlobBg />
        <button 
          onClick={() => setCurrentView('PUBLIC')}
          className="absolute top-8 left-8 bg-white hover:bg-emerald-50 text-emerald-900 font-bold px-4 py-2.5 rounded-2xl border border-emerald-200 shadow-sm transition flex items-center gap-2 text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Portal Warga
        </button>

        <div className="bg-white/90 backdrop-blur-xl rounded-[3rem] p-8 sm:p-10 max-w-md w-full shadow-2xl border border-emerald-200 space-y-6 relative overflow-hidden animate-fade-in-up">
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
                  <Video className="w-4 h-4 text-emerald-700" /> CCTV Konservasi (5 Titik)
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
            {/* TAB DASHBOARD */}
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

            {/* TAB DEMOGRAFI */}
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

            {/* TAB UMKM */}
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

            {/* TAB PENGADUAN, CCTV, BERITA */}
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

        {/* MODAL TAMBAH WARGA */}
        {showAddWargaModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
              <button onClick={() => setShowAddWargaModal(false)} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full">
                <X className="w-4 h-4" />
              </button>
              <h3 className="text-lg font-black text-slate-900">Tambah Data Demografi Warga</h3>
              <form onSubmit={handleAddWarga} className="space-y-3">
                <input type="text" placeholder="NIK (16 digit)" required value={newWarga.nik} onChange={(e) => setNewWarga({...newWarga, nik: e.target.value})} className="w-full bg-slate-50 border rounded-2xl p-3 text-xs" />
                <input type="text" placeholder="Nama Lengkap" required value={newWarga.nama} onChange={(e) => setNewWarga({...newWarga, nama: e.target.value})} className="w-full bg-slate-50 border rounded-2xl p-3 text-xs" />
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" placeholder="RT / RW" required value={newWarga.rtRw} onChange={(e) => setNewWarga({...newWarga, rtRw: e.target.value})} className="w-full bg-slate-50 border rounded-2xl p-3 text-xs" />
                  <input type="number" placeholder="Usia (Tahun)" required value={newWarga.usia} onChange={(e) => setNewWarga({...newWarga, usia: Number(e.target.value)})} className="w-full bg-slate-50 border rounded-2xl p-3 text-xs" />
                </div>
                <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-2xl text-xs">Simpan Data Warga</button>
              </form>
            </div>
          </div>
        )}

        {/* MODAL TAMBAH UMKM */}
        {showAddUmkmModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
              <button onClick={() => setShowAddUmkmModal(false)} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full">
                <X className="w-4 h-4" />
              </button>
              <h3 className="text-lg font-black text-slate-900">Tambah Produk Eko-UMKM</h3>
              <form onSubmit={handleAddUmkm} className="space-y-3">
                <input type="text" placeholder="Nama Produk" required value={newUmkm.nama} onChange={(e) => setNewUmkm({...newUmkm, nama: e.target.value})} className="w-full bg-slate-50 border rounded-2xl p-3 text-xs" />
                <input type="text" placeholder="Pemilik / Kelompok" required value={newUmkm.pemilik} onChange={(e) => setNewUmkm({...newUmkm, pemilik: e.target.value})} className="w-full bg-slate-50 border rounded-2xl p-3 text-xs" />
                <input type="text" placeholder="Harga" required value={newUmkm.harga} onChange={(e) => setNewUmkm({...newUmkm, harga: e.target.value})} className="w-full bg-slate-50 border rounded-2xl p-3 text-xs" />
                <textarea placeholder="Ringkasan Produk..." required value={newUmkm.deskripsi} onChange={(e) => setNewUmkm({...newUmkm, deskripsi: e.target.value})} className="w-full bg-slate-50 border rounded-2xl p-3 text-xs" />
                <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-2xl text-xs">Simpan Produk</button>
              </form>
            </div>
          </div>
        )}

        {/* MODAL TAMBAH BERITA */}
        {showAddBeritaModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
              <button onClick={() => setShowAddBeritaModal(false)} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full">
                <X className="w-4 h-4" />
              </button>
              <h3 className="text-lg font-black text-slate-900">Tambah Mading / Berita</h3>
              <form onSubmit={handleAddBerita} className="space-y-3">
                <input type="text" placeholder="Judul" required value={newBerita.judul} onChange={(e) => setNewBerita({...newBerita, judul: e.target.value})} className="w-full bg-slate-50 border rounded-2xl p-3 text-xs" />
                <input type="text" placeholder="Kategori" required value={newBerita.kategori} onChange={(e) => setNewBerita({...newBerita, kategori: e.target.value})} className="w-full bg-slate-50 border rounded-2xl p-3 text-xs" />
                <textarea placeholder="Ringkasan Ringkas..." required value={newBerita.kutipan} onChange={(e) => setNewBerita({...newBerita, kutipan: e.target.value})} className="w-full bg-slate-50 border rounded-2xl p-3 text-xs" />
                <textarea placeholder="Detail Lengkap..." required value={newBerita.detail} onChange={(e) => setNewBerita({...newBerita, detail: e.target.value})} className="w-full bg-slate-50 border rounded-2xl p-3 text-xs" />
                <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-2xl text-xs">Publikasikan</button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW 3: PUBLIC LANDING PAGE (UI KONSERVASI & MAP REAL UJUNGBERUNG)
  // =========================================================================
  return (
    <div className="scroll-smooth min-h-screen bg-[#f8faf7] text-slate-800 font-sans flex flex-col justify-between selection:bg-emerald-500 selection:text-white relative overflow-x-clip">
      <AnimationStyles />
      <OrganicBlobBg />

      <div>
        {/* NAVBAR UTAMA DENGAN ELEMEN KONSERVASI & HIASAN ALAM */}
        <nav className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-emerald-100 px-4 sm:px-6 py-3.5 shadow-sm transition-all duration-300">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <LogoKonservasi />
              <div>
                <h1 className="font-black text-base sm:text-lg leading-tight text-emerald-950 flex items-center gap-1.5">
                  Desa Pasanggrahan <Leaf className="w-4 h-4 text-emerald-500 fill-emerald-500 inline shrink-0 animate-pulse" />
                </h1>
                <p className="text-[10px] text-emerald-700 font-bold tracking-wider uppercase flex items-center gap-1">
                  <Trees className="w-3 h-3 text-emerald-600 inline" /> Kec. Ujungberung, Kota Bandung
                </p>
              </div>
            </div>
            
            {/* Navigasi Desktop */}
            <div className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-700">
              <a href="#hero" className="hover:text-emerald-600 transition flex items-center gap-1">
                <Sun className="w-3.5 h-3.5 text-amber-500" /> Beranda
              </a>
              <a href="#wisata" className="hover:text-emerald-600 transition flex items-center gap-1 text-emerald-800">
                <Waves className="w-3.5 h-3.5 text-teal-600" /> Wisata &amp; Curug
              </a>
              <a href="#demografi-real" className="hover:text-emerald-600 transition flex items-center gap-1">
                <Sprout className="w-3.5 h-3.5 text-emerald-600" /> Populasi
              </a>
              <a href="#peta" className="hover:text-emerald-600 transition flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Pemetaan Map
              </a>
              <a href="#umkm" className="hover:text-emerald-600 transition flex items-center gap-1">
                <Flower2 className="w-3.5 h-3.5 text-emerald-600" /> Eko-UMKM
              </a>
              <a href="#cctv" className="hover:text-emerald-600 transition flex items-center gap-1">
                <Camera className="w-3.5 h-3.5 text-emerald-600" /> CCTV LIVE
              </a>
              <a href="#lapor" className="hover:text-emerald-600 transition flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Lapor
              </a>
              
              <button 
                onClick={() => setCurrentView('ADMIN_LOGIN')}
                className="bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white px-4.5 py-2.5 rounded-2xl transition shadow-md hover:shadow-emerald-700/20 flex items-center gap-1.5 font-extrabold ml-2"
              >
                <LayoutDashboard className="w-3.5 h-3.5" /> Portal Admin
              </button>
            </div>

            {/* Tombol Mobile */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-2xl bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100 transition"
              aria-label="Toggle Menu Mobile"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Menu Dropdown Mobile */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-3 pt-3 border-t border-emerald-100 flex flex-col space-y-3 px-2 pb-3 font-extrabold text-slate-700 text-sm bg-white/95 rounded-3xl p-4 shadow-xl animate-fade-in-up">
              <a href="#hero" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-500" /> Beranda
              </a>
              <a href="#wisata" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-800 text-teal-800 flex items-center gap-2">
                <Waves className="w-4 h-4 text-teal-600" /> Wisata Air &amp; Curug Manglayang
              </a>
              <a href="#demografi-real" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-2">
                <Sprout className="w-4 h-4 text-emerald-600" /> Populasi &amp; Demografi
              </a>
              <a href="#peta" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" /> Peta Real Pasanggrahan
              </a>
              <a href="#umkm" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-2">
                <Flower2 className="w-4 h-4 text-emerald-600" /> Katalog Eko-UMKM
              </a>
              <a href="#cctv" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-600" /> CCTV Pantauan (5 Titik)
              </a>
              <a href="#lapor" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Lapor Isu Lingkungan
              </a>
              <button 
                onClick={() => { setIsMobileMenuOpen(false); setCurrentView('ADMIN_LOGIN'); }}
                className="w-full text-center bg-emerald-800 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 shadow"
              >
                <LayoutDashboard className="w-4 h-4" /> Masuk Portal Admin
              </button>
            </div>
          )}
        </nav>

        {/* HERO SECTION DENGAN IKON & DEKORASI KONSERVASI ALAM LENGKAP */}
        <section 
          id="hero" 
          className="relative py-24 lg:py-36 px-6 overflow-hidden bg-cover bg-center text-slate-900 rounded-b-[3.5rem] shadow-2xl animate-fade-in"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(6, 78, 59, 0.88), rgba(4, 47, 38, 0.96)), url('https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&auto=format&fit=crop')`,
          }}
        >
          {/* Aksesoris Vektor Organik & Floating Icons Alam */}
          <div className="absolute top-6 left-6 pointer-events-none">
            <LeafVectorShape className="w-32 h-32 text-emerald-400/25 animate-float" />
          </div>
          <div className="absolute bottom-6 right-6 pointer-events-none rotate-180">
            <LeafVectorShape className="w-40 h-40 text-teal-300/25 animate-float" />
          </div>

          <div className="absolute top-12 right-16 hidden lg:flex items-center gap-2 bg-emerald-900/60 backdrop-blur-md border border-emerald-400/30 px-3.5 py-1.5 rounded-full text-emerald-200 text-xs font-semibold animate-pulse-glow">
            <Bird className="w-4 h-4 text-amber-300" /> Habitat Satwa Lindung
          </div>
          <div className="absolute bottom-16 left-16 hidden lg:flex items-center gap-2 bg-teal-900/60 backdrop-blur-md border border-teal-400/30 px-3.5 py-1.5 rounded-full text-teal-200 text-xs font-semibold animate-pulse-glow">
            <Wind className="w-4 h-4 text-cyan-300" /> Udara Bersih Pegunungan
          </div>

          <div className="relative max-w-7xl mx-auto text-center space-y-6 z-10 animate-fade-in-up">
            <div className="flex justify-center items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/25 border border-emerald-400/40 text-emerald-200 text-xs font-bold backdrop-blur-md shadow-inner">
                <Trees className="w-4 h-4 text-emerald-300" /> Kawasan Konservasi Gunung Manglayang
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-teal-500/25 border border-teal-400/40 text-teal-200 text-xs font-bold backdrop-blur-md">
                <Droplets className="w-3.5 h-3.5 text-cyan-300" /> Resapan Air Ujungberung
              </span>
            </div>

            <h1 className="text-3xl sm:text-6xl font-black tracking-tight leading-tight text-white">
              Harmoni Konservasi &amp; Ekosistem<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400 flex items-center justify-center gap-3">
                <Sprout className="w-8 h-8 sm:w-12 sm:h-12 text-emerald-400 inline" /> Kelurahan Pasanggrahan
              </span>
            </h1>

            <p className="text-emerald-100 text-xs sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
              Portal Terpadu Desa Pasanggrahan, Ujungberung. Menjelajahi keindahan alami Curug Cilengkrang, tutupan hutan Gunung Manglayang, pemberdayaan Eko-UMKM, serta pemantauan live CCTV.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a href="#wisata" className="bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-black px-7 py-3.5 rounded-2xl transition-all duration-300 text-xs uppercase tracking-wider shadow-lg hover:shadow-emerald-400/20 flex items-center gap-2 transform hover:-translate-y-1">
                <Waves className="w-4 h-4" /> Wisata &amp; Curug Manglayang
              </a>
              <a href="#cctv" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-7 py-3.5 rounded-2xl transition-all duration-300 text-xs uppercase tracking-wider backdrop-blur-md flex items-center gap-2 transform hover:-translate-y-1">
                <Camera className="w-4 h-4" /> Pantau CCTV Live 
              </a>
            </div>
          </div>
        </section>

        {/* SECTION DESTINASI WISATA REAL GUNUNG MANGLAYANG & WISATA AIR */}
        <section id="wisata" className="py-20 px-6 max-w-7xl mx-auto space-y-12 animate-fade-in-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-emerald-100 pb-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-teal-700 tracking-wider uppercase flex items-center gap-1.5">
                <Waves className="w-4 h-4 text-teal-600" /> Ekosistem Air Terjun &amp; Gunung Manglayang
              </span>
              <h2 className="text-3xl font-black text-slate-900 flex items-center gap-2">
                Tempat Wisata Alam &amp; Curug di Pasanggrahan <Flower2 className="w-6 h-6 text-emerald-600" />
              </h2>
            </div>
            <p className="text-xs text-slate-500 font-medium max-w-md">
              Gunung Manglayang kaya akan hulu air jernih dan **Wisata Air Curug Cilengkrang** (6 tingkatan air terjun alami) serta kawasan camping hutan pinus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {listWisata.map((w) => (
              <div 
                key={w.id} 
                onClick={() => setSelectedWisata(w)}
                className="bg-white rounded-[2.8rem] border border-emerald-100 overflow-hidden hover:border-emerald-500 hover:shadow-2xl cursor-pointer transition-all duration-500 group flex flex-col justify-between"
              >
                <div>
                  <div className="h-64 overflow-hidden relative">
                    <img src={w.gambar} alt={w.nama} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                    <span className="absolute top-4 left-4 text-xs font-extrabold px-3.5 py-1 bg-emerald-600/90 backdrop-blur-md text-white rounded-full shadow-md flex items-center gap-1">
                      <Trees className="w-3.5 h-3.5 text-emerald-200" /> {w.kategori}
                    </span>
                    <span className="absolute bottom-4 left-4 text-xs font-mono font-bold text-emerald-200 flex items-center gap-1 bg-slate-900/60 backdrop-blur-sm px-3 py-1 rounded-full">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {w.lokasi}
                    </span>
                  </div>

                  <div className="p-6 sm:p-8 space-y-3">
                    <h3 className="font-black text-xl text-slate-900 group-hover:text-emerald-700 transition">{w.nama}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{w.deskripsi}</p>
                    
                    {/* FITUR DENGAN IKON ALAM */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {w.fiturUtama.map((fitur, idx) => (
                        <span key={idx} className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-2.5 py-1 rounded-xl flex items-center gap-1.5">
                          {fitur.icon} {fitur.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 sm:px-8 pb-6 pt-3 border-t border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <span className="text-xs font-black text-emerald-800">Tiket: {w.hargaTiket}</span>
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Lihat Info Lengkap <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION POPULASI & INDIKATOR LINGKUNGAN */}
        <section id="demografi-real" className="py-16 bg-white border-y border-emerald-100 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-xl mx-auto mb-12 space-y-1">
              <span className="text-[11px] font-extrabold text-emerald-700 tracking-wider uppercase flex items-center justify-center gap-1">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" /> Data Sosiologis &amp; Ekologis
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center justify-center gap-2">
                Demografi &amp; Luas Ruang Terbuka Hijau <Sun className="w-6 h-6 text-amber-500" />
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-gradient-to-b from-emerald-50 to-emerald-100/40 border border-emerald-200/80 p-6 rounded-[2.5rem] text-center space-y-2 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
                  <Users className="w-6 h-6" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900">{STATS_POPULASI_REAL.totalPenduduk.toLocaleString('id-ID')}</p>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Penduduk (Jiwa)</p>
              </div>

              <div className="bg-gradient-to-b from-teal-50 to-teal-100/40 border border-teal-200/80 p-6 rounded-[2.5rem] text-center space-y-2 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-teal-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
                  <Home className="w-6 h-6" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900">{STATS_POPULASI_REAL.jumlahKK.toLocaleString('id-ID')}</p>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Kepala Keluarga (KK)</p>
              </div>

              <div className="bg-gradient-to-b from-emerald-50 to-emerald-100/40 border border-emerald-200/80 p-6 rounded-[2.5rem] text-center space-y-2 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-emerald-700 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
                  <Trees className="w-6 h-6" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-900">{STATS_POPULASI_REAL.luasRTH}</p>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Ruang Terbuka Hijau</p>
              </div>

              <div className="bg-gradient-to-b from-blue-50 to-blue-100/40 border border-blue-200/80 p-6 rounded-[2.5rem] text-center space-y-2 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
                  <Sprout className="w-6 h-6" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900">+{STATS_POPULASI_REAL.pohonTertanam.toLocaleString('id-ID')}</p>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Pohon Tumpangsari</p>
              </div>
            </div>
          </div>
        </section>

        {/* PEMETAAN REAL KELURAHAN PASANGGRAHAN, UJUNGBERUNG */}
        <section id="peta" className="py-20 px-6 max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold text-emerald-700 tracking-wider uppercase flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-emerald-600" /> Peta Static &amp; Dynamic Kelurahan Pasanggrahan
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 flex items-center gap-2">
                Pemetaan Wilayah &amp; Posko Konservasi Real <Mountain className="w-6 h-6 text-emerald-700" />
              </h2>
            </div>
            
            <span className="text-xs bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold px-4 py-2 rounded-2xl flex items-center gap-1.5 self-start">
              <Globe className="w-4 h-4 text-emerald-700" /> Koordinat: 6°54'11"S 107°42'43"E
            </span>
          </div>

          <div className="bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 p-6 sm:p-8 rounded-[3.5rem] border border-emerald-800 shadow-2xl space-y-6 text-white relative overflow-hidden">
            <div className="relative rounded-[2.5rem] overflow-hidden border border-emerald-700/60 bg-slate-900 h-[420px] w-full shadow-inner">
              <iframe
                title="Peta Real Kelurahan Pasanggrahan Ujungberung Bandung"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src="https://www.openstreetmap.org/export/embed.html?bbox=107.7000%2C-6.9150%2C107.7300%2C-6.8850&amp;layer=mapnik&amp;marker=-6.9032%2C107.7121"
                className="w-full h-full grayscale-[20%] contrast-[110%] brightness-[95%]"
              ></iframe>

              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:max-w-md bg-slate-900/90 backdrop-blur-xl p-5 rounded-[2rem] border border-emerald-500/40 shadow-2xl space-y-2 z-20">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full bg-emerald-500 text-emerald-950 inline-block">
                    {activeLocation.sektor}
                  </span>
                  <span className="text-[10px] text-emerald-300 font-mono font-bold">
                    {activeLocation.lat}, {activeLocation.lng}
                  </span>
                </div>
                <h4 className="font-black text-base text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" /> {activeLocation.nama}
                </h4>
                <p className="text-xs text-emerald-100/90 leading-relaxed">{activeLocation.deskripsi}</p>
                <p className="text-[11px] text-slate-400 pt-1.5 border-t border-emerald-800/80">📍 {activeLocation.alamat}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {LOKASI_PASANGGRAHAN.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setActiveLocation(loc)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-300 flex items-start gap-3 ${
                    activeLocation.id === loc.id 
                      ? 'bg-emerald-800/90 border-emerald-400 text-white shadow-lg ring-2 ring-emerald-400/50' 
                      : 'bg-emerald-950/50 border-emerald-800/60 text-emerald-200 hover:bg-emerald-900/60'
                  }`}
                >
                  <MapPin className={`w-5 h-5 shrink-0 mt-0.5 ${activeLocation.id === loc.id ? 'text-emerald-300' : 'text-emerald-500'}`} />
                  <div>
                    <h5 className="font-extrabold text-xs">{loc.nama}</h5>
                    <p className="text-[10px] opacity-80 mt-0.5 line-clamp-1">{loc.sektor}</p>
                  </div>
                </button>
              ))}
            </div>
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
                className="bg-white rounded-[2.5rem] border border-emerald-100 overflow-hidden hover:border-emerald-500 cursor-pointer transition-all duration-300 group shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="h-52 overflow-hidden relative">
                    <img src={item.gambar} alt={item.nama} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-4 left-4 text-xs font-extrabold px-3 py-1 bg-white/90 backdrop-blur-md text-emerald-950 rounded-full border border-emerald-200 shadow-sm flex items-center gap-1">
                      <Sprout className="w-3.5 h-3.5 text-emerald-600" /> {item.kategori}
                    </span>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="font-black text-lg text-slate-900 group-hover:text-emerald-700 transition">{item.nama}</h3>
                    <p className="text-slate-500 text-xs">Pengelola: {item.pemilik}</p>
                    <p className="text-slate-600 text-xs line-clamp-2">{item.deskripsi}</p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-base font-black text-emerald-700">{item.harga}</span>
                  <span className="text-xs bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-3.5 py-2 rounded-2xl transition flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" /> Detail Produk
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MONITORING 5 CCTV (DENGAN NAMA & GAMBAR SESUAI POIN WEBSITE) */}
        <section id="cctv" className="py-20 px-6 bg-slate-950 text-white border-t border-slate-800 rounded-t-[3.5rem] relative overflow-hidden">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-emerald-400" /> Live Monitoring System
                </span>
                <h2 className="text-3xl font-black text-white flex items-center gap-2">
                  5 Kamera CCTV Real-Time Pasanggrahan <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                </h2>
                <p className="text-xs text-slate-400">
                  Klik pada salah satu kartu CCTV untuk membuka Pop-Up Live Streaming interaktif.
                </p>
              </div>

              {/* HINT PETUNJUK GESER */}
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold bg-emerald-950/80 border border-emerald-800/80 px-4 py-2 rounded-2xl shrink-0 self-start md:self-auto shadow-md">
                <ChevronRight className="w-4 h-4 animate-bounce" /> Geser ke kanan untuk lihat CCTV lainnya →
              </div>
            </div>

            {/* HORIZONTAL SCROLL CONTAINER CCTV */}
            <div className="flex overflow-x-auto gap-6 pb-6 pt-2 scrollbar-thin scrollbar-thumb-emerald-600 scrollbar-track-slate-900 snap-x snap-mandatory">
              {listCctv.map((cam) => (
                <div 
                  key={cam.id}
                  onClick={() => setSelectedCCTVModal(cam)}
                  className="min-w-[290px] sm:min-w-[340px] md:min-w-[360px] snap-center shrink-0 bg-slate-900 rounded-[2.2rem] border border-slate-800 overflow-hidden p-4.5 hover:border-emerald-500 cursor-pointer transition-all duration-300 hover:scale-[1.02] group shadow-2xl space-y-3 flex flex-col justify-between relative"
                >
                  {/* Badge Sektor Alam */}
                  <div className="absolute top-2 right-2 z-10">
                    <span className="bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-md">
                      <Trees className="w-3 h-3 text-emerald-400" /> Sektor 0{cam.id}
                    </span>
                  </div>

                  <div className="relative h-48 rounded-2xl overflow-hidden bg-black mt-4">
                    <img src={cam.streamUrl} alt={cam.nama} className="w-full h-full object-cover group-hover:opacity-100 opacity-80 transition duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/40"></div>
                    
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-[9px] font-black px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span> LIVE STREAM
                    </span>

                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-white">
                      <span className="text-[10px] font-mono text-emerald-300 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded">
                        {cam.fps} FPS
                      </span>
                      <span className="text-[10px] font-bold bg-emerald-600 group-hover:bg-emerald-500 text-white px-2.5 py-1 rounded-xl flex items-center gap-1 shadow">
                        <Maximize2 className="w-3 h-3" /> Buka CCTV
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-white group-hover:text-emerald-400 transition">{cam.nama}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-500 shrink-0" /> {cam.lokasi}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INFO MADING BERITA VISUAL */}
        <section id="mading" className="py-20 px-6 max-w-7xl mx-auto border-t border-emerald-100">
          <div className="mb-10 space-y-2">
            <span className="text-xs font-extrabold text-emerald-700 tracking-wider uppercase flex items-center gap-1">
              <FileText className="w-4 h-4 text-emerald-600" /> Warta Lingkungan Pasanggrahan
            </span>
            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-2">
              Mading Digital &amp; Berita Konservasi <Sprout className="w-6 h-6 text-emerald-600" />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {listBerita.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedBerita(item)}
                className="bg-white rounded-[2.8rem] border border-emerald-100 overflow-hidden hover:border-emerald-500 cursor-pointer transition-all duration-300 shadow-md group flex flex-col justify-between"
              >
                <div>
                  <div className="h-64 overflow-hidden relative">
                    <img src={item.gambar} alt={item.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
                    <span className="absolute top-4 left-4 text-xs font-bold px-3.5 py-1 bg-emerald-600 text-white rounded-full shadow flex items-center gap-1">
                      <Leaf className="w-3.5 h-3.5 text-emerald-200" /> {item.kategori}
                    </span>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-3 text-[11px] font-semibold text-emerald-200">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {item.tanggal}</span>
                        <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {item.penulis}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-bold text-xl text-slate-900 leading-snug group-hover:text-emerald-700 transition">{item.judul}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">{item.kutipan}</p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
                  <span className="text-xs font-extrabold text-slate-500 flex items-center gap-1">
                    Informasi Resmi Kelurahan
                  </span>
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Baca Selengkapnya <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* APARAT PEMERINTAHAN DESA */}
        <section id="aparat" className="py-20 px-6 max-w-7xl mx-auto space-y-10 border-t border-emerald-100">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">Pimpinan Kelurahan</span>
            <h2 className="text-3xl font-black text-slate-900">Aparat Pemerintahan Desa Pasanggrahan</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {listAparat.map((aparat) => (
              <div key={aparat.id} className="bg-white p-6 rounded-[2.5rem] border border-emerald-100 shadow-sm flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-700 to-teal-900 text-white flex items-center justify-center shrink-0 shadow-md">
                  <User className="w-7 h-7 text-emerald-200" />
                </div>
                <div className="space-y-2 flex-1">
                  <div>
                    <h3 className="text-base font-black text-slate-900">{aparat.nama}</h3>
                    <p className="text-xs font-bold text-emerald-700">{aparat.jabatan}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">NIP: {aparat.nip}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <a href={`https://wa.me/${aparat.telepon}`} target="_blank" rel="noreferrer" className="text-xs font-bold text-slate-700 hover:text-emerald-700 underline">
                      {aparat.telepon}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FORM LAPOR ISU LINGKUNGAN */}
        <section id="lapor" className="py-20 px-6 max-w-4xl mx-auto border-t border-emerald-100">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-extrabold text-emerald-700 tracking-wider uppercase flex items-center justify-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Layanan Pengawasan Ekologi
            </span>
            <h2 className="text-3xl font-black text-slate-900 flex items-center justify-center gap-2">
              Lapor Kejadian &amp; Isu Lingkungan <CloudRain className="w-6 h-6 text-teal-600" />
            </h2>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-[3rem] border border-emerald-200 shadow-xl relative overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Nama Pelapor *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Nama lengkap" 
                    value={formData.nama}
                    onChange={(e) => setFormData({...formData, nama: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Nomor WhatsApp *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="08xxxxxxxxxx" 
                    value={formData.hp}
                    onChange={(e) => setFormData({...formData, hp: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Isi Laporan / Isu Lingkungan *</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Tuliskan detail laporan, RW, atau lokasi spesifik di Pasanggrahan..."
                  value={formData.isi}
                  onChange={(e) => setFormData({...formData, isi: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-4 text-sm focus:outline-none focus:border-emerald-700"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
              >
                <Send className="w-4 h-4" /> Kirimkan Laporan Lingkungan
              </button>
            </form>
          </div>
        </section>
      </div>

      {/* FOOTER DESA KONSERVASI */}
      <footer className="bg-emerald-950 text-emerald-200 border-t border-emerald-900 pt-16 pb-12 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-xs relative z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <LogoKonservasi />
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                Kelurahan Pasanggrahan <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              </h3>
            </div>
            <p className="text-xs leading-relaxed text-emerald-300">
              Sistem Informasi Kelurahan Digital &amp; Pemetaan Geografis Kawasan Konservasi Pasanggrahan, Ujungberung, Kota Bandung.
            </p>
          </div>

          <div className="space-y-3">
            <h5 className="font-extrabold text-white uppercase tracking-wider text-[11px] text-emerald-400 flex items-center gap-1">
              <Trees className="w-3.5 h-3.5" /> Navigasi Portal
            </h5>
            <ul className="space-y-2 text-emerald-300">
              <li><a href="#hero" className="hover:text-white transition">Beranda Utama</a></li>
              <li><a href="#wisata" className="hover:text-white transition">Wisata &amp; Curug Manglayang</a></li>
              <li><a href="#demografi-real" className="hover:text-white transition">Demografi Warga</a></li>
              <li><a href="#peta" className="hover:text-white transition">Peta Kelurahan Pasanggrahan</a></li>
              <li><a href="#cctv" className="hover:text-white transition">5 Kamera CCTV Live</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-extrabold text-white uppercase tracking-wider text-[11px] text-emerald-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Alamat Kelurahan
            </h5>
            <p className="text-emerald-300 leading-relaxed">
              Jl. Pasanggrahan No. 24, Kecamatan Ujungberung, Kota Bandung, Jawa Barat 40617
            </p>
          </div>

          <div className="space-y-3">
            <h5 className="font-extrabold text-white uppercase tracking-wider text-[11px] text-emerald-400 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" /> Kontak Layanan
            </h5>
            <p className="text-emerald-300 flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-emerald-400" /> (022) 780-1234</p>
            <p className="text-emerald-300 flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-emerald-400" /> kelurahan@pasanggrahan.go.id</p>
          </div>
        </div>
      </footer>

      {/* TOMBOL FLOATING SCROLL TO TOP */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white p-3.5 rounded-full shadow-2xl border-2 border-emerald-300/50 transition-all duration-300 hover:scale-110 flex items-center justify-center group animate-fade-in"
          title="Kembali ke Atas"
          aria-label="Scroll ke atas"
        >
          <ArrowUp className="w-6 h-6 text-white group-hover:-translate-y-1 transition-transform" />
        </button>
      )}

      {/* POP-UP MODAL 5 TITIK CCTV */}
      {selectedCCTVModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-[2.5rem] max-w-2xl w-full overflow-hidden shadow-2xl relative space-y-4 p-6 text-white animate-fade-in-up">
            
            {/* Header CCTV Modal */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                <div>
                  <h3 className="font-black text-lg text-emerald-400">{selectedCCTVModal.nama}</h3>
                  <p className="text-xs text-slate-400">{selectedCCTVModal.lokasi}</p>
                </div>
              </div>

              <button 
                onClick={() => setSelectedCCTVModal(null)} 
                className="bg-red-600 hover:bg-red-700 text-white font-extrabold px-3.5 py-2 rounded-2xl flex items-center gap-1.5 text-xs transition shadow-lg"
              >
                <X className="w-4 h-4" /> Tutup CCTV
              </button>
            </div>

            {/* Frame Live Stream CCTV */}
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-inner">
              <img src={selectedCCTVModal.streamUrl} alt={selectedCCTVModal.nama} className="w-full h-full object-cover" />
              
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-[10px] font-mono font-bold text-white uppercase">LIVE BROADCAST</span>
              </div>

              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[10px] font-mono text-emerald-400">
                REC • 1080p @ {selectedCCTVModal.fps}FPS
              </div>

              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
                {selectedCCTVModal.deskripsi}
              </div>
            </div>

            {/* Switcher CCTV */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Pilih Titik Kamera CCTV Lainnya:</p>
              <div className="flex flex-wrap gap-2">
                {listCctv.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCCTVModal(c)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      selectedCCTVModal.id === c.id 
                        ? 'bg-emerald-600 text-white ring-2 ring-emerald-400' 
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    CCTV 0{c.id}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DETAILED WISATA */}
      {selectedWisata && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-[2.5rem] max-w-lg w-full overflow-hidden shadow-2xl space-y-4 p-6 relative animate-fade-in-up">
            <button onClick={() => setSelectedWisata(null)} className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full">
              <X className="w-4 h-4 text-slate-600" />
            </button>
            <img src={selectedWisata.gambar} alt={selectedWisata.nama} className="w-full h-56 rounded-2xl object-cover" />
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">{selectedWisata.kategori}</span>
              <span className="text-xs font-semibold text-slate-500">📍 {selectedWisata.lokasi}</span>
            </div>

            <div>
              <h3 className="font-black text-xl text-slate-900">{selectedWisata.nama}</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{selectedWisata.deskripsi}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700">Tiket: {selectedWisata.hargaTiket}</span>
              <button onClick={() => setSelectedWisata(null)} className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl">
                Tutup Info
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DETAILED UMKM */}
      {selectedUmkm && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-[2.5rem] max-w-lg w-full overflow-hidden shadow-2xl space-y-4 p-6 relative animate-fade-in-up">
            <button onClick={() => setSelectedUmkm(null)} className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full">
              <X className="w-4 h-4 text-slate-600" />
            </button>
            <img src={selectedUmkm.gambar} alt={selectedUmkm.nama} className="w-full h-56 rounded-2xl object-cover" />
            
            <div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">{selectedUmkm.kategori}</span>
              <h3 className="font-black text-xl text-slate-900 mt-2">{selectedUmkm.nama}</h3>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Oleh: {selectedUmkm.pemilik} • {selectedUmkm.lokasi}</p>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">{selectedUmkm.detailLengkap}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <span className="text-sm font-black text-emerald-700">{selectedUmkm.harga}</span>
              <a 
                href={`https://wa.me/${selectedUmkm.wa}?text=Halo%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(selectedUmkm.nama)}`} 
                target="_blank" 
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" /> Pesan via WA
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DETAILED BERITA */}
      {selectedBerita && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-[2.5rem] max-w-lg w-full overflow-hidden shadow-2xl space-y-4 p-6 relative animate-fade-in-up">
            <button onClick={() => setSelectedBerita(null)} className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full">
              <X className="w-4 h-4 text-slate-600" />
            </button>
            <img src={selectedBerita.gambar} alt={selectedBerita.judul} className="w-full h-56 rounded-2xl object-cover" />
            
            <div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">{selectedBerita.kategori}</span>
              <h3 className="font-black text-xl text-slate-900 mt-2">{selectedBerita.judul}</h3>
              <p className="text-[11px] text-slate-400 mt-1">{selectedBerita.tanggal} • Oleh {selectedBerita.penulis}</p>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">{selectedBerita.detail}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button onClick={() => setSelectedBerita(null)} className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl">
                Tutup Berita
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}