# HANDOFF — MoneyGo Partners

Документ для быстрого входа в проект (в т.ч. для новой сессии Claude на другом компьютере).
Пиши/правь по-русски, код и команды — как есть.

---

## 1. Что за проект

**MoneyGo Partners** — независимый партнёрский каталог проверенных обменников, которые помогают
**купить и продать цифровую валюту MoneyGo** за криптовалюту. Раньше список обменников жил на самом
MoneyGo; после редизайна страницу убрали — этот сайт закрывает ту же потребность.

Это **одностраничный лендинг** (секции с якорями): hero → ценность → каталог партнёров → как купить/продать →
форма «стать партнёром» → FAQ → footer.

- **Прод (основной домен):** https://money-go-partners.com/
- **Прод (GitHub Pages напрямую):** https://frozzen2012-ctrl.github.io/moneygo-partners/ (редиректит на домен)
- **Репозиторий:** https://github.com/frozzen2012-ctrl/moneygo-partners (ветка `main`)
- **Локально:** `D:\Проекты\moneygo-partners` (НЕ часть проекта EvaTech, хотя исторически запускался из его воркспейса)

---

## 2. Стек и архитектура

**Чистый статический сайт: HTML + CSS + JS. Без фреймворков, без сборщиков, без npm, без бэкенда.**
Открывается простым открытием `index.html`. Никакого build-шага нет.

```
index.html            — вся разметка (одна страница). Внизу подключение скриптов и beacon аналитики.
css/styles.css         — все стили. Тёмная тема, mobile-first, секции пронумерованы в комментариях.
js/main.js             — вся логика (IIFE, vanilla): i18n, рендер каталога, поиск/фильтр,
                         мобильное меню, sticky-header, reveal-анимации, форма, аналитика.
data/partners.js       — МАССИВ ПАРТНЁРОВ (window.PARTNERS). Правишь каталог — правишь только этот файл.
data/i18n.js           — ВСЕ ТЕКСТЫ RU+EN (window.I18N). Подстановка по атрибуту data-i18n.
assets/favicon.svg     — иконка (наш бренд-знак: градиентный squircle со стрелками обмена).
assets/og-image.svg    — превью для соцсетей (Open Graph).
assets/moneygo-icon.png— официальный логотип MoneyGo (с money-go.com), используется в hero.
assets/logos/          — логотипы партнёров (+ README с таблицей имён файлов).
CNAME                  — кастомный домен (money-go-partners.com). НЕ УДАЛЯТЬ.
.nojekyll              — отключает Jekyll на Pages, чтобы не ломались пути. НЕ УДАЛЯТЬ.
```

**Как это работает (важные принципы):**
- Порядок подключения скриптов в `index.html` критичен: **`data/i18n.js` → `data/partners.js` → `js/main.js`**
  (данные должны быть в `window.*` до того, как `main.js` их читает).
- Тексты не хардкодятся в разметке как истина — элементы помечены `data-i18n="ключ"`, а значения берутся
  из `window.I18N[lang]`. Для атрибутов — `data-i18n-attr` (например `placeholder`, `content`).
- Карточки партнёров рендерятся из `window.PARTNERS` в `renderPartners()`; вся карточка — внешняя ссылка
  `target="_blank" rel="noopener noreferrer"`.
- Язык по умолчанию RU, выбор сохраняется в `localStorage` (ключ `mgp_lang`).

---

## 3. Как запустить локально

**Зависимостей нет.** Node/npm НЕ нужны.

Самый простой способ — открыть `index.html` в браузере. Но из-за относительных путей и `fetch` лучше поднять
локальный статик-сервер (любой):

```bash
# вариант 1: Python (если установлен)
cd D:\Проекты\moneygo-partners
python -m http.server 8753
# открыть http://localhost:8753

# вариант 2: Node (если установлен)
npx serve .

# вариант 3: расширение Live Server в VS Code
```

**Проверка событий аналитики локально:** открыть с параметром `?analyticsDebug`
(например `http://localhost:8753/?analyticsDebug`) — клики/отправки будут логироваться в консоль как
`[analytics] <event> {...}`.

---

## 4. Как задеплоить

Хостинг — **GitHub Pages из ветки `main`, корень `/`**. Деплой автоматический: **push в `main` → Pages
пересобирается** (обычно < 1 мин). Никаких action-воркфлоу нет, сборки нет — отдаётся как есть.

```bash
cd D:\Проекты\moneygo-partners
git add -A
git commit -m "..."
git push origin main
```

Проверить статус сборки / открыть прод:
```bash
gh api repos/frozzen2012-ctrl/moneygo-partners/pages/builds/latest --jq '.status'   # ждать "built"
curl -sI https://money-go-partners.com/ | head -1                                    # ждать HTTP 200
```

⚠️ **Если `git push` отдаёт 403** (Windows кэширует устаревшие креды в Credential Manager) — пушь с токеном из gh:
```bash
git push "https://x-access-token:$(gh auth token)@github.com/frozzen2012-ctrl/moneygo-partners.git" main
```
Долгое решение: почистить запись `github.com` в «Диспетчере учётных данных» Windows / `git credential-manager erase`.

---

## 5. Секреты и доступы

**В репозитории секретов нет, и быть не должно** (`.gitignore` исключает `.env`, IDE-мусор и т.п.).

| Что | Где лежит | В git? |
|---|---|---|
| **GITHUB_TOKEN** (push, создание репо, включение Pages) | у пользователя / `gh auth` (keyring), аккаунт `frozzen2012-ctrl` | ❌ нет |
| **Cloudflare Web Analytics token** | вшит в `index.html` (`CF_TOKEN`) | ✅ да — и это нормально |
| **Formspree endpoint** | пока ПЛЕЙСХОЛДЕР `<FORMSPREE_ENDPOINT>` в `index.html` | ✅ (плейсхолдер) |
| **Доступ к DNS/прокси домена** | Cloudflare-дашборд (на стороне DevOps, контакт в TG: Sergii Nosko) | ❌ нет |

Примечание: токен Cloudflare Web Analytics — это **публичный клиентский** идентификатор beacon'а, а не секрет;
его нормально держать в коде. Никаких приватных ключей в этом проекте нет (бэкенда нет).

---

## 6. ⚠️ Критичное и подводные камни (не ломать!)

1. **Репозиторий должен оставаться PUBLIC.** На бесплатном плане GitHub Pages приватный репозиторий не
   публикуется (изначально репо был private — переключали в public).
2. **`CNAME` не удалять и не менять** (`money-go-partners.com`) — иначе слетит кастомный домен.
3. **`.nojekyll` не удалять** — иначе Jekyll может поломать пути/файлы.
4. **Домен проксируется через Cloudflare** (A-записи указывают на Cloudflare, не на IP GitHub).
   - Поэтому в настройках Pages **«Enforce HTTPS» = off** и останется off — это ОЖИДАЕМО. HTTPS обеспечивает
     Cloudflare своим сертификатом, не GitHub.
   - В Cloudflare режим **SSL/TLS должен быть Full** (не Flexible), иначе возможен redirect loop.
5. **Порядок `<script>` в `index.html`** (i18n → partners → main) менять нельзя — сломается рендер.
6. **CSS-правило `.mobile-nav[hidden] { display: none; }`** не удалять: без него мобильное меню всегда
   раскрыто (атрибут `hidden` перебивается базовым `display:flex`). Это уже один раз чинили.
7. **Флаги валют — инлайновые SVG** (`FLAGS` в `main.js`), а НЕ emoji: emoji-флаги не рендерятся на Windows.
8. **У трёх верхних партнёров `url` ведёт на ПРЯМОЙ обмен** (`/exchange-usdttrc20-to-mngusd...`), а не на
   главную. Не «чинить» обратно на homepage:
   - Hybrid Digital → `https://hd-change.com/exchange-usdttrc20-to-mngusd/`
   - TOP EXCHANGE → `https://top-exchange.com/exchange-usdttrc20-to-mngusd/`
   - IN ONE GO → `https://in1go.cc/exchange-usdttrc20-to-mngusd1_2_3_4_5_6_7_8_9/`
9. **Логотипы партнёров** — их товарные знаки, используются только для обозначения партнёрства. Если партнёр
   попросит убрать лого — очистить поле `logo` (карточка покажет плитку с инициалами).

---

## 7. Ключевые фичи и решения

- **Двуязычность RU/EN** без перезагрузки, через `data-i18n` + `window.I18N`, выбор в `localStorage`.
- **Каталог из данных:** добавить/изменить партнёра = правка одного `data/partners.js`. Поля:
  `name, logo, url, badges, status, currencies`. Порядок в массиве = порядок на странице.
- **Top Rated:** первые 3 партнёра помечены бейджем `"Top Rated"` (золотая звезда) и стоят сверху;
  остальные — без бейджей. Фильтр в каталоге: **Все / Top Rated**. Есть клиентский поиск по названию/валютам.
- **Валюты — круглые иконки + флаг для фиата.** Метаданные в `CURRENCY_META` (`main.js`):
  поддержаны `USDT, THB, RUB, KZT, Volet`. Новую валюту с иконкой/флагом добавлять туда же (+ при фиате — в `FLAGS`).
- **Hero:** официальный логотип MoneyGo (`assets/moneygo-icon.png`) рядом с заголовком.
- **Форма «стать партнёром»:** отправка на **ps@in1go.cc**. Сейчас работает через `mailto`-фолбэк, т.к.
  Formspree-endpoint ещё не вставлен (плейсхолдер `<FORMSPREE_ENDPOINT>`). Кнопки «написать на почту» в UI нет.
- **Аналитика:** Cloudflare Web Analytics (просмотры, cookieless, без баннера) — beacon в конце `index.html`,
  активируется при заданном `CF_TOKEN` (уже задан). Плюс **кастомные события** — вендоронезависимый слой
  `track()` в `main.js`, события уходят в **Cloudflare Zaraz** (`zaraz.track`) и/или **gtag/dataLayer** (если
  подключат GA4); иначе тихий no-op. События: `partner_click` (с `partner`, `direct`, `currencies`),
  `cta_click`, `nav_click`, `partner_form_submit`, `lang_switch`.
- **Доступность/SEO/перф:** семантический HTML, aria, контраст, `prefers-reduced-motion`, canonical/OG на
  домен, lazy-load логотипов, инлайновые SVG-иконки, никаких тяжёлых библиотек.

---

## 8. Текущий статус и что дальше

**Статус: задеплоено и работает.** Сайт открывается на https://money-go-partners.com/ (200, HTTPS через
Cloudflare). Базовая аналитика собирает просмотры. Код кастомных событий готов и проверен.

**Открытые TODO (на стороне пользователя/DevOps):**
1. **Formspree:** зарегистрировать форму на formspree.io с получателем **ps@in1go.cc**, вставить endpoint
   (`https://formspree.io/f/xxxx`) в `index.html` вместо `<FORMSPREE_ENDPOINT>`. До этого форма шлёт через `mailto`.
2. **Кастомные события — включить приёмник:** просмотры уже видны в Cloudflare Web Analytics, но события
   `partner_click` и т.д. видны только после включения **Cloudflare Zaraz** (бесплатно, тот же дашборд) и
   добавления инструмента-приёмника. Либо подключить GA4 (тогда нужен cookie-баннер).
3. (Опц.) поддомен `www.money-go-partners.com` — нужна CNAME-запись в DNS на стороне DevOps.
4. (Опц.) логотипы партнёров в каталоге можно заменять на более «фирменные» по запросу.

---

## 9. Где ещё контекст

- **Авто-память Claude (вне репо):** файл проекта в
  `C:\Users\Dmitry\.claude\projects\D----------EvaTech-with-Claude-Eva-Technology\memory\moneygo-partners-project.md`
  (+ индекс `MEMORY.md`). Там зафиксированы назначение, расположение и предостережение «не путать с EvaTech».
  ⚠️ Память — снимок во времени и может отставать от кода; этот HANDOFF и `git log` — более свежий источник.
- **`git log`** — вся история решений по коммитам (реорг партнёров, прямые ссылки, домен, аналитика и т.д.).
- **`README.md`** — пользовательская инструкция (как обновлять каталог/тексты, форма, деплой).
- **`assets/logos/README.md`** — таблица имён файлов логотипов и фолбэк.
- **Контакт по домену/DNS/Cloudflare:** DevOps Sergii Nosko (Telegram).
