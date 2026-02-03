# 🏇 Hệ thống đua ngựa bình chọn

Hệ thống minigame đua ngựa realtime cho đêm Gala, cho phép khán giả bình chọn các đội văn nghệ thông qua QR code.

## ✨ Tính năng

- 🗳️ **Trang vote**: Khán giả quét QR và bình chọn 1 trong 5 đội
- 🏁 **Trang đua ngựa**: Hiển thị 5 con ngựa đại diện cho 5 đội, cập nhật vị trí realtime
- ⚡ **Realtime**: Sử dụng Server-Sent Events (SSE) để cập nhật vote tức thì
- 🎨 **Animation ngựa chạy**: 2 frame (duỗi chân/cụp chân) tạo hiệu ứng ngựa đang chạy

## 🚀 Cài đặt và chạy

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Chạy development server

```bash
npm run dev
```

Server sẽ chạy tại: http://localhost:3000

## 📱 Cách sử dụng

### Cho ban tổ chức:

1. Mở trình duyệt truy cập: http://localhost:3000/race
2. Hiển thị trang này lên màn hình projector/TV
3. Chia sẻ QR code trang vote cho khán giả

### Cho khán giả:

1. Quét QR code hoặc truy cập: http://localhost:3000/vote
2. Chọn đội yêu thích và bấm "Bình chọn"
3. Xem ngựa của đội mình chạy trên màn hình chính!

## 🎯 Cách hoạt động

1. Khán giả vote qua `/vote` → API POST `/api/vote`
2. API lưu vote và broadcast qua SSE
3. Trang `/race` nhận update realtime qua SSE
4. Tính toán vị trí ngựa dựa trên tỷ lệ vote
5. Ngựa di chuyển mượt mà với animation chạy

## 📁 Cấu trúc thư mục

```
├── app/
│   ├── page.tsx              # Trang chủ
│   ├── vote/
│   │   └── page.tsx          # Trang bình chọn cho khán giả
│   └── race/
│       ├── page.tsx          # Trang đua ngựa (hiển thị cho hội trường)
│       └── race.module.css   # Styles cho đua ngựa
├── pages/
│   └── api/
│       └── vote.js           # API xử lý vote + SSE realtime
└── public/
    ├── horse1.png            # Frame 1: ngựa duỗi chân
    └── horse2.png            # Frame 2: ngựa cụp chân
```

## 🛠️ Customization

### Thay đổi tên đội:

Chỉnh sửa trong `app/vote/page.tsx` và `app/race/page.tsx`:

```typescript
const teams = [
  { id: 1, name: 'Đội Marketing', color: '#FF6B6B' },
  { id: 2, name: 'Đội IT', color: '#4ECDC4' },
  // ...
];
```

### Thay đổi ảnh ngựa:

Thay thế `public/horse1.png` và `public/horse2.png` bằng ảnh của bạn.

### Điều chỉnh tốc độ animation:

Trong `app/race/race.module.css`:

```css
.horseAnimation {
  animation: gallop 0.3s steps(1) infinite; /* Đổi 0.3s thành giá trị khác */
}
```

## 🌐 Deploy production

### Deploy lên Vercel (khuyến nghị):

```bash
npm run build
vercel --prod
```

### Tạo QR code:

Sau khi deploy, tạo QR code cho URL: `https://your-domain.vercel.app/vote`

## 💡 Tips

- Kiểm tra kết nối mạng tốt trước khi tổ chức sự kiện
- Test thử với vài thiết bị trước
- Có thể reset vote bằng cách restart server
- Để lưu vote vào database, thay đổi logic trong `pages/api/vote.js`

---

This is a [Next.js](https://nextjs.org) project.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
