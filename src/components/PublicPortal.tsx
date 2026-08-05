import React, { useState } from 'react';
import { 
  Trees, Leaf, Shield, MapPin, Users, Video, 
  ChevronRight, Send, X, Phone, Mail,
  Store, UserCheck, Settings, Download, Plus, Trash2, 
  LayoutDashboard, FileText, Lock, ArrowLeft,
  Sprout, Mountain, Droplets, Camera, ShoppingBag, Calendar, User, ExternalLink, TrendingUp,
  Eye, Info
} from 'lucide-react';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';

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
  koordinat: { x: number; y: number };
  googleMapsUrl: string;
}

interface CCTVPoint {
  id: number;
  nama: string;
  lokasi: string;
  status: 'ONLINE' | 'OFFLINE';
  streamUrl: string;
}

interface AparatDesa {
  id: number;
  nama: string;
  jabatan: string;
  nip: string;
  telepon: string;
}

// --- LOGO TEMA KONSERVASI ---
const LogoKonservasi = () => (
  <div className="w-10 h-10 rounded-xl bg-emerald-900 border border-emerald-400/40 flex items-center justify-center p-1 shadow-md">
    <div className="w-full h-full bg-emerald-700 rounded-full flex items-center justify-center relative overflow-hidden">
      <Trees className="w-5 h-5 text-emerald-100 stroke-[2.5]" />
    </div>
  </div>
);

// --- DATA INITIAL ---
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

const INITIAL_BERITA: BeritaKonservasi[] = [
  {
    id: 1,
    kategori: 'Reboisasi & Konservasi',
    judul: 'Penanaman 5.000 Bibit Pohon di Kaki Gunung Manglayang',
    kutipan: 'Pemerintah Desa Pasanggrahan bersama komunitas pegiat lingkungan menggelar aksi penanaman pohon masal untuk mencegah erosi.',
    detail: 'Kegiatan penanaman pohon ini melibatkan lebih dari 300 warga lokal dan relawan lingkungan. Spesies pohon yang ditanam meliputi Mahoni, Suren, dan Kopi Arabika yang memiliki daya serap air tinggi. Program ini bertujuan memperkuat area resapan air dan menjaga keasrian perbukitan Pasanggrahan.',
    tanggal: '05 Agustus 2026',
    penulis: 'Tim Konservasi Desa',
    gambar: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    kategori: 'Pengelolaan Sampah Mandiri',
    judul: 'Program Komposting & Bank Sampah Organik RT 03 Pasanggrahan',
    kutipan: 'Menuju Desa Zero Waste, warga mengolah sampah dapur menjadi pupuk organik cair dan pupuk kompos bernilai tinggi.',
    detail: 'Program pengelolaan sampah berbasis masyarakat ini berhasil mengurangi emisi sampah hingga 40%. Sampah organik diolah menggunakan metode komposting dan budidaya maggot yang hasilnya dipasarkan kembali untuk mendukung perekonomian warga lokal.',
    tanggal: '01 Agustus 2026',
    penulis: 'Kader Eco-Ranger',
    gambar: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop'
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
    detailLengkap: 'Kopi Arabika murni 100% dipetik dari tanaman kopi yang ditanam bersama vegetasi hutan lindung Gunung Manglayang. Proses pengolahan secara natural roast sedang dengan aroma khas buah-buahan dan keasaman seimbang.'
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
    detailLengkap: 'Bibit tanaman berukuran 40-60cm dalam polybag siap tanam. Bebas pestisida kimia dan dibudidayakan secara organik. Sangat direkomendasikan untuk penghijauan pekarangan maupun lahan terbuka.'
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
    detailLengkap: 'Dihasilkan dari fermentasi limbah organik dapur warga dan kotoran ternak dengan formula starter mikrobiologi. Menyuburkan tanah, menahan kelembaban air, dan ramah lingkungan.'
  }
];

const LOKASI_PASANGGRAHAN: LocationPin[] = [
  {
    id: 1,
    nama: 'Kantor Kelurahan Pasanggrahan',
    kategori: 'Fasilitas / Posko',
    alamat: 'Jl. Pasanggrahan Utama No. 01, Ujungberung, Bandung',
    deskripsi: 'Pusat pelayanan administrasi dan posko informasi lingkungan warga.',
    sektor: 'Sektor 1: Kebun Utama & Pusat Desa',
    koordinat: { x: 50, y: 55 },
    googleMapsUrl: 'https://maps.google.com/?q=Pasanggrahan+Ujungberung+Bandung'
  },
  {
    id: 2,
    nama: 'Area Hutan Manglayang',
    kategori: 'Wisata',
    alamat: 'Kawasan Perhutani Pasanggrahan RW 05',
    deskripsi: 'Area perkemahan & reboisasi lereng Gunung Manglayang.',
    sektor: 'Sektor 2: Area Konservasi Hutan',
    koordinat: { x: 68, y: 28 },
    googleMapsUrl: 'https://maps.google.com/?q=Manglayang+Jungle+Place'
  }
];

const INITIAL_CCTV: CCTVPoint[] = [
  { id: 1, nama: 'CCTV 01 - Pos Pantau Manglayang', lokasi: 'Sektor Atas Pasanggrahan RW 05', status: 'ONLINE', streamUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop' },
  { id: 2, nama: 'CCTV 02 - Simpang Kelurahan Pasanggrahan', lokasi: 'Jl. Pasanggrahan Utama', status: 'ONLINE', streamUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop' },
  { id: 3, nama: 'CCTV 03 - Area Sentra UMKM RW 03', lokasi: 'Kawasan Usaha Warga Pasanggrahan', status: 'ONLINE', streamUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop' }
];

export function PublicPortal() {
  const [currentView, setCurrentView] = useState<'PUBLIC' | 'ADMIN_LOGIN' | 'ADMIN_DASHBOARD'>('PUBLIC');
  
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
  const [listAparat, setListAparat] = useState<AparatDesa[]>(INITIAL_APARAT);
  const [listCctv] = useState<CCTVPoint[]>(INITIAL_CCTV);
  
  const [listPengaduan, setListPengaduan] = useState<PengaduanLingkungan[]>([
    { id: 1, nama: 'Budi Santoso', hp: '08123456789', kategori: 'Kebersihan & Sampah', lokasi: 'Sempadan Sungai RW 02', isi: 'Terdapat tumpukan limbah organik di dekat mata air, mohon edukasi warga setempat.', tanggal: '04 Agustus 2026', status: 'PENDING' },
    { id: 2, nama: 'Siti Rahma', hp: '08987654321', kategori: 'Kerusakan Mata Air', lokasi: 'RW 01 Pasanggrahan', isi: 'Debit air di penampungan utama menurun, perlu pemeriksaan sistem saluran resapan.', tanggal: '02 Agustus 2026', status: 'DIPROSES' }
  ]);

  // Selected Item Modals
  const [selectedUmkm, setSelectedUmkm] = useState<EkoUmkmItem | null>(null);
  const [selectedBerita, setSelectedBerita] = useState<BeritaKonservasi | null>(null);
  const [activeLocation, setActiveLocation] = useState<LocationPin>(LOKASI_PASANGGRAHAN[0]);
  const [activeCCTV, setActiveCCTV] = useState<CCTVPoint>(INITIAL_CCTV[0]);

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
      alert('Laporan Anda Berhasil Dikirim!');
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
    const data: EkoUmkmItem = {
      id: Date.now(),
      ...newUmkm
    };
    setListUmkm([data, ...listUmkm]);
    setShowAddUmkmModal(false);
    setNewUmkm({ nama: '', pemilik: '', wa: '', kategori: 'Hasil Hutan Non-Kayu', harga: '', lokasi: '', deskripsi: '', detailLengkap: '', gambar: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500' });
  };

  const handleAddBerita = (e: React.FormEvent) => {
    e.preventDefault();
    const data: BeritaKonservasi = {
      id: Date.now(),
      ...newBerita,
      tanggal: '05 Agustus 2026'
    };
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
      <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-6 relative font-sans text-slate-800">
        <button 
          onClick={() => setCurrentView('PUBLIC')}
          className="absolute top-8 left-8 bg-white hover:bg-slate-50 text-slate-700 font-bold px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm transition flex items-center gap-2 text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Portal Warga
        </button>

        <div className="bg-white rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-xl border border-slate-200 space-y-6">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto text-emerald-700">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">Portal Admin Pasanggrahan</h2>
              <p className="text-xs text-slate-500 font-medium mt-1">Sistem Informasi Desa &amp; Kelola Wilayah</p>
            </div>
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-bold p-3 rounded-xl text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Username Admin</label>
              <input 
                type="text" 
                required
                placeholder="Masukkan username (admin)" 
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600"
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
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3.5 rounded-xl shadow-lg shadow-emerald-600/30 transition text-sm tracking-wide"
            >
              Masuk Dashboard Admin
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
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-30">
          <div>
            <h1 className="font-black text-xl text-slate-900 leading-tight">Sistem Informasi Desa - Portal Pasanggrahan</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Kelola data publik &amp; pantau kegiatan wilayah secara realtime</p>
          </div>

          <button 
            onClick={() => setCurrentView('PUBLIC')}
            className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-extrabold px-5 py-2 rounded-xl text-xs flex items-center gap-2 transition"
          >
            <UserCheck className="w-4 h-4" /> Lihat Portal Warga
          </button>
        </header>

        <div className="flex flex-1 flex-col lg:flex-row">
          <aside className="w-full lg:w-64 bg-white border-r border-slate-200 p-6 space-y-6 shrink-0 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black">
                  PA
                </div>
                <div>
                  <h3 className="font-black text-sm text-slate-900">Portal Admin</h3>
                  <p className="text-[11px] text-slate-400 font-semibold">Desa Digital Pasanggrahan</p>
                </div>
              </div>

              <nav className="space-y-1 text-xs font-bold text-slate-600">
                <button 
                  onClick={() => setAdminActiveTab('dashboard')} 
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition ${
                    adminActiveTab === 'dashboard' ? 'bg-emerald-100 text-emerald-900 font-extrabold' : 'hover:bg-slate-100'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-emerald-700" /> Dashboard Utama
                </button>
                <button 
                  onClick={() => setAdminActiveTab('demografi')} 
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition ${
                    adminActiveTab === 'demografi' ? 'bg-emerald-100 text-emerald-900 font-extrabold' : 'hover:bg-slate-100'
                  }`}
                >
                  <Users className="w-4 h-4 text-emerald-700" /> Data Warga &amp; Demografi
                </button>
                <button 
                  onClick={() => setAdminActiveTab('umkm')} 
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition ${
                    adminActiveTab === 'umkm' ? 'bg-emerald-100 text-emerald-900 font-extrabold' : 'hover:bg-slate-100'
                  }`}
                >
                  <Store className="w-4 h-4 text-emerald-700" /> Katalog UMKM
                </button>
                <button 
                  onClick={() => setAdminActiveTab('pengaduan')} 
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition ${
                    adminActiveTab === 'pengaduan' ? 'bg-emerald-100 text-emerald-900 font-extrabold' : 'hover:bg-slate-100'
                  }`}
                >
                  <FileText className="w-4 h-4 text-emerald-700" /> Laporan &amp; Pengaduan
                </button>
                <button 
                  onClick={() => setAdminActiveTab('cctv')} 
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition ${
                    adminActiveTab === 'cctv' ? 'bg-emerald-100 text-emerald-900 font-extrabold' : 'hover:bg-slate-100'
                  }`}
                >
                  <Video className="w-4 h-4 text-emerald-700" /> CCTV Lingkungan
                </button>
                <button 
                  onClick={() => setAdminActiveTab('berita')} 
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition ${
                    adminActiveTab === 'berita' ? 'bg-emerald-100 text-emerald-900 font-extrabold' : 'hover:bg-slate-100'
                  }`}
                >
                  <FileText className="w-4 h-4 text-emerald-700" /> Mading &amp; Berita
                </button>
                <button 
                  onClick={() => setAdminActiveTab('aparat')} 
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition ${
                    adminActiveTab === 'aparat' ? 'bg-emerald-100 text-emerald-900 font-extrabold' : 'hover:bg-slate-100'
                  }`}
                >
                  <Shield className="w-4 h-4 text-emerald-700" /> Aparat Pemerintahan
                </button>
                <button 
                  onClick={() => setAdminActiveTab('pengaturan')} 
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition ${
                    adminActiveTab === 'pengaturan' ? 'bg-emerald-100 text-emerald-900 font-extrabold' : 'hover:bg-slate-100'
                  }`}
                >
                  <Settings className="w-4 h-4 text-emerald-700" /> Pengaturan System
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
                className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition"
                title="Logout"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </aside>

          <main className="flex-1 p-6 lg:p-10 space-y-8 overflow-y-auto">
            {/* TAB 1: DASHBOARD UTAMA */}
            {adminActiveTab === 'dashboard' && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900">Dashboard Utama</h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Ringkasan sistem terpadu &amp; statistik lanjutan Kelurahan Pasanggrahan.</p>
                  </div>

                  <button className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm transition self-start">
                    <Download className="w-4 h-4" /> Export Data Ringkasan
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div onClick={() => setAdminActiveTab('umkm')} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-emerald-500 transition">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <Store className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold">Katalog UMKM Aktif</p>
                      <h4 className="text-2xl font-black text-slate-900">{listUmkm.length} Usaha Terdaftar</h4>
                    </div>
                  </div>

                  <div onClick={() => setAdminActiveTab('pengaduan')} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-amber-500 transition">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold">Laporan Masuk</p>
                      <h4 className="text-2xl font-black text-slate-900">{listPengaduan.length} Laporan Warga</h4>
                    </div>
                  </div>

                  <div onClick={() => setAdminActiveTab('cctv')} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-blue-500 transition">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                      <Video className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold">Kamera CCTV Daring</p>
                      <h4 className="text-2xl font-black text-slate-900">{listCctv.length} Titik Live</h4>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <h3 className="font-bold text-sm text-slate-900">Tren Laju Pertumbuhan Total Penduduk</h3>
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

                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <h3 className="font-bold text-sm text-slate-900">Kelahiran vs Kematian (Bulanan)</h3>
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
                    <h2 className="text-2xl font-black text-slate-900">Kelola Data Warga &amp; Kategori Usia</h2>
                    <p className="text-xs text-slate-500 font-medium">Monitoring rentang umur, kelompok anak, produktif, lansia &amp; status bantuan.</p>
                  </div>
                  <button onClick={() => setShowAddWargaModal(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow transition">
                    <Plus className="w-4 h-4" /> Tambah Warga Baru
                  </button>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-extrabold uppercase">
                        <th className="p-4">NIK</th>
                        <th className="p-4">Nama Lengkap</th>
                        <th className="p-4">RT / RW</th>
                        <th className="p-4">Usia</th>
                        <th className="p-4">Kategori Usia</th>
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
                            <button onClick={() => handleDeleteWarga(warga.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition" title="Hapus Data">
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
                    <h2 className="text-2xl font-black text-slate-900">Kelola Produk Eko-UMKM Desa</h2>
                    <p className="text-xs text-slate-500 font-medium">Pantau dan publikasikan produk warga ke portal utama.</p>
                  </div>
                  <button onClick={() => setShowAddUmkmModal(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow transition">
                    <Plus className="w-4 h-4" /> Tambah Produk UMKM
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listUmkm.map((u) => (
                    <div key={u.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 relative shadow-sm">
                      <img src={u.gambar} alt={u.nama} className="w-full h-40 object-cover rounded-xl" />
                      <div>
                        <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">{u.kategori}</span>
                        <h3 className="font-bold text-sm text-slate-900 mt-2">{u.nama}</h3>
                        <p className="text-xs text-slate-500">{u.pemilik} • {u.lokasi}</p>
                        <p className="text-emerald-700 font-black text-sm mt-1">{u.harga}</p>
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex justify-end">
                        <button onClick={() => handleDeleteUmkm(u.id)} className="text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1">
                          <Trash2 className="w-3.5 h-3.5" /> Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB MADING BERITA */}
            {adminActiveTab === 'berita' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900">Kelola Mading &amp; Berita Visual</h2>
                    <p className="text-xs text-slate-500 font-medium">Publikasikan informasi kegiatan desa dalam tampilan visual mading interaktif.</p>
                  </div>
                  <button onClick={() => setShowAddBeritaModal(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow transition">
                    <Plus className="w-4 h-4" /> Tambah Berita
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {listBerita.map((b) => (
                    <div key={b.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-sm">
                      <img src={b.gambar} alt={b.judul} className="w-full h-44 object-cover rounded-xl" />
                      <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">{b.kategori}</span>
                      <h3 className="font-bold text-base text-slate-900">{b.judul}</h3>
                      <p className="text-xs text-slate-600 line-clamp-2">{b.kutipan}</p>
                      <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-[10px] text-slate-400">{b.tanggal}</span>
                        <button onClick={() => handleDeleteBerita(b.id)} className="text-red-500 hover:bg-red-50 px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1">
                          <Trash2 className="w-3.5 h-3.5" /> Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB PENGADUAN, CCTV, APARAT, PENGATURAN */}
            {adminActiveTab === 'pengaduan' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-black text-slate-900">Pengaduan Lingkungan</h2>
                <div className="space-y-4">
                  {listPengaduan.map((lapor) => (
                    <div key={lapor.id} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 shadow-sm">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-slate-900">{lapor.nama} ({lapor.hp})</h3>
                        <select value={lapor.status} onChange={(e) => handleUpdatePengaduanStatus(lapor.id, e.target.value as any)} className="bg-slate-50 border rounded-xl px-3 py-1 text-xs font-bold">
                          <option value="PENDING">PENDING</option>
                          <option value="DIPROSES">DIPROSES</option>
                          <option value="SELESAI">SELESAI</option>
                        </select>
                      </div>
                      <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">{lapor.isi}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {adminActiveTab === 'cctv' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-black text-slate-900">CCTV Lingkungan</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {listCctv.map((cam) => (
                    <div key={cam.id} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 shadow-sm">
                      <img src={cam.streamUrl} alt={cam.nama} className="w-full h-40 object-cover rounded-xl" />
                      <h3 className="font-bold text-sm">{cam.nama}</h3>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {adminActiveTab === 'aparat' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-black text-slate-900">Data Aparat Pemerintahan</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {listAparat.map((a) => (
                    <div key={a.id} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
                      <h3 className="font-bold text-slate-900">{a.nama}</h3>
                      <p className="text-xs text-emerald-700 font-bold">{a.jabatan}</p>
                      <p className="text-[11px] text-slate-400">NIP: {a.nip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {adminActiveTab === 'pengaturan' && (
              <div className="space-y-6 max-w-xl">
                <h2 className="text-2xl font-black text-slate-900">Pengaturan System</h2>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Nama Kelurahan</label>
                    <input type="text" defaultValue="Kelurahan Pasanggrahan" className="w-full bg-slate-50 border rounded-xl p-3 text-xs font-bold" />
                  </div>
                  <button className="bg-emerald-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow">Simpan</button>
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
              <h3 className="text-lg font-black text-slate-900">Tambah Data Warga</h3>
              <form onSubmit={handleAddWarga} className="space-y-3">
                <input type="text" placeholder="NIK (16 digit)" required value={newWarga.nik} onChange={(e) => setNewWarga({...newWarga, nik: e.target.value})} className="w-full bg-slate-50 border rounded-xl p-3 text-xs" />
                <input type="text" placeholder="Nama Lengkap" required value={newWarga.nama} onChange={(e) => setNewWarga({...newWarga, nama: e.target.value})} className="w-full bg-slate-50 border rounded-xl p-3 text-xs" />
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" placeholder="RT / RW" required value={newWarga.rtRw} onChange={(e) => setNewWarga({...newWarga, rtRw: e.target.value})} className="w-full bg-slate-50 border rounded-xl p-3 text-xs" />
                  <input type="number" placeholder="Usia (Tahun)" required value={newWarga.usia} onChange={(e) => setNewWarga({...newWarga, usia: Number(e.target.value)})} className="w-full bg-slate-50 border rounded-xl p-3 text-xs" />
                </div>
                <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl text-xs">Simpan Data Warga</button>
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
              <h3 className="text-lg font-black text-slate-900">Tambah Produk UMKM</h3>
              <form onSubmit={handleAddUmkm} className="space-y-3">
                <input type="text" placeholder="Nama Produk" required value={newUmkm.nama} onChange={(e) => setNewUmkm({...newUmkm, nama: e.target.value})} className="w-full bg-slate-50 border rounded-xl p-3 text-xs" />
                <input type="text" placeholder="Pemilik" required value={newUmkm.pemilik} onChange={(e) => setNewUmkm({...newUmkm, pemilik: e.target.value})} className="w-full bg-slate-50 border rounded-xl p-3 text-xs" />
                <input type="text" placeholder="Harga" required value={newUmkm.harga} onChange={(e) => setNewUmkm({...newUmkm, harga: e.target.value})} className="w-full bg-slate-50 border rounded-xl p-3 text-xs" />
                <textarea placeholder="Ringkasan..." required value={newUmkm.deskripsi} onChange={(e) => setNewUmkm({...newUmkm, deskripsi: e.target.value})} className="w-full bg-slate-50 border rounded-xl p-3 text-xs" />
                <textarea placeholder="Detail Lengkap..." required value={newUmkm.detailLengkap} onChange={(e) => setNewUmkm({...newUmkm, detailLengkap: e.target.value})} className="w-full bg-slate-50 border rounded-xl p-3 text-xs" />
                <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl text-xs">Simpan Produk</button>
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
                <input type="text" placeholder="Judul" required value={newBerita.judul} onChange={(e) => setNewBerita({...newBerita, judul: e.target.value})} className="w-full bg-slate-50 border rounded-xl p-3 text-xs" />
                <input type="text" placeholder="Kategori" required value={newBerita.kategori} onChange={(e) => setNewBerita({...newBerita, kategori: e.target.value})} className="w-full bg-slate-50 border rounded-xl p-3 text-xs" />
                <textarea placeholder="Kutipan..." required value={newBerita.kutipan} onChange={(e) => setNewBerita({...newBerita, kutipan: e.target.value})} className="w-full bg-slate-50 border rounded-xl p-3 text-xs" />
                <textarea placeholder="Detail Lengkap..." required value={newBerita.detail} onChange={(e) => setNewBerita({...newBerita, detail: e.target.value})} className="w-full bg-slate-50 border rounded-xl p-3 text-xs" />
                <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl text-xs">Publikasikan</button>
              </form>
            </div>
          </div>
        )}

      </div>
    );
  }

  // =========================================================================
  // VIEW 3: PUBLIC LANDING PAGE
  // =========================================================================
  return (
    <div className="scroll-smooth min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      <div>
        {/* NAVBAR UTAMA (TULISAN DATA WARGA SUDAH DIHAPUS) */}
        <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 px-6 py-3.5 shadow-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <LogoKonservasi />
              <div>
                <h1 className="font-black text-lg leading-tight text-emerald-950 flex items-center gap-1.5">
                  Desa Pasanggrahan <Leaf className="w-4 h-4 text-emerald-600 inline" />
                </h1>
                <p className="text-[10px] text-emerald-700 font-bold tracking-wider uppercase">
                  Kec. Ujungberung, Kota Bandung
                </p>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-600">
              <a href="#hero" className="hover:text-emerald-700 transition">Beranda</a>
              <a href="#konservasi" className="hover:text-emerald-700 transition">Konservasi</a>
              <a href="#peta" className="hover:text-emerald-700 transition">Pemetaan Wilayah</a>
              <a href="#umkm" className="hover:text-emerald-700 transition">Katalog UMKM</a>
              <a href="#mading" className="hover:text-emerald-700 transition">Info Mading &amp; Berita Visual</a>
              <a href="#cctv" className="hover:text-emerald-700 transition">CCTV</a>
              <a href="#aparat" className="hover:text-emerald-700 transition">Aparat Desa</a>
              <a href="#lapor" className="hover:text-emerald-700 transition">Pengaduan</a>
              
              <button 
                onClick={() => setCurrentView('ADMIN_LOGIN')}
                className="bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 rounded-xl transition shadow flex items-center gap-1.5 font-bold ml-2"
              >
                <LayoutDashboard className="w-3.5 h-3.5" /> Portal Admin
              </button>
            </div>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section 
          id="hero" 
          className="relative py-24 lg:py-32 px-6 overflow-hidden bg-cover bg-center text-slate-900"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(6, 78, 59, 0.8), rgba(4, 47, 38, 0.9)), url('https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&auto=format&fit=crop')`,
          }}
        >
          <div className="relative max-w-7xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-bold backdrop-blur-md">
              <Sprout className="w-4 h-4 text-emerald-400" /> Kawasan Desa Konservasi &amp; Resapan Air Bebas Polusi
            </span>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-white">
              Menjaga Kelestarian Hutan,<br />
              <span className="text-emerald-400">Melindungi Masa Depan Pasanggrahan</span>
            </h1>

            <p className="text-emerald-100 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
              Selamat datang di Portal Kelurahan Pasanggrahan, Kecamatan Ujungberung, Kota Bandung.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a href="#peta" className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black px-7 py-3.5 rounded-2xl transition-all text-xs uppercase tracking-wider shadow-lg flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Lihat Pemetaan Wilayah
              </a>
              <a href="#lapor" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-7 py-3.5 rounded-2xl transition-all text-xs uppercase tracking-wider backdrop-blur-md flex items-center gap-2">
                <Shield className="w-4 h-4" /> Lapor Isu Lingkungan
              </a>
            </div>
          </div>
        </section>

        {/* PROFIL KONSERVASI */}
        <section id="konservasi" className="py-20 px-6 max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">Profil &amp; Fokus Wilayah</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Program Kelestarian Alam Pasanggrahan</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Mountain className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Perlindungan Perbukitan</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pencegahan alih fungsi lahan kritis di lereng Gunung Manglayang untuk menjaga stabilitas tanah.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Droplets className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Konservasi Sumber Air</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pembuatan lubang biopori &amp; pemeliharaan sempadan sungai agar pasokan air bersih warga stabil.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Sprout className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Ekowisata Berkelanjutan</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pengembangan ekonomi warga melalui pertanian tumpangsari organik &amp; adopsi pohon.
              </p>
            </div>
          </div>
        </section>

        {/* PEMETAAN WILAYAH */}
        <section id="peta" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold text-emerald-700 tracking-wider uppercase">PEMETAAN WILAYAH</span>
              <h2 className="text-3xl font-black text-slate-900 mt-1">Titik Lokasi Pasanggrahan</h2>
            </div>
            
            <a 
              href={activeLocation.googleMapsUrl} 
              target="_blank" 
              rel="noreferrer"
              className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-5 py-2.5 rounded-xl shadow transition flex items-center gap-2 text-xs self-start"
            >
              <ExternalLink className="w-4 h-4" /> Buka Google Maps Lengkap
            </a>
          </div>

          <div className="bg-emerald-50/50 p-4 sm:p-6 rounded-3xl border border-emerald-100 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white">
              <div className="relative h-[420px] w-full">
                <iframe 
                  title="Google Maps Real Pasanggrahan"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15843.4323214582!2d107.6978!3d-6.8995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68dd2632231ff9%3A0x501e8f1fc970340!2sPasanggrahan%2C%20Kec.%20Ujung%20Berung%2C%20Kota%20Bandung%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                  className="w-full h-full border-0"
                  allowFullScreen={false}
                  loading="lazy"
                ></iframe>

                {LOKASI_PASANGGRAHAN.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setActiveLocation(loc)}
                    style={{ top: `${loc.koordinat.y}%`, left: `${loc.koordinat.x}%` }}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-full shadow-2xl transition-all ${
                      activeLocation.id === loc.id 
                        ? 'bg-emerald-600 text-white scale-125 ring-4 ring-emerald-300' 
                        : 'bg-white text-emerald-800 hover:scale-110'
                    }`}
                  >
                    <MapPin className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-6 pt-2 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 inline-block"></span>
                <span>Sektor 1: Kebun Utama &amp; Pusat Desa</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 inline-block"></span>
                <span>Sektor 2: Area Konservasi Hutan</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 inline-block"></span>
                <span>Sektor 3: Pekarangan Warga &amp; Eko-UMKM</span>
              </div>
            </div>
          </div>
        </section>

        {/* KATALOG PRODUK EKO-WARGA / UMKM */}
        <section id="umkm" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-200">
          <div className="mb-10 space-y-2">
            <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">Hasil Bumi &amp; Olahan Ramah Lingkungan</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Katalog Eko-UMKM Pasanggrahan</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {listUmkm.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedUmkm(item)}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:border-emerald-500 cursor-pointer transition-all group shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="h-52 overflow-hidden relative">
                    <img src={item.gambar} alt={item.nama} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 bg-white/90 text-emerald-900 rounded-full border border-emerald-200">
                      {item.kategori}
                    </span>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-emerald-700 transition">{item.nama}</h3>
                    <p className="text-slate-500 text-xs">Pengelola: {item.pemilik}</p>
                    <p className="text-slate-600 text-xs line-clamp-2">{item.deskripsi}</p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-base font-black text-emerald-700">{item.harga}</span>
                  {/* TOMBOL DIGANTI JADI "LIHAT DETAIL" */}
                  <span className="text-xs bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" /> Lihat Detail
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INFO MADING & BERITA VISUAL (DESAIN BERITA VISUAL BARU DENGAN GAMBAR TAMPIL TEBAL) */}
        <section id="mading" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-200">
          <div className="mb-10 space-y-2">
            <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">Visual Mading Interaktif</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Info Mading &amp; Berita Visual Desa</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {listBerita.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedBerita(item)}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:border-emerald-500 cursor-pointer transition-all shadow-md group flex flex-col justify-between"
              >
                <div>
                  {/* TAMPILAN GAMBAR VISUAL MADING LEBIH TEGAS */}
                  <div className="h-64 overflow-hidden relative">
                    <img src={item.gambar} alt={item.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                    <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 bg-emerald-600 text-white rounded-full shadow">
                      {item.kategori}
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
                    <Info className="w-3.5 h-3.5 text-emerald-600" /> Pengumuman Resmi
                  </span>
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Baca Detail Mading <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MONITORING CCTV */}
        <section id="cctv" className="py-20 px-6 bg-slate-900 text-white border-t border-slate-800">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">Keamanan &amp; Pantauan Real-Time</span>
              <h2 className="text-3xl font-extrabold text-white">CCTV Monitoring Desa (3 Titik)</h2>
            </div>

            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <div>
                  <h3 className="font-bold text-base text-emerald-400 flex items-center gap-2">
                    <Camera className="w-5 h-5" /> {activeCCTV.nama}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{activeCCTV.lokasi}</p>
                </div>
                <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-white rounded-full animate-ping"></span> LIVE
                </span>
              </div>

              <div className="relative h-80 rounded-2xl overflow-hidden bg-black border border-slate-800">
                <img src={activeCCTV.streamUrl} alt="CCTV Stream" className="w-full h-full object-cover opacity-85" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {listCctv.map((cam) => (
                  <button
                    key={cam.id}
                    onClick={() => setActiveCCTV(cam)}
                    className={`p-4 rounded-2xl border text-xs text-left transition ${
                      activeCCTV.id === cam.id ? 'bg-emerald-950 border-emerald-500 text-emerald-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <p className="font-bold text-sm">{cam.nama}</p>
                    <p className="text-xs opacity-75 mt-1">{cam.lokasi}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* APARAT PEMERINTAHAN DESA */}
        <section id="aparat" className="py-20 px-6 max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">Pimpinan Kelurahan</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Aparat Pemerintahan Desa</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {listAparat.map((aparat) => (
              <div key={aparat.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shrink-0">
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
        <section id="lapor" className="py-20 px-6 max-w-4xl mx-auto border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">Layanan Pengawasan Lingkungan</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Lapor Kejadian &amp; Isu Lingkungan</h2>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Nama Pelapor *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Nama lengkap" 
                    value={formData.nama}
                    onChange={(e) => setFormData({...formData, nama: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-700"
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
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Isi Laporan / Isu Lingkungan *</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Tuliskan detail laporan lokasi..."
                  value={formData.isi}
                  onChange={(e) => setFormData({...formData, isi: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-sm focus:outline-none focus:border-emerald-700"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
              >
                <Send className="w-4 h-4" /> Kirimkan Laporan Lingkungan
              </button>
            </form>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="bg-emerald-950 text-emerald-200 border-t border-emerald-900 pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-xs">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <LogoKonservasi />
              <h3 className="text-base font-bold text-white">Kelurahan Pasanggrahan</h3>
            </div>
            <p className="text-xs leading-relaxed text-emerald-300">
              Sistem Informasi Desa &amp; Pemetaan Geografis Kelurahan Pasanggrahan, Ujungberung, Bandung.
            </p>
          </div>

          <div className="space-y-3">
            <h5 className="font-extrabold text-white uppercase tracking-wider text-[11px] text-emerald-400">Navigasi</h5>
            <ul className="space-y-2 text-emerald-300">
              <li><a href="#hero" className="hover:text-white transition">Beranda</a></li>
              <li><a href="#peta" className="hover:text-white transition">Pemetaan Wilayah</a></li>
              <li><a href="#umkm" className="hover:text-white transition">Katalog UMKM</a></li>
              <li><a href="#mading" className="hover:text-white transition">Info Mading &amp; Berita</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-extrabold text-white uppercase tracking-wider text-[11px] text-emerald-400">Kantor Kelurahan</h5>
            <p className="text-emerald-300 leading-relaxed">
              Jl. Pasanggrahan Utama No. 01, Ujungberung, Kota Bandung
            </p>
          </div>

          <div className="space-y-3">
            <h5 className="font-extrabold text-white uppercase tracking-wider text-[11px] text-emerald-400">Kontak Resmi</h5>
            <p className="text-emerald-300 flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-emerald-400" /> (022) 780-1234</p>
            <p className="text-emerald-300 flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-emerald-400" /> kelurahan@pasanggrahan.go.id</p>
          </div>
        </div>
      </footer>

      {/* MODAL DETAILED UMKM DENGAN RINCIAN LENGKAP */}
      {selectedUmkm && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl space-y-4 p-6 relative">
            <button onClick={() => setSelectedUmkm(null)} className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full">
              <X className="w-4 h-4 text-slate-600" />
            </button>
            <img src={selectedUmkm.gambar} alt={selectedUmkm.nama} className="w-full h-52 rounded-2xl object-cover" />
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">{selectedUmkm.kategori}</span>
              <span className="text-xs font-semibold text-slate-500">Lokasi: {selectedUmkm.lokasi}</span>
            </div>

            <div>
              <h3 className="font-black text-xl text-slate-900">{selectedUmkm.nama}</h3>
              <p className="text-xs text-emerald-700 font-bold mt-0.5">Pengelola: {selectedUmkm.pemilik}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
              <p className="text-xs font-bold text-slate-800">Detail &amp; Deskripsi Produk:</p>
              <p className="text-xs text-slate-600 leading-relaxed">{selectedUmkm.detailLengkap || selectedUmkm.deskripsi}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 block font-bold">HARGA PRODUK</span>
                <span className="font-black text-lg text-emerald-700">{selectedUmkm.harga}</span>
              </div>
              <a href={`https://wa.me/${selectedUmkm.wa}`} target="_blank" rel="noreferrer" className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-5 py-3 rounded-xl flex items-center gap-2 transition">
                <ShoppingBag className="w-4 h-4" /> Hubungi Penjual (WA)
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DETAILED BERITA MADING */}
      {selectedBerita && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl space-y-4 p-6 relative">
            <button onClick={() => setSelectedBerita(null)} className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full">
              <X className="w-4 h-4 text-slate-600" />
            </button>
            <img src={selectedBerita.gambar} alt={selectedBerita.judul} className="w-full h-60 rounded-2xl object-cover" />
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">{selectedBerita.kategori}</span>
            <h3 className="font-black text-xl text-slate-900">{selectedBerita.judul}</h3>
            <div className="flex items-center gap-4 text-xs text-slate-400 border-b border-slate-100 pb-2">
              <span>Rilis: {selectedBerita.tanggal}</span>
              <span>Penulis: {selectedBerita.penulis}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{selectedBerita.detail}</p>
          </div>
        </div>
      )}
    </div>
  );
}