"use client";

import type { NextPage } from 'next';
import Head from 'next/head';

// Helper component for icons to avoid external dependencies
const Icon = ({ path, className = 'w-6 h-6' }: { path: string; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d={path} />
  </svg>
);

const CheckCircleIcon = () => (
    <Icon path="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
);

const CodeBracketIcon = () => (
    <Icon path="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
);

const CloudArrowUpIcon = () => (
    <Icon path="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
);


const MigrationPage: NextPage = () => {
  return (
    <div className="bg-slate-900 text-white min-h-screen font-sans">
      <Head>
        <title>Migrasi Supabase ke Google Cloud SQL | Tutorial Lengkap</title>
        <meta name="description" content="Panduan langkah demi langkah untuk migrasi database dari Supabase ke Google Cloud SQL PostgreSQL dengan sintaks lengkap." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-700">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <CloudArrowUpIcon className="w-8 h-8 text-cyan-400" />
                <h1 className="text-xl font-bold text-slate-100">Panduan Migrasi Cloud</h1>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8 md:py-16">
        {/* Hero Section */}
        <section className="relative rounded-xl overflow-hidden mb-16 shadow-2xl shadow-cyan-500/10">
            <img 
                src="https://images.unsplash.com/photo-1580894742597-87989249393a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Cloud Database Migration" 
                className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm z-10"></div>
            <div className="relative z-20 p-8 md:p-16 text-center text-white">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
                    Migrasi dari Supabase ke Google Cloud SQL
                </h2>
                <p className="text-lg md:text-xl max-w-3xl mx-auto text-slate-300">
                    Tutorial lengkap untuk memindahkan database PostgreSQL Anda dari Supabase ke Google Cloud SQL dengan aman dan efisien.
                </p>
            </div>
        </section>

        {/* Tutorial Content */}
        <div className="max-w-4xl mx-auto">
            <div className="prose prose-invert prose-lg max-w-none">
                <p className="lead text-xl text-slate-300">
                    Migrasi database adalah langkah penting untuk skalabilitas dan kontrol yang lebih besar. Panduan ini akan memandu Anda melalui setiap langkah proses migrasi dari Supabase ke Google Cloud SQL, lengkap dengan perintah dan sintaks yang Anda butuhkan.
                </p>

                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 my-8">
                    <h3 className="text-2xl font-bold text-cyan-400 flex items-center gap-3">
                        <CheckCircleIcon />
                        Prasyarat
                    </h3>
                    <ul className="list-disc list-inside mt-4 space-y-2 text-slate-300">
                        <li>Akses ke akun Supabase Anda.</li>
                        <li>Akun Google Cloud Platform (GCP) dengan penagihan aktif.</li>
                        <li><code className="bg-slate-700 text-sm rounded px-2 py-1">gcloud</code> CLI terinstal dan terautentikasi.</li>
                        <li><code className="bg-slate-700 text-sm rounded px-2 py-1">psql</code> dan <code className="bg-slate-700 text-sm rounded px-2 py-1">pg_dump</code> terinstal di mesin lokal Anda.</li>
                    </ul>
                </div>

                {/* Step 1 */}
                <Step title="Langkah 1: Ekspor Data dari Supabase">
                    <p>Langkah pertama adalah membuat dump (cadangan) dari database Supabase Anda. Anda memerlukan URI koneksi database yang bisa ditemukan di dasbor Supabase.</p>
                    <p>Buka <code className="text-cyan-400">Project Settings &gt; Database</code>. Di bawah <code className="text-cyan-400">Connection string</code>, salin URI yang ada.</p>
                    <p>Gunakan perintah <code className="text-cyan-400">pg_dump</code> untuk mengekspor skema dan data. Ganti <code className="text-amber-400">[YOUR_SUPABASE_CONNECTION_URI]</code> dengan URI yang Anda salin.</p>
                    <CodeBlock language="bash" code={`pg_dump -F t "[YOUR_SUPABASE_CONNECTION_URI]" > supabase_backup.tar`} />
                    <p>Perintah ini akan membuat file bernama <code className="text-cyan-400">supabase_backup.tar</code> yang berisi seluruh data dan struktur database Anda.</p>
                </Step>

                {/* Step 2 */}
                <Step title="Langkah 2: Siapkan Google Cloud SQL">
                    <p>Sekarang, kita akan membuat instance PostgreSQL baru di Google Cloud SQL.</p>
                    <ol className="list-decimal list-inside space-y-4">
                        <li>
                            <strong>Buat Instance:</strong> Buka konsol GCP, navigasi ke SQL, dan buat instance baru. Pilih "PostgreSQL". Berikan ID instance (misalnya, <code className="text-cyan-400">my-postgres-instance</code>), dan atur kata sandi untuk pengguna <code className="text-cyan-400">postgres</code>.
                        </li>
                        <li>
                            <strong>Konfigurasi Instance:</strong> Pilih versi PostgreSQL yang sama atau lebih baru dari versi Supabase Anda. Pilih region dan zona, serta konfigurasi mesin yang sesuai dengan kebutuhan Anda. Untuk memulai, tipe mesin kecil sudah cukup.
                        </li>
                        <li>
                            <strong>Buat Database:</strong> Setelah instance dibuat, buka tab "Databases" dan buat database baru. Beri nama, misalnya <code className="text-cyan-400">mydatabase</code>.
                        </li>
                    </ol>
                </Step>

                {/* Step 3 */}
                <Step title="Langkah 3: Impor Data ke Google Cloud SQL">
                    <p>Ada dua cara umum untuk mengimpor data: menggunakan Cloud SQL Auth Proxy (disarankan untuk keamanan) atau mengizinkan koneksi publik sementara.</p>
                    
                    <h4 className="text-xl font-semibold mt-6 mb-2 text-cyan-400">Metode 1: Menggunakan Cloud SQL Auth Proxy</h4>
                    <p>Proxy ini menyediakan koneksi yang aman tanpa perlu whitelist alamat IP.</p>
                    <ol className="list-decimal list-inside space-y-4">
                        <li>
                            <strong>Dapatkan Nama Koneksi Instance:</strong> Salin nama ini dari halaman detail instance di GCP. Formatnya: <code className="text-amber-400">project:region:instance-id</code>.
                        </li>
                        <li>
                            <strong>Jalankan Proxy:</strong> Buka terminal baru dan jalankan perintah berikut.
                            <CodeBlock language="bash" code={`./cloud_sql_proxy -instances="[YOUR_INSTANCE_CONNECTION_NAME]"=tcp:5432`} />
                        </li>
                        <li>
                            <strong>Impor Data:</strong> Buka terminal lain dan gunakan <code className="text-cyan-400">pg_restore</code> untuk mengimpor data Anda.
                            <CodeBlock language="bash" code={`pg_restore -d "postgresql://postgres:[YOUR_DB_PASSWORD]@localhost:5432/mydatabase" --no-owner --role=postgres supabase_backup.tar`} />
                            <p>Ganti <code className="text-amber-400">[YOUR_DB_PASSWORD]</code> dengan kata sandi yang Anda atur saat membuat instance Cloud SQL.</p>
                        </li>
                    </ol>

                    <h4 className="text-xl font-semibold mt-6 mb-2 text-cyan-400">Metode 2: Koneksi Publik (Kurang Aman)</h4>
                     <ol className="list-decimal list-inside space-y-4">
                        <li>
                            <strong>Whitelist IP Anda:</strong> Di halaman konektivitas instance Cloud SQL, tambahkan alamat IP publik Anda ke daftar "Authorized networks".
                        </li>
                        <li>
                            <strong>Dapatkan IP Publik Instance:</strong> Salin alamat IP publik dari halaman ringkasan instance.
                        </li>
                        <li>
                            <strong>Impor Data:</strong> Jalankan perintah <code className="text-cyan-400">pg_restore</code> dengan IP publik instance.
                            <CodeBlock language="bash" code={`pg_restore -d "postgresql://postgres:[YOUR_DB_PASSWORD]@[INSTANCE_PUBLIC_IP]:5432/mydatabase" --no-owner --role=postgres supabase_backup.tar`} />
                        </li>
                        <li>
                            <strong>PENTING:</strong> Setelah selesai, jangan lupa hapus IP Anda dari "Authorized networks" untuk mengamankan database.
                        </li>
                    </ol>
                </Step>

                {/* Step 4 */}
                <Step title="Langkah 4: Perbarui Konfigurasi Aplikasi">
                    <p>Setelah data berhasil diimpor, langkah terakhir adalah mengarahkan aplikasi Anda ke database Google Cloud SQL yang baru.</p>
                    <p>Format string koneksi untuk Google Cloud SQL biasanya terlihat seperti ini:</p>
                    <CodeBlock language="text" code={`postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]`} />
                    <p>Ganti variabel di atas dengan kredensial Cloud SQL Anda. Jika Anda menggunakan Cloud SQL Auth Proxy di lingkungan produksi (misalnya, dalam container sidecar), host Anda akan menjadi <code className="text-cyan-400">localhost</code> atau <code className="text-cyan-400">127.0.0.1</code>.</p>
                    <p>Perbarui variabel lingkungan (<code className="text-cyan-400">DATABASE_URL</code>) di aplikasi Anda dengan string koneksi yang baru.</p>
                </Step>

                {/* Step 5 */}
                <Step title="Langkah 5: Verifikasi dan Selesai">
                    <p>Nyalakan ulang aplikasi Anda dan lakukan pengujian menyeluruh untuk memastikan semua fungsi berjalan dengan baik. Periksa apakah data dapat dibaca dan ditulis dengan benar.</p>
                    <p>Selamat! Anda telah berhasil memigrasikan database Anda dari Supabase ke Google Cloud SQL. Anda sekarang memiliki kontrol penuh atas infrastruktur database Anda, siap untuk skala yang lebih besar.</p>
                </Step>
            </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 mt-16">
        <div className="container mx-auto px-6 py-6 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} Panduan Migrasi Cloud. Dibuat untuk demonstrasi.</p>
        </div>
      </footer>
    </div>
  );
};

// Helper component for structuring steps
const Step = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="my-12">
        <h3 className="text-3xl font-bold mb-6 pb-3 border-b-2 border-cyan-500 flex items-center gap-3">
            <CodeBracketIcon className="w-8 h-8 text-cyan-400" />
            {title}
        </h3>
        <div className="space-y-4 text-slate-300">
            {children}
        </div>
    </section>
);

// Helper component for code blocks
const CodeBlock = ({ code, language }: { code: string; language: string }) => (
    <div className="bg-slate-800 rounded-lg my-4">
        <div className="flex justify-between items-center px-4 py-2 bg-slate-700/50 rounded-t-lg">
            <span className="text-xs font-semibold text-slate-400 uppercase">{language}</span>
            <button 
                onClick={() => navigator.clipboard.writeText(code)}
                className="text-xs text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
            >
                <Icon path="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v3.75m-8.666 0V6.75A2.25 2.25 0 015.25 4.5h3.375c.621 0 1.125.504 1.125 1.125V6.75m-8.666 0h8.666v9c0 1.243-.995 2.25-2.22 2.25H4.888A2.25 2.25 0 012.668 18v-9z" className="w-4 h-4" />
                Salin
            </button>
        </div>
        <pre className="p-4 text-sm overflow-x-auto">
            <code className={`language-${language}`}>{code}</code>
        </pre>
    </div>
);

export default MigrationPage;