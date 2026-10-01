# Đưa EShop lên URL công khai (cho Maze / Microsoft Clarity)

Frontend gọi API qua `API_URL` = `import.meta.env.VITE_API_URL || "/api"`.
Khi chạy local, Vite chuyển tiếp `/api` sang `http://localhost:3000`, nên mọi thứ vẫn chạy như cũ.

## Cách A: Tunnel (nhanh nhất, chạy trên máy của nhóm)

```bash
cd backend && npm install && node server.js        # cổng 3000 (tự reset + seed DB khi khởi động)
cd frontend-web && npm install && npm run dev       # cổng 5173
cloudflared tunnel --url http://localhost:5173      # hoặc: ngrok http 5173
```

Chỉ cần public một cổng 5173; các request `/api` đi qua proxy của Vite.
URL chỉ sống khi máy đang bật.

## Cách B: Vercel (frontend) + Render (backend)

1. **Backend trên Render** (Web Service, Root Directory `backend`):
   Build `npm install`, Start `npm start`. Render cấp `PORT` qua biến môi trường.
   Lưu ý: gói free ngủ sau khoảng 15 phút không dùng, lần gọi đầu chậm khoảng 1 phút;
   mỗi lần khởi động lại, DB SQLite bị reset về dữ liệu mẫu (`database.js` chạy lúc start).
2. **Frontend trên Vercel** (Root Directory `frontend-web`, framework Vite):
   thêm biến môi trường `VITE_API_URL=https://<ten-backend>.onrender.com/api` rồi deploy.
   `vercel.json` đã có rewrite để reload `/cart`, `/checkout`... không bị 404.
3. Admin (`frontend-admin`) làm tương tự nếu cần.

Không nên đặt backend lên Vercel: Vercel chạy serverless, ổ đĩa không ghi lâu dài được nên SQLite
và giỏ hàng lưu trong bộ nhớ (`userCarts`) sẽ mất giữa các request.
