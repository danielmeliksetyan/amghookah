/* ==========================================================================
   AMG HOOKAH CATERING - RUSSIAN
   ==========================================================================
   Keyed by the English source string exactly as it is authored, because that
   is what i18n.js reads off the DOM. Whitespace is collapsed before lookup, so
   line breaks in a key do not matter; punctuation does - the copy uses curly
   apostrophes (’) and em dashes (—), and a straight quote here is a miss.

   A missing key is not an error: the English stays on screen. Run
   AMG_I18N.missing() in the console after a copy change to list what a new
   sentence has orphaned.

   DELIBERATELY NOT TRANSLATED, so do not "finish the job" by adding them:
     - AMG Hookah, @amg_hookah, the phone number and the email placeholder.
     - The Salon / The Terrace / The Estate and the Salon|Terrace|Estate tabs.
       They are product names. They are sold, invoiced and referred to on the
       phone by those names, and a guest who reads "Терраса" here cannot ask
       for it by that name anywhere else.
     - Prices. $650 is $650; only the words around it move.
   ========================================================================== */

window.AMG_LANGS = window.AMG_LANGS || {};
window.AMG_LANGS.ru = {

  head: {
    title: 'AMG Hookah — премиальный кальянный кейтеринг в Лос-Анджелесе',
    description: 'Премиальный кальянный кейтеринг в Лос-Анджелесе для свадеб, частных резиденций, бренд-активаций и мероприятий на крышах. Обслуживание с мастером от $500.'
  },

  /* Slots for the strings the page assembles at runtime. i18n.js fills {n},
     {name}, {price} and friends - see RULES there for which rule feeds which. */
  units: {
    guestOne: 'гость', guestMany: 'гостей',
    hourOne: 'час',    hourMany: 'часов',
    step: 'Шаг {n} из {total} — {label}',
    thanks: 'Спасибо, {name}. Мы подтвердим {date} в течение четырёх часов и пришлём ссылку на депозит.',
    depositNote: '30% от {price}. Остаток — в день обслуживания.',
    depositNoteFrom: '30% от стартовой ставки {price}. Остаток — в день обслуживания.',
    from: 'от {price}',
    family: 'Семейство {n} / {total}',
    selectedIngredient: 'Выбранный ингредиент: {name}'
  },

  // Genitive, because the rail renders them as "5 декабря", never on their own.
  months: ['января','февраля','марта','апреля','мая','июня',
           'июля','августа','сентября','октября','ноября','декабря'],
  days: ['вс','пн','вт','ср','чт','пт','сб'],

  strings: {

    /* ------------------------------------------------------------ chrome */
    /* One word, not "Форматы мероприятий". Two words wrap in the mobile drawer,
       where the links set at 26px in a 268px column on a 320px screen - the
       wrapped line cost 30px and was the whole of Russian's overflow there. */
    'Event types': 'Мероприятия',
    'Packages': 'Пакеты',
    'Pricing': 'Цены',
    'How it works': 'Как это работает',
    'Flavors': 'Вкусы',
    'FAQ': 'Вопросы',
    /* The nav pill ONLY - every other CTA on the page is its own key and keeps
       the full verb ("Забронировать дату", "Забронировать The Salon").
       "Забронировать" here made the pill 172px against English's 120, and at a
       900px viewport that left exactly 0px between the centred nav links and
       the pill. "Бронь" is 107px and gives the rail 65px back. */
    'Reserve': 'Бронь',
    'Open menu': 'Открыть меню',
    'Close menu': 'Закрыть меню',
    'Language': 'Язык',
    'AMG Hookah, back to top': 'AMG Hookah, наверх',
    'Los Angeles County. Ventura and Orange County by arrangement. 21+ only.':
      'Округ Лос-Анджелес. Вентура и округ Ориндж — по договорённости. Только 21+.',

    /* -------------------------------------------------------------- hero */
    'Premium hookah catering': 'Премиальный кальянный кейтеринг',
    'We set the mood.': 'Мы создаём атмосферу.',
    'You live the moment.': 'Вы проживаете момент.',
    'Discreet, fully staffed hookah service for weddings, private estates and brand events across Los Angeles.':
      'Деликатный кальянный сервис с полным штатом для свадеб, частных резиденций и бренд-мероприятий по всему Лос-Анджелесу.',
    'Reserve a date': 'Забронировать дату',
    'See packages': 'Смотреть пакеты',
    'Estimate & Book': 'Расчёт и бронирование',
    'Catering Rates': 'Тарифы кейтеринга',
    'Live Estimated Rate': 'Ориентировочная стоимость',
    'Call Now': 'Позвонить',
    'Hero': 'Первый экран',
    'Guest exhaling shisha smoke, lit from behind': 'Гость выдыхает кальянный дым в контровом свете',
    'Scroll to what we cater': 'Прокрутить к разделу «Что мы обслуживаем»',

    /* ------------------------------------------------------- credentials */
    'Credentials': 'Показатели',
    'House blends, ten families': 'Фирменных миксов, десять семейств',
    '4 hr': '4 ч',
    'Planner response time': 'Время ответа организатору',
    '30 min': '30 мин',
    'Setup, start to finish': 'Монтаж, от начала до конца',
    'All of LA': 'Весь Лос-Анджелес',
    'County-wide coverage': 'Покрытие по всему округу',

    /* ------------------------------------------------------- event types */
    'What we cater': 'Что мы обслуживаем',
    'Designed for extraordinary occasions.': 'Создано для особенных событий.',
    'Four settings we work in every week. Find the one closest to yours — each lists how we load in, who staffs it, and what your venue will ask us for.':
      'Четыре формата, в которых мы работаем каждую неделю. Найдите ближайший к вашему — в каждом описано, как мы заезжаем, кто работает на площадке и что попросит у нас ваша площадка.',

    'Estate soirées': 'Приёмы в резиденциях',
    'Private Estate Soirées & Villa Lounges': 'Частные приёмы в резиденциях и лаунджи на виллах',
    'Discreet luxury shisha tailored for milestone celebrations and private lawn dinners.':
      'Деликатный премиальный кальян для больших торжеств и приватных ужинов на лужайке.',
    'Setup protocol': 'Протокол монтажа',
    '30-min silent load-in': 'Бесшумный заезд за 30 минут',
    'Attendants': 'Мастера',
    'Uniformed, there throughout': 'В форме, на протяжении всего мероприятия',
    'Air & ash care': 'Воздух и пепел',
    'Zero ash, zero smoke haze': 'Ноль пепла, ноль дымовой завесы',
    'Coals': 'Угли',
    'Natural coconut charcoal': 'Натуральный кокосовый уголь',
    'Designed to blend into high-end estate architecture. We handle everything from charcoal prep to final breakdown with zero trace left behind.':
      'Спроектировано так, чтобы вписаться в архитектуру премиальной резиденции. Мы берём на себя всё — от розжига углей до финальной разборки, не оставляя ни следа.',
    'Typically': 'Обычно',
    '; past 90 guests,': '; свыше 90 гостей —',
    'Reserve an estate date': 'Забронировать дату в резиденции',
    'Villa terrace at dusk with a sunken lounge, pool and lantern light':
      'Терраса виллы в сумерках с утопленным лаунджем, бассейном и светом фонарей',

    'Black-tie weddings': 'Свадьбы в формате black-tie',
    'Black-Tie Wedding Receptions & Galas': 'Свадебные приёмы и гала-вечера в формате black-tie',
    'Opulent late-night lounges that stay in step with your planner’s run-of-show.':
      'Роскошные ночные лаунджи, идущие точно в ритме тайминга вашего организатора.',
    'Coordination': 'Координация',
    'Direct planner sync': 'Прямая связь с организатором',
    'Aesthetic': 'Эстетика',
    'Glass & brass stations': 'Станции из стекла и латуни',
    'Flavor list': 'Список вкусов',
    'Agreed before the date': 'Согласован до даты',
    'Camera discretion': 'Деликатность в кадре',
    '100% out-of-frame service': '100% работа вне кадра',
    'Add a lounge zone to your reception. Our attendants keep the coals glowing and the stations pristine without interrupting formal speeches or photography.':
      'Добавьте лаунж-зону к вашему приёму. Наши мастера поддерживают угли и безупречный вид станций, не прерывая ни речей, ни съёмки.',
    ', our wedding standard.': ' — наш свадебный стандарт.',
    'Reserve a wedding date': 'Забронировать дату свадьбы',
    'Black-tie guests raising their glasses for a toast at a formal dinner':
      'Гости в black-tie поднимают бокалы для тоста на официальном ужине',

    'Brand activations': 'Бренд-активации',
    'Luxury Brand Activations & Launches': 'Премиальные бренд-активации и запуски',
    'Campaign-specific blends, tailored curation and briefed ambassadors.':
      'Миксы под концепцию кампании, индивидуальное оформление и подготовленный персонал.',
    'Customization': 'Кастомизация',
    'Bespoke styling & curation': 'Индивидуальное оформление и курация',
    'Signature blend': 'Фирменный микс',
    'Bespoke campaign flavor': 'Авторский микс под концепцию',
    'Ambassadors': 'Амбассадоры',
    'Staff briefed on talking points': 'Персонал подготовлен к общению',
    'Press discretion': 'Работа с прессой',
    'VIP & celebrity friendly': 'Конфиденциальность для VIP и звёзд',
    'Create a focal point for product launches and media galas, with shisha blends matched to your brand identity and staff who can speak to them.':
      'Создайте выразительный центр внимания для презентаций и медиа-событий с миксами в стилистике бренда и подготовленным персоналом.',
    'Custom fruit builds and campaign-matched flavor curation.':
      'Индивидуальные фруктовые решения и подбор вкусов под концепцию кампании.',
    'Attendant-served catering tailored to your guest count.':
      'Обслуживание мастерами с учётом количества ваших гостей.',
    'Seamless lounge service timed with your run-of-show.':
      'Безупречный лаунж-сервис, синхронизированный с таймингом мероприятия.',

    /* ----------------------------------------------------------- gallery */
    'Gallery': 'Галерея',
    'Artisanal Gallery': 'Авторская галерея',
    'Unique Fruit Hookahs.': 'Уникальные фруктовые кальяны.',
    'Explore our master-carved fruit heads and custom sculptural builds crafted entirely from fresh fruits, melons, berries, and botanicals.':
      'Оцените наши авторские фруктовые чаши и уникальные скульптурные кальяны, созданные вручную из свежих фруктов, арбузов, ягод и плодов.',
    'Fully Fruit Hookah · $500': 'Полностью фруктовый кальян · $500',
    'Fresh Fruit Bowl · +$100': 'Фруктовая чаша · +$100',

    'Pineapple & Lime Arch': 'Ананасово-лаймовая арка',
    'Horizontal whole pineapple base with four precision-stacked fresh limes forming dual pillars, crowned with a carved mini golden pineapple head.':
      'Основа из цельного ананаса с четырьмя свежими лаймами в виде опорных колонн и резной чашей из мини-ананаса.',
    'Private Estates & Parties': 'Частные резиденции и вечеринки',
    'Architectural Head': 'Архитектурная чаша',

    'Grand Watermelon & Melon Tower': 'Гранд-башня из арбуза и дыни',
    'Masterpiece build with a massive fresh watermelon base, stacked whole pineapples, cantaloupe midsection, and orange head producing dense, chilled draws.':
      'Скульптурный шедевр с массивной базой из цельного арбуза, ярусами из ананасов, дыни канталупа и апельсиновой чашей для плотного прохладного курения.',
    'VIP Lounges & Galas': 'VIP-лаунджи и гала-вечера',
    'Fully Fruit Masterpiece': 'Полностью фруктовый шедевр',

    'Sculptural Totem & Banana Arc': 'Скульптурный тотем с банановыми арками',
    'Bespoke whole watermelon base with outstretched pineapple palm fronds, tiered pineapples, banana arch columns, and a fresh orange crown head.':
      'Авторская композиция из цельного арбуза с пальмовыми листьями ананаса, банановыми арками и чашей из свежего апельсина.',
    'Brand Activations & Shows': 'Бренд-активации и шоу',
    'Sculptural Totem': 'Скульптурный тотем',

    'Watermelon & Forest Berry Cradle': 'Арбузная ладья с лесными ягодами',
    'Hand-carved fresh watermelon cradle brimming with ripe blackberries, wild raspberries, pineapple core, and a carved ruby grapefruit bowl.':
      'Резная арбузная ладья со спелой ежевикой, лесной малиной, сердцевиной ананаса и чашей из рубинового грейпфрута.',
    'Weddings & Milestones': 'Свадьбы и юбилеи',
    'Berry Infusion': 'Ягодная инфузия',

    'Pineapple & Sunburst Orange Throne': 'Ананасово-цитрусовый трон',
    'Horizontal sweet pineapple foundation with pineapple leaves supporting a symmetrical 5-orange citrus arch and heat management system on a luxury wood stem.':
      'Ананасовый постамент с декоративными листьями, симметричной аркой из 5 апельсинов и чашей на деревянной шахте.',
    'Estate Soirées & Lounges': 'Загородные вечера и лаунджи',
    'Citrus Arch': 'Цитрусовая арка',

    'Crystal Glass & Citrus Halo': 'Хрустальное стекло и цитрусовый ореол',
    'Symmetrical 8-citrus circular halo crafted from fresh oranges and grapefruit, mounted on an illuminated all-glass crystal stem for dramatic late-night atmospheres.':
      'Симметричный круговой ореол из 8 цитрусов на стеклянном хрустальном кальяне с подсветкой и эффектным дымом.',
    'Nightlife & Rooftops': 'Вечерние события и крыши',
    'Citrus Halo': 'Цитрусовый ореол',

    'Exceptional centerpiece': 'Эксклюзивный шедевр',
    '$500 per hookah': '$500 за кальян',
    'An extraordinary, museum-grade hookah made almost entirely from fruit': 'Уникальный шедевр, созданный практически полностью из фруктов',
    'Bespoke sculptural construction from fresh watermelon, pineapples & citrus': 'Скульптурная конструкция из свежего арбуза, ананасов и цитрусовых',
    'Completely unique showpiece for VIP tables & luxury celebrations': 'Впечатляющий центр внимания для VIP-столов и торжеств',
    'Pure, vibrant taste and uncompromised smoke volume': 'Чистый, яркий вкус и плотный дым',
    'Crafted on demand by our master artisan': 'Создаётся индивидуально нашим мастером',

    'Host & Venue Requirements': 'Требования к площадке и организатору',
    'Client or venue provides access to clean water and a standard 120V electrical outlet (for lighting natural coals). We handle all equipment, coals, setup, and safe breakdown.':
      'Заказчик или площадка предоставляют доступ к чистой воде и стандартную розетку 120В (для розжига натуральных углей). Мы берём на себя всё оборудование, угли, установку и уборку.',

    'Reserve an activation date': 'Забронировать дату активации',
    'Chandelier-lit gala dinner in a high-rise ballroom above the city':
      'Гала-ужин под люстрами в бальном зале высотки над городом',

    'Rooftops & corporate': 'Крыши и корпоративы',
    'VIP Rooftops & Corporate Salons': 'VIP-крыши и корпоративные салоны',
    'Skyline views paired with palate-cleanser blends and a windproof, low-profile setup.':
      'Панорама города в сочетании с освежающими миксами и ветроустойчивой компактной установкой.',
    'Setup': 'Монтаж',
    '30-min load-in, zero haze': 'Заезд за 30 минут, без дымовой завесы',
    'Charcoal safety': 'Безопасность углей',
    'Windproof coconut coals': 'Ветроустойчивые кокосовые угли',
    'Service': 'Сервис',
    'Dedicated attendant care': 'Внимательное обслуживание мастером',
    'Palate cleanser': 'Освежающие вкусы',
    'Glacier mint & citrus reserves': 'Ледяная мята и цитрусовые резервы',
    'Built for holiday galas, executive retreat dinners and high-level networking, with a four-hour response time for corporate planners.':
      'Создано для праздничных гала-вечеров, выездных ужинов руководства и нетворкинга высокого уровня — с ответом в течение четырёх часов для корпоративных заказчиков.',
    'Low-profile setup with direct venue coordination.': 'Компактная расстановка с прямой координацией площадки.',
    '; multi-space venues,': '; площадки с несколькими зонами —',
    'Reserve a corporate date': 'Забронировать корпоративную дату',
    'Rooftop lounge seating at night above a lit city skyline':
      'Лаунж-зона на крыше ночью над подсвеченной панорамой города',

    /* ---------------------------------------------------------- packages */
    'Transparent Pricing': 'Прозрачные цены',
    'Catering Rates.': 'Цены на кейтеринг.',
    'Simple, transparent pricing tailored to your guest count and event duration. Every booking includes a dedicated attendant, premium blends, natural coconut coals, and complete cleanup.':
      'Простые и прозрачные цены под формат вашего мероприятия. В каждый заказ входят мастер, премиальные миксы, натуральный кокосовый уголь и полная уборка.',

    'Core Offering': 'Основное предложение',
    'Full Service': 'Полный сервис',
    '3 Hookahs · 3 Hours': '3 кальяна · 3 часа',
    'Our signature full-service catering standard. Designed for celebrations, intimate gatherings, and VIP lounges.':
      'Наш фирменный стандарт обслуживания. Создан для торжеств, закрытых вечеров и VIP-лаунджей.',
    '/ 3 hours base': '/ 3 часа базы',
    '+$100 / add\'l hr': '+$100 / доп. час',
    '3 modern high-grade hookah stations · Precision glass & brass':
      '3 современные премиальные станции из стекла и латуни',
    '1 dedicated uniformed attendant · Continuous station care':
      '1 выделенный мастер в форме · непрерывное обслуживание',
    '60 curated artisan blends · Selected from 10 flavor families':
      '60 авторских миксов · из 10 фирменных семейств вкусов',
    '100% natural coconut coals · Electric ignition & refills':
      '100% натуральный кокосовый уголь · чистый розжиг и замена',
    'Full setup & spotless breakdown · Zero residue load-out':
      'Полный монтаж и аккуратная уборка · без следов и остатков',
    'Configure in Price Calculator': 'Рассчитать в калькуляторе',

    'Flavor Enhancement': 'Улучшение вкуса',
    '+$100 upgrade': '+$100 доплата',
    'Fresh Fruit Bowls': 'Чаши из свежих фруктов',
    'Elevate your booking with hand-carved fresh fruit and custom produce bowls (melons, citrus, berries, pineapples, and seasonal selections) for extended sessions and natural aromatics.':
      'Дополните ваш заказ авторскими чашами из любых свежих фруктов, ягод, цитрусовых и сезонных плодов для долгого курения и насыщенного вкуса.',
    'Carved from fresh fruits, berries, citrus & custom produce':
      'Чаши из свежих фруктов, ягод, цитрусовых и любых плодов',
    'Enhanced natural flavor infusion & rich cooling clouds':
      'Насыщенная натуральная вкусопередача и плотный мягкий дым',
    'Applied across all stations for the full event':
      'Применяется для всех станций на протяжении всего мероприятия',

    'Exclusive Centerpiece': 'Эксклюзивный шедевр',
    '$500 / per hookah': '$500 / за кальян',
    'Fully Fruit Hookah': 'Полностью фруктовый кальян',
    'An extraordinary custom showpiece where almost the entire apparatus is sculpted by hand from real fresh fruits, melons, berries, and custom produce.':
      'Уникальный арт-объект, созданный вручную практически полностью из свежих фруктов, арбузов, цитрусовых и ягод.',
    'Sculpted by hand from fresh whole watermelons, fruits & seasonal produce':
      'Создаётся вручную из свежих фруктов, арбузов и ягод',
    'Rare artisanal showstopper for VIP tables & luxury galas':
      'Впечатляющий центр внимания для VIP-столов и статусных событий',
    'Pure natural smoke filtration through fresh fruit juice':
      'Фильтрация дыма через 100% натуральный свежий сок',

    /* -------------------------------------------------- what is included */
    'What is included': 'Что входит в стоимость',
    'Dedicated Attendant': 'Выделенный мастер',
    'A uniformed attendant stays with your stations throughout the event, tending every head and changing coals continuously.':
      'Мастер в форме остаётся у ваших станций на протяжении всего мероприятия, обслуживает каждую чашу и своевременно меняет угли.',
    'Never left unstaffed': 'Никогда без присмотра',
    'Curated Mixology': 'Кураторская миксология',
    'Sixty artisan blends across ten flavor families. Select your preferred flavor profiles prior to the event.':
      'Шестьдесят авторских миксов в десяти семействах вкусов. Выберите желаемые вкусовые профили перед мероприятием.',
    'Tailored to your taste': 'Под ваш вкус',
    'Pure Coconut Coals': 'Чистые кокосовые угли',
    'Only natural coconut charcoal used. Smokeless, odorless, lit cleanly using our electric heating system.':
      'Используется только натуральный кокосовый уголь. Без запаха и гари, чистый розжиг на электроплитах.',
    'Clean burn · Zero chemicals': 'Чистый жар · Без химии',
    'Spotless Breakdown': 'Безупречная уборка',
    'Full breakdown begins right at the agreed end time. Ash and spent coals are safely packed and removed from the venue.':
      'Полная уборка начинается ровно в согласованное время окончания. Пепел и использованные угли аккуратно вывозятся с площадки.',
    'Leaves when we do': 'Уезжает вместе с нами',

    /* ----------------------------------------------------------- process */
    'Four steps, no surprises.': 'Четыре шага, без сюрпризов.',
    'Instant': 'Мгновенный',
    'pricing': 'расчёт',
    'Explore the estimate': 'Ознакомьтесь с расчётом',
    'Use our instant calculator to configure your hookahs, duration, and fruit upgrades with zero commitment.':
      'Используйте наш онлайн-калькулятор, чтобы прикинуть количество кальянов, часы и фруктовые опции без каких-либо обязательств.',
    'Instant rate calculation': 'Мгновенный расчёт стоимости',
    'Explore custom options & flavor families': 'Знакомство с опциями и семействами вкусов',
    'One': 'Один',
    'call': 'созвон',
    'Book & design service': 'Бронирование и согласование',
    'Lock in your date, finalize hookah count, duration, and curated flavors seamlessly in one call or DM.':
      'Закрепите вашу дату, согласуйте количество кальянов, длительность и миксы за один звонок или сообщение в директ.',
    'Availability check & date confirmation': 'Проверка доступности и подтверждение даты',
    'Custom flavor profile & fruit curation': 'Подбор вкусового профиля и фруктовых опций',
    '30': '30',
    'min': 'мин',
    'We arrive early': 'Приезжаем заранее',
    'Discreet load-in, timed with your schedule so we are ready before guests arrive.':
      'Деликатный заезд, согласованный с вашим расписанием, чтобы быть готовыми до прихода гостей.',
    'Thirty minutes from arrival to ready': 'Тридцать минут от приезда до готовности',
    'Host provides water access and a standard power outlet':
      'Организатор предоставляет доступ к воде и стандартную розетку',
    'End': 'Время',
    'time': 'окончания',
    'We leave it clean': 'Убираем за собой',
    'Full breakdown starts the moment the service ends.':
      'Полная разборка начинается сразу после окончания обслуживания.',
    'Ash and spent coals safely packed and removed':
      'Пепел и угли аккуратно упаковываются и вывозятся',
    'Lounge and floors left spotless':
      'Зона лаунжа и полы остаются идеально чистыми',

    /* ----------------------------------------------------------- flavors */
    'Sixty blends, ten families.': 'Шестьдесят миксов, десять семейств.',
    'Turn the dial through our signature artisan collections — taste profiles, cooling levels, and master mixologist pairings.':
      'Поворачивайте диск по нашим авторским коллекциям — вкусовые профили, уровни охлаждения и пары от мастера-миксолога.',
    'Each family features six curated blends. Explore the signature taste profiles, cooling levels, and master mixologist pairings below.':
      'В каждом семействе шесть авторских миксов. Ознакомьтесь с фирменными вкусовыми профилями, уровнями охлаждения и парами от миксолога ниже.',
    'Each family is six blends.': 'В каждом семействе шесть миксов.',
    'brings one family to your event,': 'привозит на ваше мероприятие одно семейство,',
    'two, and': '— два, а',
    'as many as you like plus a signature blend developed for you. Attach a family below and it travels with your reservation.':
      '— сколько угодно плюс фирменный микс, созданный для вас. Прикрепите семейство ниже — и оно поедет вместе с вашей бронью.',

    // Ember Dial furniture
    'Flavor family': 'Семейство вкусов',
    'Scroll to turn': 'Прокрутите, чтобы повернуть',
    'or choose a family': 'или выберите семейство',
    'Sweetness': 'Сладость',
    'Cooling': 'Охлаждение',
    'Aroma': 'Аромат',
    'Reserve this flavor menu': 'Забронировать это меню вкусов',
    'The six blends': 'Шесть миксов',
    'SOMMELIER SIGNATURE SELECTION': 'ФИРМЕННЫЙ ВЫБОР СОМЕЛЬЕ',
    // Ring labels: one word each, because the ring seat is 112px wide.
    'Orchard': 'Сад', 'Floral': 'Цветы', 'Citrus': 'Цитрус', 'Mint': 'Мята',
    'Spiced': 'Специи', 'Dessert': 'Десерт', 'Tropical': 'Тропики',
    'Tea': 'Чай', 'Cream': 'Сливки', 'Berry': 'Ягоды',
    'Vanilla & Cream': 'Ваниль и сливки',
    'Tea & Herbal': 'Чай и травы',

    // Family eyebrows. Authored in caps and rendered in caps.
    'FRUIT & ORCHARD ESSENCE': 'ФРУКТОВО-САДОВАЯ ЭССЕНЦИЯ',
    'BOTANICAL BLOSSOM ESSENCE': 'БОТАНИЧЕСКАЯ ЦВЕТОЧНАЯ ЭССЕНЦИЯ',
    'ZESTY CITRUS ESSENCE': 'ЯРКАЯ ЦИТРУСОВАЯ ЭССЕНЦИЯ',
    'SUB-ZERO MINT & FROST ESSENCE': 'ЛЕДЯНАЯ МЯТНО-МОРОЗНАЯ ЭССЕНЦИЯ',
    'EXOTIC SPICE & RESIN ESSENCE': 'ЭКЗОТИЧЕСКАЯ ПРЯНО-СМОЛЯНАЯ ЭССЕНЦИЯ',
    'ARTISANAL CONFECTION ESSENCE': 'АВТОРСКАЯ КОНДИТЕРСКАЯ ЭССЕНЦИЯ',
    'POLYNESIAN TROPICAL ESSENCE': 'ПОЛИНЕЗИЙСКАЯ ТРОПИЧЕСКАЯ ЭССЕНЦИЯ',
    'IMPERIAL TEA & BOTANICAL ESSENCE': 'ИМПЕРСКАЯ ЧАЙНО-БОТАНИЧЕСКАЯ ЭССЕНЦИЯ',
    'VELVET CREAM & VANILLA ESSENCE': 'БАРХАТНАЯ СЛИВОЧНО-ВАНИЛЬНАЯ ЭССЕНЦИЯ',
    'FOREST WILD BERRY ESSENCE': 'ЛЕСНАЯ ЯГОДНАЯ ЭССЕНЦИЯ',

    // Family titles and taglines
    'Orchard Fruit Reserve': 'Садовый фруктовый резерв',
    'Sun-ripened orchard fruits with lush nectar notes & velvet finish.':
      'Спелые садовые фрукты с сочными нектарными нотами и бархатным финишем.',
    'Floral Garden Reserve': 'Цветочный садовый резерв',
    'Delicate blossom aromatics paired with natural wild honey.':
      'Тонкая цветочная ароматика в паре с натуральным диким мёдом.',
    'Citrus Zest Reserve': 'Цитрусовый резерв',
    'Vibrant Mediterranean citrus with crisp, effervescent brightness.':
      'Живые средиземноморские цитрусы с хрустящей игристой яркостью.',
    'Glacier Mint Reserve': 'Ледниковый мятный резерв',
    'Ultra-clean cooling leaves for an icy, invigorating draw.':
      'Предельно чистые охлаждающие листья для ледяной, бодрящей затяжки.',
    'Spiced & Exotic Reserve': 'Пряный экзотический резерв',
    'Warm Orient spices, roasted cardamoms & rare amber resins.':
      'Тёплые восточные специи, обжаренный кардамон и редкие янтарные смолы.',
    'Artisanal Dessert Reserve': 'Авторский десертный резерв',
    'Indulgent gourmet confections, toasted nuts & Madagascar vanilla.':
      'Изысканные кондитерские вкусы, обжаренные орехи и мадагаскарская ваниль.',
    'Island Tropical Reserve': 'Островной тропический резерв',
    'Exotic sun-drenched fruits from Caribbean & Polynesian groves.':
      'Экзотические солнечные фрукты из карибских и полинезийских рощ.',
    'Imperial Tea & Botanical': 'Императорский чай и ботаника',
    'Rare single-estate teas & hand-steeped botanical infusions.':
      'Редкие плантационные чаи и ботанические настои ручного заваривания.',
    'Velvet Cream & Madagascar Vanilla': 'Бархатные сливки и мадагаскарская ваниль',
    'Silky cream, Madagascar bourbon vanilla & golden custards.':
      'Шелковистые сливки, мадагаскарская бурбонская ваниль и золотистый крем.',
    'Wild Berry & Forest Reserve': 'Дикая ягода и лесной резерв',
    'Hand-picked forest berries with rich antioxidant aromatics.':
      'Лесные ягоды ручного сбора с насыщенной антиоксидантной ароматикой.',

    // The sixty blends
    'White Peach': 'Белый персик',
    'Velvety Georgia peach with honeyed nectar undertones.':
      'Бархатный джорджийский персик с медовыми нектарными оттенками.',
    'Black Fig': 'Чёрный инжир',
    'Deep Mediterranean fig with subtle toasted oak notes.':
      'Глубокий средиземноморский инжир с тонкими нотами обожжённого дуба.',
    'Bing Cherry': 'Черешня Бинг',
    'Tart dark cherry balanced with smooth sweetness.':
      'Терпкая тёмная черешня, уравновешенная мягкой сладостью.',
    'Pear Nectar': 'Грушевый нектар',
    'Crisp Anjou pear infused with organic vanilla.':
      'Хрустящая груша Анжу, настоянная на органической ванили.',
    'Golden Quince': 'Золотая айва',
    'Aromatic quince preserve with delicate spice.':
      'Ароматное айвовое варенье с деликатной пряностью.',
    'Wild Blackberry': 'Дикая ежевика',
    'Ripe mountain blackberry with sweet tartness.':
      'Спелая горная ежевика со сладкой кислинкой.',

    'Jasmine': 'Жасмин',
    'Pure night-blooming jasmine with silk smoothness.':
      'Чистый ночной жасмин с шелковистой мягкостью.',
    'Damask Rose': 'Дамасская роза',
    'Damask rose essence with clean blossom notes.':
      'Эссенция дамасской розы с чистыми цветочными нотами.',
    'Orange Blossom': 'Флёрдоранж',
    'Mediterranean neroli blossom with subtle citrus spark.':
      'Средиземноморский нероли с тонкой цитрусовой искрой.',
    'Lavender Honey': 'Лавандовый мёд',
    'French lavender steeped in raw wildflower honey.':
      'Французская лаванда, настоянная на сыром луговом мёде.',
    'Elderflower': 'Бузина цветущая',
    'Crisp alpine elderflower with bright botanical dew.':
      'Свежий альпийский цвет бузины с яркой ботанической росой.',
    'Violet Leaf': 'Лист фиалки',
    'Sweet candied violet petal with soft earthy finish.':
      'Сладкий засахаренный лепесток фиалки с мягким землистым финишем.',

    'Blood Orange': 'Красный апельсин',
    'Juicy Sicilian blood orange with subtle ruby tartness.':
      'Сочный сицилийский красный апельсин с тонкой рубиновой кислинкой.',
    'Bergamot': 'Бергамот',
    'Calabrian bergamot zest with Earl Grey warmth.':
      'Цедра калабрийского бергамота с теплом «Эрл Грей».',
    'Yuzu': 'Юдзу',
    'Exotic Japanese yuzu with sharp golden citrus spark.':
      'Экзотическое японское юдзу с острой золотистой цитрусовой искрой.',
    'Grapefruit Salt': 'Грейпфрут с солью',
    'Pink grapefruit with a subtle sea-salt rim finish.':
      'Розовый грейпфрут с тонким финишем морской соли по краю.',
    'Key Lime Zest': 'Цедра лайма',
    'Crisp key lime peel with bright zesty lift.':
      'Свежая кожура лайма с яркой цитрусовой подачей.',
    'Meyer Lemon': 'Лимон Мейера',
    'Sweet Meyer lemon curd with subtle floral warmth.':
      'Сладкий курд из лимона Мейера с лёгкой цветочной теплотой.',

    'Garden Mint': 'Садовая мята',
    'Freshly slapped spearmint leaf straight from the garden.':
      'Свежий лист мяты колосистой прямо с грядки.',
    'Spearmint Ice': 'Ледяная мята',
    'Sub-zero arctic frost with sweet peppermint lift.':
      'Арктический мороз ниже нуля со сладким перечно-мятным подъёмом.',
    'Mojito Lime': 'Лайм мохито',
    'Crushed lime zest, cane sugar & fresh mint leaves.':
      'Растёртая цедра лайма, тростниковый сахар и свежие листья мяты.',
    'Eucalyptus Leaf': 'Лист эвкалипта',
    'Australian eucalyptus leaf with soothing botanical chill.':
      'Австралийский эвкалипт с успокаивающей ботанической прохладой.',
    'Peppermint Frost': 'Перечная мята',
    'Pungent peppermint crystals with crisp finish.':
      'Резкие кристаллы перечной мяты с чистым финишем.',
    'Apple Mint': 'Яблочная мята',
    'Sweet orchard apple notes folded into fresh mint.':
      'Сладкие ноты садового яблока, вплетённые в свежую мяту.',

    'Green Cardamom': 'Зелёный кардамон',
    'Green cardamom pod with warm aromatic zest.':
      'Коробочка зелёного кардамона с тёплой ароматной остротой.',
    'Chai Masala': 'Чай масала',
    'Steeped black tea, cinnamon, clove & star anise.':
      'Заваренный чёрный чай, корица, гвоздика и бадьян.',
    'Clove & Orange': 'Гвоздика и апельсин',
    'Warm clove buds spiked with roasted orange peel.':
      'Тёплые бутоны гвоздики с обжаренной апельсиновой цедрой.',
    'Saffron Cream': 'Шафрановые сливки',
    'Persian saffron threads folded into sweet cream.':
      'Нити персидского шафрана, вмешанные в сладкие сливки.',
    'Star Anise': 'Бадьян',
    'Aromatic star anise with dark licorice notes.':
      'Ароматный бадьян с тёмными лакричными нотами.',
    'Cinnamon Bark': 'Кора корицы',
    'Ceylon cinnamon bark with comforting woody heat.':
      'Цейлонская корица с уютным древесным теплом.',

    'Bronte Pistachio': 'Фисташка Бронте',
    'Toasted Bronte pistachio with buttery praline notes.':
      'Обжаренная фисташка Бронте со сливочными пралине-нотами.',
    'Bourbon Vanilla Oud': 'Бурбонская ваниль и уд',
    'Bourbon vanilla bean laced with smoky agarwood resin.':
      'Стручок бурбонской ванили с дымной смолой агарового дерева.',
    'Turkish Delight': 'Рахат-лукум',
    'Rosewater confection dusted with powdered sugar.':
      'Сладость на розовой воде, присыпанная сахарной пудрой.',
    'Arabica Espresso': 'Эспрессо из арабики',
    'Dark roasted Arabica espresso bean with cocoa nib.':
      'Тёмная обжарка арабики с крупкой какао-бобов.',
    'Salted Caramel': 'Солёная карамель',
    'Warm buttery caramel with Maldon sea salt.':
      'Тёплая сливочная карамель с морской солью Малдон.',
    'Dark Cacao': 'Тёмное какао',
    '70% Ecuadorian dark cacao with velvet richness.':
      '70% эквадорское тёмное какао с бархатной насыщенностью.',

    'Passion Fruit': 'Маракуйя',
    'Tart Hawaiian passion fruit nectar with vibrant aroma.':
      'Терпкий нектар гавайской маракуйи с ярким ароматом.',
    'Golden Mango': 'Золотое манго',
    'Sweet Alphonso mango pulp with honey undertones.':
      'Сладкая мякоть манго Альфонсо с медовыми оттенками.',
    'Coconut Nectar': 'Кокосовый нектар',
    'Creamy young coconut water with velvety finish.':
      'Сливочная вода молодого кокоса с бархатным финишем.',
    'Guava Blossom': 'Цвет гуавы',
    'Pink guava preserve with delicate tropical essence.':
      'Варенье из розовой гуавы с тонкой тропической эссенцией.',
    'Pineapple Reserve': 'Ананасовый резерв',
    'Charred Maui pineapple with caramelized sweetness.':
      'Подкопчённый ананас с Мауи с карамелизованной сладостью.',
    'Dragon Fruit': 'Питайя',
    'Pitaya fruit with subtle floral and kiwi highlights.':
      'Питайя с тонкими цветочными нотами и оттенком киви.',

    'Earl Grey Reserve': 'Резерв «Эрл Грей»',
    'Bergamot oil infused with high-altitude Ceylon black tea.':
      'Масло бергамота на высокогорном цейлонском чёрном чае.',
    'Matcha Silk': 'Шёлковая матча',
    'Ceremonial grade Uji matcha with velvety green tea notes.':
      'Церемониальная матча из Удзи с бархатными зелёными нотами.',
    'Hibiscus Rose': 'Гибискус и роза',
    'Tart Egyptian hibiscus flower with wild honeyed rose.':
      'Терпкий египетский гибискус с медовой дикой розой.',
    'Chamomile Honey': 'Ромашка и мёд',
    'Egyptian chamomile blossoms with soothing wild honey.':
      'Цветы египетской ромашки с успокаивающим диким мёдом.',
    'Moroccan Mint Tea': 'Марокканский мятный чай',
    'Gunpowder green tea steeped with fresh spearmint leaves.':
      'Зелёный чай «порох», заваренный со свежими листьями мяты.',
    'Oolong Amber': 'Янтарный улун',
    'Roasted Formosa oolong with subtle orchid aromatics.':
      'Обжаренный улун Формоза с тонкой орхидейной ароматикой.',

    'Sweet Cream': 'Сладкие сливки',
    'Heavy sweet cream whip with cloud-like lightness.':
      'Взбитые жирные сливки с облачной лёгкостью.',
    'Bourbon Vanilla': 'Бурбонская ваниль',
    'Pure Madagascar vanilla pod with dark woody notes.':
      'Чистый стручок мадагаскарской ванили с тёмными древесными нотами.',
    'Dulce de Leche': 'Дульсе де лече',
    'Slow-cooked caramelized milk with toasted sugar.':
      'Медленно уваренное карамелизованное молоко с жжёным сахаром.',
    'Almond Milk': 'Миндальное молоко',
    'Orgeat almond syrup with delicate marzipan cream.':
      'Миндальный сироп оршад с деликатным марципановым кремом.',
    'Coconut Gelato': 'Кокосовое джелато',
    'Rich toasted coconut cream with icy smooth texture.':
      'Насыщенный крем из обжаренного кокоса с ледяной гладкой текстурой.',
    'White Chocolate': 'Белый шоколад',
    'Swiss cocoa butter infused with Madagascar vanilla.':
      'Швейцарское какао-масло, настоянное на мадагаскарской ванили.',

    'Wild Raspberry': 'Дикая малина',
    'Fresh tart red raspberry with vivid ruby aroma.':
      'Свежая кисловатая красная малина с ярким рубиновым ароматом.',
    'Blueberry Reserve': 'Черничный резерв',
    'Ripe Oregon blueberry with subtle woody leaf.':
      'Спелая орегонская черника с тонкой древесной листвой.',
    'Açai Berry': 'Ягода асаи',
    'Amazonian açai with deep cocoa and berry notes.':
      'Амазонское асаи с глубокими какао-ягодными нотами.',
    'Elderberry Spice': 'Пряная бузина',
    'Dark elderberry preserve steeped with clove.':
      'Варенье из тёмной бузины, настоянное на гвоздике.',
    'Cranberry Salt': 'Клюква с солью',
    'Tart tart cranberry with subtle sea-salt rim.':
      'Терпкая клюква с тонким ободком морской соли.',
    'Boysenberry': 'Бойзенова ягода',
    'Hybrid berry nectar with intense sweet-tart balance.':
      'Гибридный ягодный нектар с ярким кисло-сладким балансом.',

    // Mixologist pairings. Recipes are name + name + name; each is spelled out
    // rather than pattern-joined so the translated names stay in the order the
    // mixologist wrote them.
    'Bel-Air Estate Blend': 'Микс «Резиденция Бель-Эйр»',
    'White Peach + Garden Mint + Vanilla Oud': 'Белый персик + Садовая мята + Ванильный уд',
    'Our #1 requested blend for warm estate evenings. Refreshing yet deeply opulent.':
      'Микс №1 по числу заказов для тёплых вечеров в резиденции. Освежающий и при этом глубоко роскошный.',
    'Royal Botanical Pair': 'Королевская ботаническая пара',
    'Jasmine + Bergamot + Spearmint Ice': 'Жасмин + Бергамот + Ледяная мята',
    'An enchanting, perfume-grade aroma that fills the lounge with sophisticated elegance.':
      'Обволакивающий парфюмерный аромат, наполняющий лаунж утончённой элегантностью.',
    'Sunset Aperitif Blend': 'Закатный аперитивный микс',
    'Yuzu + Blood Orange + Garden Mint': 'Юдзу + Красный апельсин + Садовая мята',
    'Zesty and electric — ideal for cocktail hour and sunset reception lounge zones.':
      'Яркий и заряжающий — идеален для коктейльного часа и закатных лаунж-зон.',
    'Midnight Arctic Chill': 'Полночный арктический холод',
    'Spearmint Ice + Mojito Lime + Grapefruit Salt': 'Ледяная мята + Лайм мохито + Грейпфрут с солью',
    'The ultimate palate cleanser — crisp, sub-zero cooling that stays smooth for hours.':
      'Абсолютный освежитель вкуса — чистое ледяное охлаждение, мягкое часами.',
    'Silk Road Nights': 'Ночи Шёлкового пути',
    'Green Cardamom + Chai Masala + Vanilla Oud': 'Зелёный кардамон + Чай масала + Ванильный уд',
    'Deeply captivating and mysterious — designed for late-night VIP lounge conversations.':
      'Глубокий и загадочный — создан для ночных разговоров в VIP-лаундже.',
    'Sommelier After-Hours': 'Сомелье после полуночи',
    'Bronte Pistachio + Bourbon Vanilla Oud + Arabica Espresso':
      'Фисташка Бронте + Бурбонская ваниль и уд + Эспрессо из арабики',
    'Rich, decadent dessert shisha — pairs luxuriously with cognac or espresso martinis.':
      'Насыщенный десертный кальян — роскошно сочетается с коньяком и эспрессо-мартини.',
    'Polynesian Sunset': 'Полинезийский закат',
    'Passion Fruit + Golden Mango + Mojito Lime': 'Маракуйя + Золотое манго + Лайм мохито',
    'Vibrant tropical ecstasy — ideal for outdoor poolside lounges and estate summer galas.':
      'Яркий тропический восторг — идеален для лаунджей у бассейна и летних гала в резиденции.',
    'Emperor’s Lounge': 'Императорский лаундж',
    'Earl Grey Reserve + Bergamot + Lavender Honey': 'Резерв «Эрл Грей» + Бергамот + Лавандовый мёд',
    'Aristocratic, tea-forward elegance for quiet VIP salon conversations.':
      'Аристократичная чайная элегантность для тихих бесед в VIP-салоне.',
    'Velvet Dream Pairing': 'Пара «Бархатная мечта»',
    'Bourbon Vanilla + Sweet Cream + White Peach': 'Бурбонская ваниль + Сладкие сливки + Белый персик',
    'Smooth as silk — transforms every draw into a rich, dessert-grade velvet cloud.':
      'Гладкий как шёлк — превращает каждую затяжку в густое десертное бархатное облако.',
    'Forest Solstice Blend': 'Микс «Лесное солнцестояние»',
    'Wild Raspberry + Blueberry Reserve + Spearmint Ice': 'Дикая малина + Черничный резерв + Ледяная мята',
    'A rich berry explosion backed by a crisp, sub-zero spearmint frost.':
      'Насыщенный ягодный взрыв на фоне чистого ледяного мятного мороза.',

    /* --------------------------------------------------------------- FAQ */
    'Details planners ask for.': 'Детали, о которых спрашивают заказчики.',
    'Questions': 'Вопросы',

    'Can you serve indoors?': 'Можно ли обслуживать в помещении?',
    'Yes. If the host or venue is comfortable with indoor service, we can cater indoors without issue, as well as on outdoor patios, lawns, terraces, and open-air venues.':
      'Да. Если организатор или площадка не против курения в помещении, мы без проблем работаем внутри, а также на открытых террасах, патио, газонах и верандах.',

    'What do you need from the venue / host?': 'Что вам требуется от площадки / организатора?',
    'We require access to clean water for the bases and a standard 120V electrical power outlet (for our electric coconut charcoal burner). We handle everything else, including station setup, lighting, ongoing service, and safe cleanup.':
      'Нам необходим доступ к чистой воде для колб и стандартная розетка 120В (для электрической плитки розжига кокосового угля). Всё остальное — оборудование, забивку, обслуживание и чистовую уборку — мы берём на себя.',

    'How does your pricing work?': 'Как устроено ценообразование?',
    'Our base catering rate is $500 for 3 hookahs for 3 hours with a dedicated uniformed attendant. Additional hours are $100/hr. Fresh fruit bowl upgrades are an extra $100, and bespoke fully fruit hookahs (sculpted almost entirely from fresh fruits) are $500 each.':
      'Наш базовый тариф — $500 за 3 кальяна на 3 часа с выделенным мастером в форме. Дополнительные часы стоят $100/час. Замена всех чаш на свежие фруктовые — +$100, а эксклюзивный кальян, созданный практически полностью из фруктов, — $500 за штуку.',

    'What about guests under 21?': 'А как быть с гостями младше 21 года?',
    'Service is strictly 21+, with no exceptions. Our attendants check ID at the station rather than at your door.':
      'Обслуживание строго 21+, без исключений. Наши мастера проверяют документы непосредственно у станций.',

    'What happens if it rains?': 'Что делать, если пойдёт дождь?',
    'We move under cover — tents, loggias, covered patios, or indoors as long as the host and venue are comfortable.':
      'Мы перемещаемся под укрытие — в шатры, лоджии, на крытые веранды или в помещение, если площадка согласна.',

    'What flavors are available?': 'Какие вкусы доступны?',
    'Sixty single-origin and premium house blends across ten families, ranging from orchard fruits and citrus to cooling glacier mint and exotic spices. You can choose your favorite flavor profiles prior to your event.':
      'Шестьдесят моносортов и авторских миксов в десяти семействах — от спелых фруктов и цитрусовых до ледяной мяты и экзотических пряностей. Вы можете выбрать желаемые вкусовые профили до мероприятия.',

    'Who handles cleanup?': 'Кто убирает после мероприятия?',
    'We do. Full breakdown starts right at the agreed end time. Ash and spent coals are safely packed and removed, leaving your floors and lounge completely spotless.':
      'Мы. Полная разборка начинается ровно в согласованное время окончания. Пепел и угли безопасно упаковываются и вывозятся, а полы и лаундж остаются идеально чистыми.',

    'Do you charge for travel?': 'Есть ли плата за выезд?',
    'No travel fee within Los Angeles County. Beyond that a flat mileage rate is quoted up front before you book. Ventura and Orange County available by arrangement.':
      'В пределах округа Лос-Анджелес выезд бесплатный. За его пределами фиксированный тариф за расстояние согласовывается заранее. Округа Вентура и Ориндж — по договорённости.',

    'How do I book a date?': 'Как забронировать дату?',
    'Use our instant calculator below to estimate your rate, then call us directly at +1 (310) 993-7571 or message us on Instagram @amg_hookah to confirm availability and lock in your date.':
      'Воспользуйтесь калькулятором ниже для ориентировочного расчёта, а затем позвоните нам по номеру +1 (310) 993-7571 или напишите в Instagram @amg_hookah для подтверждения даты.',

    /* ------------------------------------------------------- reservation / calculator */
    'Calculate your price.': 'Рассчитайте стоимость.',
    'Configure your catering options below for an instant price estimate. Call us directly or message us on Instagram to confirm availability and lock in your date.':
      'Настройте параметры кейтеринга ниже для мгновенного расчёта. Позвоните нам напрямую или напишите в Instagram, чтобы уточнить доступность и закрепить дату.',

    'ATTACHED FLAVOR PROFILE': 'ПРИКРЕПЛЁННЫЙ ПРОФИЛЬ ВКУСОВ',
    'Attached to Estimate ✓': 'Прикреплено к расчёту ✓',
    '✕ Remove': '✕ Убрать',

    'Number of Hookahs': 'Количество кальянов',
    '— Base includes 3 hookahs': '— В базу входят 3 кальяна',
    '3 Hookahs': '3 кальяна',
    'Base ($500)': 'Базовый ($500)',
    '4 Hookahs': '4 кальяна',
    '+$100': '+$100',
    '5 Hookahs': '5 кальянов',
    '+$200': '+$200',
    '6 Hookahs': '6 кальянов',
    '+$300': '+$300',
    '8+ Hookahs': '8+ кальянов',
    '+$500': '+$500',
    '3 hookahs (Base)': '3 кальяна (База)',
    '4 hookahs (+$100)': '4 кальяна (+$100)',
    '5 hookahs (+$200)': '5 кальянов (+$200)',
    '6 hookahs (+$300)': '6 кальянов (+$300)',
    '8 hookahs (+$500)': '8 кальянов (+$500)',

    'Duration of Service': 'Продолжительность обслуживания',
    '— Base includes 3 hours, +$100 / add\'l hour': '— В базу входят 3 часа, +$100 / дополнительный час',
    '3 hours (Base)': '3 часа (База)',
    '4 hours (+$100)': '4 часа (+$100)',
    '5 hours (+$200)': '5 часов (+$200)',
    '6 hours (+$300)': '6 часов (+$300)',
    '7 hours (+$400)': '7 часов (+$400)',
    '7+ hours (+$400)': '7+ часов (+$400)',

    '— Hand-carved fresh fruit heads': '— Чаши ручной работы из фруктов',
    'Standard Bowls': 'Стандартные чаши',
    'Included ($0)': 'Включено ($0)',
    'Fruit Bowls': 'Фруктовые чаши',
    'Standard clay heads ($0)': 'Стандартные глиняные чаши ($0)',
    'Fresh fruit heads (+$100)': 'Свежие фруктовые чаши (+$100)',

    '— Masterpiece made almost entirely from real fruits ($500 each)': '— Шедевр, созданный практически полностью из фруктов ($500 за шт.)',
    'None': 'Нет',
    'None (0)': 'Нет (0)',
    '1 piece (+$500)': '1 шт. (+$500)',
    '2 pieces (+$1,000)': '2 шт. (+$1,000)',
    '3 pieces (+$1,500)': '3 шт. (+$1,500)',
    '1 Full Fruit (+$500)': '1 фруктовый (+$500)',
    '2 Full Fruit (+$1,000)': '2 фруктовых (+$1,000)',
    '3 Full Fruit (+$1,500)': '3 фруктовых (+$1,500)',

    'Requirements:': 'Требования:',
    'Host or venue provides clean water access and a standard 120V electrical outlet for natural coal lighting.':
      'Заказчик или площадка предоставляют доступ к чистой воде и стандартную розетку 120В для розжига угля.',

    'Estimated Rate': 'Примерная стоимость',
    'Approximate estimate based on selection': 'Ориентировочный расчёт по выбранным параметрам',
    'Hookahs': 'Кальяны',
    'Duration': 'Продолжительность',
    'Full Fruit Hookah': 'Полностью фруктовый кальян',
    'Attendant': 'Мастер',
    'Included': 'Включён',

    'Call +1 (310) 993-7571': 'Позвонить +1 (310) 993-7571',
    'DM on Instagram @amg_hookah': 'Написать в Instagram @amg_hookah',
    'Email Aghookahcatering@gmail.com': 'Написать на Aghookahcatering@gmail.com',
    'Direct booking · Quick response 7 days a week': 'Прямое бронирование · Быстрый ответ 7 дней в неделю',

    /* ------------------------------------------------------------ footer */
    'Los Angeles County. Ventura and Orange County by arrangement. 21+ only. © 2026 AMG Hookah.':
      'Округ Лос-Анджелес. Вентура и округ Ориндж — по договорённости. Только 21+. © 2026 AMG Hookah.'
  }
};
