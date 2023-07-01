const express = require('express');
const cors = require('cors');

const app = express();

// Konfigurasi middleware CORS
const corsOptions = {
    origin: 'https://theultimatebox.id', // Batasi hanya domain ini yang dapat mengakses aplikasi
    methods: ['GET', 'POST'], // Hanya izinkan metode GET dan POST
};
app.use(cors(corsOptions));

// Rute-rute aplikasi Anda
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Menjalankan server
app.listen(3000, () => {
    console.log('Server berjalan pada port 3000');
});
