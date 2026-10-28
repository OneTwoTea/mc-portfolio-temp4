/**
 * ═══════════════════════════════════════════════════════════
 *  MAIN.JS — JavaScript phía trình duyệt (không thư viện ngoài)
 *  Menu toàn màn hình, video lồng chữ, thu gọn danh sách, ảnh nổi dịch vụ,
 *  showreel, lightbox + vuốt, slider cảm nhận, vòng chữ "Book now", form.
 *  Trang vẫn đọc được đầy đủ khi không có JS (progressive enhancement).
 * ═══════════════════════════════════════════════════════════
 */

(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scrollBehavior = prefersReduced ? "auto" : "smooth";

  // ─── KHÓA CUỘN TRANG (menu, lightbox, video) ───────────
  let lockCount = 0;
  function lockScroll() {
    if (lockCount++ === 0) document.documentElement.style.overflow = "hidden";
  }
  function unlockScroll() {
    if (lockCount > 0 && --lockCount === 0) document.documentElement.style.overflow = "";
  }

  // ─── HIỆN DẦN KHI CUỘN ────────────────────────────────
  function initScrollReveal() {
    const els = document.querySelectorAll(".reveal");
    if (prefersReduced || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("revealed"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => observer.observe(el));
  }

  // ─── MENU TOÀN MÀN HÌNH ───────────────────────────────
  function initMenu() {
    const btn = document.getElementById("menu-toggle");
    const menu = document.getElementById("site-menu");
    if (!btn || !menu) return;
    let isOpen = false;

    function setOpen(open) {
      if (open === isOpen) return;
      isOpen = open;
      menu.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
      document.getElementById("site-header")?.classList.remove("is-hidden");
      if (open) {
        lockScroll();
        menu.querySelector("a")?.focus({ preventScroll: true });
      } else {
        unlockScroll();
      }
    }

    btn.addEventListener("click", () => setOpen(!isOpen));

    // Chọn một mục → đóng. Bấm vào vùng trống (ngoài link) → đóng.
    menu.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      setOpen(false);
      if (!link) btn.focus();
    });

    document.addEventListener("keydown", (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        setOpen(false);
        btn.focus();
      }
      // Giữ focus trong menu + nút đóng khi dùng Tab
      if (e.key === "Tab") {
        const items = [btn, ...menu.querySelectorAll("a, button")];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  // ─── HEADER: ẨN KHI CUỘN XUỐNG, HIỆN KHI CUỘN LÊN ─────
  function initHeaderScroll() {
    const header = document.getElementById("site-header");
    if (!header) return;
    let lastY = window.scrollY;
    let ticking = false;

    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const y = window.scrollY;
          const menuOpen = document.getElementById("menu-toggle")?.getAttribute("aria-expanded") === "true";
          if (!menuOpen) header.classList.toggle("is-hidden", y > 120 && y > lastY + 4);
          if (y < lastY - 4 || y <= 120) header.classList.remove("is-hidden");
          lastY = y;
          ticking = false;
        });
      },
      { passive: true }
    );
    // Có phần tử được focus bằng bàn phím trong header → luôn hiện
    header.addEventListener("focusin", () => header.classList.remove("is-hidden"));
  }

  // ─── HERO: VIDEO LỒNG CHỮ (Hero chỉ dùng video, không ảnh) ─
  function initHeroVideo() {
    const stage = document.querySelector("[data-hero-video]");
    const video = stage?.querySelector("video");
    if (!stage || !video) return;

    // Chế độ tiết kiệm dữ liệu / mạng 2G → không tải video, giữ khung giữ chỗ trong chữ
    const conn = navigator.connection;
    if (conn?.saveData || /2g/.test(conn?.effectiveType || "")) return;

    let inView = true;
    const playIfAllowed = () => {
      if (inView && !prefersReduced) video.play().catch(() => {});
    };

    // Thứ tự nguồn: đúng kích thước màn hình trước, bản còn lại làm dự phòng (trình duyệt tự thử nguồn kế tiếp khi lỗi)
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const { srcMobile, srcDesktop, srcWebm } = stage.dataset;
    const list = desktop ? [[srcWebm, "video/webm"], [srcDesktop, "video/mp4"], [srcMobile, "video/mp4"]] : [[srcMobile, "video/mp4"], [srcDesktop, "video/mp4"]];
    const seen = new Set();
    list.forEach(([src, type]) => {
      if (!src || seen.has(src)) return;
      seen.add(src);
      const s = document.createElement("source");
      s.src = src;
      s.type = type;
      video.appendChild(s);
    });

    // Mọi nguồn đều lỗi (file chưa có) → hiện nhãn "Khung video Hero"
    video.lastElementChild?.addEventListener("error", () => stage.classList.add("is-placeholder"));

    // Có hình thì chuyển sang chế độ video. "Giảm chuyển động" → chỉ hiện khung hình đầu, không phát.
    video.addEventListener(prefersReduced ? "loadeddata" : "playing", () => stage.classList.add("is-video"), { once: true });

    // Tạm dừng khi Hero ra khỏi màn hình để tiết kiệm pin
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        if (inView) playIfAllowed();
        else video.pause();
      }).observe(stage);
    }

    // Video là hình ảnh chính của Hero → tải ngay khi trang dựng xong
    video.preload = prefersReduced ? "metadata" : "auto";
    video.load();
    playIfAllowed();
  }

  // ─── THU GỌN DANH SÁCH: "Xem thêm (N)" / "Thu gọn" ────
  function initCollapsibles() {
    document.querySelectorAll("[data-more]").forEach((btn) => {
      const list = document.getElementById(btn.getAttribute("aria-controls"));
      const label = btn.querySelector("[data-more-text]");
      if (!list) return;

      btn.addEventListener("click", () => {
        const open = !list.classList.contains("is-open");
        list.classList.toggle("is-open", open);
        btn.setAttribute("aria-expanded", String(open));
        if (label) label.textContent = open ? btn.dataset.labelLess : btn.dataset.labelMore;

        if (open) {
          // Mục mới hiện ra: đánh dấu đã "reveal" để không bị ẩn chờ cuộn
          list.querySelectorAll("[data-extra]").forEach((el) => {
            el.classList.add("revealed");
            el.querySelectorAll(".reveal").forEach((r) => r.classList.add("revealed"));
          });
        } else {
          // Thu lại → cuộn về đầu section
          (btn.closest("section") || list).scrollIntoView({ behavior: scrollBehavior, block: "start" });
        }
      });
    });
  }

  // ─── DỊCH VỤ: ảnh nổi theo chuột + video xem trước ────
  function initServices() {
    const list = document.getElementById("services-list");
    if (!list) return;

    // Video xem trước (nếu có) chỉ tải khi mở mục
    list.querySelectorAll("details").forEach((item) => {
      item.addEventListener("toggle", () => {
        const v = item.querySelector("video[data-lazy-video]");
        if (!v) return;
        if (item.open) {
          if (!v.src) v.src = v.dataset.lazyVideo;
          if (!prefersReduced) v.play().catch(() => {});
        } else v.pause();
      });
    });

    const float = document.querySelector(".svc-float");
    const canHover = window.matchMedia("(hover: hover) and (min-width: 1024px)");
    if (!float) return;
    const img = float.querySelector("img");
    const labelEl = float.querySelector("[data-label]");

    img.addEventListener("load", () => {
      img.hidden = false;
      float.classList.remove("is-broken");
    });
    img.addEventListener("error", () => float.classList.add("is-broken"));

    list.querySelectorAll("details").forEach((item) => {
      item.addEventListener("mouseenter", () => {
        if (!canHover.matches) return;
        const src = item.dataset.preview;
        labelEl.textContent = item.querySelector(".menu-title")?.textContent || "";
        if (src && img.getAttribute("src") !== src) {
          float.classList.remove("is-broken");
          img.src = src;
        } else if (!src) float.classList.add("is-broken");
        float.classList.add("is-active");
      });
      item.addEventListener("mouseleave", () => float.classList.remove("is-active"));
    });

    list.addEventListener("mousemove", (e) => {
      if (!canHover.matches) return;
      const w = float.offsetWidth;
      const hgt = float.offsetHeight;
      const x = Math.min(e.clientX + 32, window.innerWidth - w - 16);
      const y = Math.max(16, Math.min(e.clientY - hgt / 2, window.innerHeight - hgt - 16));
      float.style.setProperty("--x", `${x}px`);
      float.style.setProperty("--y", `${y}px`);
    });
  }

  // ─── VIDEO: showreel phát tại chỗ, video nhỏ mở modal ─
  function toEmbed(url) {
    try {
      const u = new URL(url, location.href);
      let id = "";
      if (u.hostname.includes("youtu.be")) id = u.pathname.slice(1);
      else if (u.hostname.includes("youtube")) id = u.searchParams.get("v") || u.pathname.split("/").pop();
      if (id) return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;
    } catch (_) {
      /* bỏ qua */
    }
    return url;
  }

  function createPlayer(url, title) {
    if (/\.(mp4|webm)(\?|$)/i.test(url)) {
      const video = document.createElement("video");
      video.src = url;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.className = "w-full h-full";
      return video;
    }
    const iframe = document.createElement("iframe");
    iframe.src = toEmbed(url);
    iframe.title = title || "Video";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen";
    iframe.allowFullscreen = true;
    iframe.className = "w-full h-full";
    return iframe;
  }

  function initVideos() {
    const modal = document.getElementById("video-modal");
    const player = modal?.querySelector("[data-player]");
    const closeBtn = modal?.querySelector("[data-close]");
    let opener = null;

    function open(el) {
      opener = el;
      player.innerHTML = "";
      player.appendChild(createPlayer(el.dataset.video, el.textContent.trim().replace(/\s+/g, " ")));
      modal.classList.add("active");
      lockScroll();
      closeBtn?.focus();
    }
    function close() {
      if (!modal?.classList.contains("active")) return;
      modal.classList.remove("active");
      player.innerHTML = ""; // dừng phát
      unlockScroll();
      opener?.focus();
    }

    document.querySelectorAll("[data-video]").forEach((el) =>
      el.addEventListener("click", () => {
        // Showreel: thay poster bằng trình phát ngay tại khung 16:9 (có âm thanh)
        if (el.hasAttribute("data-inline")) {
          const frame = el.closest("[data-reel]");
          const p = createPlayer(el.dataset.video, el.textContent.trim().replace(/\s+/g, " "));
          frame.replaceChildren(p);
          p.focus?.();
          return;
        }
        if (modal) open(el);
      })
    );

    // Video chưa có link → chuyển tới phần liên hệ
    document.querySelectorAll("[data-video-missing]").forEach((el) =>
      el.addEventListener("click", () => document.getElementById("contact")?.scrollIntoView({ behavior: scrollBehavior }))
    );

    if (!modal) return;
    closeBtn?.addEventListener("click", close);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  // ─── LIGHTBOX (vuốt trái/phải trên điện thoại) ────────
  function initLightbox() {
    const overlay = document.getElementById("lightbox");
    if (!overlay) return;

    const img = overlay.querySelector("img");
    const caption = overlay.querySelector("[data-caption]");
    const counter = overlay.querySelector("[data-counter]");
    const closeBtn = overlay.querySelector("[data-close]");
    const items = Array.from(document.querySelectorAll("[data-lightbox]"));
    let current = 0;
    let opener = null;
    let touchX = 0;
    let touchY = 0;

    function show(index) {
      if (!items.length) return;
      current = (index + items.length) % items.length;
      const item = items[current];
      img.src = item.dataset.lightbox;
      img.alt = item.dataset.alt || "";
      caption.textContent = item.dataset.alt || "";
      counter.textContent = `${String(current + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`;
    }
    function open(item) {
      opener = item;
      show(items.indexOf(item));
      overlay.classList.add("active");
      lockScroll();
      closeBtn?.focus();
    }
    function close() {
      if (!overlay.classList.contains("active")) return;
      overlay.classList.remove("active");
      unlockScroll();
      opener?.focus();
    }

    items.forEach((item) => item.addEventListener("click", () => open(item)));
    closeBtn?.addEventListener("click", close);
    overlay.querySelector("[data-prev]")?.addEventListener("click", () => show(current - 1));
    overlay.querySelector("[data-next]")?.addEventListener("click", () => show(current + 1));

    // Ảnh chưa có → hiện khung nền thay vì icon ảnh lỗi
    const fallbackCls = ["bg-ink-2", "w-[min(80vw,40rem)]", "aspect-[4/5]"];
    img.addEventListener("error", () => img.classList.add(...fallbackCls));
    img.addEventListener("load", () => img.classList.remove(...fallbackCls));

    document.addEventListener("keydown", (e) => {
      if (!overlay.classList.contains("active")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });

    // Bấm ra vùng tối xung quanh để đóng
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay || e.target.tagName === "FIGURE") close();
    });

    overlay.addEventListener("touchstart", (e) => {
      touchX = e.changedTouches[0].clientX;
      touchY = e.changedTouches[0].clientY;
    }, { passive: true });
    overlay.addEventListener("touchend", (e) => {
      const dx = touchX - e.changedTouches[0].clientX;
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(current + (dx > 0 ? 1 : -1));
      else if (dy < -90 && Math.abs(dy) > Math.abs(dx)) close(); // vuốt xuống để đóng
    }, { passive: true });
  }

  // ─── CẢM NHẬN: đồng bộ số thứ tự với vị trí vuốt ──────
  function initQuotes() {
    const track = document.getElementById("quote-track");
    if (!track) return;
    const slides = Array.from(track.children);
    const currentEl = document.querySelector("[data-quote-current]");
    const bar = document.querySelector("[data-quote-bar]");
    let index = -1;

    const update = () => {
      const i = Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / Math.max(1, track.clientWidth))));
      if (i === index) return;
      index = i;
      if (currentEl) currentEl.textContent = String(index + 1).padStart(2, "0");
      if (bar) bar.style.transform = `translateX(${index * 100}%)`;
      slides.forEach((s, n) => s.setAttribute("aria-hidden", String(n !== index)));
    };
    const goTo = (i) => {
      const next = (i + slides.length) % slides.length;
      track.scrollTo({ left: next * track.clientWidth, behavior: scrollBehavior });
    };

    let raf = 0;
    track.addEventListener("scroll", () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }, { passive: true });
    document.querySelector("[data-quote-prev]")?.addEventListener("click", () => goTo(index - 1));
    document.querySelector("[data-quote-next]")?.addEventListener("click", () => goTo(index + 1));
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); goTo(index - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); goTo(index + 1); }
    });
    update();
  }

  // ─── VÒNG CHỮ "BOOK NOW": ẩn ở Hero và khi tới footer ─
  function initBookRing() {
    const ring = document.getElementById("book-ring");
    const hero = document.getElementById("hero");
    const footer = document.getElementById("contact");
    if (!ring || !("IntersectionObserver" in window)) return;

    const state = { hero: true, footer: false };
    const apply = () => ring.classList.toggle("is-hidden", state.hero || state.footer);
    apply();

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === hero) state.hero = entry.isIntersecting;
        if (entry.target === footer) state.footer = entry.isIntersecting;
      });
      apply();
    }, { rootMargin: "0px 0px -15% 0px" });
    if (hero) io.observe(hero);
    if (footer) io.observe(footer);
  }

  // ─── FORM LIÊN HỆ (mở ứng dụng email, không cần máy chủ) ─
  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;
    const status = form.querySelector("[data-form-status]");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const phone = String(data.get("phone") || "").trim();

      if (!name || !phone || !form.elements.phone.checkValidity()) {
        status.textContent = "Vui lòng nhập họ tên và số điện thoại hợp lệ.";
        (name ? form.elements.phone : form.elements.name).focus();
        return;
      }

      const email = form.dataset.email;
      if (!email) {
        status.textContent = "Kênh email đang được cập nhật — vui lòng gọi điện hoặc nhắn Zalo giúp mình nhé!";
        return;
      }

      const body = [
        `Họ tên: ${name}`,
        `Điện thoại: ${phone}`,
        `Loại sự kiện: ${data.get("eventType") || ""}`,
        `Ngày dự kiến: ${data.get("date") || ""}`,
        "",
        String(data.get("message") || ""),
      ].join("\n");
      const subject = `Yêu cầu báo giá MC — ${name}`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status.textContent = "Đang mở ứng dụng email của bạn...";
    });
  }

  // ─── INIT ─────────────────────────────────────────────
  initScrollReveal();
  initMenu();
  initHeaderScroll();
  initHeroVideo();
  initCollapsibles();
  initServices();
  initVideos();
  initLightbox();
  initQuotes();
  initBookRing();
  initContactForm();
})();
