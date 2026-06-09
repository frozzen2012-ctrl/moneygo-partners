/**
 * Список партнёров MoneyGo.
 *
 * Чтобы обновить каталог — правьте ТОЛЬКО этот файл.
 * Каждый партнёр — объект:
 *   name       {string}   Название (не переводится).
 *   logo       {string}   Путь к локальному логотипу. Пусто => плитка с инициалами.
 *   url        {string}   Внешняя ссылка на сайт партнёра.
 *   badges     {string[]} Бейджи карточки. "Top Rated" — выделяет топ-партнёров.
 *   status     {string}   "active" (действующий) | "potential" (потенциальный).
 *   currencies {string[]} Коды валют. Иконка/флаг берётся из CURRENCY_META в js/main.js.
 *                         Поддерживаемые коды: USDT, THB, RUB, KZT, Volet.
 *
 * Порядок в массиве = порядок на странице. Сверху — топовые партнёры.
 */
window.PARTNERS = [
  // --- Топ-партнёры (бейдж Top Rated) ---
  {
    name: "Hybrid Digital Exchanger",
    logo: "assets/logos/hd-change.svg",
    url: "https://hd-change.com/exchange-usdttrc20-to-mngusd/", // прямой обмен USDT(TRC20) → MNG

    badges: ["Top Rated"],
    status: "active",
    currencies: ["USDT", "THB"]
  },
  {
    name: "TOP EXCHANGE",
    logo: "assets/logos/top-exchange.svg",
    url: "https://top-exchange.com/exchange-usdttrc20-to-mngusd/", // прямой обмен USDT(TRC20) → MNG

    badges: ["Top Rated"],
    status: "active",
    currencies: ["USDT"]
  },
  {
    name: "IN ONE GO",
    logo: "assets/logos/in1go.png",
    url: "https://in1go.cc/",
    badges: ["Top Rated"],
    status: "active",
    currencies: ["USDT"]
  },

  // --- Остальные партнёры (без бейджей, произвольный порядок) ---
  {
    name: "MINE.exchange",
    logo: "assets/logos/mine.svg",
    url: "https://mine.exchange/",
    badges: [],
    status: "active",
    currencies: ["USDT"]
  },
  {
    name: "UNIOCHANGE",
    logo: "assets/logos/uniochange.png",
    url: "https://uniochange.com/",
    badges: [],
    status: "active",
    currencies: ["USDT", "Volet"]
  },
  {
    name: "Abcobmen",
    logo: "assets/logos/abcobmen.svg",
    url: "https://abcobmen.net/",
    badges: [],
    status: "active",
    currencies: ["USDT", "RUB"]
  },
  {
    name: "WMExchange24",
    logo: "assets/logos/wmexchange24.png",
    url: "https://wmexchange24.com/",
    badges: [],
    status: "active",
    currencies: ["USDT"]
  },
  {
    name: "ATPayz",
    logo: "assets/logos/atpayz.webp",
    url: "https://atpayz.com/",
    badges: [],
    status: "active",
    currencies: ["USDT"]
  },
  {
    name: "BITKIT.MONEY",
    logo: "assets/logos/bitkit.svg",
    url: "https://bitkit.money/",
    badges: [],
    status: "active",
    currencies: ["USDT", "RUB", "KZT"]
  }
];
