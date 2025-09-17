# BOT-WA WhatsApp API

API ini menyediakan integrasi WhatsApp Web untuk mengirim pesan, mengambil daftar chat, dan mengelola sesi WhatsApp secara otomatis.

## Cara Penggunaan Singkat

1. Jalankan server dengan `node index.js`.
2. Buka dokumentasi Swagger di [http://localhost:3000/docs](http://localhost:3000/docs) untuk eksplorasi dan testing endpoint.
3. Gunakan endpoint di bawah untuk mengelola sesi dan pesan WhatsApp.

## Daftar API

| Endpoint                | Method | Deskripsi                                               | Request Body                | Response Utama                |
|-------------------------|--------|---------------------------------------------------------|-----------------------------|-------------------------------|
| `/api/session/start`    | POST   | Memulai sesi WhatsApp Web dan mengembalikan QR code     | -                           | `{ ok, status, qr }`          |
| `/api/session/status`   | GET    | Mendapatkan status sesi WhatsApp Web                    | -                           | `{ ok, status, error }`       |
| `/api/session/delete`   | POST   | Menghapus sesi dan data autentikasi WhatsApp Web        | -                           | `{ ok, deleted }`             |
| `/api/chats`            | GET    | Mengambil daftar chat dan ID dari WhatsApp              | -                           | `{ ok, chats: [...] }`        |
| `/api/message`          | POST   | Mengirim pesan ke chat tertentu (user/group)            | `{ chatId, message }`       | `{ ok, id, timestamp, ack }`  |

## Dokumentasi Swagger

Akses dokumentasi lengkap dan contoh request/response di `/docs`.

---