/**
 * Переводы интерфейса и контента.
 *
 * JS подставляет значения по атрибуту data-i18n="<ключ>".
 * Для атрибутов используются data-i18n-attr (placeholder, aria-label, content и т.п.):
 *   <input data-i18n="form_name_ph" data-i18n-attr="placeholder">
 * Названия партнёров НЕ переводятся.
 */
window.I18N = {
  ru: {
    // <head> / SEO
    page_title: "MoneyGo Partners — проверенные обменники для покупки и продажи MoneyGo",
    meta_description: "MoneyGo Partners — независимый каталог проверенных партнёров-обменников, где можно купить и продать цифровую валюту MoneyGo за криптовалюту.",

    // Навигация
    nav_partners: "Партнёры",
    nav_how: "Как это работает",
    nav_become: "Стать партнёром",
    nav_faq: "FAQ",
    lang_label: "Сменить язык",

    // Hero
    hero_badge: "Независимый каталог проверенных обменников MoneyGo",
    hero_coin_label: "Цифровая валюта MoneyGo",
    hero_title: "Покупайте и продавайте MoneyGo через проверенных партнёров",
    hero_sub: "MoneyGo Partners собирает обменники, которые помогают купить и продать цифровую валюту MoneyGo за криптовалюту. Один удобный каталог вместо поиска вслепую — выбирайте партнёра и переходите напрямую на его сайт.",
    hero_cta_primary: "Смотреть партнёров",
    hero_cta_secondary: "Стать партнёром",
    hero_stat_partners: "проверенных партнёров",
    hero_stat_auto: "автоматический обмен",
    hero_stat_independent: "независимый ресурс",

    // Доверие / ценность
    trust_title: "Почему этот каталог",
    trust_sub: "Раньше список обменников жил на самом MoneyGo. После редизайна страницу убрали — а потребность покупать и продавать валюту осталась. Мы собрали партнёров в одном месте.",
    value_1_title: "Проверенные партнёры",
    value_1_text: "В каталоге — обменники со статусом действующих или потенциальных партнёров MoneyGo, а не случайные ссылки из поиска.",
    value_2_title: "Прямые ссылки",
    value_2_text: "Каждая карточка ведёт напрямую на сайт партнёра. Мы ничего не проводим через себя и не держим ваши средства.",
    value_3_title: "Автоматический обмен",
    value_3_text: "Партнёры с бейджем AUTO обрабатывают заявки автоматически — быстрее покупка и продажа без ручного согласования.",
    value_4_title: "Прозрачность",
    value_4_text: "Это независимый ресурс. Мы не даём финансовых советов — всегда проверяйте условия партнёра перед обменом.",

    // Партнёры
    partners_title: "Партнёры-обменники",
    partners_note: "Список включает партнёров MoneyGo со статусом действующих или потенциальных.",
    partners_search_ph: "Поиск по названию или бейджу…",
    partners_filter_all: "Все",
    partners_filter_top: "Top Rated",
    partners_empty: "Ничего не найдено. Попробуйте изменить запрос.",
    partners_open: "Открыть сайт",
    status_active: "Действующий",
    status_potential: "Потенциальный",
    card_external_hint: "Откроется на сайте партнёра",

    // Как это работает
    how_title: "Как купить или продать MoneyGo",
    how_sub: "Три простых шага. Сам обмен происходит на стороне выбранного партнёра.",
    step_1_title: "Выберите партнёра",
    step_1_text: "Откройте каталог и выберите обменник. Обращайте внимание на бейджи, поддерживаемые валюты и статус.",
    step_2_title: "Перейдите на сайт",
    step_2_text: "Нажмите на карточку — откроется сайт партнёра в новой вкладке. Все операции проходят там.",
    step_3_title: "Совершите обмен",
    step_3_text: "Укажите направление (покупка или продажа MoneyGo), сумму и реквизиты. Следуйте инструкциям партнёра.",

    // Стать партнёром
    become_title: "Станьте партнёром MoneyGo Partners",
    become_sub: "Вы обменник и работаете с MoneyGo? Добавьтесь в каталог и получайте целевой трафик пользователей, которые ищут, где купить и продать валюту.",
    become_benefit_1: "Целевая аудитория, готовая к обмену",
    become_benefit_2: "Прямая ссылка на ваш сайт без посредников",
    become_benefit_3: "Бейджи AUTO и поддерживаемых валют на карточке",
    form_name: "Ваше имя",
    form_name_ph: "Как к вам обращаться",
    form_exchange: "Название обменника",
    form_exchange_ph: "Например, MINE.exchange",
    form_site: "Сайт",
    form_site_ph: "https://…",
    form_contact: "Контакт",
    form_contact_ph: "Email или Telegram",
    form_message: "Сообщение",
    form_message_ph: "Коротко о вашем обменнике и условиях",
    form_submit: "Отправить заявку",
    form_sending: "Отправляем…",
    form_success: "Заявка отправлена! Мы свяжемся с вами.",
    form_error: "Не удалось отправить. Напишите нам напрямую:",
    form_fallback: "Написать на почту",
    form_required: "Заполните обязательные поля.",

    // FAQ
    faq_title: "Частые вопросы",
    faq_q1: "Что такое MoneyGo?",
    faq_a1: "MoneyGo — цифровая валюта. Купить и продать её можно через партнёров-обменников, собранных в этом каталоге.",
    faq_q2: "Это официальный сайт MoneyGo?",
    faq_a2: "Нет. MoneyGo Partners — независимый партнёрский ресурс. Мы лишь собираем проверенных партнёров и ссылки на них.",
    faq_q3: "Вы берёте комиссию или держите мои средства?",
    faq_a3: "Нет. Мы не проводим операции и не храним средства. Обмен полностью происходит на стороне выбранного партнёра.",
    faq_q4: "Как выбрать надёжного партнёра?",
    faq_a4: "Смотрите на статус и бейджи в карточке, изучите сайт партнёра, его условия, резервы и отзывы. Решение всегда за вами.",
    faq_q5: "Чем отличается «действующий» от «потенциального»?",
    faq_a5: "«Действующий» — партнёр уже работает с MoneyGo. «Потенциальный» — обменник, который планирует или может поддерживать MoneyGo.",
    faq_q6: "Что означает бейдж AUTO?",
    faq_a6: "AUTO значит, что партнёр обрабатывает обмен автоматически, без ручного подтверждения каждой заявки.",

    // Footer
    footer_tagline: "Независимый каталог проверенных партнёров MoneyGo.",
    footer_disclaimer: "MoneyGo Partners — независимый партнёрский ресурс и не является официальным сайтом MoneyGo. Информация на сайте не является финансовой рекомендацией. Все операции вы совершаете на свой риск — самостоятельно проверяйте условия и надёжность партнёров перед обменом.",
    footer_nav_title: "Разделы",
    footer_rights: "Все права защищены.",
    footer_independent: "Не связан с MoneyGo официально."
  },

  en: {
    // <head> / SEO
    page_title: "MoneyGo Partners — trusted exchangers to buy and sell MoneyGo",
    meta_description: "MoneyGo Partners is an independent directory of trusted exchange partners where you can buy and sell the MoneyGo digital currency for crypto.",

    // Navigation
    nav_partners: "Partners",
    nav_how: "How it works",
    nav_become: "Become a partner",
    nav_faq: "FAQ",
    lang_label: "Switch language",

    // Hero
    hero_badge: "Independent directory of trusted MoneyGo exchangers",
    hero_coin_label: "MoneyGo digital currency",
    hero_title: "Buy and sell MoneyGo through trusted partners",
    hero_sub: "MoneyGo Partners curates exchangers that help you buy and sell the MoneyGo digital currency for crypto. One convenient directory instead of searching blind — pick a partner and go straight to their site.",
    hero_cta_primary: "View partners",
    hero_cta_secondary: "Become a partner",
    hero_stat_partners: "trusted partners",
    hero_stat_auto: "automatic exchange",
    hero_stat_independent: "independent resource",

    // Trust / value
    trust_title: "Why this directory",
    trust_sub: "The exchanger list used to live on MoneyGo itself. The redesign removed that page — but the need to buy and sell the currency stayed. We gathered the partners in one place.",
    value_1_title: "Trusted partners",
    value_1_text: "The directory lists exchangers that are active or potential MoneyGo partners — not random links from a search engine.",
    value_2_title: "Direct links",
    value_2_text: "Every card links straight to the partner's website. We don't route anything through us and never hold your funds.",
    value_3_title: "Automatic exchange",
    value_3_text: "Partners with the AUTO badge process requests automatically — faster buying and selling with no manual approval.",
    value_4_title: "Transparency",
    value_4_text: "This is an independent resource. We give no financial advice — always check a partner's terms before you exchange.",

    // Partners
    partners_title: "Exchange partners",
    partners_note: "The list includes MoneyGo partners with an active or potential status.",
    partners_search_ph: "Search by name or badge…",
    partners_filter_all: "All",
    partners_filter_top: "Top Rated",
    partners_empty: "Nothing found. Try a different query.",
    partners_open: "Open site",
    status_active: "Active",
    status_potential: "Potential",
    card_external_hint: "Opens on the partner's site",

    // How it works
    how_title: "How to buy or sell MoneyGo",
    how_sub: "Three simple steps. The exchange itself happens on the partner's side.",
    step_1_title: "Pick a partner",
    step_1_text: "Open the directory and choose an exchanger. Check the badges, supported currencies and status.",
    step_2_title: "Go to their site",
    step_2_text: "Click a card — the partner's site opens in a new tab. All operations happen there.",
    step_3_title: "Make the exchange",
    step_3_text: "Choose the direction (buy or sell MoneyGo), the amount and your details. Follow the partner's instructions.",

    // Become a partner
    become_title: "Become a MoneyGo Partner",
    become_sub: "Run an exchanger that works with MoneyGo? Get listed and receive targeted traffic from users looking for where to buy and sell the currency.",
    become_benefit_1: "A targeted audience ready to exchange",
    become_benefit_2: "A direct link to your site, no middlemen",
    become_benefit_3: "AUTO and supported-currency badges on your card",
    form_name: "Your name",
    form_name_ph: "How should we call you",
    form_exchange: "Exchanger name",
    form_exchange_ph: "e.g. MINE.exchange",
    form_site: "Website",
    form_site_ph: "https://…",
    form_contact: "Contact",
    form_contact_ph: "Email or Telegram",
    form_message: "Message",
    form_message_ph: "A few words about your exchanger and terms",
    form_submit: "Send request",
    form_sending: "Sending…",
    form_success: "Request sent! We'll get back to you.",
    form_error: "Couldn't send. Write to us directly:",
    form_fallback: "Email us",
    form_required: "Please fill in the required fields.",

    // FAQ
    faq_title: "Frequently asked questions",
    faq_q1: "What is MoneyGo?",
    faq_a1: "MoneyGo is a digital currency. You can buy and sell it through the exchange partners gathered in this directory.",
    faq_q2: "Is this the official MoneyGo site?",
    faq_a2: "No. MoneyGo Partners is an independent partner resource. We only collect trusted partners and links to them.",
    faq_q3: "Do you take a fee or hold my funds?",
    faq_a3: "No. We don't process operations and don't store funds. The exchange happens entirely on the chosen partner's side.",
    faq_q4: "How do I choose a reliable partner?",
    faq_a4: "Check the status and badges on the card, review the partner's site, terms, reserves and reviews. The decision is always yours.",
    faq_q5: "What's the difference between “active” and “potential”?",
    faq_a5: "“Active” means the partner already works with MoneyGo. “Potential” is an exchanger that plans to or may support MoneyGo.",
    faq_q6: "What does the AUTO badge mean?",
    faq_a6: "AUTO means the partner processes the exchange automatically, without manually confirming each request.",

    // Footer
    footer_tagline: "An independent directory of trusted MoneyGo partners.",
    footer_disclaimer: "MoneyGo Partners is an independent partner resource and is not the official MoneyGo website. Nothing here is financial advice. You make every exchange at your own risk — check each partner's terms and reliability yourself before you trade.",
    footer_nav_title: "Sections",
    footer_rights: "All rights reserved.",
    footer_independent: "Not officially affiliated with MoneyGo."
  }
};
