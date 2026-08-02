import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, Users, Store, Video, 
  ChevronRight, BarChart3, Send, X, Phone, Mail,
  BookOpen, Landmark, Play, Radio,
  Search, ArrowUp, GraduationCap, Sparkles, 
  HeartHandshake, Home, ArrowLeft, Upload, PartyPopper, Image as ImageIcon,
  Volume2, VolumeX, MessageCircle, User, Signal,
  ChevronLeft, Compass, Cpu, Layers, Newspaper, Target, Navigation,
  ShieldCheck, LayoutDashboard, FileText, Trash2, Edit, PlusCircle, LogOut, Lock, Eye, EyeOff
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

interface BeritaItem {
  id: number;
  kategori: string;
  judul: string;
  kutipan: string;
  detail: string;
  tanggal: string;
  penulis: string;
  gambar: string;
}

interface PengaduanItem {
  id: number;
  nama: string;
  hp: string;
  kategori: string;
  lokasi: string;
  isi: string;
  tanggal: string;
  status: 'PENDING' | 'DIPROSES' | 'SELESAI';
}

// --- LOGO VECTOR ---
const LogoCluster = () => (
  <div className="w-10 h-10 rounded-xl bg-emerald-900 border border-emerald-400/40 flex items-center justify-center p-1 shadow-md">
    <div className="w-full h-full bg-emerald-600 rounded-full flex items-center justify-center relative overflow-hidden">
      <Home className="w-5 h-5 text-emerald-50 stroke-[2.5]" />
    </div>
  </div>
);

// --- KOMPONEN PETA VEKTOR SVG CUSTOM (DENGAN TOMBOL NAVIGASI GPS) ---
const InteractiveVectorMap = () => {
  const [selectedRw, setSelectedRw] = useState<string | null>('RW 03');
  const [clickedLocationName, setClickedLocationName] = useState<string>("RW 03 - Alun-Alun Timur (Klik area lain pada peta untuk cek nama tempat)");
  
  const [layers, setLayers] = useState({
    batasRW: true,
    fasum: true,
    cctv: true,
    pju: true,
  });

  const [activeArea, setActiveArea] = useState<{
    nama: string;
    luas: string;
    populasi: string;
    kk: string;
    rumah: string;
  } | null>({
    nama: "RW 03 Kelurahan Pasanggrahan",
    luas: "0.5 km²",
    populasi: "5.420 Jiwa",
    kk: "1.200 KK",
    rumah: "380 Unit",
  });

  const toggleLayer = (key: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const rwData = [
    { id: 'RW 01', name: 'RW 01 - Kawasan Pasanggrahan Atas & Perbukitan', color: 'fill-emerald-500/30 stroke-emerald-400', path: 'M 30,30 L 140,25 L 160,90 L 50,110 Z', pop: '5.120 Jiwa', kk: '1.150 KK', luas: '0.6 km²', rumah: '410 Unit' },
    { id: 'RW 02', name: 'RW 02 - Manglayang Hill & Sentra Warga', color: 'fill-cyan-500/30 stroke-cyan-400', path: 'M 140,25 L 270,35 L 250,120 L 160,90 Z', pop: '5.800 Jiwa', kk: '1.280 KK', luas: '0.8 km²', rumah: '490 Unit' },
    { id: 'RW 03', name: 'RW 03 - Alun-Alun Timur & Permukiman Padat', color: 'fill-blue-500/30 stroke-blue-400', path: 'M 50,110 L 160,90 L 150,180 L 40,170 Z', pop: '5.420 Jiwa', kk: '1.200 KK', luas: '0.5 km²', rumah: '380 Unit' },
    { id: 'RW 04', name: 'RW 04 - Sektor Perumahan Ujungberung Permai', color: 'fill-purple-500/30 stroke-purple-400', path: 'M 160,90 L 250,120 L 280,185 L 150,180 Z', pop: '5.356 Jiwa', kk: '1.156 KK', luas: '0.9 km²', rumah: '620 Unit' },
  ];

  const handleSelectRw = (rw: typeof rwData[0]) => {
    setSelectedRw(rw.id);
    setClickedLocationName(rw.name);
    setActiveArea({
      nama: rw.name,
      luas: rw.luas,
      populasi: rw.pop,
      kk: rw.kk,
      rumah: rw.rumah,
    });
  };

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (x < 150 && y < 110) {
      setClickedLocationName("Titik Lokasi: Sektor RT 01/RW 01 (Dekat Jalur Pendakian Manglayang)");
    } else if (x >= 150 && y < 110) {
      setClickedLocationName("Titik Lokasi: Sektor RT 03/RW 02 (Kawasan Manglayang Hill)");
    } else if (x < 150 && y >= 110) {
      setClickedLocationName("Titik Lokasi: Sektor RT 02/RW 03 (Dekat Alun-Alun & Fasilitas Umum)");
    } else {
      setClickedLocationName("Titik Lokasi: Sektor RT 04/RW 04 (Kawasan Perumahan Warga)");
    }
  };

  const handleTriggerGpsNavigation = () => {
    alert(`Mengarahkan rute GPS menuju: ${clickedLocationName}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full">
      <div className="bg-white border border-slate-200 p-4 rounded-3xl space-y-3 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 mb-3">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">Filter Layer Peta</span>
          </div>
          
          <div className="space-y-2 text-xs">
            <label className="flex items-center justify-between p-2 rounded-2xl bg-slate-50 hover:bg-emerald-50/50 cursor-pointer border border-slate-200/60 transition">
              <span className="text-slate-700 flex items-center gap-1.5 font-medium">🗺️ Batas RW &amp; RT</span>
              <input type="checkbox" checked={layers.batasRW} onChange={() => toggleLayer('batasRW')} className="accent-emerald-600 w-4 h-4 cursor-pointer" />
            </label>

            <label className="flex items-center justify-between p-2 rounded-2xl bg-slate-50 hover:bg-emerald-50/50 cursor-pointer border border-slate-200/60 transition">
              <span className="text-slate-700 flex items-center gap-1.5 font-medium">🏛️ Fasilitas Umum / Aset</span>
              <input type="checkbox" checked={layers.fasum} onChange={() => toggleLayer('fasum')} className="accent-blue-600 w-4 h-4 cursor-pointer" />
            </label>

            <label className="flex items-center justify-between p-2 rounded-2xl bg-slate-50 hover:bg-emerald-50/50 cursor-pointer border border-slate-200/60 transition">
              <span className="text-slate-700 flex items-center gap-1.5 font-medium">📷 Titik CCTV Pengawas</span>
              <input type="checkbox" checked={layers.cctv} onChange={() => toggleLayer('cctv')} className="accent-rose-600 w-4 h-4 cursor-pointer" />
            </label>

            <label className="flex items-center justify-between p-2 rounded-2xl bg-slate-50 hover:bg-emerald-50/50 cursor-pointer border border-slate-200/60 transition">
              <span className="text-slate-700 flex items-center gap-1.5 font-medium">💡 PJU (Lampu Jalan)</span>
              <input type="checkbox" checked={layers.pju} onChange={() => toggleLayer('pju')} className="accent-amber-500 w-4 h-4 cursor-pointer" />
            </label>
          </div>
        </div>

        <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200/60 text-[11px] text-emerald-900">
          <p className="font-bold mb-0.5">💡 Info Interaktif:</p>
          <p className="text-slate-600">Klik area pada peta untuk melihat informasi rinci zonasi wilayah.</p>
        </div>
      </div>

      <div className="lg:col-span-3 relative bg-slate-900 border border-slate-800 rounded-3xl p-4 overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40"></div>
        
        <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2 relative z-10">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-emerald-300 tracking-wider uppercase">Peta Digital Zonasi Pasanggrahan</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-[10px] font-mono text-slate-400">COMMAND CENTER UJUNGBERUNG</span>
          </div>
        </div>

        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
          <button 
            onClick={handleTriggerGpsNavigation}
            className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-2 rounded-xl text-xs font-bold shadow-lg transition-all border border-emerald-500/50 active:scale-95"
            title="Navigasi ke Lokasi Terpilih"
          >
            <Navigation className="w-4 h-4 animate-pulse" /> Navigasi GPS
          </button>

          <div className="absolute top-3 right-3 z-20 flex flex-col items-center bg-slate-900/90 border border-slate-700 p-1.5 rounded-xl text-emerald-400 shadow-md">
            <Compass className="w-5 h-5 animate-spin-slow" />
            <span className="text-[9px] font-mono font-bold mt-0.5">U</span>
          </div>

          <svg viewBox="0 0 300 200" onClick={handleSvgClick} className="w-full h-full relative z-10 cursor-crosshair">
            <path d="M 10,100 Q 150,80 290,110" stroke="#059669" strokeWidth="3" fill="none" strokeDasharray="4 2" />
            <path d="M 150,10 L 150,190" stroke="#059669" strokeWidth="2" fill="none" strokeDasharray="2 2" />

            {rwData.map((rw) => (
              <g key={rw.id} onClick={(e) => { e.stopPropagation(); handleSelectRw(rw); }} className="cursor-pointer group">
                {layers.batasRW && (
                  <path 
                    d={rw.path} 
                    className={`${rw.color} stroke-[1.5] transition-all duration-300 group-hover:fill-emerald-400/50 group-hover:stroke-white ${selectedRw === rw.id ? 'fill-emerald-400/40 stroke-emerald-200 stroke-[2.5]' : ''}`}
                  />
                )}
              </g>
            ))}

            {layers.fasum && (
              <g transform="translate(150, 90)" className="pointer-events-none">
                <circle r="6" fill="#3b82f6" className="animate-ping opacity-75" />
                <circle r="4" fill="#3b82f6" />
                <text x="8" y="4" fill="#93c5fd" fontSize="7" fontWeight="bold" fontFamily="sans-serif">Kantor Kelurahan</text>
              </g>
            )}

            {layers.cctv && (
              <g transform="translate(80, 50)" className="pointer-events-none">
                <circle r="4" fill="#ef4444" />
                <text x="6" y="3" fill="#fca5a5" fontSize="6" fontFamily="sans-serif">CCTV-01</text>
              </g>
            )}

            {layers.pju && (
              <g transform="translate(210, 130)" className="pointer-events-none">
                <circle r="3.5" fill="#f59e0b" className="animate-pulse" />
                <text x="6" y="3" fill="#fde68a" fontSize="6" fontFamily="sans-serif">PJU-03</text>
              </g>
            )}
          </svg>

          <div className="absolute bottom-3 left-3 right-3 bg-slate-900/95 backdrop-blur-md p-3 rounded-2xl border border-emerald-500/40 shadow-2xl text-xs space-y-1 z-20">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <MapPin className="w-3.5 h-3.5 text-rose-500" /> {clickedLocationName}
            </div>
            {activeArea && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] text-slate-300 border-t border-slate-800">
                <div>Luas: <strong className="text-white">{activeArea.luas}</strong></div>
                <div>Populasi: <strong className="text-emerald-300">{activeArea.populasi}</strong></div>
                <div>Jumlah KK: <strong className="text-amber-300">{activeArea.kk}</strong></div>
                <div>Rumah: <strong className="text-white">{activeArea.rumah}</strong></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- DATA STATISTIK KELURAHAN PASANGGRAHAN, UJUNGBERUNG ---
const DATA_DEMOGRAFI_USIA = [
  { kelompok: '0-14 Thn', jumlah: 4850 },
  { kelompok: '15-64 Thn', jumlah: 14726 },
  { kelompok: '65+ Thn', jumlah: 2120 },
];

const DATA_PENDIDIKAN = [
  { nama: 'SD / Sederajat', jumlah: 5100, color: '#3B82F6' },
  { nama: 'SMP / Sederajat', jumlah: 5900, color: '#10B981' },
  { nama: 'SMA / SMK', jumlah: 6986, color: '#F59E0B' },
  { nama: 'Diploma / Sarjana (S1+)', jumlah: 3710, color: '#8B5CF6' },
];

const DATA_STATUS_PERKAWINAN = [
  { status: 'Belum Kawin', jumlah: 7700, color: '#06B6D4' },
  { status: 'Kawin', jumlah: 12750, color: '#2563EB' },
  { status: 'Cerai Hidup / Mati', jumlah: 1246, color: '#EC4899' },
];

const APARAT_DESA = [
  { nama: 'Abriwansyah Fitri, AP, S.Sos, M.AP', jabatan: 'Camat Ujungberung', kontak: '(022) 7800003' },
  { nama: 'Ulfah Sari, SE, Ak, M.M', jabatan: 'Lurah Pasanggrahan', kontak: ' (022) 7850004' },
  { nama: 'Sekretaris pasanggrahan', jabatan: 'Sekcam Ujungberung', kontak: '(022) 7854006' },
  { nama: 'Kasi Kesejahteraan Sosial', jabatan: 'Kesos Ujungberung', kontak: '(022) 7852007' },
];

// --- BERITA LOKAL ---
const BERITA_LOKAL: BeritaItem[] = [
  {
    id: 1,
    kategori: 'Kebudayaan & Seni Tradisional',
    judul: 'Pelestarian Seni Benjang dan Pembinaan Sanggar Muda Pasanggrahan',
    kutipan: 'Kelurahan Pasanggrahan bekerjasama dengan tokoh adat Ujungberung menggelar pelatihan pertunjukan seni tradisional bagi para pemuda RW setempat...',
    detail: 'Kegiatan pelestarian seni bela diri dan pertunjukan tradisional Benjang ini diselenggarakan di aula terbuka Kelurahan Pasanggrahan. Acara ini dihadiri oleh para sesepuh seniman Ujungberung dan puluhan pemuda dari RW 01 hingga RW 04. Tujuannya adalah menjaga warisan budaya leluhur agar tidak punah di tengah arus modernisasi, sekaligus menjadikannya agenda pariwisata budaya unggulan di kaki Gunung Manglayang.',
    tanggal: '02 Agustus 2026',
    penulis: 'Admin Kelurahan Pasanggrahan',
    gambar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop'
  },
  {
    id: 2,
    kategori: 'Pusat Publik & Ruang Terbuka',
    judul: 'Revitalisasi & Pemanfaatan Alun-Alun Ujungberung sebagai Pusat Interaksi Warga',
    kutipan: 'Kawasan Alun-Alun Ujungberung kini kembali dioptimalkan sebagai ruang publik ramah keluarga, pusat UMKM kuliner, serta titik kumpul kegiatan seni budaya...',
    detail: 'Alun-Alun Ujungberung menjadi pusat keramaian utama bagi warga Kecamatan Ujungberung, termasuk warga Kelurahan Pasanggrahan. Dengan fasilitas ruang terbuka hijau yang tertata rapi, area bermain anak, dan amphiteater seni, alun-alun ini rutin menjadi pusat perhelatan seni tradisional maupun pasar kaget akhir pekan yang mendongkrak ekonomi kerakyatan.',
    tanggal: '02 Agustus 2026',
    penulis: 'Tim Media Ujungberung',
    gambar: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&auto=format&fit=crop'
  }
];

const KATALOG_UMKM: UmkmItem[] = [
  { 
    id: 1, 
    nama: 'Ayam Bakar KQ5 Ujung Berung', 
    pemilik: 'Kang Ujang',
    wa: '6281234567890',
    kategori: 'Kuliner Nusantara', 
    harga: 'Rp 25.000', 
    lokasi: 'Jl. Raya Ujungberung No. 12, Pasanggrahan',
    gambar: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500',
    deskripsi: 'Ayam bakar dengan bumbu rempah meresap sempurna, dibakar dengan arang pilihan menghasilkan aroma khas yang menggugah selera.'
  },
  { 
    id: 2, 
    nama: 'Warung Nasi Sadulur', 
    pemilik: 'Ibu Tati',
    wa: '6281987654321',
    kategori: 'Kuliner Tradisional Sunda', 
    harga: 'Rp 20.000', 
    lokasi: 'RT 02 / RW 03, Pasanggrahan, Ujungberung',
    gambar: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500',
    deskripsi: 'Menyediakan berbagai menu masakan rumahan khas Sunda seperti lalapan segar, sambal dadak, gepuk, dan ikan asin jambal.'
  },
  { 
    id: 3, 
    nama: 'Kopi Arabika Lereng Manglayang', 
    pemilik: 'Kang Cecep Coffee',
    wa: '6285712345678',
    kategori: 'Minuman Khas', 
    harga: 'Rp 35.000', 
    lokasi: 'RW 02 / Kawasan Atas Pasanggrahan',
    gambar: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500',
    deskripsi: 'Biji kopi arabika petik merah pilihan yang ditanam langsung di ketinggian lereng Gunung Manglayang Ujungberung. Memiliki aroma fruity khas.'
  },
];

const DATA_CCTV: CctvItem[] = [
  {
    id: 1,
    nama: 'CAM-01: Gerbang Utama Perumahan',
    lokasi: 'Gerbang Pasanggrahan Hill / RW 04',
    status: 'ONLINE',
    fps: 30,
    kameraKode: 'PSG-CAM-001-NORTH',
    thumbnail: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    nama: 'CAM-02: Utama Alun-Alun Ujungberung',
    lokasi: 'Kawasan Publik Alun-Alun Utama',
    status: 'ONLINE',
    fps: 30,
    kameraKode: 'PSG-CAM-002-MAIN',
    thumbnail: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    nama: 'CAM-03: Simpang AH. Nasution',
    lokasi: 'Titik Persimpangan Lalu Lintas Utama',
    status: 'ONLINE',
    fps: 25,
    kameraKode: 'PSG-CAM-003-TRAFFIC',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop'
  },
  {
    id: 4,
    nama: 'CAM-04: Kantor Kelurahan Pasanggrahan',
    lokasi: 'Area Pelayanan Publik & Parkir',
    status: 'ONLINE',
    fps: 30,
    kameraKode: 'PSG-CAM-004-OFFICE',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop'
  }
];

export function PublicPortal() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [adminUsername, setAdminUsername] = useState<string>('');
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');

  const [adminTab, setAdminTab] = useState<'dashboard' | 'pengaduan' | 'berita' | 'umkm'>('dashboard');

  const [formData, setFormData] = useState({ 
    nama: '', 
    hp: '', 
    kategori: 'Infrastruktur / Fasilitas Umum',
    lokasi: '',
    isi: '' 
  });
  
  const [listPengaduan, setListPengaduan] = useState<PengaduanItem[]>([
    { id: 1, nama: 'Budi Santoso', hp: '08123456789', kategori: 'Infrastruktur / Fasilitas Umum', lokasi: 'RW 03', isi: 'Lampu PJU di dekat Alun-alun padam sejak kemarin malam.', tanggal: '02 Agustus 2026', status: 'PENDING' },
    { id: 2, nama: 'Siti Rahma', hp: '08987654321', kategori: 'Kebersihan & Sampah', lokasi: 'RW 01', isi: 'Mohon peninjauan gorong-gorong yang tersumbat daun bambu.', tanggal: '01 Agustus 2026', status: 'DIPROSES' }
  ]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedUmkm, setSelectedUmkm] = useState<UmkmItem | null>(null);
  const [selectedBerita, setSelectedBerita] = useState<BeritaItem | null>(null);
  const [selectedCctv, setSelectedCctv] = useState<CctvItem | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const cctvContainerRef = useRef<HTMLDivElement>(null);

  const [currentTime, setCurrentTime] = useState<string>('');
  const [searchCctv, setSearchCctv] = useState<string>('');
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  const [showAdminLogin, setShowAdminLogin] = useState<boolean>(false);

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

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollCctvLeft = () => cctvContainerRef.current?.scrollBy({ left: -340, behavior: 'smooth' });
  const scrollCctvRight = () => cctvContainerRef.current?.scrollBy({ left: 340, behavior: 'smooth' });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeSelectedImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.nama && formData.isi) {
      const newPengaduan: PengaduanItem = {
        id: Date.now(),
        nama: formData.nama,
        hp: formData.hp,
        kategori: formData.kategori,
        lokasi: formData.lokasi || 'Pasanggrahan',
        isi: formData.isi,
        tanggal: 'Baru saja',
        status: 'PENDING'
      };
      setListPengaduan([newPengaduan, ...listPengaduan]);
      setIsSuccessModalOpen(true);
    }
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setFormData({ nama: '', hp: '', kategori: 'Infrastruktur / Fasilitas Umum', lokasi: '', isi: '' });
    removeSelectedImage();
  };

  const updatePengaduanStatus = (id: number, status: 'PENDING' | 'DIPROSES' | 'SELESAI') => {
    setListPengaduan(listPengaduan.map(item => item.id === id ? { ...item, status } : item));
  };

  const deletePengaduan = (id: number) => {
    setListPengaduan(listPengaduan.filter(item => item.id !== id));
  };

  const filteredCctv = DATA_CCTV.filter((cam) =>
    cam.nama.toLowerCase().includes(searchCctv.toLowerCase()) ||
    cam.lokasi.toLowerCase().includes(searchCctv.toLowerCase()) ||
    cam.kameraKode.toLowerCase().includes(searchCctv.toLowerCase())
  );

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUsername.trim() === 'admin' && adminPassword.trim() === 'admin123') {
      setIsAdminLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Username atau Password salah! (Gunakan admin / admin123)');
    }
  };

  if (showAdminLogin && !isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-white text-slate-800 font-sans flex flex-col justify-between selection:bg-emerald-600 selection:text-white">
        <header className="p-6 max-w-7xl mx-auto w-full">
          <button 
            onClick={() => {
              setShowAdminLogin(false);
              setLoginError('');
              setAdminUsername('');
              setAdminPassword('');
            }}
            className="group flex items-center gap-2 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 px-4 py-2.5 rounded-2xl text-xs font-bold border border-slate-200/80 shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Kembali ke Portal Warga
          </button>
        </header>

        <main className="flex-grow flex items-center justify-center px-4 pb-16">
          <div className="bg-white border border-slate-200/80 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 max-w-md w-full space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-600"></div>

            <div className="flex flex-col items-center text-center space-y-3 pt-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Login Command Center</h2>
                <p className="text-xs text-slate-500 font-medium">Kelurahan Pasanggrahan, Ujungberung</p>
              </div>
            </div>

            {loginError && (
              <div className="bg-rose-50 border border-rose-200/80 p-3.5 rounded-2xl text-xs text-rose-700 font-medium text-center">
                {loginError}
              </div>
            )}

            <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Username Admin</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <User className="w-4 h-4" />
                  </span>
                  <input 
                    type="text"
                    required
                    placeholder="Masukkan username"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-sm font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input 
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Masukkan password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-11 py-3.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-sm font-medium"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-700/25 transition-all text-xs tracking-wider uppercase active:scale-[0.98]"
                >
                  Masuk Dashboard Admin
                </button>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/60 text-[11px] text-slate-500 text-center space-y-0.5 mt-2">
                <p className="font-bold text-slate-700">💡 Info Akses Demo:</p>
                <p>Username: <code className="text-emerald-700 font-bold bg-white px-1.5 py-0.5 rounded border border-slate-200">admin</code> | Password: <code className="text-emerald-700 font-bold bg-white px-1.5 py-0.5 rounded border border-slate-200">admin123</code></p>
              </div>
            </form>
          </div>
        </main>

        <footer className="py-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Kelurahan Pasanggrahan Ujungberung. All rights reserved.
        </footer>
      </div>
    );
  }

  if (isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col justify-between">
        <div>
          <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex justify-between items-center sticky top-0 z-40 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black shadow-lg">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-extrabold text-base text-white tracking-wide">Portal Command Center Admin</h1>
                <p className="text-[11px] text-emerald-400 font-mono">Kelurahan Pasanggrahan, Ujungberung</p>
              </div>
            </div>

            <button 
              onClick={() => {
                setIsAdminLoggedIn(false);
                setShowAdminLogin(false);
                setAdminUsername('');
                setAdminPassword('');
              }}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-bold transition-all border border-slate-700 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4 text-rose-400" /> Keluar ke Portal Publik
            </button>
          </header>

          <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
            <div className="lg:col-span-3 space-y-2">
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl space-y-1">
                <button 
                  onClick={() => setAdminTab('dashboard')}
                  className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all ${adminTab === 'dashboard' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
                >
                  <LayoutDashboard className="w-4 h-4" /> Ringkasan Dashboard
                </button>
                <button 
                  onClick={() => setAdminTab('pengaduan')}
                  className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all ${adminTab === 'pengaduan' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
                >
                  <FileText className="w-4 h-4" /> Verifikasi Pengaduan ({listPengaduan.length})
                </button>
                <button 
                  onClick={() => setAdminTab('berita')}
                  className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all ${adminTab === 'berita' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
                >
                  <Newspaper className="w-4 h-4" /> Manajemen Berita
                </button>
                <button 
                  onClick={() => setAdminTab('umkm')}
                  className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all ${adminTab === 'umkm' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
                >
                  <Store className="w-4 h-4" /> Direktori UMKM
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl text-xs text-slate-400 space-y-2">
                <p className="font-bold text-white">🔐 Status Sesi Admin:</p>
                <p className="text-[11px] text-emerald-400">Aktif - Administrator Kelurahan Pasanggrahan</p>
              </div>
            </div>

            <div className="lg:col-span-9 space-y-6">
              {adminTab === 'dashboard' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-2">
                      <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Total Penduduk</span>
                      <h3 className="text-2xl font-black text-emerald-400">21.696 Jiwa</h3>
                      <p className="text-[10px] text-slate-500">Update Sensus Kependudukan</p>
                    </div>
                    <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-2">
                      <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Kepala Keluarga (KK)</span>
                      <h3 className="text-2xl font-black text-blue-400">4.786 KK</h3>
                      <p className="text-[10px] text-slate-500">Tersebar di 4 RW</p>
                    </div>
                    <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-2">
                      <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Pengaduan Masuk</span>
                      <h3 className="text-2xl font-black text-amber-400">{listPengaduan.length} Laporan</h3>
                      <p className="text-[10px] text-slate-500">Perlu tindak lanjut aparat</p>
                    </div>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4">
                    <h3 className="font-bold text-base text-white flex items-center gap-2">
                      Pengaduan Warga Terbaru
                    </h3>
                    <div className="space-y-3">
                      {listPengaduan.slice(0, 3).map((item) => (
                        <div key={item.id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex justify-between items-center text-xs">
                          <div className="space-y-1">
                            <span className="font-bold text-white">{item.nama} ({item.lokasi})</span>
                            <p className="text-slate-300">{item.isi}</p>
                            <span className="text-[10px] text-slate-400">Kategori: {item.kategori}</span>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${item.status === 'SELESAI' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : item.status === 'DIPROSES' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                            {item.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {adminTab === 'pengaduan' && (
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h3 className="font-bold text-base text-white">Manajemen &amp; Verifikasi Pengaduan Warga</h3>
                    <span className="text-xs bg-emerald-900/50 text-emerald-300 border border-emerald-700 px-3 py-1 rounded-full font-bold">Total: {listPengaduan.length}</span>
                  </div>

                  <div className="space-y-3">
                    {listPengaduan.map((item) => (
                      <div key={item.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-xs font-bold text-emerald-400">{item.kategori}</span>
                            <h4 className="font-extrabold text-white text-sm mt-0.5">{item.nama} <span className="text-xs text-slate-400 font-normal">({item.hp})</span></h4>
                            <p className="text-xs text-slate-300 mt-1">Lokasi: <strong className="text-white">{item.lokasi}</strong></p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${item.status === 'SELESAI' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : item.status === 'DIPROSES' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                            {item.status}
                          </span>
                        </div>

                        <p className="text-xs text-slate-200 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                          {item.isi}
                        </p>

                        <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-800 text-xs">
                          <span className="text-slate-400">📅 {item.tanggal}</span>
                          <div className="flex items-center gap-2">
                            <button onClick={() => updatePengaduanStatus(item.id, 'DIPROSES')} className="bg-blue-600/80 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all">
                              Proses
                            </button>
                            <button onClick={() => updatePengaduanStatus(item.id, 'SELESAI')} className="bg-emerald-600/80 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all">
                              Selesai
                            </button>
                            <button onClick={() => deletePengaduan(item.id)} className="bg-rose-600/80 hover:bg-rose-600 text-white px-2.5 py-1.5 rounded-lg text-xs transition-all">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {adminTab === 'berita' && (
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h3 className="font-bold text-base text-white">Manajemen Mading &amp; Berita Kelurahan</h3>
                    <button onClick={() => alert('Fitur tambah berita admin diaktifkan.')} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5">
                      <PlusCircle className="w-4 h-4" /> Tambah Berita
                    </button>
                  </div>
                  <div className="space-y-3">
                    {BERITA_LOKAL.map((b) => (
                      <div key={b.id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex justify-between items-center text-xs">
                        <div>
                          <span className="text-emerald-400 font-bold">{b.kategori}</span>
                          <h4 className="font-bold text-white text-sm">{b.judul}</h4>
                          <p className="text-slate-400">{b.tanggal}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => alert(`Edit berita ID: ${b.id}`)} className="bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-lg"><Edit className="w-3.5 h-3.5" /></button>
                          <button onClick={() => alert(`Hapus berita ID: ${b.id}`)} className="bg-rose-900/50 hover:bg-rose-900 text-rose-300 p-2 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {adminTab === 'umkm' && (
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h3 className="font-bold text-base text-white">Manajemen Katalog UMKM Warga</h3>
                    <button onClick={() => alert('Fitur tambah UMKM admin diaktifkan.')} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5">
                      <PlusCircle className="w-4 h-4" /> Tambah UMKM
                    </button>
                  </div>
                  <div className="space-y-3">
                    {KATALOG_UMKM.map((u) => (
                      <div key={u.id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex justify-between items-center text-xs">
                        <div>
                          <span className="text-emerald-400 font-bold">{u.kategori}</span>
                          <h4 className="font-bold text-white text-sm">{u.nama} - <span className="text-emerald-300">{u.harga}</span></h4>
                          <p className="text-slate-400">Pemilik: {u.pemilik}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => alert(`Edit UMKM ID: ${u.id}`)} className="bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-lg"><Edit className="w-3.5 h-3.5" /></button>
                          <button onClick={() => alert(`Hapus UMKM ID: ${u.id}`)} className="bg-rose-900/50 hover:bg-rose-900 text-rose-300 p-2 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <footer className="bg-slate-950 border-t border-slate-800 py-6 text-center text-xs text-slate-500 mt-12">
          © {new Date().getFullYear()} Command Center Admin - Kelurahan Pasanggrahan Ujungberung
        </footer>
      </div>
    );
  }

  return (
    <div className="scroll-smooth min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-600 selection:text-white flex flex-col justify-between relative">
      <div>
        <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-3 shadow-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <LogoCluster />
              <div>
                <h1 className="font-extrabold text-lg leading-tight tracking-tight text-slate-900 flex items-center gap-1.5">
                  Kelurahan Pasanggrahan <Sparkles className="w-4 h-4 text-amber-500 inline" />
                </h1>
                <p className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase flex items-center gap-1">
                  <Landmark className="w-3 h-3 text-emerald-600 inline" /> Kecamatan Ujungberung, Kota Bandung
                </p>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
              <a href="#hero" className="hover:text-emerald-700 transition-colors">Beranda</a>
              <a href="#profil" className="hover:text-emerald-700 transition-colors">Profil &amp; Sejarah</a>
              <a href="#berita" className="hover:text-emerald-700 transition-colors">Mading &amp; Berita</a>
              <a href="#aparat" className="hover:text-emerald-700 transition-colors">Aparat Desa</a>
              <a href="#statistik" className="hover:text-emerald-700 transition-colors">Statistik</a>
              <a href="#umkm" className="hover:text-emerald-700 transition-colors">Katalog UMKM</a>
              <a href="#cctv" className="hover:text-emerald-700 transition-colors flex items-center gap-1 text-rose-600">
                <Video className="w-4 h-4" /> CCTV Live
              </a>
              <button 
                onClick={() => setShowAdminLogin(true)}
                className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl transition-all font-bold text-xs flex items-center gap-1.5 shadow-sm"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Portal Admin
              </button>
              <a href="#pengaduan" className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl transition-all font-semibold flex items-center gap-1.5 shadow-sm">
                <Send className="w-3.5 h-3.5" /> Lapor
              </a>
            </div>
          </div>
        </nav>

        <section 
          id="hero" 
          className="relative py-20 lg:py-28 px-6 overflow-hidden bg-cover bg-center text-slate-900"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(240, 253, 244, 0.75), rgba(220, 252, 231, 0.65)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop')`,
            backgroundPosition: 'center 40%'
          }}
        >
          <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/90 backdrop-blur-sm border border-emerald-300 text-emerald-900 text-xs font-bold shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-600" /> Sampurasun! Wilujeng Sumping di Pasanggrahan
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-900 drop-shadow-sm">
                Kelurahan Pasanggrahan <br />
                <span className="text-emerald-800">Kecamatan Ujungberung</span>
              </h1>

              <p className="text-slate-700 text-sm sm:text-base font-medium leading-relaxed max-w-xl">
                Pusat Pelestarian Seni Budaya Benjang &amp; Pelayanan Digital Masyarakat di Kaki Gunung Manglayang, Kota Bandung.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a href="#peta" className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-3.5 rounded-2xl transition-all text-sm shadow-lg shadow-emerald-700/30 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Jelajahi Peta Wilayah
                </a>
                <a href="#cctv" className="bg-white/90 backdrop-blur-sm hover:bg-white border border-slate-300 text-slate-800 font-bold px-6 py-3.5 rounded-2xl transition-all text-sm flex items-center gap-2 shadow-sm">
                  <Video className="w-4 h-4 text-rose-600" /> Pantau CCTV Live
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/90 border border-slate-200 p-4 rounded-3xl shadow-xl space-y-3 backdrop-blur-md">
              <div className="flex justify-between items-center px-1">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-600" /> Lokasi Kantor Kelurahan Pasanggrahan
                </span>
                <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold">
                  UJUNGBERUNG BANDUNG
                </span>
              </div>

              <div className="w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-200 relative">
                <iframe 
                  title="Peta Wilayah Kelurahan Pasanggrahan Ujungberung"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15843.435552367807!2d107.69613045!3d-6.89201125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68dd2632b84f33%3A0x501e8f1fc28ebb0!2sPasanggrahan%2C%20Kec.%20Ujung%20Berung%2C%20Kota%20Bandung%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid" 
                  className="w-full h-full border-0" 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        <section id="profil" className="py-20 px-6 max-w-7xl mx-auto border-b border-slate-200 space-y-12">
          <div className="mb-4 space-y-1 text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">Profil &amp; Sejarah Wilayah</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Sejarah &amp; Pusat Budaya Ujungberung</h2>
            <p className="text-slate-600 text-sm">Rekam jejak dan identitas kultural Kelurahan Pasanggrahan di kaki Gunung Manglayang.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
                <BookOpen className="w-5 h-5 text-emerald-600" /> Asal Usul Nama Pasanggrahan
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Nama <strong>Pasanggrahan</strong> berasal dari sejarah tempat persinggahan tradisional di jalur lintasan kaki Gunung Manglayang. Wilayah ini berkembang menjadi permukiman yang sangat menjunjung tinggi adat istiadat Sunda, kesenian Benjang, serta semangat gotong-royong warga Ujungberung.
              </p>
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 text-xs text-emerald-950 space-y-2">
                <p><strong>Geografis:</strong> Kawasan dataran tinggi berbukit dengan udara sejuk, berbatasan langsung dengan area perkebunan dan hutan lindung Gunung Manglayang.</p>
                <p><strong>Potensi:</strong> Pusat seni bela diri Benjang, sentra kerajinan rakyat, serta destinasi agrowisata alam Kota Bandung.</p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white p-3 rounded-3xl border border-slate-200 shadow-sm overflow-hidden group">
              <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop" 
                  alt="Panorama Perbukitan Hijau dan Kaki Gunung Manglayang Pasanggrahan Ujungberung" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full w-max mb-2 border border-emerald-400/40">
                    Kaki Gunung Manglayang
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold">Panorama Alam &amp; Perbukitan Hijau Kelurahan Pasanggrahan</h3>
                  <p className="text-xs text-slate-300 mt-1">Karakteristik khas wilayah dataran tinggi Ujungberung, Kota Bandung.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 shadow-sm">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Visi &amp; Misi Kelurahan Pasanggrahan</h3>
                <p className="text-xs text-slate-500">Landasan dan komitmen pembangunan pelayanan masyarakat</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-emerald-50/60 border border-emerald-200/60 p-6 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-200/60 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                  Visi Kelurahan
                </span>
                <p className="text-slate-800 text-sm sm:text-base font-bold leading-relaxed">
                  &ldquo;Terwujudnya Kelurahan Pasanggrahan BAGUS (Bersih, Aman, Giat, Usaha, Sehat).&rdquo;
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-blue-800 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                  Misi Kelurahan
                </span>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Mewujudkan Pemerintahan Kelurahan yang baik (<strong className="text-slate-900">Good Governance</strong>) dalam memberikan pelayanan kepada masyarakat.
                </p>
              </div>
            </div>
          </div>

          <div id="peta" className="pt-6">
            <InteractiveVectorMap />
          </div>
        </section>

        {/* MADING & BERITA LOKAL */}
        <section id="berita" className="py-20 px-6 max-w-7xl mx-auto border-b border-slate-200">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">Mading &amp; Kegiatan Warga</span>
              <h2 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2 mt-1">
                <Newspaper className="text-emerald-700" /> Rubrik Berita &amp; Kegiatan Pasanggrahan
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BERITA_LOKAL.map((berita) => (
              <article 
                key={berita.id} 
                onClick={() => setSelectedBerita(berita)}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="h-56 overflow-hidden relative">
                    <img src={berita.gambar} alt={berita.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-4 left-4 text-xs font-bold px-3.5 py-1 bg-white/90 backdrop-blur-md text-emerald-800 rounded-full border border-emerald-200 shadow-sm">
                      {berita.kategori}
                    </span>
                  </div>
                  <div className="p-8 space-y-3">
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                      {berita.judul}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {berita.kutipan}
                    </p>
                  </div>
                </div>
                <div className="px-8 pb-8 pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
                  <span className="flex items-center gap-1">📅 {berita.tanggal}</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    Baca Selengkapnya <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* APARAT DESA (BERJAJAR KE SAMPING SEMUA / 4 KOLOM) */}
        <section id="aparat" className="py-20 px-6 max-w-7xl mx-auto border-b border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">Struktur Birokrasi Pemerintahan</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Aparat Kelurahan Pasanggrahan</h2>
            <p className="text-slate-600 text-sm">Jajaran perangkat resmi yang melayani warga Kelurahan Pasanggrahan, Kecamatan Ujungberung</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {APARAT_DESA.map((aparat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all group flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-700 group-hover:text-white transition-all shadow-sm">
                    <Landmark className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="inline-block bg-emerald-100 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full mb-2">
                      {aparat.jabatan}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-base leading-snug">{aparat.nama}</h3>
                  </div>
                </div>
                <div className="pt-4 mt-6 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-500 font-mono">
                    <span>Kontak / WA:</span>
                    <a href={`https://wa.me/${aparat.kontak}`} target="_blank" rel="noreferrer" className="font-bold text-emerald-700 hover:underline flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" /> {aparat.kontak}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="statistik" className="py-20 px-6 max-w-7xl mx-auto border-b border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">Data Statistik Kependudukan</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Statistik Demografi Pasanggrahan</h2>
            <p className="text-slate-600 text-sm">Jumlah populasi riil, kepala keluarga (KK), dan tingkat kesejahteraan warga</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-emerald-700 to-emerald-900 text-white p-6 rounded-3xl shadow-xl flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 flex-shrink-0">
                <Users className="w-7 h-7 text-emerald-200" />
              </div>
              <div>
                <p className="text-xs font-medium text-emerald-200 uppercase tracking-wider">Total Populasi Riil</p>
                <h3 className="text-3xl font-black mt-0.5">21.696 Jiwa</h3>
                <p className="text-[11px] text-slate-300 mt-1">Data Administrasi Penduduk Kelurahan Pasanggrahan</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-700 to-indigo-900 text-white p-6 rounded-3xl shadow-xl flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 flex-shrink-0">
                <Home className="w-7 h-7 text-blue-200" />
              </div>
              <div>
                <p className="text-xs font-medium text-blue-200 uppercase tracking-wider">Jumlah Kepala Keluarga (KK)</p>
                <h3 className="text-3xl font-black mt-0.5">4.786 KK</h3>
                <p className="text-[11px] text-slate-300 mt-1">Tersebar di seluruh RW 01 s.d. RW 04</p>
              </div>
            </div>
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
                  <span className="text-sm font-black text-slate-800">21.696</span>
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
                  <BarChart3 className="w-5 h-5 text-emerald-600" /> Kelompok Usia
                </h3>
                <p className="text-xs text-slate-500 mb-4">Rentang umur produktif &amp; non-produktif</p>
              </div>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DATA_DEMOGRAFI_USIA}>
                    <XAxis dataKey="kelompok" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#0f172a' }} />
                    <Bar dataKey="jumlah" fill="#059669" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
                <span>Usia Produktif (15-64):</span>
                <span className="font-bold text-emerald-700">67.8% (14.726 Jiwa)</span>
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
                <GraduationCap className="w-4 h-4 text-slate-400" /> Sumber: Sensus Administrasi Kelurahan
              </div>
            </div>
          </div>
        </section>

        <section id="umkm" className="py-20 px-6 max-w-7xl mx-auto border-b border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">Ekonomi Kreatif Warga</span>
              <h2 className="text-3xl font-extrabold text-slate-900">Katalog UMKM Pasanggrahan</h2>
              <p className="text-slate-600 text-sm">Produk unggulan asli warga lokal Kelurahan Pasanggrahan, Kecamatan Ujungberung</p>
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
                    <h3 className="font-bold text-xl text-slate-900 group-hover:text-emerald-700 transition-colors">{item.nama}</h3>
                    <p className="text-slate-500 text-xs flex items-center gap-1 font-medium">
                      <User className="w-3.5 h-3.5 text-slate-400" /> {item.pemilik}
                    </p>
                    <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">{item.deskripsi}</p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-base font-black text-emerald-700">{item.harga}</span>
                  <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-3 py-1.5 rounded-xl border border-emerald-200/60 group-hover:bg-emerald-700 group-hover:text-white transition-all flex items-center gap-1">
                    Lihat Detail <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CCTV LIVE INTERAKTIF */}
        <section id="cctv" className="py-20 px-6 max-w-7xl mx-auto border-b border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-rose-600 tracking-wider uppercase flex items-center gap-1">
                <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" /> Smart Surveillance Kelurahan
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
                <Video className="w-7 h-7 text-rose-600" /> Live Stream CCTV Publik
              </h2>
              <p className="text-slate-600 text-sm">Pantau keamanan kawasan strategis Ujungberung secara real-time</p>
            </div>

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
                  <img 
                    src={cam.thumbnail} 
                    alt={cam.nama} 
                    className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 group-hover:opacity-90 transition-all duration-500 filter brightness-90 contrast-110" 
                  />
                  
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

                  <div className="relative z-10 flex items-center justify-center my-auto">
                    <div className="w-11 h-11 rounded-full bg-rose-600/90 text-white backdrop-blur-md flex items-center justify-center group-hover:scale-125 transition-transform shadow-lg shadow-rose-600/40">
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    </div>
                  </div>

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

        <section id="pengaduan" className="py-20 px-6 max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">Layanan Masyarakat</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Formulir Laporan &amp; Pengaduan</h2>
            <p className="text-slate-600 text-sm">Sampaikan keluhan, aspirasi, atau masukan untuk perbaikan Kelurahan Pasanggrahan</p>
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
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-700 focus:bg-white transition-all"
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
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-700 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Kategori Laporan</label>
                  <select 
                    value={formData.kategori}
                    onChange={(e) => setFormData({...formData, kategori: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-700 focus:bg-white transition-all"
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
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-700 focus:bg-white transition-all"
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
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-sm focus:outline-none focus:border-emerald-700 focus:bg-white transition-all"
                ></textarea>
              </div>

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
                    className="w-full border-2 border-dashed border-slate-300 hover:border-emerald-600 bg-slate-50 hover:bg-emerald-50/50 p-5 rounded-2xl flex flex-col items-center justify-center transition-all group"
                  >
                    <Upload className="w-8 h-8 text-slate-400 group-hover:text-emerald-700 mb-2 transition-colors" />
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-emerald-700">Klik untuk memilih foto dari galeri / file</span>
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
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-base"
              >
                <Send className="w-5 h-5" /> Kirim Laporan Sekarang
              </button>
            </form>
          </div>
        </section>
      </div>

      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <LogoCluster />
              <h3 className="text-lg font-bold text-white">Kelurahan Pasanggrahan</h3>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Kecamatan Ujungberung, Kota Bandung, Jawa Barat. Layanan portal digital publik yang transparan &amp; terpadu.
            </p>
          </div>
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white text-sm">Kontak Darurat</h4>
            <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-emerald-400" /> (022) 780-XXXX (Kantor Kelurahan)</p>
            <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-emerald-400" /> kelurahan.pasanggrahan@bandung.go.id</p>
          </div>
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white text-sm">Jam Operasional Pelayanan</h4>
            <p>Senin - Jumat: 08.00 - 15.30 WIB</p>
            <p>Sabtu - Minggu / Hari Libur: Tutup</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Kelurahan Pasanggrahan Ujungberung Kota Bandung. All rights reserved.
        </div>
      </footer>

      {selectedBerita && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl space-y-5 p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                {selectedBerita.kategori}
              </span>
              <button 
                onClick={() => setSelectedBerita(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-64 rounded-2xl overflow-hidden relative shadow-md">
              <img src={selectedBerita.gambar} alt={selectedBerita.judul} className="w-full h-full object-cover" />
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">{selectedBerita.judul}</h3>
              <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                <span>📅 {selectedBerita.tanggal}</span>
                <span>✍️ {selectedBerita.penulis}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Detail Lengkap Kegiatan</h4>
              <p className="text-slate-700 text-sm leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                {selectedBerita.detail}
              </p>
            </div>

            <button 
              onClick={() => setSelectedBerita(null)}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-2xl shadow-lg transition-all text-sm"
            >
              Tutup Berita
            </button>
          </div>
        </div>
      )}

      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <PartyPopper className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Laporan Berhasil Terkirim!</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Terima kasih <span className="font-bold">{formData.nama}</span>. Laporan Anda telah tercatat dan akan ditindaklanjuti oleh aparat Kelurahan Pasanggrahan.
            </p>
            <button 
              onClick={closeSuccessModal}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl transition-colors"
            >
              Selesai &amp; Tutup
            </button>
          </div>
        </div>
      )}

      {selectedCctv && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-4xl w-full overflow-hidden text-white shadow-2xl flex flex-col justify-between">
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

            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <img src={selectedCctv.thumbnail} alt={selectedCctv.nama} className="w-full h-full object-cover filter brightness-95" />
              
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

      {selectedUmkm && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl space-y-5 p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <button 
                onClick={() => setSelectedUmkm(null)}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 bg-slate-100 px-3 py-1.5 rounded-xl transition-colors"
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

            <div className="h-56 rounded-2xl overflow-hidden relative shadow-md">
              <img src={selectedUmkm.gambar} alt={selectedUmkm.nama} className="w-full h-full object-cover" />
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                {selectedUmkm.kategori}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-black text-slate-900">{selectedUmkm.nama}</h3>
              <p className="text-emerald-700 font-extrabold text-xl mt-1">{selectedUmkm.harga}</p>
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Deskripsi Produk</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200/60">
                {selectedUmkm.deskripsi}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                  <span className="text-slate-400 block font-medium">Pemilik / Toko</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                    <User className="w-3.5 h-3.5 text-emerald-700" /> {selectedUmkm.pemilik}
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
                href={`https://wa.me/${selectedUmkm.wa}?text=Halo%20${encodeURIComponent(selectedUmkm.pemilik)},%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(selectedUmkm.nama)}%20di%20Portal%20Kelurahan%20Pasanggrahan.`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
              >
                <MessageCircle className="w-4 h-4" /> Hubungi Penjual via WhatsApp
              </a>
            </div>

          </div>
        </div>
      )}

      {showBackToTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-emerald-700 text-white p-3.5 rounded-full shadow-2xl hover:bg-emerald-800 transition-all z-40 hover:scale-110"
          title="Kembali ke atas"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}