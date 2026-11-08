import { Product, FlashDealItem, MallBrand, Voucher, NotificationItem, LiveStream } from '../types';

export const FLASH_DEALS: FlashDealItem[] = [
  {
    id: 'flash-1',
    name: 'Anker USB-C 65W Fast Charger Mini Adapter',
    price: 12.90,
    originalPrice: 23.50,
    discountPercentage: 45,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCqnzqbyLNG5eSK-wA-o3z38S6X_bhlgbVwi0FdvjCD-CLK71jbIzXTcvh5HhKDIbyjA3uhqzADYt80MiuPgAmmzO1x0zdB6KDaYrV85pG7G_Dniu61L6D4j9Nd_Jvy4_zFMuLymWm9S-V7mW2eC2iHZGhcdasZOfOuNOrvd8v-E4xL99OexXUN-NadNybt61cKjFHc_b-81VkvrSIwDWmgC2-Rwgw56DoB0O5iq5bro4SvQeRbHQv',
    soldPercent: 85,
    soldLabel: '85% SOLD',
    category: 'Electronics'
  },
  {
    id: 'flash-2',
    name: 'Xiaomi Smart Band 8 Active Blood Oxygen Fitness Tracker',
    price: 29.90,
    originalPrice: 74.90,
    discountPercentage: 60,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRfJnIT69gcv1NhVqlF2jVDFEK2pDVavVZCcn7Rj7j6Yu8doTOKz8ToaynDB8C1SUsKzZLPaTP1OoAwWtkuHHs-0fCT7c_C-ggjDaKp6NmwpOzf8qAEuHdLUwOcruS5vo5nJtSicRfJaykcNDcml0ZZXtyzcraSUNGZRaG_RaZ519p1FwDrVB6cbCW1M5G8WHkUr0C8LhnC4U0_VSmE0Mi7YyGRzPHuOxs7UN4SERE-54TACLicab3',
    soldPercent: 92,
    soldLabel: 'FIRE! 92%',
    category: 'Electronics'
  },
  {
    id: 'flash-3',
    name: 'Disposable Round Air Fryer Baking Paper Liners 100pcs',
    price: 4.50,
    originalPrice: 9.00,
    discountPercentage: 50,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-9drAd45hWo5eDB1FlGsBavTesgukOms0f6jw8ajndoirqjFG6Lf6LSSykiy-bdZRzkLqiUkC07MT4txCaPksV-Ci95H9JZ0J9kXT6jNPBLNABsnyYK2EU7CZc77gcm-jOrF9-9juRM_DKYg02cPhXoRytVFeUqDue8KJ424dijieSetjXsuTJg0UoA94yFATsq6nWXNTVVp_55sgCWaCJtpdIQhXt3tiACMHwt4fiGQIw22KigTk',
    soldPercent: 45,
    soldLabel: '45 SOLD',
    category: 'Home & Living'
  },
  {
    id: 'flash-4',
    name: 'Portable Bladeless Hanging Neck Fan 3-Speed Rechargeable',
    price: 15.90,
    originalPrice: 26.50,
    discountPercentage: 40,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8sv3QnmdnMblB2omsHhj5d3Hu6qK8PE8lE1I_VrrNWeGY4q-vicrOrxvqI1lnHEijDp3Ww9ourXaf3KkT9ZISUpEnpQgTRo624sozdbUnf-hyOJq7aqSEtfIBgX8LOsuZ86tU_aNe_bEwXxrYSqhc5ruyjRXxfjxEUZm_0_O1f4m6oFMq-SBCiA9F68KJzKDjtC045wGQppV7uu3dAr3qOCSl_zinfgKYJPlNEEZG7SMUGKSZw0_5',
    soldPercent: 65,
    soldLabel: '65% SOLD',
    category: 'Electronics'
  },
  {
    id: 'flash-5',
    name: 'High-Tech Multi-Functional Air Styler & Blow Dryer Wand',
    price: 89.00,
    originalPrice: 136.90,
    discountPercentage: 35,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR8nsUsllLGML_VugM2boqrbMr-YPVc-PjvS74wEw9aNGukvns0rBVBgSBpSrPjRDH_jNOOItpKJr7sdIIHt8AeosO_EnEu4PUWG6Bjt3a2A2iHYzOzEyxyfLDvhf9ONAaSstoBbmzQhLkZ_cjcG5t6uNVK0ClkEVynbmGBm4v5E4D5jDFhlV1XxqjFmI2zQXXK8RzRnH7uokidaHpeOdnjqhaeSFfoR3sLCC1kUYS_Z7iXZfvLa7s',
    soldPercent: 78,
    soldLabel: '18 SOLD',
    category: 'Beauty'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'UGREEN 65W GaN Fast Charger USB C 3-Port Laptop Adapter',
    price: 32.90,
    originalPrice: 65.00,
    discountPercentage: 49,
    rating: 4.9,
    soldCount: '2.4k sold',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS2dN2s8loa1JMOWczYIG-6OZLp_38szT7s3kQFkPSVv5cV6K6EbbpPD0FRpIqRuYrqpqYlWg93PuQojIozLN6fHWRWqSWsaNjzEMZjL4gWLMKECVFpE6h20MUbt2i6cv6-1lWBQmBj4TBTOPFkwYzjBewWn4vCNdT8Da-espiLVSoZ41JsB0GGdMYR9EBFRqEv_wVuO5YDdeXVeaEEMTzyiqO0YfWCtSfx_94cqtOOMeRNcWOY4Ei',
    badge: 'Mall',
    tag: 'Free Shipping',
    brand: 'UGREEN Official Store',
    category: 'Electronics',
    description: 'UGREEN Nexode 65W GaN 3-Port Charger provides lightning fast charging for MacBook Pro/Air, iPhone 16/15, iPad Pro, and Galaxy S24 series. Features GaN II technology with over-temperature protection and dynamic power distribution.',
    stock: 248,
    options: ['Matte Black (SG 3-Pin)', 'Space Grey (SG 3-Pin)', 'Pure White (SG 3-Pin)'],
    reviewsCount: 1840,
    shippingInfo: 'Standard Delivery (SG Local) · Free with voucher'
  },
  {
    id: 'prod-2',
    name: 'Ergonomic Mesh Office Chair with Lumbar Support High Back',
    price: 89.00,
    originalPrice: 159.00,
    discountPercentage: 44,
    rating: 4.8,
    soldCount: '890 sold',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1SLqVlUxgncraEngFDmi1DwVxOR9YlUgUZx1J5uiLfnfFCniDLOrr_qyTFKP-yaO0anzYAMR0sCwflahrGgvZ4D2vSvM5zaqq4oJUZZpGp07zMsOvtmfo7tSGN5BLhQb0ZAsh1VMJfqhv1xgKtv3uOwj4I_ceCVoCB64f5wCp0C3Kn-EZA-nl3Dgym7UMNjIer-S117oRXc-3wBNDVEkHelZOFMBqA5UkJsLE27uFFXXvI04w3k_A',
    badge: 'SG Local',
    tag: '10% Coins Back',
    brand: 'ComfortZone SG',
    category: 'Home & Living',
    description: 'Designed for SG tropical climate with breathable Korean mesh back, dynamic 3D lumbar spine curve, 135° recline lock, heavy-duty SGS certified hydraulic gas lift, and smooth silent nylon caster wheels.',
    stock: 42,
    options: ['Midnight Black + Headrest', 'Slate Grey + Headrest', 'All Black (No Headrest)'],
    reviewsCount: 520,
    shippingInfo: 'SG Bulky Delivery · Next Day Dispatch'
  },
  {
    id: 'prod-3',
    name: 'Sony WH-1000XM5 Wireless Noise-Cancelling Headphones Black',
    price: 399.00,
    originalPrice: 589.00,
    discountPercentage: 32,
    rating: 5.0,
    soldCount: '1.1k sold',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEuYfmEx1OqlLhkuhJ-JWDS_aJr5JvnS8p-vk_Ni1WuRIuzLS6Bd8rEqFI7U2B2Z4NjeB9q1MtlzW_EbOJHOn6ahFPSFXp98ocVGxWlCMR5-sS53Et4J61BPJDaziWwBpYs5aYTSQjQIXJwSLCE7XTFk5v71IRFEHJb2igvj35jclwvufj1k2hsgXXlA0sYx3Xe6ZRFex1cWo9Vs7r4USV9SKhB0ehtrZ2qCCHZALMWcPfBNeO3skA',
    badge: 'Mall',
    tag: '15-Day Return',
    brand: 'Sony Official Store',
    category: 'Electronics',
    description: 'Industry-leading noise cancellation optimized by dual processors and 8 microphones. Hi-Res Audio wireless support with LDAC, crystal clear hands-free calling, Speak-to-Chat, and 30-hour battery life with quick charging.',
    stock: 75,
    options: ['Matte Black', 'Platinum Silver', 'Midnight Blue'],
    reviewsCount: 934,
    shippingInfo: 'Express Delivery (1-2 days) · 100% Authentic Guaranteed'
  },
  {
    id: 'prod-4',
    name: 'Nissin Instant Cup Noodles Laksa Flavour Pack of 12',
    price: 16.50,
    originalPrice: 21.00,
    discountPercentage: 21,
    rating: 4.9,
    soldCount: '4.8k sold',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4jskZmsb_8xRXboQI1Zkn0CEZ0T-Ym8Djj823KSEhsv9bABIcJzCth6dmPcLPv1RZuPPLHI4_9F1IZZqdx-rZ5oDBp9Ta3FTdodZ3emh2f-YeqSMJoMwZyFA-dxToZENk53TZe_E00jK8zN8eIbYRMhkR4t5A_NKAJe8f2tolAZ4AGECMdnhrHHM6iSur-NpQdFt6seSB4_nfp-7PxtkNhRFu7SnTyP05vfH5OCEH4t-XkoIJFpqx',
    badge: 'Supermarket',
    tag: 'Next Day Delivery',
    brand: 'Shopee Supermarket',
    category: 'Supermarket',
    description: 'Singapore beloved signature Laksa broth infused with aromatic coconut milk, rich dried shrimp paste, and mild chili sambal. Packed with bouncy noodles, egg bits, and bean curd rolls.',
    stock: 600,
    options: ['12 Cups Carton (75g each)', '6 Cups Bundle', 'Laksa + Seafood Mix (12 Cups)'],
    reviewsCount: 3410,
    shippingInfo: 'Shopee Supermarket 24H Delivery'
  },
  {
    id: 'prod-5',
    name: 'Japanese Minimalist Stainless Steel Thermal Tumbler 500ml',
    price: 9.90,
    originalPrice: 24.00,
    discountPercentage: 59,
    rating: 4.8,
    soldCount: '3.2k sold',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDs8zFCQCPuWoiDFt9awmxfygyx0IQgFIvjgkuVMjvK94h8um45IRFlkw5HtNP9tUPhkxfq9WiK2eRhrd6t-E0l1liDfSITWNQTfTlBDNdWqMQD2j8gLS9Ojd5145quUDf4Kj6PLk5hP2-nPkb2QiHNOQ8FgehtvAnuQQvBkFgbwoZ2ynCy8Tvdz-t36f8pKqmFgh0oErssWOMQAZn9fYd7gWoTPfHb9T8K9D52brfke8cHFUfWFVzn',
    badge: 'SG In Stock',
    tag: 'Free Shipping',
    brand: 'MujiStyle Living SG',
    category: 'Home & Living',
    description: 'Double-walled vacuum insulated food-grade 316 stainless steel interior. Keeps cold drinks icy for 18 hours and hot coffee steaming for 12 hours. Leak-proof flip spout with ergonomic silicone carry strap.',
    stock: 190,
    options: ['Cream Beige 500ml', 'Matte Obsidian 500ml', 'Sage Green 500ml', 'Blush Peach 500ml'],
    reviewsCount: 1680,
    shippingInfo: 'Standard SG Mail · Dispatched within 24h'
  },
  {
    id: 'prod-6',
    name: 'Logitech MX Master 3S Wireless Performance Mouse',
    price: 119.00,
    originalPrice: 169.00,
    discountPercentage: 30,
    rating: 5.0,
    soldCount: '980 sold',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRJ601W5ZJRX1SwBd8HTDczJ4-IvYE3ufs5VT9MddIpuKCtiAgvFcukWOopYdN3eb8Z1P0NG7ojAZlowBc3KXB1toPqhyyo8kp5mC5Lty-2Pbu-D8z6c43uKzWSr43UDDBHPnlbEoGXjUEv1bpkoBNF7yxXtzktmQBuugtDzD5pAYqBF2jMj1jLGqJDSBOCtzFtp5BmkJqCEpYFkSgIO76lunOGBI6JCBY1Sb2-XoNAd2pu9oa9TbA',
    badge: 'Mall',
    tag: 'Free Delivery',
    brand: 'Logitech Official Store',
    category: 'Electronics',
    description: 'Iconic ergonomic silhouette with 8,000 DPI Darkfield sensor that tracks on any surface including glass. Quiet Clicks provide tactile feel with 90% less click noise. MagSpeed electromagnetic scrolling scrolls 1,000 lines per second.',
    stock: 54,
    options: ['Dark Graphite', 'Pale Grey', 'Rose Pink'],
    reviewsCount: 780,
    shippingInfo: 'Logitech Official Warranty · Express 2-Day Delivery'
  },
  // Additional Products for dynamic discovery feed
  {
    id: 'prod-7',
    name: 'Dyson Supersonic™ Nural Hair Dryer Strawberry Bronze',
    price: 649.00,
    originalPrice: 699.00,
    discountPercentage: 7,
    rating: 4.9,
    soldCount: '420 sold',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR8nsUsllLGML_VugM2boqrbMr-YPVc-PjvS74wEw9aNGukvns0rBVBgSBpSrPjRDH_jNOOItpKJr7sdIIHt8AeosO_EnEu4PUWG6Bjt3a2A2iHYzOzEyxyfLDvhf9ONAaSstoBbmzQhLkZ_cjcG5t6uNVK0ClkEVynbmGBm4v5E4D5jDFhlV1XxqjFmI2zQXXK8RzRnH7uokidaHpeOdnjqhaeSFfoR3sLCC1kUYS_Z7iXZfvLa7s',
    badge: 'Mall',
    tag: 'Extra $50 Off',
    brand: 'Dyson Official Store',
    category: 'Beauty',
    description: 'Scalp protect mode automatically lowers heat as it gets closer to your scalp. Intelligent sensor network with attachment learning and pause detect.',
    stock: 28,
    options: ['Strawberry Bronze / Blush Pink', 'Ceramic Patina / Topaz'],
    reviewsCount: 310,
    shippingInfo: 'Dyson 2-Year SG Local Warranty'
  },
  {
    id: 'prod-8',
    name: 'Apple AirPods Pro (2nd Generation) with USB-C MagSafe Case',
    price: 299.00,
    originalPrice: 362.00,
    discountPercentage: 17,
    rating: 5.0,
    soldCount: '3.9k sold',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCqnzqbyLNG5eSK-wA-o3z38S6X_bhlgbVwi0FdvjCD-CLK71jbIzXTcvh5HhKDIbyjA3uhqzADYt80MiuPgAmmzO1x0zdB6KDaYrV85pG7G_Dniu61L6D4j9Nd_Jvy4_zFMuLymWm9S-V7mW2eC2iHZGhcdasZOfOuNOrvd8v-E4xL99OexXUN-NadNybt61cKjFHc_b-81VkvrSIwDWmgC2-Rwgw56DoB0O5iq5bro4SvQeRbHQv',
    badge: 'Mall',
    tag: 'Up to 40% Off',
    brand: 'Apple Flagship Store',
    category: 'Electronics',
    description: 'Up to 2x more Active Noise Cancellation. Transparency mode allows outside sounds in. Adaptive Audio dynamically blends Transparency and Active Noise Cancellation.',
    stock: 120,
    options: ['White with MagSafe USB-C Case'],
    reviewsCount: 2890,
    shippingInfo: 'Apple Authorised SG Guarantee'
  }
];

export const MALL_BRANDS: MallBrand[] = [
  {
    id: 'brand-apple',
    name: 'Apple',
    tagline: 'Up to 40% Off',
    icon: 'laptop_mac',
    discountBadge: 'Up to 40% Off',
    category: 'Electronics',
    followers: '1.2M',
    rating: 4.9,
    productsCount: 142
  },
  {
    id: 'brand-dyson',
    name: 'Dyson',
    tagline: 'Extra $50 Off',
    icon: 'cyclone',
    discountBadge: 'Extra $50 Off',
    category: 'Appliances',
    followers: '680k',
    rating: 4.8,
    productsCount: 88
  },
  {
    id: 'brand-loreal',
    name: "L'Oreal",
    tagline: 'Buy 1 Get 1',
    icon: 'spa',
    discountBadge: 'Buy 1 Get 1',
    category: 'Beauty',
    followers: '850k',
    rating: 4.8,
    productsCount: 210
  },
  {
    id: 'brand-nike',
    name: 'Nike',
    tagline: 'Min. 50% Off',
    icon: 'steps',
    discountBadge: 'Min. 50% Off',
    category: 'Fashion & Sports',
    followers: '940k',
    rating: 4.9,
    productsCount: 430
  },
  {
    id: 'brand-samsung',
    name: 'Samsung',
    tagline: 'Voucher $100',
    icon: 'smartphone',
    discountBadge: 'Voucher $100',
    category: 'Electronics',
    followers: '1.1M',
    rating: 4.9,
    productsCount: 310
  },
  {
    id: 'brand-xiaomi',
    name: 'Xiaomi',
    tagline: 'Mega Vouchers',
    icon: 'devices_other',
    discountBadge: '15% Off',
    category: 'Smart Home',
    followers: '720k',
    rating: 4.8,
    productsCount: 260
  }
];

export const VOUCHERS: Voucher[] = [
  {
    id: 'v-1',
    title: 'Free Shipping Min. Spend $0',
    description: 'Applicable for all Shopee Mall & Preferred SG sellers',
    discountAmount: 1.99,
    isPercent: false,
    minSpend: 0,
    type: 'shipping',
    expiryDate: 'Expiring in 2 days',
    claimed: true,
    code: 'FREESHIP0'
  },
  {
    id: 'v-2',
    title: '12% Shopee Coins Cashback',
    description: 'Capped at 800 Coins on Tech & Gadgets categories',
    discountAmount: 12,
    isPercent: true,
    minSpend: 30,
    type: 'cashback',
    expiryDate: 'Valid till 30 Sep',
    claimed: true,
    code: 'COINBACK12'
  },
  {
    id: 'v-3',
    title: '$80 OFF Super Tech Sale',
    description: 'Min spend $500 on Electronics & Laptops',
    discountAmount: 80,
    isPercent: false,
    minSpend: 500,
    type: 'discount',
    expiryDate: 'Limited redemptions today',
    claimed: false,
    code: 'TECH80'
  },
  {
    id: 'v-4',
    title: '$5 OFF Shopee Mall Brands',
    description: 'Official Stores exclusive discount',
    discountAmount: 5,
    isPercent: false,
    minSpend: 40,
    type: 'mall',
    expiryDate: 'Valid 7 days',
    claimed: false,
    code: 'MALL5'
  }
];

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'order',
    title: 'Parcel Out for Delivery!',
    message: 'Your order #SG992341 (UGREEN GaN Charger) is with J&T Express courier. Expect delivery by 3:00 PM today.',
    time: '20 mins ago',
    read: false,
    icon: 'local_shipping',
    actionText: 'Track Parcel'
  },
  {
    id: 'notif-2',
    type: 'promo',
    title: '⚡ 12PM Flash Deals Live Now!',
    message: 'Sony WH-1000XM5 drops to $399! Limited quantity available, checkout before it sells out.',
    time: '1 hour ago',
    read: false,
    icon: 'bolt',
    actionText: 'Grab Deal'
  },
  {
    id: 'notif-3',
    type: 'wallet',
    title: 'ShopeePay Top-up Successful',
    message: '$30.00 has been credited to your ShopeePay wallet via PayNow. New balance: $48.50.',
    time: '3 hours ago',
    read: true,
    icon: 'account_balance_wallet',
    actionText: 'View Balance'
  },
  {
    id: 'notif-4',
    type: 'live',
    title: 'Dyson Official SG is LIVE!',
    message: 'Catch exclusive Live stream vouchers up to $80 off + free attachment giveaways!',
    time: 'Yesterday',
    read: true,
    icon: 'podcasts',
    actionText: 'Watch Now'
  }
];

export const LIVE_STREAMS: LiveStream[] = [
  {
    id: 'live-1',
    title: 'Dyson Airwrap & Nural Flash Blowout! $80 Off Voucher Drop',
    hostName: 'Dyson Official SG',
    viewers: '4.8k',
    likes: 24900,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR8nsUsllLGML_VugM2boqrbMr-YPVc-PjvS74wEw9aNGukvns0rBVBgSBpSrPjRDH_jNOOItpKJr7sdIIHt8AeosO_EnEu4PUWG6Bjt3a2A2iHYzOzEyxyfLDvhf9ONAaSstoBbmzQhLkZ_cjcG5t6uNVK0ClkEVynbmGBm4v5E4D5jDFhlV1XxqjFmI2zQXXK8RzRnH7uokidaHpeOdnjqhaeSFfoR3sLCC1kUYS_Z7iXZfvLa7s',
    featuredProduct: PRODUCTS[6],
    badge: 'MALL EXCLUSIVE',
    liveDiscountText: 'VOUCHER $80'
  },
  {
    id: 'live-2',
    title: 'Tech Unboxing: Sony XM5 vs AirPods Pro + Lucky Draw!',
    hostName: 'GadgetSG Studio',
    viewers: '2.3k',
    likes: 12400,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEuYfmEx1OqlLhkuhJ-JWDS_aJr5JvnS8p-vk_Ni1WuRIuzLS6Bd8rEqFI7U2B2Z4NjeB9q1MtlzW_EbOJHOn6ahFPSFXp98ocVGxWlCMR5-sS53Et4J61BPJDaziWwBpYs5aYTSQjQIXJwSLCE7XTFk5v71IRFEHJb2igvj35jclwvufj1k2hsgXXlA0sYx3Xe6ZRFex1cWo9Vs7r4USV9SKhB0ehtrZ2qCCHZALMWcPfBNeO3skA',
    featuredProduct: PRODUCTS[2],
    badge: 'TECH GURUS',
    liveDiscountText: '15% COINS'
  },
  {
    id: 'live-3',
    title: 'Nissin Supermarket Cook-Off: Spiciest Laksa Hacks!',
    hostName: 'FoodieSG Official',
    viewers: '1.9k',
    likes: 8700,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4jskZmsb_8xRXboQI1Zkn0CEZ0T-Ym8Djj823KSEhsv9bABIcJzCth6dmPcLPv1RZuPPLHI4_9F1IZZqdx-rZ5oDBp9Ta3FTdodZ3emh2f-YeqSMJoMwZyFA-dxToZENk53TZe_E00jK8zN8eIbYRMhkR4t5A_NKAJe8f2tolAZ4AGECMdnhrHHM6iSur-NpQdFt6seSB4_nfp-7PxtkNhRFu7SnTyP05vfH5OCEH4t-XkoIJFpqx',
    featuredProduct: PRODUCTS[3],
    badge: 'SUPERMARKET',
    liveDiscountText: 'BUY 1 FREE 1'
  }
];

export const INITIAL_CART_ITEMS = [
  {
    id: 'cart-1',
    product: PRODUCTS[0],
    quantity: 1,
    selectedOption: 'Matte Black (SG 3-Pin)',
    selected: true
  },
  {
    id: 'cart-2',
    product: PRODUCTS[4],
    quantity: 2,
    selectedOption: 'Cream Beige 500ml',
    selected: true
  }
];
