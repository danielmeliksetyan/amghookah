/* ==========================================================================
   AMG HOOKAH CATERING - SPANISH
   ==========================================================================
   Same contract as i18n-ru.js: keyed by the English source string exactly as
   authored, whitespace-collapsed at lookup, punctuation significant (’ and —).
   A missing key leaves the English on screen; AMG_I18N.missing() lists them.

   Register is usted throughout. This is a page selling a $2,400 service to
   wedding planners and corporate buyers, and tú would read as a nightclub.

   DELIBERATELY NOT TRANSLATED - see the same list in i18n-ru.js:
   AMG Hookah, the handle, the phone, the email placeholder, the package tier
   names (The Salon / The Terrace / The Estate) and every price.
   ========================================================================== */

window.AMG_LANGS = window.AMG_LANGS || {};
window.AMG_LANGS.es = {

  head: {
    title: 'AMG Hookah — Catering premium de shisha en Los Ángeles',
    description: 'Catering premium de shisha en Los Ángeles para bodas, fincas privadas, activaciones de marca y eventos en azoteas. Servicio atendido desde $500.'
  },

  units: {
    guestOne: 'invitado', guestMany: 'invitados',
    hourOne: 'hora',      hourMany: 'horas',
    step: 'Paso {n} de {total} — {label}',
    thanks: 'Gracias, {name}. Confirmaremos el {date} en menos de cuatro horas y le enviaremos el enlace del depósito.',
    depositNote: '30% de {price}. El saldo se abona el día del servicio.',
    depositNoteFrom: '30% de la tarifa inicial de {price}. El saldo se abona el día del servicio.',
    from: 'desde {price}',
    family: 'Familia {n} / {total}',
    selectedIngredient: 'Ingrediente seleccionado: {name}'
  },

  /* The "de" lives in the month, not in the format string, so the rail renders
     "sáb, 5 de diciembre" from the same code path Russian uses for "сб, 5 декабря". */
  months: ['de enero','de febrero','de marzo','de abril','de mayo','de junio',
           'de julio','de agosto','de septiembre','de octubre','de noviembre','de diciembre'],
  days: ['dom','lun','mar','mié','jue','vie','sáb'],

  strings: {

    /* ------------------------------------------------------------ chrome */
    'Event types': 'Tipos de evento',
    'Packages': 'Paquetes',
    'Pricing': 'Tarifas',
    'Flavors': 'Sabores',
    'FAQ': 'Preguntas',
    'Reserve': 'Reservar',
    'Open menu': 'Abrir menú',
    'Close menu': 'Cerrar menú',
    'Language': 'Idioma',
    'AMG Hookah, back to top': 'AMG Hookah, volver arriba',
    /* Shorter than the literal English. "el condado de Orange" and "mayores de
       21 años" ran this to three lines in the mobile drawer against English's
       two, and those 19px were all of Spanish's overflow on a 320x568 screen.
       The footer copy below keeps the long form - it has the width for it. */
    'Los Angeles County. Ventura and Orange County by arrangement. 21+ only.':
      'Condado de Los Ángeles. Ventura y Orange, previa consulta. Solo +21.',

    /* -------------------------------------------------------------- hero */
    'Premium hookah catering': 'Catering premium de shisha',
    'We set the mood.': 'Creamos el ambiente.',
    'You live the moment.': 'Usted vive el momento.',
    'Discreet, fully staffed hookah service for weddings, private estates and brand events across Los Angeles.':
      'Servicio de shisha discreto y con personal completo para bodas, fincas privadas y eventos de marca en todo Los Ángeles.',
    'Reserve a date': 'Reservar una fecha',
    'See packages': 'Ver paquetes',
    'Estimate & Book': 'Presupuesto y reserva',
    'Catering Rates': 'Tarifas de catering',
    'Live Estimated Rate': 'Tarifa estimada en vivo',
    'Call Now': 'Llamar ahora',
    'Hero': 'Portada',
    'Guest exhaling shisha smoke, lit from behind': 'Invitado exhalando humo de shisha, iluminado a contraluz',
    'Scroll to what we cater': 'Desplazarse a «Lo que atendemos»',

    /* ------------------------------------------------------- credentials */
    'Credentials': 'Credenciales',
    'House blends, ten families': 'Mezclas de la casa, diez familias',
    '4 hr': '4 h',
    'Planner response time': 'Tiempo de respuesta al organizador',
    '30 min': '30 min',
    'Setup, start to finish': 'Montaje, de principio a fin',
    'All of LA': 'Todo Los Ángeles',
    'County-wide coverage': 'Cobertura en todo el condado',

    /* ------------------------------------------------------- event types */
    'What we cater': 'Lo que atendemos',
    'Designed for extraordinary occasions.': 'Diseñado para ocasiones extraordinarias.',
    'Four settings we work in every week. Find the one closest to yours — each lists how we load in, who staffs it, and what your venue will ask us for.':
      'Cuatro escenarios en los que trabajamos cada semana. Encuentre el más parecido al suyo: cada uno detalla cómo entramos, quién lo atiende y qué nos pedirá su espacio.',

    'Estate soirées': 'Veladas en fincas',
    'Private Estate Soirées & Villa Lounges': 'Veladas en fincas privadas y lounges de villa',
    'Discreet luxury shisha tailored for milestone celebrations and private lawn dinners.':
      'Shisha de lujo discreta, pensada para celebraciones señaladas y cenas privadas en el jardín.',
    'Setup protocol': 'Protocolo de montaje',
    '30-min silent load-in': 'Entrada silenciosa en 30 minutos',
    'Attendants': 'Personal',
    'Uniformed, there throughout': 'Uniformado, presente durante todo el evento',
    'Air & ash care': 'Aire y ceniza',
    'Zero ash, zero smoke haze': 'Cero ceniza, cero neblina de humo',
    'Coals': 'Carbones',
    'Natural coconut charcoal': 'Carbón natural de coco',
    'Designed to blend into high-end estate architecture. We handle everything from charcoal prep to final breakdown with zero trace left behind.':
      'Pensado para integrarse en la arquitectura de una finca de alto nivel. Nos ocupamos de todo, desde encender el carbón hasta el desmontaje final, sin dejar rastro.',
    'Typically': 'Normalmente',
    '; past 90 guests,': '; a partir de 90 invitados,',
    'Reserve an estate date': 'Reservar una fecha en finca',
    'Villa terrace at dusk with a sunken lounge, pool and lantern light':
      'Terraza de villa al anochecer con lounge hundido, piscina y luz de farolillos',

    'Black-tie weddings': 'Bodas de etiqueta',
    'Black-Tie Wedding Receptions & Galas': 'Banquetes de boda de etiqueta y galas',
    'Opulent late-night lounges that stay in step with your planner’s run-of-show.':
      'Lounges opulentos de madrugada que siguen al minuto el guion de su organizador.',
    'Coordination': 'Coordinación',
    'Direct planner sync': 'Contacto directo con el organizador',
    'Aesthetic': 'Estética',
    'Glass & brass stations': 'Estaciones de vidrio y latón',
    'Flavor list': 'Lista de sabores',
    'Agreed before the date': 'Acordada antes de la fecha',
    'Camera discretion': 'Discreción ante la cámara',
    '100% out-of-frame service': 'Servicio 100% fuera de plano',
    'Add a lounge zone to your reception. Our attendants keep the coals glowing and the stations pristine without interrupting formal speeches or photography.':
      'Añada una zona lounge a su banquete. Nuestro personal mantiene los carbones encendidos y las estaciones impecables sin interrumpir los discursos ni la sesión de fotos.',
    ', our wedding standard.': ', nuestro estándar para bodas.',
    'Reserve a wedding date': 'Reservar una fecha de boda',
    'Black-tie guests raising their glasses for a toast at a formal dinner':
      'Invitados de etiqueta alzando sus copas para un brindis en una cena formal',

    'Brand activations': 'Activaciones de marca',
    'Luxury Brand Activations & Launches': 'Activaciones y lanzamientos de marcas de lujo',
    'Campaign-specific blends, tailored curation and briefed ambassadors.':
      'Mezclas exclusivas de campaña, selección personalizada y embajadores formados.',
    'Customization': 'Personalización',
    'Bespoke styling & curation': 'Estilismo y selección personalizada',
    'Signature blend': 'Mezcla exclusiva',
    'Bespoke campaign flavor': 'Sabor a medida para la campaña',
    'Ambassadors': 'Embajadores',
    'Staff briefed on talking points': 'Personal formado en los mensajes clave',
    'Press discretion': 'Discreción con la prensa',
    'VIP & celebrity friendly': 'Apto para VIP y celebridades',
    'Create a focal point for product launches and media galas, with shisha blends matched to your brand identity and staff who can speak to them.':
      'Cree un punto focal para lanzamientos de producto y galas de medios, con mezclas alineadas con la identidad de su marca y personal capaz de explicarlas.',
    'Custom fruit builds and campaign-matched flavor curation.':
      'Montajes frutales a medida y selección de sabores adaptada a la campaña.',
    'Attendant-served catering tailored to your guest count.':
      'Servicio atendido por profesionales adaptado al número de invitados.',
    'Seamless lounge service timed with your run-of-show.':
      'Servicio lounge impecable y sincronizado con el guion de su evento.',

    /* ----------------------------------------------------------- gallery */
    'Gallery': 'Galería',
    'Artisanal Gallery': 'Galería artesanal',
    'Unique Fruit Hookahs.': 'Cachimbas únicas de fruta.',
    'Explore our master-carved fruit heads and custom sculptural builds crafted entirely from fresh fruits, melons, berries, and botanicals.':
      'Descubra nuestras cazoletas de fruta talladas a mano y montajes escultóricos elaborados íntegramente con frutas frescas, melones, bayas y botánicos.',
    'Fully Fruit Hookah · $500': 'Cachimba 100% de fruta · $500',
    'Fresh Fruit Bowl · +$100': 'Cazoleta de fruta fresca · +$100',

    'Pineapple & Lime Arch': 'Arco de piña y lima',
    'Horizontal whole pineapple base with four precision-stacked fresh limes forming dual pillars, crowned with a carved mini golden pineapple head.':
      'Base de piña entera con cuatro limas frescas formando columnas y cazoleta tallada de mini piña dorada.',
    'Private Estates & Parties': 'Fincas privadas y fiestas',
    'Architectural Head': 'Cazoleta arquitectónica',

    'Grand Watermelon & Melon Tower': 'Gran torre de sandía y melón',
    'Masterpiece build with a massive fresh watermelon base, stacked whole pineapples, cantaloupe midsection, and orange head producing dense, chilled draws.':
      'Obra maestra con base maciza de sandía fresca, piñas apiladas, melón cantalupo y cazoleta de naranja para fumadas densas y frescas.',
    'VIP Lounges & Galas': 'Zonas VIP y galas',
    'Fully Fruit Masterpiece': 'Obra maestra 100% fruta',

    'Sculptural Totem & Banana Arc': 'Tótem escultórico y arcos de plátano',
    'Bespoke whole watermelon base with outstretched pineapple palm fronds, tiered pineapples, banana arch columns, and a fresh orange crown head.':
      'Base de sandía con hojas de piña, columnas en arco de plátano y corona de naranja fresca.',
    'Brand Activations & Shows': 'Activaciones de marca y espectáculos',
    'Sculptural Totem': 'Tótem escultórico',

    'Watermelon & Forest Berry Cradle': 'Cuna de sandía y frutos del bosque',
    'Hand-carved fresh watermelon cradle brimming with ripe blackberries, wild raspberries, pineapple core, and a carved ruby grapefruit bowl.':
      'Cuna de sandía fresca tallada con moras, frambuesas silvestres, piña y cazoleta de pomelo rubí.',
    'Weddings & Milestones': 'Bodas y aniversarios',
    'Berry Infusion': 'Infusión de bayas',

    'Pineapple & Sunburst Orange Throne': 'Trono de piña y naranja sunburst',
    'Horizontal sweet pineapple foundation with pineapple leaves supporting a symmetrical 5-orange citrus arch and heat management system on a luxury wood stem.':
      'Base de piña dulce con hojas decorativas, arco simétrico de 5 naranjas y mástil de madera de lujo.',
    'Estate Soirées & Lounges': 'Veladas en fincas y lounges',
    'Citrus Arch': 'Arco cítrico',

    'Crystal Glass & Citrus Halo': 'Cristal y halo cítrico',
    'Symmetrical 8-citrus circular halo crafted from fresh oranges and grapefruit, mounted on an illuminated all-glass crystal stem for dramatic late-night atmospheres.':
      'Halo circular de 8 cítricos frescos sobre mástil de cristal iluminado con humo denso a contraluz.',
    'Nightlife & Rooftops': 'Vida nocturna y azoteas',
    'Citrus Halo': 'Halo cítrico',

    '— custom builds live in that tier.': ' — los montajes a medida viven en ese nivel.',
    'Reserve an activation date': 'Reservar una fecha de activación',
    'Chandelier-lit gala dinner in a high-rise ballroom above the city':
      'Cena de gala bajo arañas de cristal en un salón de altura sobre la ciudad',

    'Rooftops & corporate': 'Azoteas y corporativo',
    'VIP Rooftops & Corporate Salons': 'Azoteas VIP y salones corporativos',
    'Skyline views paired with palate-cleanser blends and a windproof, low-profile setup.':
      'Vistas al skyline con mezclas que limpian el paladar y un montaje discreto y resistente al viento.',
    'Setup': 'Montaje',
    '30-min load-in, zero haze': 'Entrada en 30 minutos, sin neblina',
    'Charcoal safety': 'Seguridad del carbón',
    'Windproof coconut coals': 'Carbones de coco resistentes al viento',
    'Service': 'Servicio',
    'Dedicated attendant care': 'Atención dedicada de profesional',
    'Palate cleanser': 'Limpieza de paladar',
    'Glacier mint & citrus reserves': 'Reservas de menta glacial y cítricos',
    'Built for holiday galas, executive retreat dinners and high-level networking, with a four-hour response time for corporate planners.':
      'Creado para galas navideñas, cenas de retiros directivos y networking de alto nivel, con respuesta en cuatro horas para responsables corporativos.',
    'Low-profile setup with direct venue coordination.': 'Montaje discreto con coordinación directa con el espacio.',
    '; multi-space venues,': '; espacios con varias zonas,',
    'Reserve a corporate date': 'Reservar una fecha corporativa',
    'Rooftop lounge seating at night above a lit city skyline':
      'Zona lounge en azotea de noche sobre un skyline iluminado',

    /* ---------------------------------------------------------- packages */
    'Transparent Pricing': 'Precios transparentes',
    'Catering Rates.': 'Tarifas de catering.',
    'Simple, transparent pricing tailored to your guest count and event duration. Every booking includes a dedicated attendant, premium blends, natural coconut coals, and complete cleanup.':
      'Precios sencillos y transparentes adaptados a su número de invitados y duración. Cada reserva incluye profesional dedicado, mezclas premium, carbones de coco y recogida completa.',

    'Core Offering': 'Oferta principal',
    'Full Service': 'Servicio completo',
    '3 Hookahs · 3 Hours': '3 cachimbas · 3 horas',
    'Our signature full-service catering standard. Designed for celebrations, intimate gatherings, and VIP lounges.':
      'Nuestro estándar insignia de servicio completo. Diseñado para celebraciones, reuniones íntimas y zonas VIP.',
    '/ 3 hours base': '/ 3 horas base',
    '+$100 / add\'l hr': '+$100 / hora adicional',
    '3 modern high-grade hookah stations · Precision glass & brass':
      '3 estaciones modernas de alta gama · Cristal de precisión y latón',
    '1 dedicated uniformed attendant · Continuous station care':
      '1 profesional uniformado dedicado · Cuidado continuo de estaciones',
    '60 curated artisan blends · Selected from 10 flavor families':
      '60 mezclas artesanales · Seleccionadas de 10 familias de sabor',
    '100% natural coconut coals · Electric ignition & refills':
      'Carbones 100% naturales de coco · Encendido eléctrico y recambios',
    'Full setup & spotless breakdown · Zero residue load-out':
      'Montaje completo y recogida impecable · Sin residuos al marcharnos',
    'Configure in Price Calculator': 'Calcular en la calculadora',

    'Flavor Enhancement': 'Mejora de sabor',
    '+$100 upgrade': '+$100 suplemento',
    'Fresh Fruit Bowls': 'Cazoletas de fruta fresca',
    'Elevate your booking with hand-carved fresh fruit and custom produce bowls (melons, citrus, berries, pineapples, and seasonal selections) for extended sessions and natural aromatics.':
      'Mejore su reserva con cazoletas de fruta fresca talladas a mano (melones, cítricos, bayas, piñas y selecciones de temporada) para sesiones prolongadas y aromas naturales.',
    'Carved from fresh fruits, berries, citrus & custom produce':
      'Talladas en frutas frescas, bayas, cítricos y productos de temporada',
    'Enhanced natural flavor infusion & rich cooling clouds':
      'Infusión natural de sabor potenciada y nubes densas y frescas',
    'Applied across all stations for the full event':
      'Aplicado en todas las estaciones durante todo el evento',

    'Exclusive Centerpiece': 'Pieza central exclusiva',
    '$500 / per hookah': '$500 / por cachimba',
    'Fully Fruit Hookah': 'Cachimba 100% de fruta',
    'An extraordinary custom showpiece where almost the entire apparatus is sculpted by hand from real fresh fruits, melons, berries, and custom produce.':
      'Una pieza de exhibición extraordinaria donde casi todo el aparato está esculpido a mano con frutas frescas reales, melones, bayas y productos selectos.',
    'Sculpted by hand from fresh whole watermelons, fruits & seasonal produce':
      'Esculpida a mano con sandías enteras frescas, frutas y productos de temporada',
    'Rare artisanal showstopper for VIP tables & luxury galas':
      'Pieza artística exclusiva para mesas VIP y galas de lujo',
    'Pure natural smoke filtration through fresh fruit juice':
      'Filtración pura y natural del humo a través de zumo de fruta fresca',

    /* -------------------------------------------------- what is included */
    'What is included': 'Qué está incluido',
    'Dedicated Attendant': 'Profesional dedicado',
    'A uniformed attendant stays with your stations throughout the event, tending every head and changing coals continuously.':
      'Un profesional uniformado permanece en sus estaciones durante todo el evento, atendiendo cada cazoleta y cambiando los carbones continuamente.',
    'Never left unstaffed': 'Nunca sin atención',
    'Sixty artisan blends across ten flavor families. Select your preferred flavor profiles prior to the event.':
      'Sesenta mezclas artesanales en diez familias de sabor. Seleccione sus perfiles de sabor favoritos antes del evento.',
    'Tailored to your taste': 'Adaptado a su gusto',
    'Pure Coconut Coals': 'Carbones puros de coco',
    'Only natural coconut charcoal used. Smokeless, odorless, lit cleanly using our electric heating system.':
      'Solo carbón natural de coco. Sin humo, sin olor, encendido limpiamente con nuestro sistema eléctrico.',
    'Clean burn · Zero chemicals': 'Combustión limpia · Cero químicos',
    'Spotless Breakdown': 'Recogida impecable',
    'Full breakdown begins right at the agreed end time. Ash and spent coals are safely packed and removed from the venue.':
      'La recogida completa comienza exactamente a la hora de finalización acordada. Las cenizas y carbones usados se retiran de forma segura.',
    'Leaves when we do': 'Se va cuando nos vamos',

    /* ----------------------------------------------------------- process */
    'How it works': 'Cómo funciona',
    'Four steps, no surprises.': 'Cuatro pasos, sin sorpresas.',
    'Instant': 'Al instante',
    'pricing': 'tarifa',
    'Explore the estimate': 'Consulte el presupuesto',
    'Use our instant calculator to configure your hookahs, duration, and fruit upgrades with zero commitment.':
      'Utilice nuestra calculadora instantánea para configurar cachimbas, duración y suplementos de fruta sin compromiso.',
    'Instant rate calculation': 'Cálculo instantáneo de tarifas',
    'Explore custom options & flavor families': 'Explore opciones personalizadas y familias de sabores',
    'One': 'Una',
    'call': 'llamada',
    'Book & design service': 'Reserva y diseño del servicio',
    'Lock in your date, finalize hookah count, duration, and curated flavors seamlessly in one call or DM.':
      'Asegure su fecha, concrete el número de cachimbas, duración y sabores seleccionados en una sola llamada o DM.',
    'Availability check & date confirmation': 'Consulta de disponibilidad y confirmación de fecha',
    'Custom flavor profile & fruit curation': 'Perfil de sabor personalizado y selección de frutas',
    '30': '30',
    'min': 'min',
    'We arrive early': 'Llegamos con antelación',
    'Discreet load-in, timed with your schedule so we are ready before guests arrive.':
      'Entrada discreta, sincronizada con su horario para estar listos antes de que lleguen los invitados.',
    'Thirty minutes from arrival to ready': 'Treinta minutos desde la llegada hasta estar listos',
    'Host provides water access and a standard power outlet':
      'El anfitrión proporciona toma de agua y enchufe estándar',
    'End': 'Hora de',
    'time': 'cierre',
    'We leave it clean': 'Lo dejamos limpio',
    'Full breakdown starts the moment the service ends.':
      'El desmontaje completo empieza en cuanto termina el servicio.',
    'Ash and spent coals safely packed and removed':
      'La ceniza y los carbones usados se empaquetan y retiran de forma segura',
    'Lounge and floors left spotless':
      'La zona lounge y los suelos quedan impecables',

    /* ----------------------------------------------------------- flavors */
    'Curated Mixology': 'Mixología de autor',
    'Sixty blends, ten families.': 'Sesenta mezclas, diez familias.',
    'Turn the dial through our signature artisan collections — taste profiles, cooling levels, and master mixologist pairings.':
      'Gire el dial por nuestras colecciones artesanales: perfiles de sabor, niveles de frescor y maridajes del maestro mixólogo.',
    'Each family features six curated blends. Explore the signature taste profiles, cooling levels, and master mixologist pairings below.':
      'Cada familia cuenta con seis mezclas de autor. Explore los perfiles de sabor, niveles de frescor y maridajes del sumiller a continuación.',
    'Each family is six blends.': 'Cada familia son seis mezclas.',
    'brings one family to your event,': 'lleva una familia a su evento,',
    'two, and': 'dos, y',
    'as many as you like plus a signature blend developed for you. Attach a family below and it travels with your reservation.':
      'las que quiera, más una mezcla exclusiva creada para usted. Adjunte una familia abajo y viajará con su reserva.',

    'Flavor family': 'Familia de sabores',
    'Scroll to turn': 'Desplace para girar',
    'or choose a family': 'o elija una familia',
    'Sweetness': 'Dulzor',
    'Cooling': 'Frescor',
    'Aroma': 'Aroma',
    'Reserve this flavor menu': 'Reservar este menú de sabores',
    'SELECTED INGREDIENT FOCUS': 'INGREDIENTE SELECCIONADO',
    '— Ingredient Active in Background Aura': '— ingrediente activo en el aura de fondo',
    'Canvas Atmosphere Synced ✓': 'Ambiente sincronizado ✓',
    'The six blends (tap to select)': 'Las seis mezclas (toque para elegir)',
    'SOMMELIER SIGNATURE SELECTION': 'SELECCIÓN INSIGNIA DEL SUMILLER',
    'Orchard': 'Huerto', 'Floral': 'Floral', 'Citrus': 'Cítrico', 'Mint': 'Menta',
    'Spiced': 'Especias', 'Dessert': 'Postre', 'Tropical': 'Tropical',
    'Tea': 'Té', 'Cream': 'Crema', 'Berry': 'Bayas',
    'Vanilla & Cream': 'Vainilla y crema',
    'Tea & Herbal': 'Té e infusiones',

    'FRUIT & ORCHARD ESSENCE': 'ESENCIA DE FRUTA Y HUERTO',
    'BOTANICAL BLOSSOM ESSENCE': 'ESENCIA BOTÁNICA DE FLORES',
    'ZESTY CITRUS ESSENCE': 'ESENCIA CÍTRICA VIBRANTE',
    'SUB-ZERO MINT & FROST ESSENCE': 'ESENCIA DE MENTA Y ESCARCHA BAJO CERO',
    'EXOTIC SPICE & RESIN ESSENCE': 'ESENCIA EXÓTICA DE ESPECIAS Y RESINAS',
    'ARTISANAL CONFECTION ESSENCE': 'ESENCIA DE REPOSTERÍA ARTESANAL',
    'POLYNESIAN TROPICAL ESSENCE': 'ESENCIA TROPICAL POLINESIA',
    'IMPERIAL TEA & BOTANICAL ESSENCE': 'ESENCIA IMPERIAL DE TÉ Y BOTÁNICOS',
    'VELVET CREAM & VANILLA ESSENCE': 'ESENCIA DE CREMA ATERCIOPELADA Y VAINILLA',
    'FOREST WILD BERRY ESSENCE': 'ESENCIA DE BAYAS SILVESTRES DEL BOSQUE',

    'Orchard Fruit Reserve': 'Reserva de Fruta de Huerto',
    'Sun-ripened orchard fruits with lush nectar notes & velvet finish.':
      'Frutas de huerto maduradas al sol, con notas jugosas de néctar y final aterciopelado.',
    'Floral Garden Reserve': 'Reserva de Jardín Floral',
    'Delicate blossom aromatics paired with natural wild honey.':
      'Aromas delicados de flor acompañados de miel silvestre natural.',
    'Citrus Zest Reserve': 'Reserva de Ralladura Cítrica',
    'Vibrant Mediterranean citrus with crisp, effervescent brightness.':
      'Cítricos mediterráneos vibrantes con una luminosidad nítida y efervescente.',
    'Glacier Mint Reserve': 'Reserva de Menta Glacial',
    'Ultra-clean cooling leaves for an icy, invigorating draw.':
      'Hojas refrescantes ultralimpias para una calada helada y estimulante.',
    'Spiced & Exotic Reserve': 'Reserva Especiada y Exótica',
    'Warm Orient spices, roasted cardamoms & rare amber resins.':
      'Especias cálidas de Oriente, cardamomo tostado y resinas ámbar poco comunes.',
    'Artisanal Dessert Reserve': 'Reserva de Postre Artesanal',
    'Indulgent gourmet confections, toasted nuts & Madagascar vanilla.':
      'Dulces gourmet, frutos secos tostados y vainilla de Madagascar.',
    'Island Tropical Reserve': 'Reserva Tropical de Isla',
    'Exotic sun-drenched fruits from Caribbean & Polynesian groves.':
      'Frutas exóticas bañadas de sol de huertos caribeños y polinesios.',
    'Imperial Tea & Botanical': 'Té Imperial y Botánicos',
    'Rare single-estate teas & hand-steeped botanical infusions.':
      'Tés raros de finca única e infusiones botánicas preparadas a mano.',
    'Velvet Cream & Madagascar Vanilla': 'Crema Aterciopelada y Vainilla de Madagascar',
    'Silky cream, Madagascar bourbon vanilla & golden custards.':
      'Crema sedosa, vainilla bourbon de Madagascar y natillas doradas.',
    'Wild Berry & Forest Reserve': 'Reserva de Bayas Silvestres del Bosque',
    'Hand-picked forest berries with rich antioxidant aromatics.':
      'Bayas de bosque recogidas a mano con una rica aromática antioxidante.',

    'White Peach': 'Melocotón blanco',
    'Velvety Georgia peach with honeyed nectar undertones.':
      'Melocotón de Georgia aterciopelado con fondo de néctar meloso.',
    'Black Fig': 'Higo negro',
    'Deep Mediterranean fig with subtle toasted oak notes.':
      'Higo mediterráneo profundo con sutiles notas de roble tostado.',
    'Bing Cherry': 'Cereza Bing',
    'Tart dark cherry balanced with smooth sweetness.':
      'Cereza oscura ácida equilibrada con un dulzor suave.',
    'Pear Nectar': 'Néctar de pera',
    'Crisp Anjou pear infused with organic vanilla.':
      'Pera Anjou crujiente infusionada con vainilla ecológica.',
    'Golden Quince': 'Membrillo dorado',
    'Aromatic quince preserve with delicate spice.':
      'Dulce de membrillo aromático con una especia delicada.',
    'Wild Blackberry': 'Mora silvestre',
    'Ripe mountain blackberry with sweet tartness.':
      'Mora de montaña madura con una acidez dulce.',

    'Jasmine': 'Jazmín',
    'Pure night-blooming jasmine with silk smoothness.':
      'Jazmín puro de floración nocturna con suavidad de seda.',
    'Damask Rose': 'Rosa de Damasco',
    'Damask rose essence with clean blossom notes.':
      'Esencia de rosa de Damasco con notas limpias de flor.',
    'Orange Blossom': 'Azahar',
    'Mediterranean neroli blossom with subtle citrus spark.':
      'Neroli mediterráneo con un sutil destello cítrico.',
    'Lavender Honey': 'Miel de lavanda',
    'French lavender steeped in raw wildflower honey.':
      'Lavanda francesa macerada en miel cruda de flores silvestres.',
    'Elderflower': 'Flor de saúco',
    'Crisp alpine elderflower with bright botanical dew.':
      'Flor de saúco alpina fresca con un rocío botánico luminoso.',
    'Violet Leaf': 'Hoja de violeta',
    'Sweet candied violet petal with soft earthy finish.':
      'Pétalo de violeta confitado con un final terroso suave.',

    'Blood Orange': 'Naranja sanguina',
    'Juicy Sicilian blood orange with subtle ruby tartness.':
      'Naranja sanguina siciliana jugosa con una sutil acidez rubí.',
    'Bergamot': 'Bergamota',
    'Calabrian bergamot zest with Earl Grey warmth.':
      'Ralladura de bergamota calabresa con la calidez del Earl Grey.',
    'Yuzu': 'Yuzu',
    'Exotic Japanese yuzu with sharp golden citrus spark.':
      'Yuzu japonés exótico con un destello cítrico dorado y punzante.',
    'Grapefruit Salt': 'Pomelo con sal',
    'Pink grapefruit with a subtle sea-salt rim finish.':
      'Pomelo rosa con un sutil borde final de sal marina.',
    'Key Lime Zest': 'Ralladura de lima',
    'Crisp key lime peel with bright zesty lift.':
      'Piel de lima fresca con un impulso cítrico luminoso.',
    'Meyer Lemon': 'Limón Meyer',
    'Sweet Meyer lemon curd with subtle floral warmth.':
      'Crema dulce de limón Meyer con una sutil calidez floral.',

    'Garden Mint': 'Menta del huerto',
    'Freshly slapped spearmint leaf straight from the garden.':
      'Hoja de hierbabuena recién avivada, directa del huerto.',
    'Spearmint Ice': 'Hierbabuena helada',
    'Sub-zero arctic frost with sweet peppermint lift.':
      'Escarcha ártica bajo cero con un impulso dulce de menta.',
    'Mojito Lime': 'Lima mojito',
    'Crushed lime zest, cane sugar & fresh mint leaves.':
      'Ralladura de lima machacada, azúcar de caña y hojas de menta fresca.',
    'Eucalyptus Leaf': 'Hoja de eucalipto',
    'Australian eucalyptus leaf with soothing botanical chill.':
      'Hoja de eucalipto australiano con un frescor botánico reconfortante.',
    'Peppermint Frost': 'Escarcha de menta',
    'Pungent peppermint crystals with crisp finish.':
      'Cristales intensos de menta piperita con un final nítido.',
    'Apple Mint': 'Menta manzana',
    'Sweet orchard apple notes folded into fresh mint.':
      'Notas dulces de manzana de huerto integradas en menta fresca.',

    'Green Cardamom': 'Cardamomo verde',
    'Green cardamom pod with warm aromatic zest.':
      'Vaina de cardamomo verde con una cálida chispa aromática.',
    'Chai Masala': 'Chai masala',
    'Steeped black tea, cinnamon, clove & star anise.':
      'Té negro en infusión, canela, clavo y anís estrellado.',
    'Clove & Orange': 'Clavo y naranja',
    'Warm clove buds spiked with roasted orange peel.':
      'Clavo cálido realzado con piel de naranja tostada.',
    'Saffron Cream': 'Crema de azafrán',
    'Persian saffron threads folded into sweet cream.':
      'Hebras de azafrán persa integradas en crema dulce.',
    'Star Anise': 'Anís estrellado',
    'Aromatic star anise with dark licorice notes.':
      'Anís estrellado aromático con notas oscuras de regaliz.',
    'Cinnamon Bark': 'Corteza de canela',
    'Ceylon cinnamon bark with comforting woody heat.':
      'Corteza de canela de Ceilán con un calor amaderado reconfortante.',

    'Bronte Pistachio': 'Pistacho de Bronte',
    'Toasted Bronte pistachio with buttery praline notes.':
      'Pistacho de Bronte tostado con notas mantecosas de praliné.',
    'Bourbon Vanilla Oud': 'Vainilla bourbon y oud',
    'Bourbon vanilla bean laced with smoky agarwood resin.':
      'Vaina de vainilla bourbon entrelazada con resina ahumada de agar.',
    'Turkish Delight': 'Delicia turca',
    'Rosewater confection dusted with powdered sugar.':
      'Dulce de agua de rosas espolvoreado con azúcar glas.',
    'Arabica Espresso': 'Espresso arábica',
    'Dark roasted Arabica espresso bean with cocoa nib.':
      'Grano de arábica de tueste oscuro con nibs de cacao.',
    'Salted Caramel': 'Caramelo salado',
    'Warm buttery caramel with Maldon sea salt.':
      'Caramelo cálido y mantecoso con sal marina de Maldon.',
    'Dark Cacao': 'Cacao negro',
    '70% Ecuadorian dark cacao with velvet richness.':
      'Cacao negro ecuatoriano 70% con una riqueza aterciopelada.',

    'Passion Fruit': 'Maracuyá',
    'Tart Hawaiian passion fruit nectar with vibrant aroma.':
      'Néctar ácido de maracuyá hawaiano con un aroma vibrante.',
    'Golden Mango': 'Mango dorado',
    'Sweet Alphonso mango pulp with honey undertones.':
      'Pulpa dulce de mango Alphonso con fondo de miel.',
    'Coconut Nectar': 'Néctar de coco',
    'Creamy young coconut water with velvety finish.':
      'Agua de coco joven y cremosa con final aterciopelado.',
    'Guava Blossom': 'Flor de guayaba',
    'Pink guava preserve with delicate tropical essence.':
      'Dulce de guayaba rosa con una delicada esencia tropical.',
    'Pineapple Reserve': 'Reserva de piña',
    'Charred Maui pineapple with caramelized sweetness.':
      'Piña de Maui asada con un dulzor caramelizado.',
    'Dragon Fruit': 'Pitaya',
    'Pitaya fruit with subtle floral and kiwi highlights.':
      'Pitaya con sutiles matices florales y de kiwi.',

    'Earl Grey Reserve': 'Reserva Earl Grey',
    'Bergamot oil infused with high-altitude Ceylon black tea.':
      'Aceite de bergamota infusionado con té negro de Ceilán de altura.',
    'Matcha Silk': 'Matcha seda',
    'Ceremonial grade Uji matcha with velvety green tea notes.':
      'Matcha de Uji de grado ceremonial con notas aterciopeladas de té verde.',
    'Hibiscus Rose': 'Hibisco y rosa',
    'Tart Egyptian hibiscus flower with wild honeyed rose.':
      'Flor de hibisco egipcio ácida con rosa silvestre y miel.',
    'Chamomile Honey': 'Manzanilla y miel',
    'Egyptian chamomile blossoms with soothing wild honey.':
      'Flores de manzanilla egipcia con miel silvestre reconfortante.',
    'Moroccan Mint Tea': 'Té moruno',
    'Gunpowder green tea steeped with fresh spearmint leaves.':
      'Té verde gunpowder infusionado con hojas frescas de hierbabuena.',
    'Oolong Amber': 'Oolong ámbar',
    'Roasted Formosa oolong with subtle orchid aromatics.':
      'Oolong de Formosa tostado con sutiles aromas de orquídea.',

    'Sweet Cream': 'Crema dulce',
    'Heavy sweet cream whip with cloud-like lightness.':
      'Nata dulce montada con una ligereza de nube.',
    'Bourbon Vanilla': 'Vainilla bourbon',
    'Pure Madagascar vanilla pod with dark woody notes.':
      'Vaina pura de vainilla de Madagascar con notas amaderadas oscuras.',
    'Dulce de Leche': 'Dulce de leche',
    'Slow-cooked caramelized milk with toasted sugar.':
      'Leche caramelizada a fuego lento con azúcar tostado.',
    'Almond Milk': 'Leche de almendra',
    'Orgeat almond syrup with delicate marzipan cream.':
      'Sirope de horchata de almendra con una delicada crema de mazapán.',
    'Coconut Gelato': 'Gelato de coco',
    'Rich toasted coconut cream with icy smooth texture.':
      'Crema intensa de coco tostado con una textura helada y suave.',
    'White Chocolate': 'Chocolate blanco',
    'Swiss cocoa butter infused with Madagascar vanilla.':
      'Manteca de cacao suiza infusionada con vainilla de Madagascar.',

    'Wild Raspberry': 'Frambuesa silvestre',
    'Fresh tart red raspberry with vivid ruby aroma.':
      'Frambuesa roja fresca y ácida con un vivo aroma rubí.',
    'Blueberry Reserve': 'Reserva de arándano',
    'Ripe Oregon blueberry with subtle woody leaf.':
      'Arándano de Oregón maduro con una sutil hoja amaderada.',
    'Açai Berry': 'Baya de açaí',
    'Amazonian açai with deep cocoa and berry notes.':
      'Açaí amazónico con notas profundas de cacao y bayas.',
    'Elderberry Spice': 'Saúco especiado',
    'Dark elderberry preserve steeped with clove.':
      'Confitura de saúco oscuro macerada con clavo.',
    'Cranberry Salt': 'Arándano rojo con sal',
    'Tart tart cranberry with subtle sea-salt rim.':
      'Arándano rojo muy ácido con un sutil borde de sal marina.',
    'Boysenberry': 'Boysenberry',
    'Hybrid berry nectar with intense sweet-tart balance.':
      'Néctar de baya híbrida con un intenso equilibrio dulce-ácido.',

    'Bel-Air Estate Blend': 'Mezcla Finca Bel-Air',
    'White Peach + Garden Mint + Vanilla Oud': 'Melocotón blanco + Menta del huerto + Vainilla oud',
    'Our #1 requested blend for warm estate evenings. Refreshing yet deeply opulent.':
      'Nuestra mezcla más pedida para noches cálidas en finca. Refrescante y a la vez profundamente opulenta.',
    'Royal Botanical Pair': 'Maridaje Botánico Real',
    'Jasmine + Bergamot + Spearmint Ice': 'Jazmín + Bergamota + Hierbabuena helada',
    'An enchanting, perfume-grade aroma that fills the lounge with sophisticated elegance.':
      'Un aroma cautivador, de nivel perfumería, que llena el lounge de elegancia sofisticada.',
    'Sunset Aperitif Blend': 'Mezcla Aperitivo de Atardecer',
    'Yuzu + Blood Orange + Garden Mint': 'Yuzu + Naranja sanguina + Menta del huerto',
    'Zesty and electric — ideal for cocktail hour and sunset reception lounge zones.':
      'Cítrica y eléctrica: ideal para la hora del cóctel y las zonas lounge al atardecer.',
    'Midnight Arctic Chill': 'Frío Ártico de Medianoche',
    'Spearmint Ice + Mojito Lime + Grapefruit Salt': 'Hierbabuena helada + Lima mojito + Pomelo con sal',
    'The ultimate palate cleanser — crisp, sub-zero cooling that stays smooth for hours.':
      'El limpiador de paladar definitivo: un frescor nítido bajo cero que se mantiene suave durante horas.',
    'Silk Road Nights': 'Noches de la Ruta de la Seda',
    'Green Cardamom + Chai Masala + Vanilla Oud': 'Cardamomo verde + Chai masala + Vainilla oud',
    'Deeply captivating and mysterious — designed for late-night VIP lounge conversations.':
      'Profundamente cautivadora y misteriosa: creada para las conversaciones de madrugada en el lounge VIP.',
    'Sommelier After-Hours': 'Sumiller de Madrugada',
    'Bronte Pistachio + Bourbon Vanilla Oud + Arabica Espresso':
      'Pistacho de Bronte + Vainilla bourbon y oud + Espresso arábica',
    'Rich, decadent dessert shisha — pairs luxuriously with cognac or espresso martinis.':
      'Shisha de postre intensa y decadente: marida de lujo con coñac o con espresso martinis.',
    'Polynesian Sunset': 'Atardecer Polinesio',
    'Passion Fruit + Golden Mango + Mojito Lime': 'Maracuyá + Mango dorado + Lima mojito',
    'Vibrant tropical ecstasy — ideal for outdoor poolside lounges and estate summer galas.':
      'Éxtasis tropical vibrante: ideal para lounges junto a la piscina y galas de verano en finca.',
    'Emperor’s Lounge': 'El Lounge del Emperador',
    'Earl Grey Reserve + Bergamot + Lavender Honey': 'Reserva Earl Grey + Bergamota + Miel de lavanda',
    'Aristocratic, tea-forward elegance for quiet VIP salon conversations.':
      'Elegancia aristocrática con el té por delante, para conversaciones tranquilas en el salón VIP.',
    'Velvet Dream Pairing': 'Maridaje Sueño de Terciopelo',
    'Bourbon Vanilla + Sweet Cream + White Peach': 'Vainilla bourbon + Crema dulce + Melocotón blanco',
    'Smooth as silk — transforms every draw into a rich, dessert-grade velvet cloud.':
      'Suave como la seda: convierte cada calada en una nube aterciopelada digna de un postre.',
    'Forest Solstice Blend': 'Mezcla Solsticio de Bosque',
    'Wild Raspberry + Blueberry Reserve + Spearmint Ice': 'Frambuesa silvestre + Reserva de arándano + Hierbabuena helada',
    'A rich berry explosion backed by a crisp, sub-zero spearmint frost.':
      'Una explosión intensa de bayas sobre una escarcha nítida de hierbabuena bajo cero.',

    /* --------------------------------------------------------------- FAQ */
    'Details planners ask for.': 'Detalles que consultan los organizadores.',
    'Questions': 'Preguntas',

    'Can you serve indoors?': '¿Pueden prestar servicio en interiores?',
    'Yes. If the host or venue is comfortable with indoor service, we can cater indoors without issue, as well as on outdoor patios, lawns, terraces, and open-air venues.':
      'Sí. Si el anfitrión o el espacio están conformes con el servicio en interiores, podemos atender dentro sin problema, así como en terrazas, jardines, patios y espacios al aire libre.',

    'What do you need from the venue / host?': '¿Qué necesitan del espacio / anfitrión?',
    'We require access to clean water for the bases and a standard 120V electrical power outlet (for our electric coconut charcoal burner). We handle everything else, including station setup, lighting, ongoing service, and safe cleanup.':
      'Requerimos acceso a agua limpia para las bases y una toma de corriente estándar de 120V (para nuestro hornillo eléctrico de carbón de coco). Nos encargamos de todo lo demás, incluidos el montaje, encendido, servicio continuo y recogida segura.',

    'How does your pricing work?': '¿Cómo funcionan los precios?',
    'Our base catering rate is $500 for 3 hookahs for 3 hours with a dedicated uniformed attendant. Additional hours are $100/hr. Fresh fruit bowl upgrades are an extra $100, and bespoke fully fruit hookahs (sculpted almost entirely from fresh fruits) are $500 each.':
      'Nuestra tarifa base es de $500 por 3 cachimbas durante 3 horas con un profesional uniformado dedicado. Las horas adicionales son a $100/h. El suplemento de cazoletas de fruta fresca es de +$100, y las cachimbas artesanales 100% de fruta son a $500 cada una.',

    'What about guests under 21?': '¿Qué pasa con los invitados menores de 21 años?',
    'Service is strictly 21+, with no exceptions. Our attendants check ID at the station rather than at your door.':
      'El servicio es estrictamente para mayores de 21 años, sin excepciones. Nuestro personal comprueba la identificación directamente en las estaciones.',

    'What happens if it rains?': '¿Qué pasa si llueve?',
    'We move under cover — tents, loggias, covered patios, or indoors as long as the host and venue are comfortable.':
      'Nos trasladamos bajo cubierto: carpas, porches, galerías o interiores siempre que el anfitrión y el espacio estén conformes.',

    'What flavors are available?': '¿Qué sabores hay disponibles?',
    'Sixty single-origin and premium house blends across ten families, ranging from orchard fruits and citrus to cooling glacier mint and exotic spices. You can choose your favorite flavor profiles prior to your event.':
      'Sesenta mezclas de origen único y de la casa repartidas en diez familias, desde frutas y cítricos hasta menta helada y especias exóticas. Puede elegir sus perfiles de sabor antes del evento.',

    'Who handles cleanup?': '¿Quién se encarga de la limpieza?',
    'We do. Full breakdown starts right at the agreed end time. Ash and spent coals are safely packed and removed, leaving your floors and lounge completely spotless.':
      'Nosotros. El desmontaje completo empieza exactamente a la hora acordada. La ceniza y los carbones se embalan y retiran de forma segura, dejando el suelo y el espacio impecables.',

    'Do you charge for travel?': '¿Cobran desplazamiento?',
    'No travel fee within Los Angeles County. Beyond that a flat mileage rate is quoted up front before you book. Ventura and Orange County available by arrangement.':
      'Sin cargo por desplazamiento dentro del condado de Los Ángeles. Más allá, se cotiza una tarifa plana por distancia antes de reservar. Condados de Ventura y Orange disponibles previa consulta.',

    'How do I book a date?': '¿Cómo reservo una fecha?',
    'Use our instant calculator below to estimate your rate, then call us directly at +1 (310) 993-7571 or message us on Instagram @amg_hookah to confirm availability and lock in your date.':
      'Utilice nuestra calculadora a continuación para estimar el precio y luego llámenos directamente al +1 (310) 993-7571 o escríbanos por Instagram a @amg_hookah para confirmar disponibilidad y reservar su fecha.',

    /* ------------------------------------------------------- reservation / calculator */
    'Calculate your price.': 'Calcule su precio.',
    'Configure your catering options below for an instant price estimate. Call us directly or message us on Instagram to confirm availability and lock in your date.':
      'Configure las opciones de catering a continuación para obtener un presupuesto al instante. Llámenos directamente o escríbanos por Instagram para confirmar disponibilidad y reservar su fecha.',

    'ATTACHED FLAVOR PROFILE': 'PERFIL DE SABOR ADJUNTO',
    'Attached to Estimate ✓': 'Adjunto al presupuesto ✓',
    '✕ Remove': '✕ Quitar',

    'Number of Hookahs': 'Número de cachimbas',
    '— Base includes 3 hookahs': '— La base incluye 3 cachimbas',
    '3 Hookahs': '3 cachimbas',
    'Base ($500)': 'Base ($500)',
    '4 Hookahs': '4 cachimbas',
    '+$100': '+$100',
    '5 Hookahs': '5 cachimbas',
    '+$200': '+$200',
    '6 Hookahs': '6 cachimbas',
    '+$300': '+$300',
    '8+ Hookahs': '8+ cachimbas',
    '+$500': '+$500',
    '3 hookahs (Base)': '3 cachimbas (Base)',
    '4 hookahs (+$100)': '4 cachimbas (+$100)',
    '5 hookahs (+$200)': '5 cachimbas (+$200)',
    '6 hookahs (+$300)': '6 cachimbas (+$300)',
    '8 hookahs (+$500)': '8 cachimbas (+$500)',

    'Duration of Service': 'Duración del servicio',
    '— Base includes 3 hours, +$100 / add\'l hour': '— La base incluye 3 horas, +$100 / hora adicional',
    '3 hours (Base)': '3 horas (Base)',
    '4 hours (+$100)': '4 horas (+$100)',
    '5 hours (+$200)': '5 horas (+$200)',
    '6 hours (+$300)': '6 horas (+$300)',
    '7 hours (+$400)': '7 horas (+$400)',
    '7+ hours (+$400)': '7+ horas (+$400)',

    '— Hand-carved fresh fruit heads': '— Cazoletas de fruta talladas a mano',
    'Standard Bowls': 'Cazoletas estándar',
    'Included ($0)': 'Incluido ($0)',
    'Fruit Bowls': 'Cazoletas de fruta',
    'Standard clay heads ($0)': 'Cazoletas de barro estándar ($0)',
    'Fresh fruit heads (+$100)': 'Cazoletas de fruta fresca (+$100)',

    '— Masterpiece made almost entirely from real fruits ($500 each)': '— Obra de arte elaborada casi en su totalidad con fruta real ($500 c/u)',
    'None': 'Ninguno',
    'None (0)': 'Ninguna (0)',
    '1 piece (+$500)': '1 ud. (+$500)',
    '2 pieces (+$1,000)': '2 uds. (+$1,000)',
    '3 pieces (+$1,500)': '3 uds. (+$1,500)',
    '1 Full Fruit (+$500)': '1 de fruta (+$500)',
    '2 Full Fruit (+$1,000)': '2 de fruta (+$1,000)',
    '3 Full Fruit (+$1,500)': '3 de fruta (+$1,500)',

    'Requirements:': 'Requisitos:',
    'Host or venue provides clean water access and a standard 120V electrical outlet for natural coal lighting.':
      'El anfitrión o el espacio proporciona acceso a agua limpia y una toma de corriente estándar de 120V para el encendido del carbón.',

    'Estimated Rate': 'Tarifa estimada',
    'Approximate estimate based on selection': 'Presupuesto aproximado según su selección',
    'Hookahs': 'Cachimbas',
    'Duration': 'Duración',
    'Full Fruit Hookah': 'Cachimba 100% de fruta',
    'Attendant': 'Profesional',
    'Included': 'Incluido',

    'Call +1 (310) 993-7571': 'Llamar +1 (310) 993-7571',
    'DM on Instagram @amg_hookah': 'DM en Instagram @amg_hookah',
    'Email Aghookahcatering@gmail.com': 'Email Aghookahcatering@gmail.com',
    'Direct booking · Quick response 7 days a week': 'Reserva directa · Respuesta rápida los 7 días de la semana',

    /* ------------------------------------------------------------ footer */
    'Los Angeles County. Ventura and Orange County by arrangement. 21+ only. © 2026 AMG Hookah.':
      'Condado de Los Ángeles. Ventura y el condado de Orange, previa consulta. Solo mayores de 21 años. © 2026 AMG Hookah.'
  }
};
