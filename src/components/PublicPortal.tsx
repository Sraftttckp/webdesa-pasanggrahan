import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, Users, Store, Video, AlertCircle, 
  ChevronRight, BarChart3, Send, X, Phone, Mail, ShieldCheck,
  BookOpen, Landmark, Navigation, Play, Radio, RefreshCw,
  Search, ArrowUp, GraduationCap, Sparkles, CheckCircle2,
  HeartHandshake, Home, ArrowLeft, Upload, PartyPopper, Image as ImageIcon,
  Maximize2, Volume2, VolumeX, MessageCircle, User, Clock, Signal,
  ChevronLeft
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

// --- TYPES ---
interface UmkmItem {
  id: number;
  nama: string;
  pemilik: string;
  wa: string;
  kategori: string;
  harga: string;
  lokasi: string;
  gambar: string;
  deskripsi: string;
}

interface CctvItem {
  id: number;
  nama: string;
  lokasi: string;
  status: 'ONLINE' | 'OFFLINE';
  fps: number;
  kameraKode: string;
  thumbnail: string;
}

// --- LOGO VECTOR / SVG CLEAN REPLACE ---
const LogoCluster = () => (
  <div className="w-10 h-10 rounded-xl bg-black border border-amber-400 flex items-center justify-center p-1 shadow-md">
    <div className="w-full h-full bg-amber-400 rounded-full flex items-center justify-center relative overflow-hidden">
      <Home className="w-5 h-5 text-black stroke-[2.5]" />
    </div>
  </div>
);

// --- DATA STATISTIK DEMOGRAFI DESA ---
const DATA_DEMOGRAFI_USIA = [
  { kelompok: '0-14 Thn', jumlah: 2400 },
  { kelompok: '15-64 Thn', jumlah: 8100 },
  { kelompok: '65+ Thn', jumlah: 1950 },
];

const DATA_PENDIDIKAN = [
  { nama: 'SD / Sederajat', jumlah: 3100, color: '#3B82F6' },
  { nama: 'SMP / Sederajat', jumlah: 3800, color: '#10B981' },
  { nama: 'SMA / SMK', jumlah: 4200, color: '#F59E0B' },
  { nama: 'Diploma / Sarjana (S1+)', jumlah: 1350, color: '#8B5CF6' },
];

const DATA_STATUS_PERKAWINAN = [
  { status: 'Belum Kawin', jumlah: 4800, color: '#06B6D4' },
  { status: 'Kawin', jumlah: 6900, color: '#2563EB' },
  { status: 'Cerai Hidup / Mati', jumlah: 750, color: '#EC4899' },
];

const APARAT_DESA = [
  { nama: 'H. Sutisna, S.Sos', jabatan: 'Kepala Desa', foto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400' },
  { nama: 'Ahmad Ridwan, S.T', jabatan: 'Sekretaris Desa', foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' },
  { nama: 'Nia Kurniawati', jabatan: 'Kaur Keuangan', foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400' },
  { nama: 'Dedi Mulyadi', jabatan: 'Kasi Pelayanan', foto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400' },
];

const KATALOG_UMKM: UmkmItem[] = [
  { 
    id: 1, 
    nama: 'Keripik Tempe Ujungberung', 
    pemilik: 'Ibu Ningsih',
    wa: '6281234567890',
    kategori: 'Kuliner', 
    harga: 'Rp 15.000', 
    lokasi: 'RT 02 / RW 03, Pasanggrahan',
    gambar: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500',
    deskripsi: 'Keripik tempe olahan renyah bercita rasa gurih asli khas warga RW 03 Pasanggrahan. Dibuat dari kedelai pilihan tanpa bahan pengawet sintetik.'
  },
  { 
    id: 2, 
    nama: 'Batik Tulis Pasanggrahan', 
    pemilik: 'Bapak Maman Suherman',
    wa: '6281987654321',
    kategori: 'Kerajinan Handcrafted', 
    harga: 'Rp 150.000', 
    lokasi: 'RT 04 / RW 01, Pasanggrahan',
    gambar: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500',
    deskripsi: 'Kain batik tulis eksklusif buatan perajin lokal dengan motif dedaunan dan bukit khas lereng Gunung Manglayang Ujungberung.'
  },
  { 
    id: 3, 
    nama: 'Kopi Arabika Manglayang', 
    pemilik: 'Kang Cecep Coffee',
    wa: '6285712345678',
    kategori: 'Minuman khas', 
    harga: 'Rp 35.000', 
    lokasi: 'RW 08 Agrowisata Upper Hill',
    gambar: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500',
    deskripsi: 'Biji kopi arabika petik merah pilihan yang ditanam langsung di ketinggian lereng Gunung Manglayang. Memiliki aroma fruity khas dan body yang halus.'
  },
];

const DATA_CCTV: CctvItem[] = [
  {
    id: 1,
    nama: 'CAM-01: Perumahan Pasanggrahan',
    lokasi: 'Gerbang Utama Pasanggrahan Hill / RW 04',
    status: 'ONLINE',
    fps: 30,
    kameraKode: 'PSG-CAM-001-NORTH',
    thumbnail: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    nama: 'CAM-02: Simpang Alun-Alun Ujungberung',
    lokasi: 'Pertigaan AH. Nasution - Pasanggrahan',
    status: 'ONLINE',
    fps: 25,
    kameraKode: 'PSG-CAM-002-MAIN',
    thumbnail: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    nama: 'CAM-03: Halaman Balai Desa',
    lokasi: 'Area Pelayanan Public / Kantor Desa',
    status: 'ONLINE',
    fps: 30,
    kameraKode: 'PSG-CAM-003-OFFICE',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop'
  },
  {
    id: 4,
    nama: 'CAM-04: Jalur Wisata Manglayang',
    lokasi: 'Perbatasan Atas / Area Agrowisata',
    status: 'ONLINE',
    fps: 24,
    kameraKode: 'PSG-CAM-004-HILL',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop'
  }
];

export function PublicPortal() {
  const [formData, setFormData] = useState({ 
    nama: '', 
    hp: '', 
    kategori: 'Infrastruktur / Fasilitas Umum',
    lokasi: '',
    isi: '' 
  });
  
  // State Upload Gambar Pengaduan
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State Modals & CCTV Scroll Ref
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedUmkm, setSelectedUmkm] = useState<UmkmItem | null>(null);
  const [selectedCctv, setSelectedCctv] = useState<CctvItem | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const cctvContainerRef = useRef<HTMLDivElement>(null);

  // Time & Filter
  const [currentTime, setCurrentTime] = useState<string>('');
  const [searchCctv, setSearchCctv] = useState<string>('');
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Live Clock
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleString('id-ID', { 
        dateStyle: 'medium', 
        timeStyle: 'medium' 
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Back To Top Scroll Handler
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // CCTV Scroll Button Handlers
  const scrollCctvLeft = () => {
    if (cctvContainerRef.current) {
      cctvContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollCctvRight = () => {
    if (cctvContainerRef.current) {
      cctvContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSelectedImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.nama && formData.isi) {
      setIsSuccessModalOpen(true);
    }
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setFormData({ 
      nama: '', 
      hp: '', 
      kategori: 'Infrastruktur / Fasilitas Umum',
      lokasi: '',
      isi: '' 
    });
    removeSelectedImage();
  };

  const filteredCctv = DATA_CCTV.filter((cam) =>
    cam.nama.toLowerCase().includes(searchCctv.toLowerCase()) ||
    cam.lokasi.toLowerCase().includes(searchCctv.toLowerCase()) ||
    cam.kameraKode.toLowerCase().includes(searchCctv.toLowerCase())
  );

  return (
    <div className="scroll-smooth min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white flex flex-col justify-between relative">
      
      <div>
        {/* NAVBAR */}
        <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-3 shadow-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            
            {/* LOGO */}
            <div className="flex items-center gap-3">
              <LogoCluster />
              <div>
                <h1 className="font-extrabold text-lg leading-tight tracking-tight text-slate-900 flex items-center gap-1.5">
                  Desa Pasanggrahan <Sparkles className="w-4 h-4 text-amber-500 inline" />
                </h1>
                <p className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase flex items-center gap-1">
                  <Landmark className="w-3 h-3 text-blue-600 inline" /> Kecamatan Ujungberung
                </p>
              </div>
            </div>
            
            {/* NAV LINKS */}
            <div className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600">
              <a href="#hero" className="hover:text-blue-600 transition-colors">Beranda</a>
              <a href="#profil" className="hover:text-blue-600 transition-colors">Profil Desa</a>
              <a href="#aparat" className="hover:text-blue-600 transition-colors">Aparat Desa</a>
              <a href="#statistik" className="hover:text-blue-600 transition-colors">Statistik</a>
              <a href="#umkm" className="hover:text-blue-600 transition-colors">Katalog UMKM</a>
              <a href="#cctv" className="hover:text-blue-600 transition-colors flex items-center gap-1 text-rose-600">
                <Video className="w-4 h-4" /> CCTV Live
              </a>
              <a href="#pengaduan" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-md font-semibold flex items-center gap-2">
                <Send className="w-3.5 h-3.5" /> Lapor / Pengaduan
              </a>
            </div>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section id="hero" className="relative py-24 sm:py-28 px-6 overflow-hidden bg-slate-900">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 filter brightness-90 scale-105"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1600&auto=format&fit=crop')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-blue-950/70"></div>

          <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-6 text-white">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-md text-blue-300 border border-blue-400/30 px-4 py-1.5 rounded-full text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5 text-blue-400" /> Kec. Ujungberung, Kota Bandung
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Layanan Digital Terpadu <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                  Desa Pasanggrahan
                </span>
              </h1>
              
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Portal pelayanan publik transparan, terintegrasi, dan berbasis Smart Village untuk memfasilitasi kebutuhan seluruh warga Pasanggrahan.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <h4 className="text-sm font-bold text-blue-400 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" /> Visi Utama
                  </h4>
                  <p className="text-xs text-slate-300">Mewujudkan Desa Pasanggrahan yang Mandiri, Sejahtera, dan Berbudaya berbasis Digital.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <h4 className="text-sm font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Misi Unggulan
                  </h4>
                  <p className="text-xs text-slate-300">Optimalisasi transparansi administrasi desa &amp; pemberdayaan ekonomi UMKM warga.</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <a href="#pengaduan" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-blue-500/30">
                  Layanan Pengaduan
                </a>
                <a href="#cctv" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all shadow-sm flex items-center gap-2">
                  <Video className="w-4 h-4 text-rose-400" /> Pantau CCTV Live
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 hidden lg:block">
              <div className="bg-slate-900/80 backdrop-blur-xl p-3 rounded-3xl border border-white/10 shadow-2xl space-y-3">
                <div className="flex items-center justify-between px-3 pt-1">
                  <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-rose-400" /> Wilayah Desa Pasanggrahan
                  </span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2.5 py-0.5 rounded-full font-bold">LIVE MAP</span>
                </div>
                <div className="w-full h-72 rounded-2xl overflow-hidden relative border border-white/10">
                  <iframe 
                    title="Peta Pasanggrahan Ujungberung"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15843.084120935574!2d107.6934!3d-6.9061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68dd233306bc85%3A0x8681d45466c1b3f!2sPasanggrahan%2C%20Kec.%20Ujungberung%2C%20Kota%20Bandung%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid" 
                    className="w-full h-full border-0 filter opacity-90 contrast-125"
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROFIL DESA SECTION */}
        <section id="profil" className="py-20 px-6 max-w-7xl mx-auto border-b border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">Tentang Kami</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Profil Desa Pasanggrahan</h2>
            <p className="text-slate-600 text-sm">Mengenal lebih dekat kawasan legendaris di kaki Gunung Manglayang</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 h-80 lg:h-full min-h-[320px] group">
              <img 
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop" 
                alt="Pemandangan Desa Pasanggrahan" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="bg-blue-600/80 backdrop-blur-md text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  Suasana Wilayah
                </span>
                <h4 className="text-lg font-bold">Lereng Pegunungan Manglayang</h4>
                <p className="text-xs text-slate-300">Udara sejuk, asri, serta kaya nilai sejarah &amp; budaya Sunda.</p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                <BookOpen className="w-5 h-5" /> Sejarah &amp; Gambaran Umum
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Kawasan Aset Budaya &amp; Agrowisata Ujungberung</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Desa Pasanggrahan terletak di lereng selatan Gunung Manglayang, Kecamatan Ujungberung, Kota Bandung. Secara historis, nama "Pasanggrahan" merujuk pada tempat peristirahatan era terdahulu karena udaranya yang sejuk dan pemandangan alamnya yang asri.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Kini, Pasanggrahan terus berkembang menjadi kawasan permukiman yang dinamis dengan mempertahankan tradisi seni budaya Sunda seperti Benjang dan Reak, serta menumbuhkan sektor UMKM berbasis komunitas lokal.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
                <div className="bg-slate-50 p-3 rounded-2xl text-center border border-slate-200/60">
                  <Landmark className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <span className="block text-lg font-black text-slate-900">14 RW</span>
                  <span className="text-[11px] text-slate-500 font-medium">Wilayah</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl text-center border border-slate-200/60">
                  <Navigation className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                  <span className="block text-lg font-black text-slate-900">12.450</span>
                  <span className="text-[11px] text-slate-500 font-medium">Penduduk</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl text-center border border-slate-200/60">
                  <Users className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                  <span className="block text-lg font-black text-slate-900">68 RT</span>
                  <span className="text-[11px] text-slate-500 font-medium">Rukun Tetangga</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl text-center border border-slate-200/60">
                  <Store className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                  <span className="block text-lg font-black text-slate-900">120+</span>
                  <span className="text-[11px] text-slate-500 font-medium">UMKM</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* APARAT PEMERINTAHAN DESA */}
        <section id="aparat" className="py-20 px-6 max-w-7xl mx-auto border-b border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">Struktur Hierarki</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Aparat Pemerintahan Desa</h2>
            <p className="text-slate-600 text-sm">Aparat pelayan masyarakat yang berdedikasi membangun Pasanggrahan</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {APARAT_DESA.map((aparat, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-300 hover:shadow-md transition-all group">
                <div className="h-60 overflow-hidden relative">
                  <img src={aparat.foto} alt={aparat.nama} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                </div>
                <div className="p-5 text-center relative -mt-6">
                  <span className="inline-block bg-blue-600 text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm mb-2">
                    {aparat.jabatan}
                  </span>
                  <h3 className="font-bold text-slate-800 text-base">{aparat.nama}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STATISTIK DEMOGRAFI DESA */}
        <section id="statistik" className="py-20 px-6 max-w-7xl mx-auto border-b border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">Data Kependudukan Terpadu</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Statistik Desa Pasanggrahan</h2>
            <p className="text-slate-600 text-sm">Visualisasi indikator sosial &amp; demografi warga desa</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-purple-600" /> Tingkat Pendidikan
                </h3>
                <p className="text-xs text-slate-500 mb-4">Pendidikan terakhir warga terdaftar</p>
              </div>

              <div className="h-56 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={DATA_PENDIDIKAN}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="jumlah"
                    >
                      {DATA_PENDIDIKAN.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs text-slate-400 font-bold">Total</span>
                  <span className="text-sm font-black text-slate-800">12.450</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-[11px]">
                {DATA_PENDIDIKAN.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></span>
                    <span className="text-slate-600 truncate">{item.nama}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" /> Kelompok Usia
                </h3>
                <p className="text-xs text-slate-500 mb-4">Rentang umur produktif &amp; non-produktif</p>
              </div>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DATA_DEMOGRAFI_USIA}>
                    <XAxis dataKey="kelompok" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#0f172a' }} />
                    <Bar dataKey="jumlah" fill="#2563EB" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
                <span>Usia Produktif (15-64):</span>
                <span className="font-bold text-blue-600">65% (8.100 Jiwa)</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-rose-500" /> Status Perkawinan
                </h3>
                <p className="text-xs text-slate-500 mb-4">Klasifikasi status pernikahan warga</p>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DATA_STATUS_PERKAWINAN}>
                    <XAxis dataKey="status" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px' }} />
                    <Bar dataKey="jumlah" fill="#06B6D4" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1">
                <GraduationCap className="w-4 h-4 text-slate-400" /> Sumber: Sensus Administrasi Desa
              </div>
            </div>
          </div>
        </section>

        {/* KATALOG UMKM - WARGA */}
        <section id="umkm" className="py-20 px-6 max-w-7xl mx-auto border-b border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-600 tracking-wider uppercase">Ekonomi Kreatif Warga</span>
              <h2 className="text-3xl font-extrabold text-slate-900">Katalog UMKM Warga</h2>
              <p className="text-slate-600 text-sm">Klik kartu produk untuk melihat detail lengkap, lokasi perajin, &amp; tombol kontak WhatsApp</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {KATALOG_UMKM.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedUmkm(item)}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:border-emerald-400 cursor-pointer transition-all hover:-translate-y-1.5 duration-300 group shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="h-56 overflow-hidden relative">
                    <img src={item.gambar} alt={item.nama} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 bg-white/90 backdrop-blur-md text-emerald-800 rounded-full border border-emerald-200 shadow-sm">
                      {item.kategori}
                    </span>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="font-bold text-xl text-slate-900 group-hover:text-emerald-600 transition-colors">{item.nama}</h3>
                    <p className="text-slate-500 text-xs flex items-center gap-1 font-medium">
                      <User className="w-3.5 h-3.5 text-slate-400" /> {item.pemilik}
                    </p>
                    <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">{item.deskripsi}</p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-base font-black text-emerald-600">{item.harga}</span>
                  <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-3 py-1.5 rounded-xl border border-emerald-200/60 group-hover:bg-emerald-600 group-hover:text-white transition-all flex items-center gap-1">
                    Lihat Detail <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CCTV LIVE INTERAKTIF - HORIZONTAL SCROLLING LAYOUT */}
        <section id="cctv" className="py-20 px-6 max-w-7xl mx-auto border-b border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-rose-600 tracking-wider uppercase flex items-center gap-1">
                <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" /> Smart Surveillance Desa
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
                <Video className="w-7 h-7 text-rose-600" /> Live Stream CCTV Publik
              </h2>
              <p className="text-slate-600 text-sm">Geser/scroll ke kanan untuk memantau seluruh sudut kamera wilayah desa</p>
            </div>

            {/* Navigasi Scroll Panah Kiri - Kanan */}
            <div className="flex items-center gap-2">
              <button 
                onClick={scrollCctvLeft}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-3 rounded-2xl border border-slate-300 transition-all shadow-sm active:scale-95"
                title="Geser Kiri"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={scrollCctvRight}
                className="bg-slate-900 hover:bg-slate-800 text-white p-3 rounded-2xl border border-slate-700 transition-all shadow-md active:scale-95 flex items-center gap-1.5 font-bold text-xs"
                title="Geser Kanan"
              >
                Geser Kanan <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mb-6">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Cari lokasi / kode CCTV..."
                value={searchCctv}
                onChange={(e) => setSearchCctv(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-8 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 shadow-sm transition-all"
              />
              {searchCctv && (
                <button 
                  onClick={() => setSearchCctv('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* HORIZONTAL CAROUSEL SCROLL CONTAINER */}
          <div className="bg-slate-950 p-4 sm:p-6 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
            <div 
              ref={cctvContainerRef}
              className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900 pb-2 pt-1"
              style={{ scrollbarWidth: 'thin' }}
            >
              {filteredCctv.map((cam) => (
                <div 
                  key={cam.id}
                  onClick={() => setSelectedCctv(cam)}
                  className="snap-start flex-none w-[300px] sm:w-[360px] relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-rose-500 cursor-pointer transition-all group aspect-video flex flex-col justify-between p-3.5 select-none shadow-lg hover:shadow-rose-500/20"
                >
                  {/* Visual Video Thumbnail */}
                  <img 
                    src={cam.thumbnail} 
                    alt={cam.nama} 
                    className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 group-hover:opacity-90 transition-all duration-500 filter brightness-90 contrast-110" 
                  />
                  
                  {/* HUD Overlay Top */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-white border border-white/10">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block"></span>
                      <span className="font-bold text-rose-400">REC</span>
                      <span className="text-slate-300">{cam.kameraKode}</span>
                    </div>
                    <div className="bg-black/70 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-mono text-emerald-400 flex items-center gap-1 border border-white/10">
                      <Signal className="w-3 h-3" /> {cam.fps} FPS
                    </div>
                  </div>

                  {/* Center Play Icon Hover */}
                  <div className="relative z-10 flex items-center justify-center my-auto">
                    <div className="w-11 h-11 rounded-full bg-rose-600/90 text-white backdrop-blur-md flex items-center justify-center group-hover:scale-125 transition-transform shadow-lg shadow-rose-600/40">
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* HUD Overlay Bottom */}
                  <div className="relative z-10 bg-black/80 backdrop-blur-md p-2.5 rounded-xl border border-white/10 flex justify-between items-end">
                    <div className="space-y-0.5 max-w-[70%]">
                      <p className="text-xs font-bold text-white tracking-wide truncate">{cam.nama}</p>
                      <p className="text-[10px] text-slate-300 flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-rose-400 flex-shrink-0" /> {cam.lokasi}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-[9px] bg-rose-500/20 text-rose-300 font-bold px-2 py-0.5 rounded border border-rose-500/30 block">
                        KLIK STREAM
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LAYANAN PENGADUAN & UPLOAD FOTO */}
        <section id="pengaduan" className="py-20 px-6 max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">Layanan Masyarakat</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Formulir Laporan &amp; Pengaduan</h2>
            <p className="text-slate-600 text-sm">Sampaikan keluhan, aspirasi, atau masukan untuk perbaikan Desa Pasanggrahan</p>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Nama Lengkap *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Masukkan nama Anda" 
                    value={formData.nama}
                    onChange={(e) => setFormData({...formData, nama: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Nomor WhatsApp / HP *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="08xxxxxxxxxx" 
                    value={formData.hp}
                    onChange={(e) => setFormData({...formData, hp: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Kategori Laporan</label>
                  <select 
                    value={formData.kategori}
                    onChange={(e) => setFormData({...formData, kategori: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                  >
                    <option>Infrastruktur / Fasilitas Umum</option>
                    <option>Kebersihan &amp; Sampah</option>
                    <option>Keamanan &amp; Ketertiban</option>
                    <option>Pelayanan Administrasi</option>
                    <option>Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Lokasi Kejadian (Opsional)</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: RT 02 / RW 05" 
                    value={formData.lokasi}
                    onChange={(e) => setFormData({...formData, lokasi: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Isi Laporan / Pengaduan *</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Jelaskan detail laporan Anda secara rinci..."
                  value={formData.isi}
                  onChange={(e) => setFormData({...formData, isi: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                ></textarea>
              </div>

              {/* UPLOAD FILE LAMPIRAN FOTO */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Lampiran Foto Bukti (Opsional)</label>
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />

                {!imagePreview ? (
                  <button 
                    type="button" 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-blue-50/50 p-5 rounded-2xl flex flex-col items-center justify-center transition-all group"
                  >
                    <Upload className="w-8 h-8 text-slate-400 group-hover:text-blue-600 mb-2 transition-colors" />
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600">Klik untuk memilih foto dari galeri / file</span>
                    <span className="text-xs text-slate-400 mt-1">Format: JPG, PNG, atau WEBP (Maks 5MB)</span>
                  </button>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 h-48 flex items-center justify-center">
                    <img src={imagePreview} alt="Preview Foto Bukti" className="h-full w-full object-cover" />
                    <button 
                      type="button" 
                      onClick={removeSelectedImage}
                      className="absolute top-3 right-3 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 transition-colors shadow-md"
                      title="Hapus foto"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-2 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-medium flex items-center gap-1">
                      <ImageIcon className="w-3 h-3 text-emerald-400" /> {selectedFile?.name}
                    </div>
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-base"
              >
                <Send className="w-5 h-5" /> Kirim Laporan Sekarang
              </button>
            </form>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <LogoCluster />
              <h3 className="text-lg font-bold text-white">Desa Pasanggrahan</h3>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Kecamatan Ujungberung, Kota Bandung, Jawa Barat. Layanan portal digital publik yang transparan &amp; terpadu.
            </p>
          </div>
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white text-sm">Kontak Darurat</h4>
            <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-blue-400" /> (022) 780-XXXX (Kantor Desa)</p>
            <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-blue-400" /> desapasanggrahan.ujungberung@gmail.com</p>
          </div>
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white text-sm">Jam Operasional Pelayanan</h4>
            <p>Senin - Jumat: 08.00 - 15.30 WIB</p>
            <p>Sabtu - Minggu / Hari Libur: Tutup</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Desa Pasanggrahan Ujungberung. All rights reserved.
        </div>
      </footer>

      {/* MODAL SUCCESS PENGADUAN */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-4 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <PartyPopper className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Laporan Berhasil Terkirim!</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Terima kasih <span className="font-bold">{formData.nama}</span>. Laporan Anda telah tercatat dan akan ditindaklanjuti oleh aparat Desa Pasanggrahan.
            </p>
            <button 
              onClick={closeSuccessModal}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors"
            >
              Selesai &amp; Tutup
            </button>
          </div>
        </div>
      )}

      {/* MODAL FULLSCREEN CCTV MONITORING */}
      {selectedCctv && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-4xl w-full overflow-hidden text-white shadow-2xl flex flex-col justify-between">
            {/* Modal Header */}
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSelectedCctv(null)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white p-2 rounded-xl transition-all flex items-center gap-1.5 text-xs font-semibold"
                >
                  <ArrowLeft className="w-4 h-4" /> Kembali
                </button>
                <div>
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <Video className="w-4 h-4 text-rose-500" /> {selectedCctv.nama}
                  </h3>
                  <p className="text-[11px] text-slate-400">{selectedCctv.lokasi}</p>
                </div>
              </div>

              <button 
                onClick={() => setSelectedCctv(null)}
                className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Display */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <img src={selectedCctv.thumbnail} alt={selectedCctv.nama} className="w-full h-full object-cover filter brightness-95" />
              
              {/* Top Video Overlay HUD */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-mono text-white flex items-center gap-2 border border-white/10">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                  <span className="font-bold text-rose-400">LIVE MONITORING</span>
                  <span>|</span>
                  <span>{selectedCctv.kameraKode}</span>
                </div>
                <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-mono text-emerald-400 border border-white/10">
                  {currentTime || '00:00:00'}
                </div>
              </div>

              {/* Bottom Video Controls */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-300 font-mono font-bold flex items-center gap-1">
                    <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> 1080p HD
                  </span>
                  <span className="text-xs text-slate-400">FPS: {selectedCctv.fps}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                  </button>
                  <button 
                    onClick={() => setSelectedCctv(null)}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors"
                  >
                    Tutup Live
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL UMKM DETAIL SANGAT LENGKAP */}
      {selectedUmkm && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl space-y-5 p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            
            {/* Header / Tombol Kembali */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <button 
                onClick={() => setSelectedUmkm(null)}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 bg-slate-100 px-3 py-1.5 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Kembali
              </button>
              <button 
                onClick={() => setSelectedUmkm(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Gambar Produk */}
            <div className="h-56 rounded-2xl overflow-hidden relative shadow-md">
              <img src={selectedUmkm.gambar} alt={selectedUmkm.nama} className="w-full h-full object-cover" />
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                {selectedUmkm.kategori}
              </span>
            </div>

            {/* Nama & Harga */}
            <div>
              <h3 className="text-2xl font-black text-slate-900">{selectedUmkm.nama}</h3>
              <p className="text-emerald-600 font-extrabold text-xl mt-1">{selectedUmkm.harga}</p>
            </div>

            {/* Deskripsi */}
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Deskripsi Produk</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200/60">
                {selectedUmkm.deskripsi}
              </p>
            </div>

            {/* Identitas Pemilik & WhatsApp */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                  <span className="text-slate-400 block font-medium">Pemilik / Toko</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                    <User className="w-3.5 h-3.5 text-blue-600" /> {selectedUmkm.pemilik}
                  </span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                  <span className="text-slate-400 block font-medium">Lokasi Usaha</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" /> {selectedUmkm.lokasi}
                  </span>
                </div>
              </div>

              <a 
                href={`https://wa.me/${selectedUmkm.wa}?text=Halo%20${encodeURIComponent(selectedUmkm.pemilik)},%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(selectedUmkm.nama)}%20di%20Portal%20Desa%20Pasanggrahan.`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
              >
                <MessageCircle className="w-4 h-4" /> Hubungi Penjual via WhatsApp
              </a>
            </div>

          </div>
        </div>
      )}

      {/* FLOATING BACK TO TOP BUTTON */}
      {showBackToTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3.5 rounded-full shadow-2xl hover:bg-blue-700 transition-all z-40 hover:scale-110"
          title="Kembali ke atas"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
}