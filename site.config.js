/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  SITE.CONFIG.JS — CẤU HÌNH NỘI DUNG WEBSITE                  ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  Toàn bộ nội dung hiển thị trên website được quản lý         ║
 * ║  tại file này. Muốn đổi nội dung, chỉ cần sửa file này       ║
 * ║  rồi chạy `npm run build` (hoặc để `npm run dev` tự build).  ║
 * ║                                                              ║
 * ║  HƯỚNG DẪN:                                                  ║
 * ║  - Thay các giá trị [IN_HOA] bằng thông tin thật             ║
 * ║  - Đường dẫn ảnh/video viết dạng "public/images/..."         ║
 * ║    (KHÔNG có dấu / ở đầu)                                    ║
 * ║  - Ảnh ưu tiên .webp, tên kebab-case: service-01.webp,       ║
 * ║    bản mobile thêm đuôi -m: service-01-m.webp                ║
 * ║  - Kích thước ảnh ghi ở comment từng mục: MOBILE trước,      ║
 * ║    DESKTOP sau                                               ║
 * ║  - mobileVisible = số mục hiện sẵn trên điện thoại, phần     ║
 * ║    còn lại thu gọn sau nút "Xem thêm (N)". Từ 1024px trở     ║
 * ║    lên luôn hiện đủ.                                         ║
 * ║  - Ảnh chưa có → trang tự hiện khung nền thay thế            ║
 * ║  - Link còn placeholder → nút tự trỏ về mục #contact         ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

export const SITE_CONFIG = {

  // ─── 1. SEO & META ─────────────────────────────────────────
  seo: {
    title: "MC [TEN_MC] — MC Sự Kiện Chuyên Nghiệp",
    description: "MC dẫn chương trình sự kiện chuyên nghiệp tại TP.HCM và toàn quốc. Hơn [SO_NAM_KINH_NGHIEM] năm kinh nghiệm, [SO_SU_KIEN]+ sự kiện thành công.",
    keywords: "MC sự kiện, MC đám cưới, MC doanh nghiệp, dẫn chương trình, [TEN_MC]",
    ogImage: "public/images/og/og-cover.jpg",        // 1200×630px, JPG (Facebook/Zalo chưa đọc tốt WebP)
    ogImageAlt: "MC [TEN_MC] — Dẫn chương trình sự kiện",
    url: "[WEBSITE_URL]",                            // VD: https://ten-ban.github.io/mc-portfolio/
    locale: "vi_VN",
    themeColor: "#060A14",                           // màu thanh địa chỉ trên điện thoại (trùng màu nền tối)
  },

  // ─── 2. THÔNG TIN CÁ NHÂN / THƯƠNG HIỆU ──────────────────
  // Logo trên header là CHỮ (brand.name) — logo SVG chỉ dùng làm favicon
  brand: {
    name: "[TEN_MC]",
    tagline: "MC Sự Kiện Chuyên Nghiệp",
    logo: "public/icons/favicon.svg",                // SVG logo (favicon)
    logoAlt: "Logo [TEN_MC]",
  },

  // ─── 3. HEADER ─────────────────────────────────────────────
  // Không viền: logo chữ góc trái, nút menu (hamburger) nét đậm góc phải.
  // Menu mở toàn màn hình với danh sách chữ lớn bên dưới.
  header: {
    menuItems: [
      { label: "Trang chủ", href: "#hero" },
      { label: "Giới thiệu", href: "#about" },
      { label: "Dịch vụ", href: "#services" },
      { label: "Video", href: "#videos" },
      { label: "Gallery", href: "#gallery" },
      { label: "Cảm nhận", href: "#testimonials" },
      { label: "Liên hệ", href: "#contact" },
    ],
    ctaButton: {
      label: "Đặt Lịch Ngay",
      href: "[ZALO_LINK]",                           // Link Zalo hoặc #contact
    },
    menuLabel: "Menu",                               // MỚI — chữ nhỏ cạnh nút hamburger (từ 768px)
  },

  // ─── 4. HERO (VIDEO) ──────────────────────────────
  // Chưa có video (hoặc file không tải được) → mặt chữ hiện khung giữ chỗ sọc mảnh + nhãn "Khung video Hero".
  // Người xem bật "giảm chuyển động" → hiện khung hình đầu của video, không phát.
  hero: {
    heading: "Khoảnh Khắc Đáng Nhớ\nBắt Đầu Từ Sân Khấu",
    subheading: "MC dẫn chương trình chuyên nghiệp cho đám cưới, sự kiện doanh nghiệp và các chương trình nghệ thuật trên toàn quốc.",
    backgroundAlt: "MC [TEN_MC] dẫn chương trình trên sân khấu",
    ctaPrimary: {
      label: "Đặt Lịch Qua Zalo",
      href: "[ZALO_LINK]",
    },
    ctaSecondary: {
      label: "Xem Showreel",
      href: "#videos",
    },
    scrollIndicator: true,

    // MỚI — dòng chữ nhỏ phía trên khối chữ lớn
    eyebrow: "[TEN_MC] — Event Host",
    // MỚI — từ khóa thương hiệu. Mỗi phần tử là MỘT DÒNG, tự co giãn cho vừa bề ngang.
    // Nên dùng chữ IN HOA, không dấu, 2–6 ký tự mỗi dòng để chữ thật to. VD: ["MASTER"], ["THE", "VOICE"]
    maskLines: [],                                  // [] = không hiện chữ trên video. VD: ["THE", "VOICE", "OF THE", "NIGHT"]
    // MỚI — 1 câu ngắn dưới khối chữ (mobile). Từ 768px hiện thêm subheading.
    summary: "MC sự kiện cao cấp · Gala · Thời trang · Ra mắt sản phẩm",
    // MỚI — video lồng chữ (nguồn hình DUY NHẤT của Hero): tắt tiếng, tự lặp, 6–12 giây, KHÔNG cần âm thanh.
    // Chỉ cần điền `src` — 1 video dùng chung cho cả mobile lẫn desktop (H.264 .mp4, nên ≤ 3MB).
    // Muốn bản riêng cho từng màn hình thì điền thêm mobile/desktop (ưu tiên hơn src); để "" → dùng src.
    // Còn placeholder [IN_HOA] hoặc để "" tất cả → hiện khung giữ chỗ.
    maskVideo: {
      src: "public/videos/video_temp.mp4",            // VD: "public/videos/hero.mp4"
      mobile: "",                                     // tùy chọn, bản riêng mobile 720×900px (4:5)
      desktop: "",                                    // tùy chọn, bản riêng desktop 1600×900px (16:9)
      webm: "",                                       // tùy chọn, desktop. VD: "public/videos/hero.webm"
    },
  },

  // ─── 5. GIỚI THIỆU (THE STATEMENT) ──────────────────────────
  // Không dùng ảnh chân dung nhỏ: 1–2 câu tuyên ngôn chữ lớn. Câu chuyện chi tiết THU GỌN.
  about: {
    sectionLabel: "Về Tôi",
    heading: "Đồng Hành Cùng\nKhoảnh Khắc Của Bạn",
    portrait: "public/images/about/portrait.webp",        // (giao diện mới không dùng) 600×800px
    portraitMobile: "public/images/about/portrait-mobile.webp", // (giao diện mới không dùng) 400×500px
    portraitAlt: "MC [TEN_MC] trên sân khấu",
    story: "Với hơn [SO_NAM_KINH_NGHIEM] năm kinh nghiệm trong lĩnh vực dẫn chương trình, tôi đã có vinh dự đồng hành cùng hàng trăm sự kiện — từ những đám cưới ấm cúng đến những gala doanh nghiệp quy mô lớn.\n\nTriết lý của tôi: mỗi sự kiện là duy nhất, và người MC phải là cầu nối cảm xúc giữa chương trình và khán giả. Tôi luôn chuẩn bị kỹ lưỡng, lắng nghe mong muốn của khách hàng, và mang đến năng lượng tích cực cho từng khoảnh khắc trên sân khấu.",
    stats: [
      { number: "[SO_NAM_KINH_NGHIEM]+", label: "Năm Kinh Nghiệm" },
      { number: "[SO_SU_KIEN]+", label: "Sự Kiện Thành Công" },
      { number: "50+", label: "Đối Tác Doanh Nghiệp" },
      { number: "100%", label: "Khách Hàng Hài Lòng" },
    ],
    // MỚI — câu tuyên ngôn chữ lớn. Bọc *dấu sao* quanh cụm từ muốn nhấn (chữ đậm + gạch vàng).
    statement: "Không chỉ là lời nói. Tôi *dẫn dắt cảm xúc* — để mỗi khoảnh khắc trên sân khấu trở thành ký ức.",
    // MỚI — nhãn nút mở câu chuyện chi tiết (thu gọn bằng <details>)
    storyLabel: "Đọc câu chuyện của tôi",
  },

  // ─── 6. DỊCH VỤ ───────────────────────────────────────────
  // Danh sách chữ khổng lồ kiểu menu nhà hàng. Chạm (mobile) / rê chuột (desktop) để hiện ảnh nhỏ.
  // Ảnh dịch vụ: mobile 720×480px (3:2), desktop dùng chung (hiện trong khung nổi 360×240px).
  // Tùy chọn: thêm  video: "public/videos/service-01.mp4"  (tắt tiếng, ≤ 1MB) để hiện video thay ảnh.
  services: {
    sectionLabel: "Dịch Vụ",
    heading: "Dịch Vụ Của Tôi",
    subheading: "Mỗi loại hình sự kiện đều được chuẩn bị kịch bản riêng, phù hợp với phong cách và mong muốn của bạn.",
    items: [
      {
        icon: "wedding",
        title: "MC Đám Cưới",
        description: "Dẫn dắt tiệc cưới ấm cúng, lãng mạn với kịch bản cá nhân hóa cho từng cặp đôi.",
        image: "public/images/services/service-01.webp",  // 720×480px
      },
      {
        icon: "corporate",
        title: "MC Doanh Nghiệp",
        description: "Gala dinner, hội nghị khách hàng, lễ kỷ niệm — chuyên nghiệp và đẳng cấp.",
        image: "public/images/services/service-02.webp",
      },
      {
        icon: "event",
        title: "MC Sự Kiện",
        description: "Festival, concert, gameshow — tạo không khí sôi động và kết nối khán giả.",
        image: "public/images/services/service-03.webp",
      },
      {
        icon: "ceremony",
        title: "MC Lễ Khai Trương",
        description: "Lễ khai trương, động thổ, khánh thành — trang trọng và chuyên nghiệp.",
        image: "public/images/services/service-04.webp",
      },
      {
        icon: "award",
        title: "MC Lễ Trao Giải",
        description: "Vinh danh, trao giải thưởng — tạo cảm xúc và khoảnh khắc đáng nhớ.",
        image: "public/images/services/service-05.webp",
      },
      {
        icon: "bilingual",
        title: "MC Song Ngữ",
        description: "Dẫn chương trình Việt — Anh cho sự kiện quốc tế và đa văn hóa.",
        image: "public/images/services/service-06.webp",
      },
    ],
    mobileVisible: 3,                                // MỚI — số dịch vụ hiện sẵn trên điện thoại
    hint: "Chạm vào từng dịch vụ để xem chi tiết",   // MỚI — gợi ý nhỏ dưới tiêu đề
  },

  // ─── 7. VIDEO (HIGHLIGHT REEL) ─────────────────────────────
  // Showreel tràn màn hình, có âm thanh, chỉ tải khi người xem bấm (hiện poster trước).
  // Poster showreel: mobile 1280×720px (16:9, dùng chung desktop). Video nhỏ: 640×360px (16:9).
  // videoUrl: link YouTube (https://youtu.be/... hoặc https://www.youtube.com/watch?v=...)
  //           hoặc file tự host "public/videos/ten-video.mp4".
  videos: {
    sectionLabel: "Video",
    heading: "Khoảnh Khắc Trên Sân Khấu",
    subheading: "Xem những highlight từ các sự kiện tôi đã dẫn chương trình.",
    featured: {
      title: "Showreel 2025",
      thumbnail: "public/images/videos/showreel-thumb.webp",  // 1280×720px
      videoUrl: "[YOUTUBE_SHOWREEL_URL]",
      duration: "3:45",
    },
    items: [
      {
        title: "Highlight Đám Cưới",
        thumbnail: "public/images/videos/video-01.webp",       // 640×360px
        videoUrl: "[YOUTUBE_VIDEO_01]",
        duration: "2:30",
      },
      {
        title: "Gala Doanh Nghiệp ABC",
        thumbnail: "public/images/videos/video-02.webp",
        videoUrl: "[YOUTUBE_VIDEO_02]",
        duration: "4:15",
      },
      {
        title: "Festival Âm Nhạc 2025",
        thumbnail: "public/images/videos/video-03.webp",
        videoUrl: "[YOUTUBE_VIDEO_03]",
        duration: "3:00",
      },
      {
        title: "Lễ Kỷ Niệm 20 Năm Cty XYZ",
        thumbnail: "public/images/videos/video-04.webp",
        videoUrl: "[YOUTUBE_VIDEO_04]",
        duration: "5:20",
      },
    ],
    mobileVisible: 2,                                // MỚI — số video nhỏ hiện sẵn trên điện thoại
    moreHeading: "Thêm khoảnh khắc",                 // MỚI — tiêu đề danh sách video nhỏ
  },

  // ─── 8. GALLERY (EDITORIAL) ────────────────────────────────
  // Lưới ảnh chân dung kiểu tạp chí, tự chỉnh màu tông điện ảnh.
  // Ảnh: mobile 600×750px (4:5, lưới 2 cột), desktop 900×1125px (4:5) — ảnh đầu tiên hiển thị to gấp đôi.
  // (Ảnh ngang 1200×900 cũ vẫn dùng được, sẽ được cắt giữa.) "category" hiện thành chú thích nhỏ.
  gallery: {
    sectionLabel: "Hình Ảnh",
    heading: "Khoảnh Khắc Đáng Nhớ",
    subheading: "Những khoảnh khắc thực tế từ các sự kiện tôi đã đồng hành.",
    categories: ["Tất cả", "Đám cưới", "Doanh nghiệp", "Sự kiện", "Hậu trường"],
    items: [
      {
        src: "public/images/gallery/gallery-01.webp",    // 900×1125px
        alt: "MC vest đen cầm kịch bản trên sân khấu tiệc hoa trắng",
        category: "Đám cưới",
      },
      {
        src: "public/images/gallery/gallery-02.webp",
        alt: "MC đứng bục phát biểu tại lễ kỷ niệm của doanh nghiệp",
        category: "Doanh nghiệp",
      },
      {
        src: "public/images/gallery/gallery-03.webp",
        alt: "MC giao lưu, khuấy động khách mời tại year-end party",
        category: "Sự kiện",
      },
      {
        src: "public/images/gallery/gallery-04.webp",
        alt: "MC vest trắng nơ đen trước cổng hoa tiệc cưới",
        category: "Đám cưới",
      },
      {
        src: "public/images/gallery/gallery-05.webp",
        alt: "MC dẫn chương trình trên sân khấu sự kiện doanh nghiệp",
        category: "Doanh nghiệp",
      },
      {
        src: "public/images/gallery/gallery-06.webp",
        alt: "MC công bố giải đặc biệt trong phần bốc thăm trúng thưởng",
        category: "Hậu trường",
      },
      {
        src: "public/images/gallery/gallery-07.webp",
        alt: "MC vest đen trên sân khấu Year End Party",
        category: "Sự kiện",
      },
      {
        src: "public/images/gallery/gallery-08.webp",
        alt: "MC cúi chào khán giả trên sân khấu tiệc hoa",
        category: "Đám cưới",
      },
    ],
    mobileVisible: 5,                                // MỚI — số ảnh hiện sẵn trên điện thoại (ảnh 1 to + 4 ảnh nhỏ)
    cinematic: true,                                 // MỚI — true: tự phủ tông màu điện ảnh lên ảnh
  },

  // ─── 9. KHÁCH HÀNG / ĐỐI TÁC ─────────────────────────────
  // Dải logo chạy ngang, đen trắng. Logo: mobile 160×64px, desktop 200×80px — nền trong suốt (SVG/WebP/PNG)
  // Chưa có logo → hiển thị tên công ty dạng chữ
  partners: {
    sectionLabel: "Đối Tác",
    heading: "Tin Tưởng Bởi",
    items: [
      { name: "Vietcombank", logo: "public/images/partners/partner-01.webp" },
      { name: "MB Bank", logo: "public/images/partners/partner-02.webp" },
      { name: "ACB", logo: "public/images/partners/partner-03.webp" },
      { name: "VPBank", logo: "public/images/partners/partner-04.webp" },
      { name: "VIB", logo: "public/images/partners/partner-05.webp" },
      { name: "HSBC", logo: "public/images/partners/partner-06.webp" },
    ],
  },

  // ─── 10. CẢM NHẬN KHÁCH HÀNG ──────────────────────────────
  // Mỗi màn hình 1 câu quote chữ lớn (highlight), vuốt ngang để xem câu tiếp theo.
  // Avatar không dùng trong giao diện mới (giữ lại dữ liệu).
  testimonials: {
    sectionLabel: "Cảm Nhận",
    heading: "Khách Hàng Nói Gì",
    subheading: "Niềm tin của khách hàng là động lực lớn nhất để tôi không ngừng hoàn thiện.",
    items: [
      {
        name: "Anh Trần Văn Hùng",
        role: "Giám đốc, Công ty ABC",
        avatar: "public/images/testimonials/avatar-01.webp",  // 100×100px
        content: "Anh [TEN_MC] dẫn gala cuối năm cho công ty tôi rất chuyên nghiệp. Chương trình được dẫn dắt mạch lạc, không khí sôi động. Chắc chắn sẽ tiếp tục hợp tác!",
        rating: 5,
        highlight: "Mạch lạc, sôi động — chắc chắn sẽ hợp tác tiếp.",   // MỚI — câu đắt giá nhất, ≤ 12 từ
      },
      {
        name: "Chị Nguyễn Thị Mai",
        role: "Cô dâu",
        avatar: "public/images/testimonials/avatar-02.webp",
        content: "Cảm ơn anh [TEN_MC] đã làm đám cưới của vợ chồng em thêm trọn vẹn. Anh rất tâm lý, chuẩn bị kỹ lưỡng và tạo được nhiều khoảnh khắc xúc động.",
        rating: 5,
        highlight: "Đám cưới của chúng em trọn vẹn hơn nhờ anh.",
      },
      {
        name: "Anh Lê Minh Đức",
        role: "Trưởng phòng Marketing, Tập đoàn XYZ",
        avatar: "public/images/testimonials/avatar-03.webp",
        content: "Đã làm việc với nhiều MC nhưng anh [TEN_MC] luôn là lựa chọn hàng đầu cho các sự kiện quan trọng. Phong cách chuyên nghiệp, linh hoạt và rất có duyên.",
        rating: 5,
        highlight: "Luôn là lựa chọn hàng đầu cho sự kiện quan trọng.",
      },
      {
        name: "Chị Phạm Hồng Nhung",
        role: "Wedding Planner",
        avatar: "public/images/testimonials/avatar-04.webp",
        content: "Tôi thường xuyên giới thiệu anh [TEN_MC] cho các cặp đôi. Anh luôn mang đến sự chuyên nghiệp và cảm xúc đúng mực cho mỗi lễ cưới.",
        rating: 5,
        highlight: "Chuyên nghiệp, và cảm xúc luôn đúng mực.",
      },
    ],
  },

  // ─── 11. CÂU HỎI THƯỜNG GẶP (MỚI) ─────────────────────────
  // Không dùng hộp: chỉ chữ và đường kẻ mảnh. Bấm câu hỏi để mở câu trả lời.
  faq: {
    sectionLabel: "FAQ",
    heading: "Câu Hỏi Thường Gặp",
    mobileVisible: 4,                                // số câu hỏi hiện sẵn trên điện thoại
    items: [
      {
        q: "Cần đặt lịch trước bao lâu?",
        a: "Với gala và sự kiện lớn, nên đặt trước 4–8 tuần. Lịch cuối tuần mùa cưới (tháng 9 – tháng 1) thường kín sớm, bạn nên liên hệ càng sớm càng tốt.",
      },
      {
        q: "Chi phí dẫn chương trình được tính thế nào?",
        a: "Chi phí phụ thuộc quy mô, thời lượng, địa điểm và yêu cầu song ngữ. Gửi thông tin sự kiện qua form bên dưới để nhận báo giá chi tiết trong 24 giờ.",
      },
      {
        q: "MC có hỗ trợ viết kịch bản không?",
        a: "Có. Tôi cùng bạn xây dựng kịch bản dẫn, lời chào, phần tương tác và các khoảnh khắc cao trào, phù hợp với tinh thần thương hiệu và khách mời.",
      },
      {
        q: "Có dẫn song ngữ Việt — Anh không?",
        a: "Có. Tôi nhận dẫn song ngữ cho hội nghị, ra mắt sản phẩm và sự kiện có khách quốc tế.",
      },
      {
        q: "MC có nhận sự kiện ngoài TP.HCM?",
        a: "Có, tôi nhận sự kiện trên toàn quốc. Chi phí di chuyển và lưu trú (nếu có) sẽ được thống nhất trong báo giá.",
      },
      {
        q: "Có buổi tổng duyệt trước sự kiện không?",
        a: "Có. Tôi luôn tham gia tổng duyệt hoặc trao đổi trực tuyến với ban tổ chức để nắm rõ kịch bản, âm thanh, ánh sáng và tiến trình chương trình.",
      },
    ],
  },

  // ─── 12. LIÊN HỆ (MEGA FOOTER) ─────────────────────────────
  // Toàn bộ form + kênh liên hệ + mạng xã hội nằm trên một mặt phẳng đen tuyền ở cuối trang.
  contact: {
    sectionLabel: "Liên Hệ",
    heading: "Hãy Kết Nối Với Tôi",
    subheading: "Bạn đang lên kế hoạch cho sự kiện? Liên hệ ngay để được tư vấn miễn phí!",
    phone: "[SO_DIEN_THOAI]",                        // VD: "0901 234 567" — tự tạo link tel:
    zalo: "[ZALO_LINK]",                             // https://zalo.me/<số điện thoại>
    email: "[EMAIL]",
    facebook: "[FACEBOOK_LINK]",
    youtube: "[YOUTUBE_LINK]",
    address: "[DIA_CHI]",
    workingHours: "Thứ 2 — Chủ nhật: 8:00 — 21:00",
    // Form báo giá: bấm gửi sẽ mở ứng dụng email với nội dung đã điền (không cần máy chủ)
    form: {
      heading: "Gửi Yêu Cầu Báo Giá",
      note: "Để lại thông tin, tôi sẽ liên hệ lại trong vòng 24 giờ.",
      submitLabel: "Gửi Yêu Cầu",
      eventTypes: ["Đám cưới", "Sự kiện doanh nghiệp", "Khai trương / Khánh thành", "Lễ trao giải", "Sự kiện song ngữ", "Khác"],
    },
    megaHeading: "Let's make\nit iconic.",            // MỚI — dòng chữ khổng lồ đầu footer (\n = xuống dòng)
    instagram: "[INSTAGRAM_LINK]",                   // MỚI
    tiktok: "[TIKTOK_LINK]",                         // MỚI
  },

  // ─── 13. NÚT NỔI (VÒNG CHỮ XOAY) ──────────────────────────
  // Vòng tròn chữ xoay đều ở góc dưới phải, hiện sau khi cuộn qua Hero, ẩn khi tới footer.
  floatingButton: {
    enabled: true,
    type: "zalo",
    label: "Chat Zalo",
    href: "[ZALO_LINK]",                             // VD: https://zalo.me/0901234567
    ringText: "BOOK NOW • BOOK NOW • BOOK NOW • ",   // MỚI — chữ chạy quanh vòng tròn
  },

  // ─── 14. FOOTER ────────────────────────────────────────────
  footer: {
    copyright: "© 2026 [TEN_MC]. All rights reserved.",
    madeWith: "MC sự kiện tại TP.HCM & toàn quốc",
    backToTop: true,
  },
};
