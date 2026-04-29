'use client';

import { useState, useMemo } from 'react';
import HomeButton from '@/app/components/HomeButton';

/* ─── Question bank ─── */
interface Question {
  clues: string[];
  answer: string;
}

const QUESTIONS: Question[] = [
  {
    clues: [
      'Aku adalah lembaran kain warisan budaya kebanggaan Indonesia.',
      'Aku memiliki sangat banyak corak dan motif yang indah.',
      'Motifku biasanya berbeda-beda tergantung dari daerah mana aku berasal.',
      'Pembuatan tradisionalku menggunakan bahan lilin panas yang disebut "malam".',
      'Alat kecil yang digunakan untuk melukis pola di atasku bernama canting.',
      'Biasanya kalian memakainya sebagai seragam sekolah di hari Kamis atau Jumat.',
      'Ayah dan Ibu juga sering memakainya saat pergi ke kantor atau acara pernikahan.',
      'Setiap tanggal 2 Oktober, bangsa Indonesia selalu merayakan hari khusus untukku.',
    ],
    answer: 'Batik',
  },
  {
    clues: [
      'Aku adalah putra kebanggaan bangsa Indonesia.',
      'Aku dikenal sangat cerdas dan gemar membaca sejak kecil.',
      'Aku menuntut ilmu teknik hingga ke negara Jerman.',
      'Keahlian utamaku adalah merancang dan membuat pesawat terbang.',
      'Pesawat N250 Gatotkaca adalah salah satu mahakaryaku.',
      'Aku pernah memimpin negara ini di masa awal reformasi.',
      'Aku adalah Presiden Republik Indonesia yang ketiga.',
      'Kisah cintaku bersama Ibu Ainun sangat terkenal dan dijadikan film.',
    ],
    answer: 'B.J. Habibie',
  },
  {
    clues: [
      'Aku adalah sebuah tugu peringatan yang sangat terkenal di Indonesia.',
      'Aku berdiri gagah di tengah lapangan yang sangat luas di ibukota.',
      'Aku dibangun untuk mengenang sejarah dan perjuangan kemerdekaan rakyat.',
      'Di bagian dasarku terdapat ruangan museum diorama sejarah nasional.',
      'Kalian bisa menaiki lift di dalam tubuhku hingga ke pelataran puncak.',
      'Dari puncakku, Ayah, Bunda, dan adik-adik bisa melihat pemandangan kota Jakarta dari atas.',
      'Bangunanku menjulang tinggi dengan mahkota yang berbentuk seperti kobaran lidah api.',
      'Lidah api di pucukku itu sangat bersinar karena dilapisi puluhan kilogram emas asli.',
    ],
    answer: 'Monas (Monumen Nasional)',
  },
  {
    clues: [
      'Aku adalah makanan tradisional kebanggaan Nusantara.',
      'Daerah asalku adalah dari Minangkabau, Sumatera Barat.',
      'Bahan utamaku biasanya berupa potongan daging sapi.',
      'Aku dimasak perlahan menggunakan santan dan banyak rempah.',
      'Proses memasakku di atas api membutuhkan waktu berjam-jam.',
      'Warnaku cokelat gelap kehitaman dengan bumbu yang mengering.',
      'Kalian pasti selalu menemukanku di etalase setiap rumah makan Padang.',
      'Aku pernah dinobatkan sebagai salah satu makanan paling enak di dunia!',
    ],
    answer: 'Rendang',
  },
  {
    clues: [
      'Aku punya banyak nama dan varian di berbagai daerah.',
      'Aku biasanya dibuat dari campuran tepung dan daging.',
      'Bentukku bulat dan teksturku kenyal.',
      'Aku sangat mudah ditemukan dari gerobak pinggir jalan sampai restoran.',
      'Aku sering disajikan bersama kuah kaldu yang hangat.',
      'Pelengkap setiaku adalah mie kuning, bihun, dan seledri.',
      'Namaku sering dikaitkan dengan ukuran yang besar seperti "Rudal" atau "Tenis".',
      'Aku adalah bola daging yang paling dicintai orang Indonesia.',
    ],
    answer: 'Bakso',
  },
  {
    clues: [
      'Aku adalah sebuah makanan asli Indonesia.',
      'Aku sangat mudah ditemukan di pasar tradisional maupun swalayan.',
      'Hargaku murah meriah, tapi giziku sangat tinggi.',
      'Aku sering disajikan di meja makan keluarga sebagai teman makan nasi.',
      'Warnaku putih kekuningan dan biasanya dicetak berbentuk kotak.',
      'Aku kaya akan protein nabati karena bahan dasarku adalah kacang kedelai.',
      'Aku dibuat melalui proses fermentasi yang dibungkus daun pisang atau plastik.',
      'Aku sangat lezat jika digoreng renyah, ditumis, atau dijadikan mendoan!',
    ],
    answer: 'Tempe',
  },
  {
    clues: [
      'Aku adalah sebuah tempat wisata bersejarah yang sangat terkenal di Indonesia.',
      'Aku dibangun dari susunan ribuan balok batu besar tanpa menggunakan semen.',
      'Bangunanku sangat megah, bertingkat-tingkat, dan bentuknya menyerupai piramida berundak.',
      'Kamu harus menaiki banyak anak tangga untuk sampai ke bagian puncakku.',
      'Di dindingku terdapat banyak pahatan gambar indah yang disebut relief.',
      'Di tingkat paling atas, kamu akan menemukan banyak bangunan batu yang bentuknya seperti lonceng berlubang.',
      'Lokasiku berada di Kabupaten Magelang, Provinsi Jawa Tengah.',
      'Aku dikenal luas sebagai candi Buddha terbesar di dunia!',
    ],
    answer: 'Candi Borobudur',
  },
  {
    clues: [
      'Aku adalah seorang pahlawan nasional dan tokoh sejarah yang sangat penting bagi bangsa ini.',
      'Aku dikenal sebagai sosok pemimpin yang sangat pandai berpidato untuk membakar semangat rakyat.',
      'Penampilanku sangat khas, aku sering terlihat memakai seragam rapi, peci hitam, dan membawa tongkat komando.',
      'Aku bersahabat baik dengan Mohammad Hatta dan berjuang bersama untuk membebaskan negeri ini dari penjajah.',
      'Aku adalah tokoh yang pertama kali merumuskan dan mengusulkan dasar negara kita, yaitu Pancasila.',
      'Pada tanggal 17 Agustus 1945, akulah yang membacakan teks proklamasi kemerdekaan di depan banyak orang.',
      'Karena jasaku itu, aku dihormati oleh seluruh rakyat dengan gelar Bapak Proklamator Indonesia.',
      'Aku adalah orang yang menjabat sebagai Presiden pertama Republik Indonesia!',
    ],
    answer: 'Soekarno',
  },
  {
    clues: [
      'Aku adalah sebuah alat musik tradisional.',
      'Aku berasal dari daerah Jawa Barat.',
      'Bahan utamaku murni terbuat dari bambu.',
      'Bentukku seperti susunan tabung yang diikat.',
      'Aku tidak dipetik, dipukul, ataupun ditiup.',
      'Cara memainkanku adalah dengan digoyangkan.',
      'Biasanya aku dimainkan beramai-ramai agar menjadi sebuah lagu.',
      'Pertunjukanku sangat terkenal di Saung Mang Udjo!',
    ],
    answer: 'Angklung',
  },
  {
    clues: [
      'Aku adalah sebuah pulau indah yang terletak di Provinsi Nusa Tenggara Timur.',
      'Aku memiliki pantai unik yang pasirnya berwarna merah muda (Pink Beach).',
      'Aku menjadi satu-satunya rumah asli di dunia bagi spesies kadal purba raksasa.',
    ],
    answer: 'Pulau Komodo',
  },
  {
    clues: [
      'Aku adalah sebuah makanan tradisional Indonesia.',
      'Bahan utamaku sebenarnya hanyalah beras putih biasa.',
      'Aku dimasak dengan cara direbus dalam waktu yang cukup lama.',
      'Bungkusku sangat khas, terbuat dari anyaman daun kelapa muda (janur).',
      'Bentuk anyamanku sangat unik, biasanya menyerupai segi empat.',
      'Sebelum disantap, aku harus diiris atau dipotong-potong terlebih dahulu.',
      'Aku adalah teman makan paling pas untuk hidangan opor ayam dan sate.',
      'Aku selalu menjadi hidangan yang wajib ada saat perayaan Hari Raya Idulfitri!',
    ],
    answer: 'Ketupat',
  },
  {
    clues: [
      'Aku adalah sebuah alat musik tiup.',
      'Aku sangat identik dengan budaya masyarakat Indonesia Timur, khususnya Maluku dan sekitarnya.',
      'Tubuhku terbuat dari bambu panjang yang memiliki ruas atau buku.',
      'Aku dimainkan dengan cara ditiup dari satu ujung.',
      'Bunyiku sangat melengking, nyaring, dan nyaring.',
      'Aku memiliki beberapa lubang di sepanjang batangnya.',
      'Dalam tradisi masyarakat, aku sering digunakan untuk mengiringi tarian tradisional.',
      'Aku juga biasa dibunyikan untuk menyambut tamu atau mengusir roh jahat.',
    ],
    answer: 'Suling Bambu',
  },
  {
    clues: [
      'Aku adalah seorang pahlawan perempuan yang berasal dari Jepara, Jawa Tengah.',
      'Di masa lalu, aku sering mengirim surat kepada teman-temanku di Belanda.',
      'Surat-suratku dikumpulkan dan dijadikan buku berjudul "Habis Gelap Terbitlah Terang".',
    ],
    answer: 'R.A. Kartini',
  },
  {
    clues: [
      'Aku adalah alat musik pukul tradisional asal Indonesia.',
      'Aku dimainkan dengan cara dipukul menggunakan stik khusus.',
      'Aku terbuat dari logam atau perunggu yang dibentuk bundar pipih.',
      'Aku menghasilkan nada yang tinggi, nyaring, dan bergetar.',
      'Dalam gamelan, aku berfungsi sebagai penentu tempo dan irama.',
      'Aku sering terlihat digantung berpasangan dalam set gamelan.',
      'Suaraku bisa sangat keras saat dipukul dengan kuat.',
      'Aku adalah salah satu instrumen paling penting dalam musik Jawa dan Bali.',
    ],
    answer: 'Gong',
  },
  {
    clues: [
      'Aku adalah seorang pahlawan nasional Indonesia.',
      'Aku adalah seorang pemimpin hebat dari kalangan militer.',
      'Aku berjuang melawan penjajah dengan menggunakan taktik perang gerilya.',
      'Saat memimpin pasukan masuk keluar hutan, kondisiku sedang sakit parah.',
      'Saat itu, paru-paruku dikabarkan hanya berfungsi satu.',
      'Karena tidak kuat berjalan kaki, aku harus ditandu oleh para prajuritku.',
      'Aku merupakan Panglima Besar Tentara Nasional Indonesia (TNI) yang pertama.',
      'Saat ini, namaku sangat sering dijadikan nama jalan utama di berbagai kota besar!',
    ],
    answer: 'Jenderal Soedirman',
  },
  {
    clues: [
      'Aku adalah seorang tokoh nasional Indonesia yang sangat dihormati.',
      'Aku dikenal sebagai Bapak Pendidikan Nasional.',
      'Aku mendirikan perguruan tinggi pertama di Indonesia, yaitu Universitas Gadjah Mada.',
      'Namaku sangat identik dengan dunia pendidikan dan pengembangan sumber daya manusia.',
      'Aku pernah menjabat sebagai Menteri Pendidikan dan Kebudayaan pertama Indonesia.',
    ],
    answer: 'Ki Hajar Dewantara',
  },
  {
    clues: [
      'Aku adalah seorang tokoh nasional Indonesia yang sangat disegani.',
      'Aku dikenal sebagai Bapak Proklamator Kemerdekaan Republik Indonesia.',
      'Aku adalah wakil presiden pertama Indonesia yang berjuang bersama Soekarno.',
      'Namaku sangat identik dengan mata uang pecahan Rp100.000.',
      'Aku adalah salah satu pendiri Republik Indonesia.',
    ],
    answer: 'Mohammad Hatta',
  },
  {
    clues: [
      'Aku adalah seorang tokoh nasional Indonesia.',
      'Aku dikenal sebagai Bapak Pers Nasional Indonesia.',
      'Aku adalah salah satu pendiri Republik Indonesia.',
      'Namaku sangat identik dengan mata uang pecahan Rp50.000.',
      'Aku adalah salah satu pendiri Republik Indonesia.',
    ],
    answer: 'Tan Malaka',
  },
  {
    clues: [
      'Aku adalah buah-buahan.',
      'Kulitku berwarna merah atau hijau.',
      'Aku memiliki rasa yang manis dan sedikit asam.',
      'Aku tumbuh di pohon dan memiliki biji di dalamnya.',
      'Aku adalah buah yang populer di seluruh dunia.',
      'Aku bisa dimakan langsung atau dibuat jus.',
      'Aku mengandung banyak vitamin dan mineral.',
      'Aku sering ditemukan di pasar tradisional maupun supermarket.',
    ],
    answer: 'Apel',
  },
  {
    clues: [
      'Aku adalah sebuah hewan mamalia.',
      'Aku adalah hewan tercepat di darat.',
      'Aku memiliki bulu berwarna cokelat keemasan dengan bintik-bintik hitam.',
      'Aku hidup di Afrika dan sebagian kecil Asia.',
      'Aku memiliki moncong yang panjang dan hidung yang sensitif.',
      'Aku adalah predator yang berburu dengan kecepatan tinggi.',
      'Aku bisa berlari dengan kecepatan hingga 112 km/jam.',
      'Aku adalah hewan yang sangat lincah dan gesit.',
    ],
    answer: 'Citah',
  },
  {
    clues: [
      'Aku adalah buah-buahan.',
      'Kulitku berwarna oranye atau kuning.',
      'Aku memiliki rasa yang manis dan sedikit asam.',
      'Aku tumbuh di pohon dan memiliki biji di dalamnya.',
      'Aku adalah buah yang populer di seluruh dunia.',
      'Aku bisa dimakan langsung atau dibuat jus.',
      'Aku mengandung banyak vitamin C.',
      'Aku sering ditemukan di pasar tradisional maupun supermarket.',
    ],
    answer: 'Jeruk',
  },
  {
    clues: [
      'Aku adalah hewan.',
      'Aku adalah hewan mamalia.',
      'Aku memiliki bulu berwarna cokelat keemasan dengan bintik-bintik hitam.',
      'Aku hidup di Afrika dan sebagian kecil Asia.',
      'Aku memiliki moncong yang panjang dan hidung yang sensitif.',
      'Aku adalah predator yang berburu dengan kecepatan tinggi.',
      'Aku bisa berlari dengan kecepatan hingga 112 km/jam.',
      'Aku adalah hewan yang sangat lincah dan gesit.',
    ],
    answer: 'Kuda',
  },
  {
    clues: [
      'Aku adalah hewan.',
      'Aku memiliki sayap.',
      'Aku bisa terbang.',
      'Aku hidup di pohon dan memiliki paruh.',
      'Aku adalah hewan yang sangat lincah dan gesit.',
    ],
    answer: 'Burung',
  },
  {
    clues: [
      'Aku adalah minuman tradisional Indonesia.',
      'Aku berasal dari Jawa Timur, khususnya Tuban.',
      'Aku terbuat dari sari bunga siwalan.',
      'Aku memiliki rasa yang manis dan sedikit asam.',
      'Aku mengandung banyak vitamin C.',
    ],
    answer: 'Legen Tuban',
  },
  {
    clues: [
      'Aku adalah buah-buahan.',
      'Kulitku berwarna hijau atau hitam.',
      'Aku memiliki rasa yang manis dan sedikit asam.',
      'Aku tumbuh di pohon dan memiliki biji di dalamnya.',
      'Aku adalah buah yang populer di seluruh dunia.',
      'Aku bisa dimakan langsung atau dibuat jus.',
      'Aku mengandung banyak vitamin C.',
    ],
    answer: 'Alpukat',
  },
  {
    clues: [
      'Aku adalah hewan.',
      'Aku memiliki belalai.',
      'Aku memiliki telinga yang besar.',
      'Aku memiliki ekor yang panjang.',
      'badanku sangat besar berwarna abu abu,'
    ],
    answer: 'Gajah',
  },
  {
    clues: [
      'Aku adalah sebuah taman rekreasi keluarga yang sangat luas di Jawa Timur.',
      'Aku terletak tepat di pinggir pantai laut utara.',
      'Pada zaman dahulu, lokasiku lebih dikenal dengan nama Pantai Tanjung Kodok.',
      'Pintu masukku sangat ikonik karena berbentuk patung kepiting jingga raksasa yang sedang membuka capitnya.',
      'Aku memiliki puluhan wahana permainan seru, mulai dari jet coaster hingga wahana air.',
      'Aku berada di Kabupaten Lamongan dan menjadi kebanggaan warga di sana.',
      'Orang-orang sangat sering menyebut namaku dengan singkatan tiga huruf'
    ],
    answer: 'Wisata Bahari Lamongan (WBL)',
  },
  {
    clues: [
      'Aku adalah sebuah tempat rekreasi keluarga yang sangat seru di provinsi Jawa Timur.',
      'Aku menawarkan petualangan ganda, yaitu melihat banyak satwa dan menyusuri alam bawah tanah.',
      'Keajaibanku berawal dari sebuah lubang misterius yang tanpa sengaja ditemukan oleh penggali batu kapur pada tahun 1992.',
      'Ketika lubang itu dimasuki, ternyata di dalamnya terdapat pemandangan batuan stalaktit dan stalagmit yang menakjubkan!',
      'Batuan di dalam perut bumiku ini sangat unik karena bisa memancarkan cahaya yang terlihat cantik.',
      'Selain keindahan bawah tanah, aku juga merawat berbagai satwa eksotis seperti burung tropis, jerapah, dan singa putih.',
      'Posisiku tepat berada di seberang jalan dari Wisata Bahari Lamongan (WBL) dan kami dihubungkan oleh sebuah jembatan penyeberangan!',
      'Namaku terdiri dari gabungan kata kebun binatang dan gua peninggalan alam.'
    ],
    answer: 'Maharani Zoo & Goa',
  }
];

/* ─── Helpers ─── */
function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/* ─── Page Component ─── */
export default function SmartAssPage() {
  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  /** Shuffle order on mount */
  const shuffledQuestions = useMemo(() => shuffleArray(QUESTIONS), []);

  const currentQuestion = shuffledQuestions[questionIndex % shuffledQuestions.length];

  /** Start the game */
  const handleStart = () => {
    setStarted(true);
  };

  /** Pick a new random question */
  const handleRandomize = () => {
    setQuestionIndex((prev) => prev + 1);
  };

  /* ─── Instruction Screen ─── */
  if (!started) {
    return (
      <main className="min-h-dvh bg-slate-900 flex flex-col items-center px-5 py-8">
        <h1 className="text-3xl font-black text-white tracking-tight mb-2 animate-fade-in">
          🧠 SMART ASS
        </h1>

        {/* Instructions card */}
        <div className="w-full max-w-md mt-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 animate-fade-in-up">
          <h2 className="text-amber-400 font-bold text-lg mb-3">📋 Cara Bermain</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Tebak siapa aku berdasarkan clue yang akan aku baca. Siapa cepat dan
            tepat menjawab dia menang. Contohkan 1–2 soal terlebih dahulu.
          </p>
        </div>

        {/* Buttons */}
        <div className="w-full max-w-md space-y-3 mt-8 animate-fade-in-up stagger-2">
          <button
            onClick={handleStart}
            className="
              w-full py-4 rounded-2xl font-bold text-xl
              bg-gradient-to-r from-amber-500 to-orange-500
              text-white shadow-lg shadow-amber-500/25
              active:scale-[0.97] transition-transform duration-150
            "
          >
            🚀 Mulai
          </button>
          <div className="flex justify-center pt-2">
            <HomeButton />
          </div>
        </div>
      </main>
    );
  }

  /* ─── Game Screen ─── */
  return (
    <main className="min-h-dvh bg-slate-900 flex flex-col px-5 py-8">
      <h1 className="text-2xl font-black text-white tracking-tight text-center mb-6 animate-fade-in">
        🧠 SMART ASS
      </h1>

      {/* Clues list */}
      <div className="flex-1 w-full max-w-md mx-auto space-y-2.5 mb-6">
        {currentQuestion.clues.map((clue, i) => (
          <div
            key={`${questionIndex}-${i}`}
            className="
              flex gap-3 items-start p-4 rounded-xl
              bg-white/5 border border-white/5
              animate-fade-in-up
            "
          >
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-bold text-sm flex items-center justify-center">
              {i + 1}
            </span>
            <p className="text-slate-200 text-sm leading-relaxed">{clue}</p>
          </div>
        ))}

        {/* Answer reveal */}
        <div className="p-5 mt-6 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-2 border-amber-500/30 text-center animate-fade-in-up">
          <p className="text-amber-400/70 text-xs font-semibold uppercase tracking-wider mb-1">
            Jawaban
          </p>
          <p className="text-white font-black text-3xl">{currentQuestion.answer}</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="w-full max-w-md mx-auto space-y-3 pb-4">
        {/* Randomize for next question */}
        <button
          onClick={handleRandomize}
          className="
            w-full py-3 rounded-2xl font-semibold text-base
            bg-white/10 border border-white/10
            text-white
            active:scale-[0.97] transition-transform duration-150
          "
        >
          🎲 Acak Soal Baru
        </button>

        <div className="flex justify-center pt-1">
          <HomeButton />
        </div>
      </div>
    </main>
  );
}
