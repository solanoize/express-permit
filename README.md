# Express Permit

Dibuat untuk memudahkan implementasi kontrol akses berbasis peran (RBAC) dalam aplikasi Express. Boilerplate ini menyediakan cara yang sederhana dan fleksibel untuk mengelola peran dan izin pengguna, memastikan bahwa pengguna hanya dapat mengakses sumber daya yang mereka izinkan.

## Fitur

- **Manajemen Role:** Definisikan dan tetapkan peran kepada pengguna
- **Manajemen Permission:** Buat izin dan tetapkan kepada peran.
- **Integrasi Middleware:** Mudah diintegrasikan dengan rute Express Anda untuk menegakkan izin.
- **Dapat Dikustomisasi:** Perluas dan kustomisasi peran dan izin sesuai dengan kebutuhan aplikasi Anda.

## Kebutuhan Sistem

- Node.js v22.2.0
- NPM 10.7.0
- MongoDB Server 7.0.2

## Instalasi

Untuk membuat project, jalankan perintah berikut:

```
$ git clone https://github.com/solanoize/express-permit.git <your-project-name>
```

Selanjutnya, buat file `.env` dengan konfigurasi berikut:

```
API_PORT=3000
API_TOKEN=<your-token>
API_ORIGIN=*
API_LOG=logs/api.log

DEBUG_MODE=1

MONGODB_URI=mongodb://0.0.0.0:27017/poslite-db

ADMIN_EMAIL=<your-email>
ADMIN_PASSWORD=<your-password>
ADMIN_FIRSTNAME=<your-firstname>
ADMIN_LASTNAME=<your-lastname>
```

Install nodemon:

```
$ npm install -g nodemon
```

Instal dependensi yang dibutuhkan:

```
$ npm install
```

Inisialisasi project:

```
$ node cli.js -i
```

Jalankan:

```
$ npm run dev
```

Generate permission dengan mengakses http://host:port/permissions/generate menggunakan method post
dan token super user (admin).
