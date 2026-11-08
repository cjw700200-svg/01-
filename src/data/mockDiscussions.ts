import { DiscussionPost } from '../types';

export const INITIAL_DISCUSSIONS: Record<string, DiscussionPost[]> = {
  // 1. UGREEN 65W GaN Fast Charger (Electronics)
  'prod-1': [
    {
      id: 'ugreen-p1',
      productId: 'prod-1',
      productName: 'UGREEN 65W GaN Fast Charger USB C 3-Port Laptop Adapter',
      productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS2dN2s8loa1JMOWczYIG-6OZLp_38szT7s3kQFkPSVv5cV6K6EbbpPD0FRpIqRuYrqpqYlWg93PuQojIozLN6fHWRWqSWsaNjzEMZjL4gWLMKECVFpE6h20MUbt2i6cv6-1lWBQmBj4TBTOPFkwYzjBewWn4vCNdT8Da-espiLVSoZ41JsB0GGdMYR9EBFRqEv_wVuO5YDdeXVeaEEMTzyiqO0YfWCtSfx_94cqtOOMeRNcWOY4Ei',
      category: 'Electronics',
      authorName: 'Marcus Lim (Bedok)',
      authorAvatar: '👨🏻‍💻',
      authorTier: 'Gold',
      date: '3 days ago',
      sentiment: 'positive',
      rating: 5,
      answers: {
        matchedDescription: '100% matched, authentic SG 3-pin plug',
        qualitySize: 'Very compact GaN II, solid matte finish',
        wouldBuyAgain: 'Yes, buying a second one for office'
      },
      content: 'Charges my M2 MacBook Air and iPhone 16 simultaneously at full speed without getting uncomfortably warm. Safety Mark sticker is authentic SG verified. Much lighter than the official Apple brick for travel.',
      agreeCount: 16,
      disagreeCount: 1,
      isHelpful: true,
      sellerReply: {
        sellerName: 'UGREEN Official Store',
        verified: true,
        date: '2 days ago',
        content: 'Hi Marcus! Thank you for trusting UGREEN Singapore. Our Nexode GaN chargers undergo strict PSB Singapore safety certification.'
      }
    },
    {
      id: 'ugreen-c1',
      productId: 'prod-1',
      productName: 'UGREEN 65W GaN Fast Charger USB C 3-Port Laptop Adapter',
      productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS2dN2s8loa1JMOWczYIG-6OZLp_38szT7s3kQFkPSVv5cV6K6EbbpPD0FRpIqRuYrqpqYlWg93PuQojIozLN6fHWRWqSWsaNjzEMZjL4gWLMKECVFpE6h20MUbt2i6cv6-1lWBQmBj4TBTOPFkwYzjBewWn4vCNdT8Da-espiLVSoZ41JsB0GGdMYR9EBFRqEv_wVuO5YDdeXVeaEEMTzyiqO0YfWCtSfx_94cqtOOMeRNcWOY4Ei',
      category: 'Electronics',
      authorName: 'Cheryl W. (Tampines)',
      authorAvatar: '👩🏻',
      authorTier: 'Silver',
      date: '1 week ago',
      sentiment: 'critical',
      rating: 2,
      answers: {
        matchedDescription: 'Port speed allocation was confusing',
        qualitySize: 'Heavy on loose wall sockets',
        wouldBuyAgain: 'No, looking for desktop dock instead'
      },
      content: 'When you plug in a second device, the first device momentarily disconnects for 2 seconds to renegotiate wattage. Caused my external display to flicker off briefly. Also quite bulky on vertical wall sockets.',
      agreeCount: 12,
      disagreeCount: 2,
      isHelpful: true,
      isDispute: true,
      sellerReply: {
        sellerName: 'UGREEN Official Store',
        verified: true,
        date: '6 days ago',
        content: 'Dear Cheryl, power reallocation (handshake) is standard safety protocol in all multi-port GaN adapters to prevent overcurrent. For monitors we recommend dedicated fixed-wattage ports!'
      }
    },
    {
      id: 'ugreen-p2',
      productId: 'prod-1',
      productName: 'UGREEN 65W GaN Fast Charger USB C 3-Port Laptop Adapter',
      productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS2dN2s8loa1JMOWczYIG-6OZLp_38szT7s3kQFkPSVv5cV6K6EbbpPD0FRpIqRuYrqpqYlWg93PuQojIozLN6fHWRWqSWsaNjzEMZjL4gWLMKECVFpE6h20MUbt2i6cv6-1lWBQmBj4TBTOPFkwYzjBewWn4vCNdT8Da-espiLVSoZ41JsB0GGdMYR9EBFRqEv_wVuO5YDdeXVeaEEMTzyiqO0YfWCtSfx_94cqtOOMeRNcWOY4Ei',
      category: 'Electronics',
      authorName: 'David K. (Jurong West)',
      authorAvatar: '⚡',
      authorTier: 'Bronze',
      date: '2 weeks ago',
      sentiment: 'positive',
      rating: 5,
      answers: {
        matchedDescription: 'Completely accurate',
        qualitySize: 'Pocket size, premium matte black',
        wouldBuyAgain: 'Yes, highly recommended'
      },
      content: 'Tested with USB power meter: delivers genuine 65W PD 3.0 on Port C1. SG 3-pin plug does not wobble in wall sockets like cheap adapters do.',
      agreeCount: 7,
      disagreeCount: 0,
      isHelpful: false
    },
    {
      id: 'ugreen-c2',
      productId: 'prod-1',
      productName: 'UGREEN 65W GaN Fast Charger USB C 3-Port Laptop Adapter',
      productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS2dN2s8loa1JMOWczYIG-6OZLp_38szT7s3kQFkPSVv5cV6K6EbbpPD0FRpIqRuYrqpqYlWg93PuQojIozLN6fHWRWqSWsaNjzEMZjL4gWLMKECVFpE6h20MUbt2i6cv6-1lWBQmBj4TBTOPFkwYzjBewWn4vCNdT8Da-espiLVSoZ41JsB0GGdMYR9EBFRqEv_wVuO5YDdeXVeaEEMTzyiqO0YfWCtSfx_94cqtOOMeRNcWOY4Ei',
      category: 'Electronics',
      authorName: 'Kelvin Goh',
      authorAvatar: '🔌',
      authorTier: 'Bronze',
      date: '3 weeks ago',
      sentiment: 'critical',
      rating: 3,
      answers: {
        matchedDescription: 'Does not include 100W cable in box',
        qualitySize: 'Charger only',
        wouldBuyAgain: 'Maybe if bundled with cable'
      },
      content: 'Remember you must buy your own 100W rated E-marker cable separately to get full speed, ordinary phone cables will cap out at 18W.',
      agreeCount: 9,
      disagreeCount: 1,
      isHelpful: false
    }
  ],

  // 2. Ergonomic Mesh Office Chair (Home)
  'prod-2': [
    {
      id: 'chair-p1',
      productId: 'prod-2',
      productName: 'Ergonomic Mesh Office Chair with Lumbar Support High Back',
      productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1SLqVlUxgncraEngFDmi1DwVxOR9YlUgUZx1J5uiLfnfFCniDLOrr_qyTFKP-yaO0anzYAMR0sCwflahrGgvZ4D2vSvM5zaqq4oJUZZpGp07zMsOvtmfo7tSGN5BLhQb0ZAsh1VMJfqhv1xgKtv3uOwj4I_ceCVoCB64f5wCp0C3Kn-EZA-nl3Dgym7UMNjIer-S117oRXc-3wBNDVEkHelZOFMBqA5UkJsLE27uFFXXvI04w3k_A',
      category: 'Home',
      authorName: 'Sarah Teo (Bishan)',
      authorAvatar: '👩🏻‍💼',
      authorTier: 'Gold',
      date: '5 days ago',
      sentiment: 'positive',
      rating: 5,
      answers: {
        matchedDescription: 'Exactly matches SG WFH specs',
        qualitySize: 'Breathable Korean mesh, fits 165cm-180cm',
        wouldBuyAgain: 'Yes, saved my lower back pain'
      },
      content: 'Best WFH investment under $100! In our hot SG humid weather, leather chairs are a nightmare. This mesh back keeps your back completely cool and the 3D lumbar support is firm.',
      agreeCount: 18,
      disagreeCount: 0,
      isHelpful: true,
      sellerReply: {
        sellerName: 'ComfortZone SG',
        verified: true,
        date: '4 days ago',
        content: 'Thank you Sarah! Glad our ergonomic lumbar design provides relief for your WFH hours.'
      }
    },
    {
      id: 'chair-c1',
      productId: 'prod-2',
      productName: 'Ergonomic Mesh Office Chair with Lumbar Support High Back',
      productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1SLqVlUxgncraEngFDmi1DwVxOR9YlUgUZx1J5uiLfnfFCniDLOrr_qyTFKP-yaO0anzYAMR0sCwflahrGgvZ4D2vSvM5zaqq4oJUZZpGp07zMsOvtmfo7tSGN5BLhQb0ZAsh1VMJfqhv1xgKtv3uOwj4I_ceCVoCB64f5wCp0C3Kn-EZA-nl3Dgym7UMNjIer-S117oRXc-3wBNDVEkHelZOFMBqA5UkJsLE27uFFXXvI04w3k_A',
      category: 'Home',
      authorName: 'Benjamin Ong (Yishun)',
      authorAvatar: '🛠️',
      authorTier: 'Silver',
      date: '2 weeks ago',
      sentiment: 'critical',
      rating: 2,
      answers: {
        matchedDescription: 'Assembly instructions were unclear',
        qualitySize: 'Armrests feel somewhat plasticky',
        wouldBuyAgain: 'Probably would pay more for pre-assembled'
      },
      content: 'Assembly took nearly 45 minutes because screw holes on the lumbar bracket did not align properly without applying heavy force. Armrests also lack 3D rotation.',
      agreeCount: 14,
      disagreeCount: 3,
      isHelpful: true,
      isDispute: true,
      sellerReply: {
        sellerName: 'ComfortZone SG',
        verified: true,
        date: '12 days ago',
        content: 'Hi Benjamin, as noted in the manual, bolts must be tightened loosely first before tightening all 4 uniformly. We have sent our video assembly walkthrough to your Shopee chat!'
      }
    }
  ],

  // 3. Sony WH-1000XM5 Wireless Headphones (Electronics)
  'prod-3': [
    {
      id: 'sony-p1',
      productId: 'prod-3',
      productName: 'Sony WH-1000XM5 Wireless Noise-Cancelling Headphones Black',
      productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEuYfmEx1OqlLhkuhJ-JWDS_aJr5JvnS8p-vk_Ni1WuRIuzLS6Bd8rEqFI7U2B2Z4NjeB9q1MtlzW_EbOJHOn6ahFPSFXp98ocVGxWlCMR5-sS53Et4J61BPJDaziWwBpYs5aYTSQjQIXJwSLCE7XTFk5v71IRFEHJb2igvj35jclwvufj1k2hsgXXlA0sYx3Xe6ZRFex1cWo9Vs7r4USV9SKhB0ehtrZ2qCCHZALMWcPfBNeO3skA',
      category: 'Electronics',
      authorName: 'Leonard Tan (Novena)',
      authorAvatar: '🎧',
      authorTier: 'Gold',
      date: '4 days ago',
      sentiment: 'positive',
      rating: 5,
      answers: {
        matchedDescription: '100% Genuine SG Sony unit',
        qualitySize: 'Super lightweight carbon-look cups',
        wouldBuyAgain: 'Yes, best ANC on the market'
      },
      content: 'ANC completely silences the North-South MRT line rumble. Microphone quality in Zoom conference calls is vastly superior to XM4. 30 hour battery actually lasts all week without top-up.',
      agreeCount: 22,
      disagreeCount: 1,
      isHelpful: true,
      sellerReply: {
        sellerName: 'Sony Official Store',
        verified: true,
        date: '3 days ago',
        content: 'Thank you Leonard! Register your warranty on MySony SG for an additional 3-month coverage.'
      }
    },
    {
      id: 'sony-c1',
      productId: 'prod-3',
      productName: 'Sony WH-1000XM5 Wireless Noise-Cancelling Headphones Black',
      productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEuYfmEx1OqlLhkuhJ-JWDS_aJr5JvnS8p-vk_Ni1WuRIuzLS6Bd8rEqFI7U2B2Z4NjeB9q1MtlzW_EbOJHOn6ahFPSFXp98ocVGxWlCMR5-sS53Et4J61BPJDaziWwBpYs5aYTSQjQIXJwSLCE7XTFk5v71IRFEHJb2igvj35jclwvufj1k2hsgXXlA0sYx3Xe6ZRFex1cWo9Vs7r4USV9SKhB0ehtrZ2qCCHZALMWcPfBNeO3skA',
      category: 'Electronics',
      authorName: 'Vanessa Low (Clementi)',
      authorAvatar: '✈️',
      authorTier: 'Silver',
      date: '1 week ago',
      sentiment: 'critical',
      rating: 3,
      answers: {
        matchedDescription: 'Cannot fold hinges like XM4',
        qualitySize: 'Carrying case is bulky',
        wouldBuyAgain: 'Would reconsider for frequent flights'
      },
      content: 'Sound quality is heavenly, but disappointed that Sony removed folding hinges. The hard case takes up half my backpack carry-on space when travelling. Also ear cushions can feel sweaty during afternoon walks.',
      agreeCount: 15,
      disagreeCount: 2,
      isHelpful: true,
      isDispute: false
    }
  ],

  // 4. Nissin Instant Cup Noodles Laksa (Groceries)
  'prod-4': [
    {
      id: 'nissin-p1',
      productId: 'prod-4',
      productName: 'Nissin Instant Cup Noodles Laksa Flavour Pack of 12',
      productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4jskZmsb_8xRXboQI1Zkn0CEZ0T-Ym8Djj823KSEhsv9bABIcJzCth6dmPcLPv1RZuPPLHI4_9F1IZZqdx-rZ5oDBp9Ta3FTdodZ3emh2f-YeqSMJoMwZyFA-dxToZENk53TZe_E00jK8zN8eIbYRMhkR4t5A_NKAJe8f2tolAZ4AGECMdnhrHHM6iSur-NpQdFt6seSB4_nfp-7PxtkNhRFu7SnTyP05vfH5OCEH4t-XkoIJFpqx',
      category: 'Groceries',
      authorName: 'Uncle Raymond (Katong)',
      authorAvatar: '🍜',
      authorTier: 'Gold',
      date: '2 days ago',
      sentiment: 'positive',
      rating: 5,
      answers: {
        matchedDescription: 'Rich authentic coconut broth',
        qualitySize: 'Standard 75g cup, 12 in carton',
        wouldBuyAgain: 'Always keep a carton at home'
      },
      content: 'The holy grail of SG cup noodles. Rich coconut laksa broth with real dried shrimp and fragrant laksa leaves oil sachet. Delivered next morning in sturdy Shopee carton box.',
      agreeCount: 29,
      disagreeCount: 0,
      isHelpful: true
    },
    {
      id: 'nissin-c1',
      productId: 'prod-4',
      productName: 'Nissin Instant Cup Noodles Laksa Flavour Pack of 12',
      productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4jskZmsb_8xRXboQI1Zkn0CEZ0T-Ym8Djj823KSEhsv9bABIcJzCth6dmPcLPv1RZuPPLHI4_9F1IZZqdx-rZ5oDBp9Ta3FTdodZ3emh2f-YeqSMJoMwZyFA-dxToZENk53TZe_E00jK8zN8eIbYRMhkR4t5A_NKAJe8f2tolAZ4AGECMdnhrHHM6iSur-NpQdFt6seSB4_nfp-7PxtkNhRFu7SnTyP05vfH5OCEH4t-XkoIJFpqx',
      category: 'Groceries',
      authorName: 'Gillian P.',
      authorAvatar: '🧂',
      authorTier: 'Bronze',
      date: '1 week ago',
      sentiment: 'critical',
      rating: 3,
      answers: {
        matchedDescription: 'High sodium content',
        qualitySize: 'Cups arrived slightly dented',
        wouldBuyAgain: 'Prefer lower sodium version'
      },
      content: 'Tastes shiok but sodium is 1,820mg per cup—almost 90% of daily recommended intake! If you have hypertension, only add half the soup powder packet. Two cups had squashed paper lids from shipping.',
      agreeCount: 13,
      disagreeCount: 4,
      isHelpful: true,
      sellerReply: {
        sellerName: 'Shopee Supermarket',
        verified: true,
        date: '5 days ago',
        content: 'Dear Gillian, thank you for your health reminder and feedback. We have credited 200 Shopee Coins for the two dented cups. We will pack with extra honeycomb wrap!'
      }
    }
  ],

  // 5. High-Tech Multi-Functional Air Styler (Beauty)
  'prod-5': [
    {
      id: 'beauty-p1',
      productId: 'prod-5',
      productName: 'High-Tech Multi-Functional Air Styler & Blow Dryer Wand',
      productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR8nsUsllLGML_VugM2boqrbMr-YPVc-PjvS74wEw9aNGukvns0rBVBgSBpSrPjRDH_jNOOItpKJr7sdIIHt8AeosO_EnEu4PUWG6Bjt3a2A2iHYzOzEyxyfLDvhf9ONAaSstoBbmzQhLkZ_cjcG5t6uNVK0ClkEVynbmGBm4v5E4D5jDFhlV1XxqjFmI2zQXXK8RzRnH7uokidaHpeOdnjqhaeSFfoR3sLCC1kUYS_Z7iXZfvLa7s',
      category: 'Beauty',
      authorName: 'Chloe Ng (Marine Parade)',
      authorAvatar: '✨',
      authorTier: 'Gold',
      date: '6 days ago',
      sentiment: 'positive',
      rating: 5,
      answers: {
        matchedDescription: 'Functions very close to 4-digit luxury wand',
        qualitySize: 'Compact, 5 magnetic nozzles',
        wouldBuyAgain: '100% recommended for frizzy hair'
      },
      content: 'Coanda airflow effect really wraps hair strands automatically without scorching heat. Dries shoulder-length hair in 6 minutes flat. Barrel curls hold through SG humidity with a bit of spray.',
      agreeCount: 19,
      disagreeCount: 1,
      isHelpful: true,
      sellerReply: {
        sellerName: 'G*** Glamour SG',
        verified: true,
        date: '5 days ago',
        content: 'Thank you Chloe for sharing your styling technique! Have fun with the volumizing barrel.'
      }
    },
    {
      id: 'beauty-c1',
      productId: 'prod-5',
      productName: 'High-Tech Multi-Functional Air Styler & Blow Dryer Wand',
      productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR8nsUsllLGML_VugM2boqrbMr-YPVc-PjvS74wEw9aNGukvns0rBVBgSBpSrPjRDH_jNOOItpKJr7sdIIHt8AeosO_EnEu4PUWG6Bjt3a2A2iHYzOzEyxyfLDvhf9ONAaSstoBbmzQhLkZ_cjcG5t6uNVK0ClkEVynbmGBm4v5E4D5jDFhlV1XxqjFmI2zQXXK8RzRnH7uokidaHpeOdnjqhaeSFfoR3sLCC1kUYS_Z7iXZfvLa7s',
      category: 'Beauty',
      authorName: 'Rachel Tham (Sengkang)',
      authorAvatar: '💇🏻‍♀️',
      authorTier: 'Bronze',
      date: '2 weeks ago',
      sentiment: 'critical',
      rating: 2,
      answers: {
        matchedDescription: 'Handle gets warm on High speed',
        qualitySize: 'Motor noise is high-pitched',
        wouldBuyAgain: 'No, returned'
      },
      content: 'Motor pitch is quite shrill on maximum heat setting. After 15 minutes of curling, the upper plastic barrel collar gets very hot to twist off. Better suited for shorter hair styling sessions.',
      agreeCount: 11,
      disagreeCount: 3,
      isHelpful: true,
      isDispute: true,
      sellerReply: {
        sellerName: 'G*** Glamour SG',
        verified: true,
        date: '10 days ago',
        content: 'Dear Rachel, please use the cool-tip touch ring when swapping hot attachment heads. The thermal cut-off sensor ensures temperature stays safely below 110°C.'
      }
    }
  ],

  // 6. Oversized Breathable Cotton Tee (Fashion)
  'prod-6': [
    {
      id: 'fashion-p1',
      productId: 'prod-6',
      productName: 'Korean Oversized Heavyweight Cotton Graphic Tee',
      productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRfJnIT69gcv1NhVqlF2jVDFEK2pDVavVZCcn7Rj7j6Yu8doTOKz8ToaynDB8C1SUsKzZLPaTP1OoAwWtkuHHs-0fCT7c_C-ggjDaKp6NmwpOzf8qAEuHdLUwOcruS5vo5nJtSicRfJaykcNDcml0ZZXtyzcraSUNGZRaG_RaZ519p1FwDrVB6cbCW1M5G8WHkUr0C8LhnC4U0_VSmE0Mi7YyGRzPHuOxs7UN4SERE-54TACLicab3',
      category: 'Fashion',
      authorName: 'Jayden Lee (Tanjong Pagar)',
      authorAvatar: '👕',
      authorTier: 'Silver',
      date: '3 days ago',
      sentiment: 'positive',
      rating: 5,
      answers: {
        matchedDescription: '260 GSM thick cotton, no see-through',
        qualitySize: 'Boxy drop-shoulder cut, size down for slim fit',
        wouldBuyAgain: 'Ordered 2 more colors already'
      },
      content: 'Solid heavyweight cotton that does not shrink or bacon collar in washing machine. Breathable enough for SG weather despite 260 GSM thickness. Screen print is crisp rubberised ink.',
      agreeCount: 17,
      disagreeCount: 0,
      isHelpful: true
    },
    {
      id: 'fashion-c1',
      productId: 'prod-6',
      productName: 'Korean Oversized Heavyweight Cotton Graphic Tee',
      productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRfJnIT69gcv1NhVqlF2jVDFEK2pDVavVZCcn7Rj7j6Yu8doTOKz8ToaynDB8C1SUsKzZLPaTP1OoAwWtkuHHs-0fCT7c_C-ggjDaKp6NmwpOzf8qAEuHdLUwOcruS5vo5nJtSicRfJaykcNDcml0ZZXtyzcraSUNGZRaG_RaZ519p1FwDrVB6cbCW1M5G8WHkUr0C8LhnC4U0_VSmE0Mi7YyGRzPHuOxs7UN4SERE-54TACLicab3',
      category: 'Fashion',
      authorName: 'Darren Soh',
      authorAvatar: '📏',
      authorTier: 'Bronze',
      date: '1 week ago',
      sentiment: 'critical',
      rating: 3,
      answers: {
        matchedDescription: 'Extremely oversized sizing chart',
        qualitySize: 'Size L wears like XXL',
        wouldBuyAgain: 'Only if exchange policy is smoother'
      },
      content: 'Chart says Size L fits 175cm 70kg, but the chest width is 62cm which is gigantic. Collar is quite tight around the neck compared to the wide body. Definitely take 1 size down.',
      agreeCount: 14,
      disagreeCount: 2,
      isHelpful: true
    }
  ]
};

export const getAllDiscussions = (discussions: Record<string, DiscussionPost[]>): DiscussionPost[] => {
  const all: DiscussionPost[] = [];
  Object.values(discussions).forEach((posts) => {
    all.push(...posts);
  });
  return all;
};

export const getFallbackDiscussions = (productId: string, productName: string): DiscussionPost[] => [
  {
    id: `${productId}-f-p1`,
    productId,
    productName,
    category: 'Electronics',
    authorName: 'Justin Wong (Bukit Timah)',
    authorAvatar: '👍',
    authorTier: 'Gold',
    date: '3 days ago',
    sentiment: 'positive',
    rating: 5,
    answers: {
      matchedDescription: 'Exact match with specifications',
      qualitySize: 'Excellent finish and solid quality',
      wouldBuyAgain: 'Definitely yes'
    },
    content: `Really pleased with this ${productName}. Fast local dispatch to Singapore and authentic quality. Everything functions as advertised!`,
    agreeCount: 15,
    disagreeCount: 0,
    isHelpful: true,
    sellerReply: {
      sellerName: 'Official Flagship Store',
      verified: true,
      date: '2 days ago',
      content: 'Thank you Justin for supporting our SG store! Reach out if you need any warranty assistance.'
    }
  },
  {
    id: `${productId}-f-c1`,
    productId,
    productName,
    category: 'Electronics',
    authorName: 'Samantha Lee',
    authorAvatar: '📦',
    authorTier: 'Silver',
    date: '1 week ago',
    sentiment: 'critical',
    rating: 2,
    answers: {
      matchedDescription: 'Color slightly different in daylight',
      qualitySize: 'Outer packaging had slight creases',
      wouldBuyAgain: 'Only if on special flash deal'
    },
    content: `Expected slightly better build at this retail price point. Works fine overall, but delivery took 3 days instead of next day dispatch.`,
    agreeCount: 11,
    disagreeCount: 1,
    isHelpful: true,
    isDispute: true,
    sellerReply: {
      sellerName: 'Official Flagship Store',
      verified: true,
      date: '5 days ago',
      content: 'Dear Samantha, we sincerely apologize for the shipping delay during the Mega Sale surge. We are continuously improving our SG courier partner SLAs.'
    }
  }
];
