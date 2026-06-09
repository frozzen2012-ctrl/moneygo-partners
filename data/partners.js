/**
 * Список партнёров MoneyGo.
 *
 * Чтобы обновить каталог — правьте ТОЛЬКО этот файл.
 * Каждый партнёр — объект:
 *   name       {string}   Название (не переводится).
 *   logo       {string}   Путь к локальному логотипу. Пусто => плитка с инициалами.
 *   url        {string}   Внешняя ссылка на сайт партнёра.
 *   badges     {string[]} Бейджи, напр. ["AUTO"].
 *   status     {string}   "active" (действующий) | "potential" (потенциальный).
 *   currencies {string[]} Поддерживаемые валюты (опционально).
 */
window.PARTNERS = [
  {
    name: "MINE.exchange",
    logo: "assets/logos/mine.svg",
    url: "https://mine.exchange/",
    badges: ["AUTO"],
    status: "active",
    currencies: ["BTC", "USDT"]
  },
  {
    name: "UNIOCHANGE",
    logo: "assets/logos/uniochange.png",
    url: "https://uniochange.com/",
    badges: ["AUTO"],
    status: "active",
    currencies: ["BTC", "USDT"]
  },
  {
    name: "Hybrid Digital Exchanger",
    logo: "assets/logos/hd-change.svg",
    url: "https://hd-change.com/",
    badges: ["AUTO"],
    status: "active",
    currencies: ["BTC", "USDT"]
  },
  {
    name: "TOP EXCHANGE",
    logo: "assets/logos/top-exchange.svg",
    url: "https://top-exchange.com/",
    badges: ["AUTO"],
    status: "active",
    currencies: ["BTC", "USDT"]
  },
  {
    name: "IN ONE GO",
    logo: "assets/logos/in1go.png",
    url: "https://in1go.cc/",
    badges: ["AUTO"],
    status: "active",
    currencies: ["BTC", "USDT"]
  },
  {
    name: "Abcobmen",
    logo: "assets/logos/abcobmen.svg",
    url: "https://abcobmen.net/",
    badges: ["AUTO"],
    status: "active",
    currencies: ["BTC", "USDT"]
  },
  {
    name: "WMExchange24",
    logo: "assets/logos/wmexchange24.png",
    url: "https://wmexchange24.com/",
    badges: ["AUTO"],
    status: "active",
    currencies: ["BTC", "USDT"]
  },
  {
    name: "MULTIVAL exchange",
    logo: "", // логотип не спарсился (SPA, инлайн-SVG) — fallback на плитку с инициалами; см. assets/logos/README.md

    url: "https://multival.is/en/",
    badges: ["AUTO"],
    status: "active",
    currencies: ["BTC", "USDT"]
  },
  {
    name: "BITKIT.MONEY",
    logo: "assets/logos/bitkit.svg",
    url: "https://bitkit.money/",
    badges: ["AUTO"],
    status: "active",
    currencies: ["BTC", "USDT"]
  }
];
