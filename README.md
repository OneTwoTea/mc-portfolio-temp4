# MC Portfolio — "Video Text Mask"

Website một trang cho MC sự kiện cao cấp: HTML + Tailwind CSS v4 + JavaScript thuần, không framework, không bundler.
Giao diện **thiết kế cho điện thoại trước** (390px), desktop là bản mở rộng.
Toàn bộ nội dung nằm trong **một file duy nhất: `site.config.js`**.

**Phong cách:** chữ khổng lồ Plus Jakarta Sans, nền mực tối `#060A14` xen giấy ngà `#F4F1EA`, điểm nhấn vàng ánh kim `#D4AF37`, footer đen tuyền.
Hero là khối chữ lớn có **mặt chữ trong suốt** (`background-clip: text`) để lộ **video** showreel phía sau (Hero chỉ dùng video, không dùng ảnh).

## Cài đặt

Yêu cầu **Node.js >= 20**.

```bash
npm install
```

## Các lệnh

| Lệnh | Tác dụng |
|---|---|
| `npm run dev` | Build (không minify), mở server tại http://localhost:5173 và tự build lại khi sửa `index.html`, `site.config.js`, `src/`, `public/` |
| `npm run build` | Build bản chính thức (CSS minify) vào `dist/` |
| `npm run preview` | Chỉ phục vụ `dist/` đang có, không build |
| `node scripts/build.mjs --html-only` | Chỉ ghép HTML, bỏ qua CSS (nhanh) |

- Windows PowerShell báo lỗi "running scripts is disabled": dùng `npm.cmd run dev` thay cho `npm run dev`.
- Đổi cổng: `PORT=3000 npm run dev` (PowerShell: `$env:PORT=3000; npm run dev`).
- Giả lập GitHub Pages dạng project: `npm run dev -- --base=/mc-portfolio/` rồi mở http://localhost:5173/mc-portfolio/.
- **Xem thử trên điện thoại thật:** server in ra địa chỉ `LAN: http://192.168.x.x:5173/` — mở địa chỉ đó trên điện thoại dùng chung Wi-Fi (nếu không vào được, cho phép Node.js qua Windows Firewall).

Sau mỗi lần build, terminal sẽ báo:
- **Cảnh báo vàng**: file ảnh/video được khai báo nhưng chưa có trong `public/`, và các placeholder `[IN_HOA]` chưa thay.
- **Lỗi đỏ**: template dùng key không có trong config (lệnh build trả mã lỗi 1).

## Sửa nội dung

1. Mở `site.config.js` và sửa chữ, link, danh sách dịch vụ/video/ảnh… Mỗi mục có comment hướng dẫn và kích thước ảnh (mobile trước, desktop sau).
2. Thêm/bớt dịch vụ, video, ảnh gallery, đối tác, cảm nhận, câu hỏi FAQ bằng cách thêm/xóa object trong mảng `items`.
3. Đường dẫn ảnh/video viết dạng `public/images/...` (không có dấu `/` ở đầu).
4. Không sửa tay thư mục `dist/` — nó bị xóa và tạo lại mỗi lần build.

Link còn là placeholder (`[ZALO_LINK]`, `[SO_DIEN_THOAI]`…) sẽ tự trỏ về mục Liên hệ, nên không bao giờ thành link hỏng.
Ảnh chưa có sẽ tự hiện khung nền thay thế cùng tỉ lệ.

### Số mục hiển thị trên điện thoại (`mobileVisible`)

Trên điện thoại, các danh sách dài chỉ hiện vài mục đầu, phần còn lại thu gọn sau nút **"Xem thêm (N)"** (bấm lại để "Thu gọn").
Từ 1024px trở lên luôn hiện đủ. Nội dung thu gọn vẫn có sẵn trong HTML (tốt cho SEO, và hiện đầy đủ khi trình duyệt tắt JavaScript).

| Key | Mặc định | Khu vực |
|---|---|---|
| `services.mobileVisible` | `3` | Dịch vụ |
| `videos.mobileVisible` | `2` | Danh sách video nhỏ dưới showreel |
| `gallery.mobileVisible` | `5` | Ảnh gallery (1 ảnh lớn + 4 ảnh nhỏ) |
| `faq.mobileVisible` | `4` | Câu hỏi thường gặp |

Đặt bằng số mục trong danh sách (hoặc lớn hơn) để không thu gọn. Câu chuyện chi tiết (Giới thiệu) và câu trả lời FAQ thu gọn bằng `<details>` của HTML, không cần cấu hình.

### Key mới trong giao diện này

| Key | Ý nghĩa |
|---|---|
| `hero.maskLines` | Các dòng chữ khổng lồ ở Hero, mỗi phần tử một dòng, tự giãn vừa bề ngang. Nên IN HOA, 2–6 ký tự/dòng. VD `["MASTER"]`, `["THE", "VOICE"]` |
| `hero.eyebrow` | Dòng chữ nhỏ phía trên khối chữ lớn |
| `hero.summary` | Một câu ngắn dưới khối chữ (mobile). Từ 768px hiện thêm `hero.subheading` |
| `hero.maskVideo.src` | Video Hero (tắt tiếng, tự lặp) — chỉ cần 1 file, dùng chung cho cả mobile lẫn desktop. Chưa có → hiện khung giữ chỗ + nhãn "Khung video Hero" |
| `hero.maskVideo.mobile` / `.desktop` / `.webm` | (tùy chọn) bản riêng cho từng màn hình, ưu tiên hơn `src`. Để `""` → dùng `src` |
| `header.menuLabel` | Chữ "Menu" cạnh nút hamburger (từ 768px) |
| `about.statement` | Câu tuyên ngôn chữ lớn. Bọc `*dấu sao*` quanh cụm từ cần nhấn |
| `about.storyLabel` | Nhãn mở câu chuyện chi tiết |
| `services.hint` | Gợi ý nhỏ dưới tiêu đề Dịch vụ |
| `services.items[].video` | (tùy chọn) video xem trước thay ảnh, VD `public/videos/service-01.mp4` |
| `videos.moreHeading` | Tiêu đề danh sách video nhỏ |
| `gallery.cinematic` | `true` = tự phủ tông màu điện ảnh lên ảnh gallery |
| `testimonials.items[].highlight` | Câu quote đắt giá nhất (≤ 12 từ), hiện chữ lớn toàn màn hình |
| `faq` | Khối mới: `sectionLabel`, `heading`, `mobileVisible`, `items: [{ q, a }]` |
| `contact.megaHeading` | Dòng chữ khổng lồ đầu footer (`\n` = xuống dòng) |
| `contact.instagram`, `contact.tiktok` | Link mạng xã hội mới |
| `floatingButton.ringText` | Chữ chạy quanh vòng tròn xoay "BOOK NOW" |

Dữ liệu cũ vẫn được giữ: `about.portrait*`, `testimonials.items[].avatar/rating`, `gallery.categories`, `hero.heading`, `hero.background*` hiện không hiển thị trong giao diện này nhưng không bị xóa (file ảnh của `hero.background*` đã xóa; Hero chỉ dùng video `hero.maskVideo`).

## Placeholder cần thay (trong `site.config.js`)

| Placeholder | Ý nghĩa / ví dụ |
|---|---|
| `[TEN_MC]` | Tên MC / thương hiệu (hiện ở logo, Hero, footer) |
| `[SO_NAM_KINH_NGHIEM]`, `[SO_SU_KIEN]` | Số liệu, VD `8`, `500` |
| `[SO_DIEN_THOAI]` | `0901 234 567` (tự tạo link `tel:`) |
| `[ZALO_LINK]` | `https://zalo.me/0901234567` |
| `[EMAIL]` | Email nhận yêu cầu báo giá từ form |
| `[FACEBOOK_LINK]`, `[YOUTUBE_LINK]`, `[INSTAGRAM_LINK]`, `[TIKTOK_LINK]` | Link mạng xã hội |
| `[YOUTUBE_SHOWREEL_URL]`, `[YOUTUBE_VIDEO_01..04]` | Link YouTube hoặc `public/videos/xxx.mp4` |
| `[VIDEO_HERO]` | Video Hero dùng chung mọi màn hình, VD `public/videos/hero.mp4` |
| `[WEBSITE_URL]` | URL website sau khi deploy (cần cho ảnh chia sẻ Facebook/Zalo) |
| `[DIA_CHI]` | Khu vực hoạt động (để placeholder thì không hiện) |

## Ảnh & video cần chuẩn bị

Ưu tiên `.webp`, tên kebab-case có số thứ tự, bản mobile thêm đuôi `-m`. Đặt đúng thư mục:

| File | Mobile | Desktop |
|---|---|---|
| `public/videos/hero.mp4` | 6–12s, tắt tiếng, ≤ 3MB — 1 file dùng chung (tùy chọn bản riêng: mobile 720×900, desktop 1600×900) | dùng chung |
| `public/images/services/service-01..06.webp` | 720×480 (3:2) | dùng chung |
| `public/images/videos/showreel-thumb.webp` | 1280×720 (16:9) | dùng chung |
| `public/images/videos/video-01..04.webp` | 640×360 | dùng chung |
| `public/images/gallery/gallery-01..08.webp` | 600×750 (4:5) | 900×1125 (4:5) — ảnh 01 hiển thị to |
| `public/images/partners/partner-01..06.webp` | 160×64, nền trong suốt | 200×80 |
| `public/images/og/og-cover.jpg` | 1200×630 (ảnh khi chia sẻ link) — hiện là **ảnh giữ chỗ**, ghi đè bằng ảnh thật cùng tên | — |

Mẹo nén video lồng chữ (cần [ffmpeg](https://ffmpeg.org)):

```bash
ffmpeg -i showreel.mp4 -t 10 -an -vf "scale=1280:-2" -c:v libx264 -crf 28 -preset slow -movflags +faststart public/videos/hero.mp4
```

Video lồng chữ tải ngay khi trang dựng xong, tự dừng khi cuộn khỏi Hero. Người xem bật "giảm chuyển động" → chỉ hiện khung hình đầu, không phát. Chế độ tiết kiệm dữ liệu / mạng 2G → không tải video, mặt chữ hiện khung giữ chỗ.
Nếu file khai báo không tồn tại, trang tự thử bản còn lại (mobile ↔ desktop); hỏng cả hai thì hiện khung giữ chỗ.

Icon (`public/icons/`) đã có sẵn: `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `icon-512.png`.

## Deploy lên GitHub Pages

1. Tạo repo (VD `mc-portfolio`) và push code lên nhánh `main`.
2. Trên GitHub: **Settings → Pages → Source: GitHub Actions**.
3. Mỗi lần push lên `main`, workflow `.github/workflows/deploy.yml` sẽ tự build và deploy (hoặc chạy tay trong tab **Actions**).

Trang dùng đường dẫn tương đối nên chạy được cả ở `https://ten.github.io/` lẫn `https://ten.github.io/mc-portfolio/`.
Có thể đưa thư mục `dist/` lên bất kỳ hosting tĩnh nào (Netlify, Vercel, Cloudflare Pages…).

## Cấu trúc thư mục

```
├── site.config.js        # NỘI DUNG website (sửa ở đây)
├── index.html            # Khung HTML (template)
├── src/
│   ├── templates.js      # Bộ render: config → HTML
│   ├── input.css         # CSS nguồn Tailwind v4 (màu, font trong @theme)
│   └── js/main.js        # JS phía trình duyệt (menu, video lồng chữ, thu gọn, lightbox, slider, form)
├── public/               # icons/, images/<khu-vuc>/, videos/
├── scripts/
│   ├── build.mjs         # Build → dist/
│   └── dev.mjs           # Server phát triển (in cả địa chỉ LAN)
└── .github/workflows/deploy.yml
```
