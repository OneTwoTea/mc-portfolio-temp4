/**
 * ═══════════════════════════════════════════════════════════
 *  TEMPLATES.JS — Bộ render: config → HTML
 *  Chuyển đổi dữ liệu từ site.config.js thành HTML hoàn chỉnh.
 *  Giao diện: "Video Text Mask" — mobile-first (390px), chữ khổng lồ,
 *  nền mực tối / giấy ngà xen kẽ, footer đen tuyền.
 * ═══════════════════════════════════════════════════════════
 */

// ─── ICONS (SVG inline) ─────────────────────────────────
const ICONS = {
  phone: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  email: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  zalo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor"><path d="M12.5 6C9.46 6 7 8.46 7 11.5v25C7 39.54 9.46 42 12.5 42h23c3.04 0 5.5-2.46 5.5-5.5v-25C41 8.46 38.54 6 35.5 6h-23zm2.14 11h18.72c.87 0 1.34 1.01.78 1.67L22.97 31.5h8.87c.74 0 1.16.83.71 1.39-.15.18-.37.29-.61.29H13.36c-.87 0-1.34-1.01-.78-1.67L23.75 18.7h-9.1a.82.82 0 0 1-.72-.43.81.81 0 0 1 .71-1.27z"/></svg>`,
  play: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg>`,
  close: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  arrowLeft: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="20" y1="12" x2="4" y2="12"/><polyline points="10 6 4 12 10 18"/></svg>`,
  arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"/><polyline points="14 6 20 12 14 18"/></svg>`,
  arrowUpRight: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="8 7 17 7 17 16"/></svg>`,
  arrowUp: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="4"/><polyline points="6 10 12 4 18 10"/></svg>`,
  plus: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"><line x1="12" y1="4" x2="12" y2="20" class="plus-v"/><line x1="4" y1="12" x2="20" y2="12"/></svg>`,
};

// ─── TIỆN ÍCH ──────────────────────────────────────────

/** Escape HTML để chống XSS */
export function esc(str) {
  if (typeof str !== "string") return String(str ?? "");
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/** Kiểm tra giá trị có phải placeholder [IN_HOA] không */
export function isPlaceholder(val) {
  if (typeof val !== "string") return false;
  return /\[[A-Z0-9_]+\]/.test(val);
}

/** Trả SVG icon inline (trang trí → aria-hidden) */
export function icon(name, cls = "") {
  const svg = ICONS[name];
  if (!svg) return `<!-- icon "${name}" không tìm thấy -->`;
  const clsAttr = cls ? ` class="${esc(cls)}"` : "";
  return svg.replace("<svg ", `<svg${clsAttr} aria-hidden="true" focusable="false" `);
}

/**
 * Tạo thẻ ảnh. Ảnh MOBILE (`src`) là nguồn mặc định; ảnh desktop chỉ nạp qua
 * <source media="(min-width: 768px)"> khi có `desktop`. Lazy-load, width/height, alt.
 * Ảnh lỗi/chưa có sẽ tự ẩn (onerror) để lộ khung thay thế .img-placeholder ngay sau nó.
 */
export function media({ src, alt = "", cls = "", width, height, lazy = true, priority = false, desktop, desktopWidth, desktopHeight, breakpoint = 768 }) {
  const loadAttr = priority ? ` fetchpriority="high"` : lazy ? ` loading="lazy"` : "";
  const imgCls = cls ? ` class="${esc(cls)}"` : "";
  const size = (w, h) => `${w ? ` width="${w}"` : ""}${h ? ` height="${h}"` : ""}`;
  const img = `<img src="${esc(src)}" alt="${esc(alt)}"${imgCls}${size(width, height)}${loadAttr} decoding="async" onerror="this.hidden=true">`;

  if (!desktop || desktop === src) return img;
  return `<picture class="contents">
  <source media="(min-width: ${breakpoint}px)" srcset="${esc(desktop)}"${size(desktopWidth || width, desktopHeight || height)}>
  ${img}
</picture>`;
}

/** Khung thay thế hiển thị khi ảnh chưa có (CSS bật lên khi ảnh phía trước bị ẩn) */
function placeholder(label, cls = "absolute inset-0") {
  return `<span class="img-placeholder ${cls}" aria-hidden="true">${esc(label)}</span>`;
}

/** Thuộc tính href (+ target/rel nếu là link ngoài) */
function linkAttrs(href) {
  const external = /^https?:\/\//.test(href);
  return `href="${esc(href)}"${external ? ` target="_blank" rel="noopener noreferrer"` : ""}`;
}

/** Xuống dòng \n trong config → <br> */
function lines(text) {
  return esc(text || "").replace(/\n/g, "<br>");
}

/** *cụm từ* → <strong> (dùng cho câu tuyên ngôn) */
function emphasize(text) {
  return lines(text).replace(/\*([^*]+)\*/g, `<strong class="statement-em">$1</strong>`);
}

/** Số thứ tự 2 chữ số: 1 → "01" */
const pad = (n) => String(n).padStart(2, "0");

/**
 * Ước lượng bề rộng một dòng chữ (đơn vị em) ở font Plus Jakarta Sans ExtraBold, IN HOA,
 * letter-spacing -0.04em. CSS dùng số này để chữ hero tự giãn vừa khít bề ngang (không cần JS).
 */
const CHAR_EM = {
  A: 0.74, B: 0.7, C: 0.72, D: 0.76, E: 0.62, F: 0.58, G: 0.78, H: 0.78, I: 0.32, J: 0.54, K: 0.72, L: 0.57, M: 0.93,
  N: 0.79, O: 0.82, P: 0.67, Q: 0.82, R: 0.7, S: 0.65, T: 0.64, U: 0.77, V: 0.73, W: 1.04, X: 0.73, Y: 0.69, Z: 0.65,
  " ": 0.4, ".": 0.3, ",": 0.3, "-": 0.4, "'": 0.26, "&": 0.78, "!": 0.34, "?": 0.6,
};
function textEm(text) {
  const chars = [...String(text).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "D").toUpperCase()];
  const sum = chars.reduce((s, ch) => s + (CHAR_EM[ch] ?? (/\d/.test(ch) ? 0.66 : 0.72)), 0);
  const tracked = sum - 0.04 * Math.max(0, chars.length - 1);
  return Math.max(0.6, tracked * 1.06).toFixed(3); // +6% an toàn để chữ không chạm mép
}

// ─── HELPERS ────────────────────────────────────────────

/** Tạo các link tel/zalo/mailto/mạng xã hội — nếu còn placeholder thì trỏ về #contact */
export function createHelpers(config) {
  const c = config.contact || {};

  function safeLink(value, prefix = "") {
    if (!value || isPlaceholder(value)) return "#contact";
    if (prefix === "tel:") return `tel:${value.replace(/[^\d+]/g, "")}`;
    if (prefix === "mailto:") return `mailto:${value}`;
    if (prefix === "zalo:") return /^https?:\/\//.test(value) || value.startsWith("#") ? value : `https://zalo.me/${value.replace(/[^\d]/g, "")}`;
    return value;
  }

  const hasPhone = c.phone && !isPlaceholder(c.phone);
  const hasEmail = c.email && !isPlaceholder(c.email);

  return {
    phoneLink: safeLink(c.phone, "tel:"),
    phoneDisplay: hasPhone ? c.phone : "Đang cập nhật",
    zaloLink: safeLink(c.zalo, "zalo:"),
    emailLink: safeLink(c.email, "mailto:"),
    emailDisplay: hasEmail ? c.email : "Đang cập nhật",
    emailRaw: hasEmail ? c.email : "",
    facebookLink: safeLink(c.facebook),
    youtubeLink: safeLink(c.youtube),
    instagramLink: safeLink(c.instagram),
    tiktokLink: safeLink(c.tiktok),
    ctaLink: safeLink(config.header?.ctaButton?.href || c.zalo, "zalo:"),
    heroCtaLink: safeLink(config.hero?.ctaPrimary?.href || c.zalo, "zalo:"),
    floatingLink: safeLink(config.floatingButton?.href || c.zalo, "zalo:"),
  };
}

// ─── RENDERERS ──────────────────────────────────────────

export function createRenderers(config) {
  const h = createHelpers(config);

  /** Nhãn nhỏ đánh số kiểu tạp chí: (02) — Dịch Vụ */
  function eyebrow(no, label, cls = "") {
    return `<p class="eyebrow ${cls}"><span class="eyebrow-no">(${pad(no)})</span><span aria-hidden="true" class="eyebrow-rule"></span>${esc(label)}</p>`;
  }

  /** Tiêu đề chung của mỗi section */
  function sectionHead(sec, no, fallbackLabel, { tone = "light", extra = "" } = {}) {
    const muted = tone === "dark" ? "text-mute-dark" : "text-mute";
    return `<div class="mb-8 md:mb-12 lg:mb-16 reveal">
          ${eyebrow(no, sec.sectionLabel || fallbackLabel)}
          <h2 class="h-section mt-4">${lines(sec.heading)}</h2>
          ${sec.subheading ? `<p class="${muted} mt-4 max-w-xl text-base md:text-lg leading-relaxed">${esc(sec.subheading)}</p>` : ""}
          ${extra}
        </div>`;
  }

  /**
   * Nút "Xem thêm (N)" cho danh sách thu gọn trên mobile.
   * Các mục từ vị trí `visible` trở đi được gắn data-extra (CSS ẩn trên mobile khi đã có JS).
   */
  function moreButton(listId, total, visible, tone = "light") {
    const hidden = total - visible;
    if (hidden <= 0) return "";
    const more = `Xem thêm (${hidden})`;
    return `<button type="button" class="more-btn more-btn--${tone}" data-more aria-expanded="false" aria-controls="${listId}" data-label-more="${esc(more)}" data-label-less="Thu gọn">
          <span data-more-text>${esc(more)}</span>${icon("plus", "w-5 h-5 more-icon")}
        </button>`;
  }
  const visibleCount = (sec, fallback) => {
    const n = parseInt(sec?.mobileVisible, 10);
    return Number.isFinite(n) && n >= 0 ? n : fallback;
  };
  const extraAttr = (i, visible) => (i >= visible ? " data-extra" : "");

  return {
    // ─── SEO HEAD ─────────────────────────────────────
    seoHead() {
      const seo = config.seo || {};
      const siteUrl = seo.url && !isPlaceholder(seo.url) ? seo.url.replace(/\/?$/, "/") : "";
      // og:image cần URL tuyệt đối — chỉ ghép được khi đã có seo.url
      const ogImage = siteUrl ? siteUrl + (seo.ogImage || "") : seo.ogImage || "";

      // Dữ liệu có cấu trúc cho FAQ (Google có thể hiện câu hỏi ngay trên kết quả tìm kiếm)
      const faqItems = config.faq?.items || [];
      const faqLd = faqItems.length
        ? `\n    <script type="application/ld+json">${JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }).replace(/</g, "\\u003c")}</script>`
        : "";

      return `<title>${esc(seo.title || "MC Portfolio")}</title>
    <meta name="description" content="${esc(seo.description || "")}">
    <meta name="keywords" content="${esc(seo.keywords || "")}">
    ${siteUrl ? `<link rel="canonical" href="${esc(siteUrl)}">\n    <meta property="og:url" content="${esc(siteUrl)}">` : ""}
    <meta property="og:type" content="website">
    <meta property="og:locale" content="${esc(seo.locale || "vi_VN")}">
    <meta property="og:site_name" content="${esc(config.brand?.name || "")}">
    <meta property="og:title" content="${esc(seo.title || "")}">
    <meta property="og:description" content="${esc(seo.description || "")}">
    <meta property="og:image" content="${esc(ogImage)}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="${esc(seo.ogImageAlt || "")}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(seo.title || "")}">
    <meta name="twitter:description" content="${esc(seo.description || "")}">
    <meta name="twitter:image" content="${esc(ogImage)}">
    <meta name="theme-color" content="${esc(seo.themeColor || "#060A14")}">
    <link rel="icon" type="image/svg+xml" href="public/icons/favicon.svg">
    <link rel="icon" type="image/png" sizes="32x32" href="public/icons/favicon-32.png">
    <link rel="apple-touch-icon" sizes="180x180" href="public/icons/apple-touch-icon.png">${faqLd}`;
    },

    // ─── CTA HEADER (thuộc tính href đã xử lý placeholder) ─
    ctaAttrs() {
      return linkAttrs(h.ctaLink);
    },

    // ─── MENU TOÀN MÀN HÌNH: danh sách chữ lớn ─────────
    mobileNav() {
      const items = config.header?.menuItems || [];
      return items
        .map(
          (item, i) =>
            `<li><a href="${esc(item.href)}" class="menu-link"><span class="menu-link-no">${pad(i + 1)}</span><span>${esc(item.label)}</span></a></li>`
        )
        .join("\n          ");
    },

    // ─── MENU: liên hệ nhanh ở đáy ─────────────────────
    menuContact() {
      return `<a ${linkAttrs(h.phoneLink)} class="link-thin">${icon("phone", "w-4 h-4")}Gọi điện</a>
          <a ${linkAttrs(h.zaloLink)} class="link-thin">${icon("zalo", "w-4 h-4")}Zalo</a>
          <a ${linkAttrs(h.emailLink)} class="link-thin">${icon("email", "w-4 h-4")}Email</a>`;
    },

    // ─── HERO: VIDEO LỒNG CHỮ ─────────────────────────
    heroSection() {
      const hero = config.hero || {};
      const brandName = config.brand?.name || "";
      // maskLines: [] → không hiện chữ trên video (h1 chỉ còn cho trình đọc màn hình / SEO)
      const words = (Array.isArray(hero.maskLines) ? hero.maskLines : [brandName || "MC"]).map(String);
      // Hero CHỈ dùng video (không ảnh). Chưa có video → mặt chữ hiện khung giữ chỗ.
      const vid = hero.maskVideo || {};
      const ok = (v) => (v && !isPlaceholder(v) ? v : "");
      // `src` dùng chung cho mọi màn hình; mobile/desktop (nếu có) ghi đè cho từng loại
      const videoM = ok(vid.mobile) || ok(vid.src) || ok(vid.desktop);
      const videoD = ok(vid.desktop) || ok(vid.src) || videoM;
      const hasVideo = Boolean(videoM || videoD);

      const lineHtml = words
        .map((w) => `<span class="mask-line" style="--em:${textEm(w)}">${esc(w)}</span>`)
        .join(" ");

      return `<section id="hero" class="hero relative bg-ink text-white overflow-hidden" aria-label="Giới thiệu nhanh">
      <div class="flex flex-col min-h-[100svh] px-4 sm:px-6 lg:px-10 pt-[calc(env(safe-area-inset-top)+4.25rem)] md:pt-[calc(env(safe-area-inset-top)+5.5rem)] pb-[calc(env(safe-area-inset-bottom)+1.25rem)] md:pb-8">
        <p class="hero-eyebrow animate-fade-in">${esc(hero.eyebrow || `${brandName} — ${config.brand?.tagline || ""}`)}</p>

        <!-- Khối chữ khổng lồ: video chỉ hiện trong nét chữ. Chưa có video → mặt chữ là khung giữ chỗ (background-clip: text) -->
        <div class="hero-stage flex-1${hasVideo ? "" : " is-placeholder"}${words.length ? "" : " no-text"}"${hasVideo ? ` data-hero-video data-src-mobile="${esc(videoM)}" data-src-desktop="${esc(videoD)}"${ok(vid.webm) ? ` data-src-webm="${esc(vid.webm)}"` : ""}` : ""}>
          ${hasVideo ? `<video class="hero-video" muted playsinline loop preload="none" aria-hidden="true" tabindex="-1" disablepictureinpicture></video>` : ""}
          <h1 class="mask-word" style="--n:${words.length}">
            <span class="sr-only">MC ${esc(brandName)}${words.length ? " — " : ""}</span>${lineHtml}
          </h1>
          <span class="hero-ph-label" aria-hidden="true">Khung video Hero</span>
        </div>

        <div class="hero-foot grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
          <div class="max-w-xl">
            <p class="text-base md:text-lg font-light text-white">${esc(hero.summary || config.brand?.tagline || "")}</p>
            ${hero.subheading ? `<p class="hidden md:block mt-2 text-mute-dark leading-relaxed">${esc(hero.subheading)}</p>` : ""}
          </div>
          <div class="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a ${linkAttrs(h.heroCtaLink)} class="cta-thin cta-thin--gold">${esc(hero.ctaPrimary?.label || "Đặt lịch")}${icon("arrowUpRight", "w-5 h-5")}</a>
            <a href="${esc(hero.ctaSecondary?.href || "#videos")}" class="cta-thin">${esc(hero.ctaSecondary?.label || "Khám phá")}${icon("play", "w-3.5 h-3.5")}</a>
          </div>
        </div>
      </div>
      ${hero.scrollIndicator ? `<span class="scroll-cue hidden md:block" aria-hidden="true"></span>` : ""}
    </section>`;
    },

    // ─── GIỚI THIỆU: THE STATEMENT ───────────────────
    aboutSection() {
      const about = config.about || {};
      const paragraphs = (about.story || "")
        .split(/\n\s*\n/)
        .map((p) => `<p>${lines(p.trim())}</p>`)
        .join("\n              ");

      const statsHtml = (about.stats || [])
        .map(
          (s) => `<div class="stat min-w-0">
              <dt class="text-sm md:text-base text-mute order-2">${esc(s.label)}</dt>
              <dd class="${isPlaceholder(s.number) ? "text-base font-semibold break-all" : "stat-number"} order-1">${esc(s.number)}</dd>
            </div>`
        )
        .join("\n            ");

      return `<section id="about" class="bg-paper text-ink py-14 md:py-24 lg:py-32">
      <div class="container-x">
        ${eyebrow(1, about.sectionLabel || "Về Tôi", "reveal")}
        <h2 class="statement reveal mt-6 md:mt-10">${emphasize(about.statement || about.heading || "")}</h2>

        <div class="mt-10 md:mt-16 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <dl class="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 lg:col-span-7 reveal">
            ${statsHtml}
          </dl>

          <!-- Câu chuyện chi tiết: thu gọn bằng <details> (không cần JS) -->
          <details class="disclosure border-t border-line self-start lg:col-span-5 reveal">
            <summary class="disclosure-summary">
              <span>${esc(about.storyLabel || "Đọc câu chuyện của tôi")}</span>${icon("plus", "w-6 h-6 disclosure-icon")}
            </summary>
            <div class="disclosure-body prose-story">
              ${about.heading ? `<h3 class="text-xl font-semibold mb-4">${lines(about.heading).replace(/<br>/g, " ")}</h3>` : ""}
              ${paragraphs}
            </div>
          </details>
        </div>
      </div>
    </section>`;
    },

    // ─── DỊCH VỤ: MENU CHỮ KHỔNG LỒ ──────────────────
    servicesSection() {
      const svc = config.services || {};
      const items = svc.items || [];
      const visible = visibleCount(svc, 3);

      const rows = items
        .map((item, i) => {
          const preview = item.video && !isPlaceholder(item.video)
            ? `<video class="w-full h-full object-cover" muted playsinline loop preload="none" data-lazy-video="${esc(item.video)}" aria-hidden="true"></video>`
            : `${media({ src: item.image || "", alt: item.imageAlt || item.title || "", cls: "w-full h-full object-cover", width: 720, height: 480 })}
                ${placeholder(item.title)}`;
          return `<details class="menu-item" name="services"${extraAttr(i, visible)} data-preview="${esc(item.image || "")}">
            <summary class="menu-summary">
              <span class="menu-no">${pad(i + 1)}</span>
              <h3 class="menu-title">${esc(item.title)}</h3>
              ${icon("plus", "w-7 h-7 md:w-9 md:h-9 menu-icon")}
            </summary>
            <div class="menu-body">
              <div class="menu-media relative aspect-[3/2] overflow-hidden bg-paper-2">
                ${preview}
              </div>
              <p class="text-base md:text-lg leading-relaxed text-mute">${esc(item.description)}</p>
            </div>
          </details>`;
        })
        .join("\n          ");

      return `<section id="services" class="bg-paper text-ink pb-14 md:pb-24 lg:pb-32">
      <div class="container-x border-t border-line pt-14 md:pt-24 lg:pt-32">
        ${sectionHead(svc, 2, "Dịch Vụ", { extra: svc.hint ? `<p class="hint mt-6">${esc(svc.hint)}</p>` : "" })}
        <div id="services-list" class="menu-list" data-collapse>
          ${rows}
        </div>
        ${moreButton("services-list", items.length, visible)}
      </div>
      <!-- Ảnh nổi theo con trỏ (chỉ desktop có chuột) -->
      <div class="svc-float" aria-hidden="true"><img alt="" width="360" height="240" decoding="async" hidden><span data-label></span></div>
    </section>`;
    },

    // ─── HIGHLIGHT REEL ───────────────────────────────
    videosSection() {
      const vid = config.videos || {};
      const featured = vid.featured || {};
      const items = vid.items || [];
      const visible = visibleCount(vid, 2);

      // Video chưa có link → nút dẫn về #contact thay vì mở trình phát rỗng
      const videoAttr = (url) => (url && !isPlaceholder(url) ? `data-video="${esc(url)}"` : `data-video-missing`);

      const rows = items
        .map(
          (v, i) => `<li${extraAttr(i, visible)}>
            <button type="button" ${videoAttr(v.videoUrl)} class="video-row group">
              <span class="relative w-24 sm:w-32 aspect-video flex-shrink-0 overflow-hidden bg-ink-2">
                ${media({ src: v.thumbnail || "", alt: "", cls: "w-full h-full object-cover", width: 640, height: 360 })}
                ${placeholder("", "absolute inset-0 img-placeholder--dark")}
              </span>
              <span class="min-w-0 flex-1 text-left">
                <span class="block text-lg md:text-2xl font-semibold leading-snug"><span class="sr-only">Phát video: </span>${esc(v.title)}</span>
                ${v.duration ? `<span class="block text-sm text-mute-dark mt-1 tabular-nums">${esc(v.duration)}</span>` : ""}
              </span>
              <span class="video-row-play">${icon("play", "w-4 h-4")}</span>
            </button>
          </li>`
        )
        .join("\n          ");

      return `<section id="videos" class="bg-ink text-white py-14 md:py-24 lg:py-32">
      <div class="container-x">
        ${sectionHead(vid, 3, "Video", { tone: "dark" })}
      </div>

      <!-- Showreel tràn màn hình, 16:9, có âm thanh — chỉ tải khi bấm -->
      <div class="reveal">
        <div class="reel-frame relative w-full aspect-video bg-ink-2 overflow-hidden" data-reel>
          <button type="button" ${videoAttr(featured.videoUrl)} data-inline class="reel-poster group absolute inset-0 w-full h-full text-left">
            ${media({ src: featured.thumbnail || "", alt: "", cls: "absolute inset-0 w-full h-full object-cover", width: 1280, height: 720 })}
            ${placeholder("", "absolute inset-0 img-placeholder--reel")}
            <span class="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent"></span>
            <span class="reel-play">${icon("play", "w-6 h-6 md:w-8 md:h-8 ml-1")}</span>
            <span class="absolute left-4 right-4 bottom-4 sm:left-6 sm:bottom-6 flex items-end justify-between gap-4">
              <span class="text-xl sm:text-3xl md:text-5xl font-extrabold tracking-tight leading-none"><span class="sr-only">Phát video có âm thanh: </span>${esc(featured.title || "Showreel")}</span>
              ${featured.duration ? `<span class="text-sm md:text-base text-white/80 tabular-nums flex-shrink-0">${esc(featured.duration)}</span>` : ""}
            </span>
          </button>
        </div>
      </div>

      ${items.length ? `<div class="container-x mt-10 md:mt-16">
        <h3 class="eyebrow eyebrow--dark mb-2">${esc(vid.moreHeading || "Thêm khoảnh khắc")}</h3>
        <ul id="video-list" class="video-list" data-collapse>
          ${rows}
        </ul>
        ${moreButton("video-list", items.length, visible, "dark")}
      </div>` : ""}

      <!-- Trình phát video nhỏ (modal) -->
      <div id="video-modal" class="overlay px-4" role="dialog" aria-modal="true" aria-label="Trình phát video">
        <div class="relative w-full max-w-5xl">
          <button type="button" data-close class="icon-btn absolute -top-14 right-0" aria-label="Đóng video">
            ${icon("close", "w-7 h-7")}
          </button>
          <div data-player class="aspect-video w-full bg-black overflow-hidden"></div>
        </div>
      </div>
    </section>`;
    },

    // ─── GALLERY (EDITORIAL) ──────────────────────────
    gallerySection() {
      const gal = config.gallery || {};
      const items = gal.items || [];
      const visible = visibleCount(gal, 5);
      const grade = gal.cinematic === false ? "" : " cinematic";

      const cells = items
        .map(
          (item, i) => `<li class="gallery-cell${i === 0 ? " gallery-cell--lead" : ""} reveal"${extraAttr(i, visible)}>
            <button type="button" data-lightbox="${esc(item.src || "")}" data-alt="${esc(item.alt || "")}" class="group block w-full text-left">
              <span class="relative block aspect-[4/5] overflow-hidden bg-paper-2${grade}">
                ${media({ src: item.src || "", alt: item.alt || "", cls: "gallery-img absolute inset-0 w-full h-full object-cover", width: 900, height: 1125 })}
                ${placeholder(item.category || "Ảnh")}
              </span>
              <span class="mt-2 flex items-baseline gap-2 text-sm text-mute">
                <span class="sr-only">Phóng to ảnh: </span><span class="tabular-nums">${pad(i + 1)}</span><span class="truncate">${esc(item.category || "")}</span>
              </span>
            </button>
          </li>`
        )
        .join("\n          ");

      return `<section id="gallery" class="bg-paper text-ink py-14 md:py-24 lg:py-32">
      <div class="container-x">
        ${sectionHead(gal, 4, "Hình Ảnh")}
        <ul id="gallery-grid" class="gallery-grid" data-collapse>
          ${cells}
        </ul>
        ${moreButton("gallery-grid", items.length, visible)}
      </div>

      <!-- Lightbox (vuốt trái/phải trên điện thoại) -->
      <div id="lightbox" class="overlay" role="dialog" aria-modal="true" aria-label="Xem ảnh">
        <button type="button" data-close class="icon-btn absolute top-[max(1rem,env(safe-area-inset-top))] right-3 z-10" aria-label="Đóng">
          ${icon("close", "w-7 h-7")}
        </button>
        <figure class="w-full max-w-5xl px-4">
          <img alt="" class="max-w-full max-h-[78svh] object-contain mx-auto">
          <figcaption class="mt-4 flex items-center justify-between gap-4 text-mute-dark text-base">
            <span data-caption class="min-w-0"></span>
            <span data-counter class="tabular-nums flex-shrink-0"></span>
          </figcaption>
        </figure>
        <div class="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] inset-x-0 flex justify-center gap-3">
          <button type="button" data-prev class="icon-btn icon-btn--ring" aria-label="Ảnh trước">${icon("arrowLeft", "w-6 h-6")}</button>
          <button type="button" data-next class="icon-btn icon-btn--ring" aria-label="Ảnh sau">${icon("arrowRight", "w-6 h-6")}</button>
        </div>
      </div>
    </section>`;
    },

    // ─── ĐỐI TÁC: DẢI LOGO ĐEN TRẮNG ─────────────────
    partnersSection() {
      const par = config.partners || {};
      const items = par.items || [];
      const logo = (p, hidden) => `<li class="partner">
            ${media({ src: p.logo || "", alt: hidden ? "" : p.name || "Đối tác", cls: "max-h-10 md:max-h-12 w-auto max-w-full object-contain", width: 200, height: 80 })}
            ${placeholder(p.name, "partner-name")}
          </li>`;

      return `<section id="partners" class="bg-paper text-ink py-12 md:py-16 border-t border-line" aria-labelledby="partners-title">
      <div class="container-x flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        ${eyebrow(5, par.sectionLabel || "Đối Tác")}
        <h2 id="partners-title" class="text-xl md:text-2xl font-semibold tracking-tight">${esc(par.heading || "Tin Tưởng Bởi")}</h2>
      </div>
      <div class="marquee mt-8 md:mt-10">
        <ul class="marquee-track">
          ${items.map((p) => logo(p, false)).join("\n          ")}
        </ul>
        <ul class="marquee-track" aria-hidden="true">
          ${items.map((p) => logo(p, true)).join("\n          ")}
        </ul>
      </div>
    </section>`;
    },

    // ─── CẢM NHẬN: 1 QUOTE / MÀN HÌNH, VUỐT NGANG ────
    testimonialsSection() {
      const test = config.testimonials || {};
      const items = test.items || [];

      const slides = items
        .map(
          (t, i) => `<div class="quote-slide" role="group" aria-roledescription="slide" aria-label="${i + 1} / ${items.length}"><figure>
              <blockquote>
                <p class="quote-big"><span class="quote-mark" aria-hidden="true">“</span>${esc(t.highlight || t.content || "")}</p>
                ${t.highlight && t.content ? `<p class="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-mute-dark">${esc(t.content)}</p>` : ""}
              </blockquote>
              <figcaption class="mt-8 flex flex-col gap-1">
                <span class="text-base font-semibold">${esc(t.name || "")}</span>
                <span class="text-base text-mute-dark">${esc(t.role || "")}</span>
              </figcaption>
            </figure></div>`
        )
        .join("\n            ");

      return `<section id="testimonials" class="bg-ink text-white">
      <div class="min-h-[100svh] flex flex-col py-14 md:py-24">
        <div class="container-x">
          ${eyebrow(6, test.sectionLabel || "Cảm Nhận", "reveal")}
          <h2 class="sr-only">${esc(test.heading || "Khách hàng nói gì")}</h2>
        </div>

        <div class="flex-1 flex flex-col justify-center" aria-roledescription="carousel" aria-label="${esc(test.heading || "Cảm nhận khách hàng")}">
          <!-- Vuốt ngang bằng scroll-snap gốc của trình duyệt (chạy cả khi không có JS) -->
          <div id="quote-track" class="quote-track scrollbar-hide" tabindex="0" aria-label="Vuốt ngang để xem cảm nhận khác">
            ${slides}
          </div>

          <!-- Nút điều hướng đặt bên TRÁI để không bị vòng chữ "Book now" (góc dưới phải) che -->
          <div class="container-x mt-10 flex items-center gap-4 sm:gap-6">
            <div class="flex gap-2">
              <button type="button" data-quote-prev class="icon-btn icon-btn--ring" aria-label="Cảm nhận trước">${icon("arrowLeft", "w-6 h-6")}</button>
              <button type="button" data-quote-next class="icon-btn icon-btn--ring" aria-label="Cảm nhận sau">${icon("arrowRight", "w-6 h-6")}</button>
            </div>
            <p class="text-base tabular-nums text-mute-dark" aria-live="polite"><span data-quote-current class="text-white">01</span> / ${pad(items.length)}</p>
            <div class="quote-progress" aria-hidden="true"><span data-quote-bar style="width:${items.length ? 100 / items.length : 100}%"></span></div>
          </div>
        </div>
      </div>
    </section>`;
    },

    // ─── FAQ: CHỮ + ĐƯỜNG KẺ MẢNH ─────────────────────
    faqSection() {
      const faq = config.faq || {};
      const items = faq.items || [];
      if (!items.length) return "";
      const visible = visibleCount(faq, 4);

      const rows = items
        .map(
          (f, i) => `<details class="disclosure"${extraAttr(i, visible)}>
            <summary class="disclosure-summary disclosure-summary--lg">
              <span>${esc(f.q)}</span>${icon("plus", "w-6 h-6 disclosure-icon")}
            </summary>
            <div class="disclosure-body"><p>${lines(f.a)}</p></div>
          </details>`
        )
        .join("\n          ");

      return `<section id="faq" class="bg-paper text-ink py-14 md:py-24 lg:py-32">
      <div class="container-x grid gap-2 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-4">
          ${sectionHead(faq, 7, "FAQ")}
        </div>
        <div class="lg:col-span-8">
          <div id="faq-list" class="border-t border-line" data-collapse>
            ${rows}
          </div>
          ${moreButton("faq-list", items.length, visible)}
        </div>
      </div>
    </section>`;
    },

    // ─── LIÊN HỆ: MEGA FOOTER (nội dung bên trong <footer id="contact">) ─
    contactSection() {
      const c = config.contact || {};
      const form = c.form || {};

      const channel = (href, label, value) => `<li>
              <a ${linkAttrs(href)} class="channel group">
                <span class="text-sm uppercase tracking-[0.18em] text-mute-dark">${esc(label)}</span>
                <span class="channel-value">${esc(value)}${icon("arrowUpRight", "w-6 h-6 md:w-8 md:h-8 flex-shrink-0 channel-arrow")}</span>
              </a>
            </li>`;

      const social = (href, label) => `<li><a ${linkAttrs(href)} class="link-thin">${esc(label)}</a></li>`;

      const eventOptions = (form.eventTypes || []).map((t) => `<option value="${esc(t)}">${esc(t)}</option>`).join("");

      return `<div class="container-x">
        ${eyebrow(8, c.sectionLabel || "Liên Hệ", "eyebrow--dark")}
        <h2 class="mega-heading mt-6">${lines(c.megaHeading || c.heading)}</h2>
        <p class="mt-6 max-w-xl text-base md:text-lg text-mute-dark leading-relaxed">${esc(c.subheading || "")}</p>

        <div class="mt-12 md:mt-20 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <!-- Kênh liên hệ trực tiếp -->
          <div class="lg:col-span-5">
            <ul class="border-t border-white/15">
              ${channel(h.phoneLink, "Điện thoại", h.phoneDisplay)}
              ${channel(h.zaloLink, "Zalo", "Chat Zalo")}
              ${channel(h.emailLink, "Email", h.emailDisplay)}
            </ul>

            <ul class="mt-8 flex flex-wrap gap-x-6 gap-y-1" aria-label="Mạng xã hội">
              ${social(h.facebookLink, "Facebook")}
              ${social(h.instagramLink, "Instagram")}
              ${social(h.youtubeLink, "YouTube")}
              ${social(h.tiktokLink, "TikTok")}
            </ul>

            <dl class="mt-8 grid gap-4 text-base">
              ${c.address && !isPlaceholder(c.address) ? `<div><dt class="text-sm uppercase tracking-[0.18em] text-mute-dark">Khu vực</dt><dd class="mt-1">${esc(c.address)}</dd></div>` : ""}
              ${c.workingHours ? `<div><dt class="text-sm uppercase tracking-[0.18em] text-mute-dark">Giờ làm việc</dt><dd class="mt-1">${esc(c.workingHours)}</dd></div>` : ""}
            </dl>
          </div>

          <!-- Form yêu cầu báo giá (mở ứng dụng email, không cần máy chủ) -->
          <form id="contact-form" data-email="${esc(h.emailRaw)}" class="lg:col-span-7" novalidate>
            <h3 class="text-2xl md:text-3xl font-semibold tracking-tight">${esc(form.heading || "Gửi Yêu Cầu Báo Giá")}</h3>
            <p class="mt-2 text-mute-dark">${esc(form.note || "")}</p>
            <div class="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <div class="field">
                <label for="cf-name">Họ và tên *</label>
                <input id="cf-name" name="name" type="text" autocomplete="name" required placeholder="Nguyễn Văn A">
              </div>
              <div class="field">
                <label for="cf-phone">Số điện thoại *</label>
                <input id="cf-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required pattern="[0-9+ .]{9,15}" placeholder="0901 234 567">
              </div>
              <div class="field">
                <label for="cf-type">Loại sự kiện</label>
                <select id="cf-type" name="eventType">${eventOptions}</select>
              </div>
              <div class="field">
                <label for="cf-date">Ngày dự kiến</label>
                <input id="cf-date" name="date" type="date">
              </div>
              <div class="field sm:col-span-2">
                <label for="cf-message">Nội dung</label>
                <textarea id="cf-message" name="message" rows="3" placeholder="Địa điểm, số lượng khách, mong muốn của bạn..."></textarea>
              </div>
            </div>
            <button type="submit" class="submit-btn mt-8">
              <span>${esc(form.submitLabel || "Gửi Yêu Cầu")}</span>${icon("arrowRight", "w-6 h-6")}
            </button>
            <p data-form-status role="status" class="mt-4 text-base text-gold min-h-[1.5rem]"></p>
          </form>
        </div>
      </div>`;
    },

    // ─── FOOTER: dòng cuối của mega footer ─────────────
    footerSection() {
      const f = config.footer || {};
      return `<div class="container-x mt-16 md:mt-24">
        <p class="footer-wordmark" style="--em:${textEm(config.brand?.name || "")}" aria-hidden="true">${esc(config.brand?.name || "")}</p>
        <div class="mt-6 pt-6 border-t border-white/15 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-base text-mute-dark">
          <p>${esc(f.copyright || "")}</p>
          <p>${esc(f.madeWith || "")}</p>
          ${f.backToTop ? `<a href="#hero" data-back-to-top class="link-thin text-white">Lên đầu trang${icon("arrowUp", "w-4 h-4")}</a>` : ""}
        </div>
      </div>`;
    },

    // ─── NÚT NỔI: VÒNG CHỮ XOAY "BOOK NOW" ─────────────
    floatingButton() {
      const fb = config.floatingButton || {};
      if (fb.enabled === false) return "";
      const text = fb.ringText || "BOOK NOW • BOOK NOW • BOOK NOW • ";
      return `<a ${linkAttrs(h.floatingLink)} id="book-ring" class="book-ring" aria-label="${esc(`${config.header?.ctaButton?.label || "Đặt lịch"} — ${fb.label || "Chat Zalo"}`)}">
    <svg class="book-ring-text" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <defs><path id="ring-path" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"/></defs>
      <text><textPath href="#ring-path" textLength="236" lengthAdjust="spacing">${esc(text)}</textPath></text>
    </svg>
    <span class="book-ring-core">${icon("arrowUpRight", "w-5 h-5")}</span>
  </a>`;
    },
  };
}

// ─── RENDER PAGE ────────────────────────────────────────

/**
 * Ghép template + config → HTML hoàn chỉnh
 * @param {string} template — Nội dung index.html (file khung)
 * @param {object} config — SITE_CONFIG
 * @returns {{ html: string, missing: string[] }}
 */
export function renderPage(template, config) {
  const renderers = createRenderers(config);
  const missing = [];

  // Xóa comment hướng dẫn ở đầu file
  let html = template.replace(/<!--\s*ĐÂY LÀ FILE KHUNG[\s\S]*?-->\s*\n?/, "");

  // 1) Thay thế renderer blocks: {{{ @tenRenderer }}}
  html = html.replace(/\{\{\{\s*@(\w+)\s*\}\}\}/g, (match, name) => {
    if (typeof renderers[name] === "function") {
      return renderers[name]();
    }
    missing.push(`@${name}`);
    return "";
  });

  // 2) Thay thế giá trị: {{ duong.dan }}
  html = html.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (match, path) => {
    const val = path.split(".").reduce((obj, key) => (obj == null ? undefined : obj[key]), config);
    if (val === undefined || val === null || typeof val === "object") {
      missing.push(path);
      return "";
    }
    return esc(String(val));
  });

  return { html, missing };
}
