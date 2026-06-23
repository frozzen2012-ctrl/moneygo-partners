/* =========================================================================
   MoneyGo Partners — main.js
   - i18n + переключение языка (localStorage)
   - рендер карточек партнёров из window.PARTNERS
   - поиск + фильтры
   - мобильное меню, sticky header, reveal-анимации
   - отправка формы (Formspree fetch + mailto-фолбэк)
   ========================================================================= */
(function () {
  "use strict";

  var STORAGE_KEY = "mgp_lang";
  var DEFAULT_LANG = "ru";
  var SUPPORTED = ["ru", "en"];

  /* --------------------------- Аналитика -------------------------- */
  // Лёгкий вендоронезависимый слой событий.
  //  • Cloudflare Zaraz (zaraz.track) — нативные кастомные события Cloudflare.
  //  • gtag / dataLayer — если позже подключат GA4, события уйдут и туда.
  // Если ничего не подключено — тихий no-op. Добавь ?analyticsDebug в URL,
  // чтобы видеть все события в консоли при проверке.
  var ANALYTICS_DEBUG = /[?&]analyticsDebug\b/.test(location.search);
  function track(name, props) {
    props = props || {};
    try {
      if (window.zaraz && typeof window.zaraz.track === "function") {
        window.zaraz.track(name, props);
      }
      if (typeof window.gtag === "function") {
        window.gtag("event", name, props);
      } else if (Array.isArray(window.dataLayer)) {
        var payload = { event: name };
        for (var k in props) if (Object.prototype.hasOwnProperty.call(props, k)) payload[k] = props[k];
        window.dataLayer.push(payload);
      }
    } catch (e) { /* аналитика не должна ломать сайт */ }
    if (ANALYTICS_DEBUG) console.log("[analytics]", name, props);
  }

  /* ----------------------------- i18n ----------------------------- */
  function getLang() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    return SUPPORTED.indexOf(saved) !== -1 ? saved : DEFAULT_LANG;
  }

  function t(key, lang) {
    var dict = (window.I18N && window.I18N[lang]) || {};
    return Object.prototype.hasOwnProperty.call(dict, key) ? dict[key] : null;
  }

  function applyLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;

    document.documentElement.lang = lang;

    // Текст и атрибуты по data-i18n
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var val = t(key, lang);
      if (val === null) return;
      var attr = el.getAttribute("data-i18n-attr");
      if (attr) {
        el.setAttribute(attr, val);
      } else {
        el.textContent = val;
      }
    });

    // Обновляем <title> отдельно (надёжнее, чем textContent на <title>)
    var titleVal = t("page_title", lang);
    if (titleVal) document.title = titleVal;

    // Состояние кнопок переключателя
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      var active = btn.getAttribute("data-lang") === lang;
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}

    // Перерисовать карточки — внутри есть локализованные подписи
    renderPartners();
  }

  function initLangSwitch() {
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var lang = btn.getAttribute("data-lang");
        applyLang(lang);
        track("lang_switch", { lang: lang });
      });
    });
  }

  /* --------------------------- Партнёры --------------------------- */
  var grid = document.getElementById("partners-grid");
  var emptyEl = document.getElementById("partners-empty");
  var searchInput = document.getElementById("partner-search");
  var chips = Array.prototype.slice.call(document.querySelectorAll(".chip"));

  var state = { query: "", filter: "all" };

  // Палитра для плиток-инициалов (когда логотип отсутствует)
  var INITIAL_COLORS = [
    "#4f7cff", "#27d3a2", "#ff9f6b", "#b06bff",
    "#ff6b8a", "#6bd0ff", "#ffce6b", "#6bffb0"
  ];

  function initials(name) {
    var words = name.replace(/[^\p{L}\p{N} .]/gu, " ").trim().split(/\s+/);
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  function colorFor(name) {
    var sum = 0;
    for (var i = 0; i < name.length; i++) sum += name.charCodeAt(i);
    return INITIAL_COLORS[sum % INITIAL_COLORS.length];
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ----------------------- Валюты: иконки/флаги ----------------------- */
  // Простые инлайн-SVG флагов (надёжнее emoji: на Windows эмодзи-флаги не рисуются).
  var FLAGS = {
    TH: '<svg viewBox="0 0 9 6" aria-hidden="true"><rect width="9" height="6" fill="#A51931"/><rect y="1" width="9" height="4" fill="#F4F5F8"/><rect y="2" width="9" height="2" fill="#2D2A4A"/></svg>',
    RU: '<svg viewBox="0 0 9 6" aria-hidden="true"><rect width="9" height="6" fill="#fff"/><rect y="2" width="9" height="2" fill="#0039A6"/><rect y="4" width="9" height="2" fill="#D52B1E"/></svg>',
    KZ: '<svg viewBox="0 0 9 6" aria-hidden="true"><rect width="9" height="6" fill="#00AFCA"/><circle cx="4.5" cy="2.7" r="1.15" fill="#FEC50C"/><rect x="1.4" y="4.2" width="0.5" height="1.2" fill="#FEC50C"/></svg>'
  };

  // Метаданные валют: цвет круглой иконки, символ, флаг (для фиата).
  var CURRENCY_META = {
    USDT:  { symbol: "₮", color: "#26A17B", label: "USDT" },
    Volet: { symbol: "V", color: "#1F6FEB", label: "Volet" },
    THB:   { symbol: "฿", color: "#27406b", label: "THB", flag: "TH" },
    RUB:   { symbol: "₽", color: "#3a3f52", label: "RUB", flag: "RU" },
    KZT:   { symbol: "₸", color: "#0c6b7a", label: "KZT", flag: "KZ" }
  };

  function currencyChip(code) {
    var m = CURRENCY_META[code] || { symbol: code.slice(0, 1), color: "#3a3f52", label: code };
    var flag = m.flag && FLAGS[m.flag]
      ? '<span class="cur-flag" aria-hidden="true">' + FLAGS[m.flag] + "</span>"
      : "";
    return '<span class="cur-chip" title="' + escapeHtml(m.label) + '">' +
      '<span class="cur-icon" style="background:' + m.color + '" aria-hidden="true">' +
      escapeHtml(m.symbol) + "</span>" +
      flag +
      '<span class="cur-code">' + escapeHtml(m.label) + "</span>" +
      "</span>";
  }

  function matchesFilter(p) {
    if (state.filter === "top") return (p.badges || []).indexOf("Top Rated") !== -1;
    return true;
  }

  function matchesQuery(p) {
    if (!state.query) return true;
    var hay = (p.name + " " + (p.badges || []).join(" ") + " " +
               (p.currencies || []).join(" ")).toLowerCase();
    return hay.indexOf(state.query) !== -1;
  }

  function buildCard(p, lang) {
    var a = document.createElement("a");
    a.className = "partner-card reveal is-visible";
    a.href = p.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("aria-label", p.name + " — " + t("card_external_hint", lang));

    // Логотип или плитка с инициалами (фолбэк через onerror)
    var logoHtml;
    if (p.logo) {
      logoHtml = '<img class="partner-logo" src="' + escapeHtml(p.logo) +
        '" alt="' + escapeHtml(p.name) + '" loading="lazy" decoding="async" />';
    } else {
      logoHtml = '<span class="partner-initials" style="background:' + colorFor(p.name) +
        '">' + escapeHtml(initials(p.name)) + "</span>";
    }

    // Бейджи: только Top Rated (со звездой). У остальных партнёров бейджей нет.
    var badges = "";
    (p.badges || []).forEach(function (b) {
      if (b === "Top Rated") {
        badges +=
          '<span class="badge badge-top">' +
          '<svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">' +
          '<path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9L12 3z"' +
          ' fill="currentColor"/></svg>' +
          escapeHtml(b) + "</span>";
      } else {
        badges += '<span class="badge">' + escapeHtml(b) + "</span>";
      }
    });
    var badgesHtml = badges ? '<div class="partner-badges">' + badges + "</div>" : "";

    // Валюты — круглые иконки + флаг для фиата
    var curHtml = (p.currencies && p.currencies.length)
      ? '<div class="cur-list">' + p.currencies.map(currencyChip).join("") + "</div>"
      : "";

    a.innerHTML =
      '<div class="partner-top">' +
        logoHtml +
        '<div class="partner-name">' + escapeHtml(p.name) + "</div>" +
      "</div>" +
      badgesHtml +
      curHtml +
      '<div class="partner-foot">' +
        "<span>" + escapeHtml(t("partners_open", lang)) +
          ' <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">' +
          '<path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        "</span>" +
        '<span class="partner-hint">' + escapeHtml(t("card_external_hint", lang)) + "</span>" +
      "</div>";

    // Эффект подсветки под курсором
    a.addEventListener("mousemove", function (e) {
      var r = a.getBoundingClientRect();
      a.style.setProperty("--mx", (e.clientX - r.left) + "px");
      a.style.setProperty("--my", (e.clientY - r.top) + "px");
    });

    // Событие: переход к партнёру (с пометкой прямого обмена)
    a.addEventListener("click", function () {
      track("partner_click", {
        partner: p.name,
        direct: /\/exchange/i.test(p.url),
        currencies: (p.currencies || []).join(",")
      });
    });

    // Фолбэк логотипа: если файл не загрузился — плитка с инициалами
    if (p.logo) {
      var img = a.querySelector(".partner-logo");
      img.addEventListener("error", function () {
        var span = document.createElement("span");
        span.className = "partner-initials";
        span.style.background = colorFor(p.name);
        span.textContent = initials(p.name);
        img.replaceWith(span);
      });
    }

    return a;
  }

  function renderPartners() {
    if (!grid) return;
    var lang = getLang();
    var list = (window.PARTNERS || []).filter(function (p) {
      return matchesFilter(p) && matchesQuery(p);
    });

    grid.innerHTML = "";
    list.forEach(function (p) { grid.appendChild(buildCard(p, lang)); });

    if (emptyEl) emptyEl.hidden = list.length !== 0;

    // Обновить счётчик в hero
    var statEl = document.querySelector('[data-stat="partners"]');
    if (statEl && !state.query && state.filter === "all") {
      statEl.textContent = (window.PARTNERS || []).length;
    }
  }

  function initPartnerControls() {
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        state.query = searchInput.value.trim().toLowerCase();
        renderPartners();
      });
    }
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.classList.remove("is-active"); });
        chip.classList.add("is-active");
        state.filter = chip.getAttribute("data-filter");
        renderPartners();
      });
    });
  }

  /* ----------------------- Header / меню --------------------------- */
  function initHeader() {
    var header = document.querySelector(".site-header");
    var toggle = document.querySelector(".nav-toggle");
    var mobileNav = document.getElementById("mobile-nav");

    var onScroll = function () {
      if (!header) return;
      header.classList.toggle("scrolled", window.scrollY > 12);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (toggle && mobileNav) {
      toggle.addEventListener("click", function () {
        var open = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", open ? "false" : "true");
        mobileNav.hidden = open;
      });
      mobileNav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          toggle.setAttribute("aria-expanded", "false");
          mobileNav.hidden = true;
        });
      });
    }
  }

  /* --------------------- Reveal по скроллу ------------------------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* --------------------------- Форма ------------------------------ */
  function initForm() {
    var form = document.getElementById("partner-form");
    if (!form) return;
    var statusEl = document.getElementById("form-status");
    var lang = getLang;
    var endpoint = form.getAttribute("action") || "";
    // Если endpoint не настроен (остался плейсхолдер) — работаем через mailto.
    var endpointReady = /^https?:\/\//i.test(endpoint) && endpoint.indexOf("<") === -1;

    function setStatus(key, cls) {
      if (!statusEl) return;
      statusEl.textContent = t(key, lang()) || "";
      statusEl.className = "form-status" + (cls ? " " + cls : "");
    }

    function buildMailto() {
      var data = new FormData(form);
      var subject = "MoneyGo Partners — заявка партнёра";
      var body =
        "Имя: " + (data.get("name") || "") + "\n" +
        "Обменник: " + (data.get("exchange") || "") + "\n" +
        "Сайт: " + (data.get("site") || "") + "\n" +
        "Контакт: " + (data.get("contact") || "") + "\n\n" +
        (data.get("message") || "");
      return "mailto:ps@in1go.cc?subject=" + encodeURIComponent(subject) +
             "&body=" + encodeURIComponent(body);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        setStatus("form_required", "is-error");
        form.reportValidity();
        return;
      }

      // Фолбэк: endpoint не настроен — открываем почтовый клиент.
      if (!endpointReady) {
        track("partner_form_submit", { mode: "mailto" });
        window.location.href = buildMailto();
        setStatus("form_success", "is-success");
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      var prev = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = t("form_sending", lang()); }
      setStatus("", "");

      fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            setStatus("form_success", "is-success");
            track("partner_form_submit", { mode: "formspree" });
          } else {
            throw new Error("bad status");
          }
        })
        .catch(function () {
          setStatus("form_error", "is-error");
          var mf = document.getElementById("mailto-fallback");
          if (mf) mf.href = buildMailto();
        })
        .finally(function () {
          if (btn) { btn.disabled = false; btn.textContent = prev; }
        });
    });

    // Поддерживаем mailto-фолбэк актуальным
    var mf = document.getElementById("mailto-fallback");
    if (mf) {
      form.addEventListener("input", function () { mf.href = buildMailto(); });
    }
  }

  /* ------------------ Аналитика: CTA-кнопки ----------------------- */
  function initCtaAnalytics() {
    document.querySelectorAll(".hero-cta a").forEach(function (a) {
      a.addEventListener("click", function () {
        track("cta_click", { cta: a.getAttribute("href") || "", area: "hero" });
      });
    });
    document.querySelectorAll('.main-nav a, .mobile-nav a').forEach(function (a) {
      a.addEventListener("click", function () {
        track("nav_click", { target: a.getAttribute("href") || "" });
      });
    });
  }

  /* --------------------------- Прочее ----------------------------- */
  function initYear() {
    var y = document.getElementById("year");
    if (y) {
      var now = new Date();
      y.textContent = String(now.getFullYear());
    }
  }

  /* ----------------------------- init ----------------------------- */
  function init() {
    initLangSwitch();
    applyLang(getLang());   // также вызывает renderPartners()
    initPartnerControls();
    initHeader();
    initReveal();
    initForm();
    initCtaAnalytics();
    initYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
