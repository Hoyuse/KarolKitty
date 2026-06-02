/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Peluche Hello Kitty Clásico',
    price: 95000,
    category: 'Peluches',
    image: '/src/assets/images/hello_kitty_plush_1780438932979.png',
    description: 'Increíblemente suave y tierno peluche clásico con su icónico overol azul y moño rojo brillante. El compañero perfecto para abrazos infinitos.',
    details: [
      'Material exterior de felpa ultra suave premium',
      'Relleno de fibra de poliéster hipoalergénica de alta densidad',
      'Detalles bordados de alta calidad para máxima durabilidad',
      'Tamaño aproximado: 30 cm de altura'
    ],
    rating: 4.9
  },
  {
    id: '2',
    name: 'Taza de cerámica Karol Kitty',
    price: 55000,
    category: 'Hogar',
    image: '/src/assets/images/karol_kitty_mug_1780438946947.png',
    description: 'Comienza tus mañanas mágicamente con esta hermosa taza de cerámica artesanal con forma de gatito, detalles en oro y un divino moño 3D en la asa.',
    details: [
      'Cerámica de alta calidad con acabado esmaltado brillante',
      'Capacidad ideal de 350 ml para café, té o chocolate caliente',
      'Detalles pintados a mano en oro genuino y moño 3D',
      'Viene en una hermosa caja de regalo protectora'
    ],
    rating: 4.8
  },
  {
    id: '3',
    name: 'Mochila rosa Premium',
    price: 180000,
    category: 'Bolsos',
    image: '/src/assets/images/pink_premium_backpack_1780438960946.png',
    description: 'Elegante y adorable mochila de diseñador en tonos pastel con bordados finos y tiradores acolchados en forma de nubecitas. Espaciosa y super cute.',
    details: [
      'Piel sintética PU de alta gama con costuras reforzadas',
      'Compartimento para tableta o portátil pequeño de hasta 11"',
      'Múltiples bolsillos para mantener todo perfectamente organizado',
      'Resistente al agua ligera y fácil de limpiar'
    ],
    rating: 4.9
  },
  {
    id: '4',
    name: 'Set de stickers Sanrio',
    price: 35000,
    category: 'Papelería',
    image: '/src/assets/images/sanrio_stickers_set_1780439419507.png',
    description: 'Llena tus libretas y accesorios de magia con este set de stickers holográficos troquelados de alta calidad con destellos de corazones y estrellas.',
    details: [
      'Acabado holográfico brillante resistente a salpicaduras',
      'Adhesivo de larga duración que no deja residuos al retirarse',
      'Total de 32 stickers únicos en embalaje estético',
      'Perfecto para planners, portátiles, teléfonos y diarios'
    ],
    rating: 4.7
  },
  {
    id: '5',
    name: 'Peluche Cinnamoroll Cloud Fluff',
    price: 110000,
    category: 'Peluches',
    image: '/src/assets/images/cinnamoroll_plush_1780438975414.png',
    description: 'Tan esponjoso como una nube real, este peluche de Cinnamoroll viene con sus características orejas extra largas y mejillas sonrosadas bordadas.',
    details: [
      'Formulado con micro-felpa súper esponjosa japonesa',
      'Detalles bordados cosidos a mano',
      'Cola de espiral en tercera dimensión',
      'Certificación ecológica de seguridad de materiales'
    ],
    rating: 5.0
  },
  {
    id: '6',
    name: 'Planner Semanal Pastel Dreams',
    price: 65000,
    category: 'Papelería',
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=600&auto=format&fit=crop',
    description: 'Organiza tus actividades diarias y metas con el planner más cute del universo, equipado con separadores color pastel e ilustraciones adorables.',
    details: [
      'Papel ultra-premium de 120g libre de ácido (evita traspaso de tinta)',
      '120 páginas a todo color con diseños exclusivos Kawaii',
      'Encuadernado de doble espiral metálico color oro rosa',
      'Incluye 2 hojas de mini-stickers funcionales de regalo'
    ],
    rating: 4.6
  },
  {
    id: '7',
    name: 'Lámpara de Noche Sleepy Cat',
    price: 85000,
    category: 'Hogar',
    image: '/src/assets/images/sleepy_cat_lamp_1780438989322.png',
    description: 'Una luz suave y acogedora de silicona blanda que se ilumina con suaves toquecitos. Ideal para ambientar de ternura tu mesa de noche o escritorio.',
    details: [
      'Fabricada en silicona lavable libre de BPA y súper suave al tacto',
      '7 colores configurables con tecnología LED tactil integrada',
      'Batería de larga duración recargable mediante USB-C',
      'Modo temporizador automático de apagado a los 30 minutos'
    ],
    rating: 4.9
  },
  {
    id: '8',
    name: 'Bolso Térmico Bento Box',
    price: 125000,
    category: 'Bolsos',
    image: '/src/assets/images/bento_lunch_bag_1780439050439.png',
    description: 'Llega tus almuerzos y snacks favoritos con estilo gracias a este bolso térmico impermeable, con divertidos bordados y asa acolchada.',
    details: [
      'Revestimiento térmico interno de aluminio aislante de alta calidad',
      'Mantiene la comida fresca o caliente hasta por 6 horas continuas',
      'Cremallera bidireccional suave reforzada',
      'Bolsillo exterior de red elástica para botellas de agua'
    ],
    rating: 4.8
  },
  {
    id: '9',
    name: 'Mini Espejo Kuromi de Bolsillo',
    price: 28000,
    category: 'Bolsos',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop',
    description: 'El espejo de bolsillo definitivo para retocar tu maquillaje con toda la actitud rebelde de Kuromi. Diseño compacto de doble cara con aumento.',
    details: [
      'Formato extra ligero ideal para bolsos o cosmetiqueras',
      'Espejo estándar en un lado y espejo de aumento 2x en el reverso',
      'Carcasa con textura suave de PU y relieve en alta definición',
      'Diámetro aproximado de 7.5 cm'
    ],
    rating: 4.9
  },
  {
    id: '10',
    name: 'Lapiceros Gel Kawaii (Set x6)',
    price: 42000,
    category: 'Papelería',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=600&auto=format&fit=crop',
    description: 'Dale brillo e inspiración cósmica a tus trazos con este divino set de 6 bolígrafos de gel en colores pastel con tapa con dijes colgantes de estrellitas.',
    details: [
      'Punta aguja ultra fina de 0.5mm para una escritura impecable',
      'Tinta a base de gel premium que seca al instante sin borrones',
      'Diseño ergonómico con agarre suave antideslizante',
      'Estuche protector transparente con diseño de arcoíris'
    ],
    rating: 4.8
  },
  {
    id: '11',
    name: 'Peluche My Melody Sweet Strawberry',
    price: 115000,
    category: 'Peluches',
    image: '/src/assets/images/my_melody_plush_1780439037031.png',
    description: 'My Melody vestida con su gorrito de fresitas frescas para darte los abrazos más dulces del planeta. Espectacular diseño exclusivo de edición primavera.',
    details: [
      'Pelusa satinada hipoalergénica de caricia celestial',
      'Detalle de lazo rosado con pequeña fresita bordada en 3D',
      'Mejillas pastel ultra sonrosadas con aerógrafo seguro',
      'Tamaño de exhibición: 28 cm de alto'
    ],
    rating: 5.0
  },
  {
    id: '12',
    name: 'Alfombra de Baño Hello Kitty Face',
    price: 135000,
    category: 'Hogar',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop',
    description: 'Transforma tu baño o habitación en el palacio de la ternura con esta alfombrilla super absorbente con la forma de la carita de Hello Kitty.',
    details: [
      'Microfibra densa de secado extra veloz que mima tus pies',
      'Construcción con base de caucho TPR antideslizante de alta seguridad',
      'Fácil lavado a máquina sin deformarse ni perder color',
      'Dimensiones generosas: 60 cm x 50 cm'
    ],
    rating: 4.9
  },
  {
    id: '13',
    name: 'Organizador de Escritorio Pastel',
    price: 58000,
    category: 'Hogar',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=600&auto=format&fit=crop',
    description: 'Dile adiós al caos en tu mesa de estudio gracias a este organizador multifuncional pastel de varios cajones transparentes con pegatinas de regalo.',
    details: [
      'Plástico ABS reforzado no tóxico resistente a caídas',
      'Incluye 6 pequeños compartimentos y 3 cajones tipo gaveta',
      'Pack de pegatinas impermeables de personajes Sanrio de regalo para personalizar',
      'Dimensiones ideales: 18 cm x 12 cm x 10 cm'
    ],
    rating: 4.7
  },
  {
    id: '14',
    name: 'Monedero de Felpa Pompompurin',
    price: 48000,
    category: 'Bolsos',
    image: '/src/assets/images/pompompurin_coin_purse_1780439070685.png',
    description: 'Guarda tus monedas, billetes y audífonos de forma segura en este adorable monedero súper acolchado de Pompompurin con asa de llavero integrada.',
    details: [
      'Felpa extra esponjosa de alta resistencia con detalles en relieve',
      'Herraje de metal reforzado dorado apto para colgar de tu mochila',
      'Forro interior de satín estampado resistente al uso',
      'Cremallera trasera con tirador de pompón suave'
    ],
    rating: 4.9
  }
];
