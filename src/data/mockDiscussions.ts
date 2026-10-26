import { DiscussionPost } from '../types';

export const INITIAL_DISCUSSIONS: Record<string, DiscussionPost[]> = {
  // 1. UGREEN 65W GaN Fast Charger
  'prod-1': [
    {
      id: 'ugreen-p1',
      productId: 'prod-1',
      authorName: 'Marcus Lim (Bedok)',
      authorAvatar: '👨🏻‍💻',
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
      authorName: 'Cheryl W. (Tampines)',
      authorAvatar: '👩🏻',
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
      authorName: 'David K. (Jurong West)',
      authorAvatar: '⚡',
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
      authorName: 'Kelvin Goh',
      authorAvatar: '🔌',
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

  // 2. Ergonomic Mesh Office Chair
  'prod-2': [
    {
      id: 'chair-p1',
      productId: 'prod-2',
      authorName: 'Sarah Teo (Bishan)',
      authorAvatar: '👩🏻‍💼',
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
      authorName: 'Benjamin Ong (Yishun)',
      authorAvatar: '🛠️',
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
    },
    {
      id: 'chair-p2',
      productId: 'prod-2',
      authorName: 'Lucas Koh',
      authorAvatar: '🖥️',
      date: '3 weeks ago',
      sentiment: 'positive',
      rating: 4,
      answers: {
        matchedDescription: 'Matches listing description',
        qualitySize: 'Good recline angle',
        wouldBuyAgain: 'Yes'
      },
      content: 'The 135 degree tilt lock is great for taking power naps between video calls. Silent wheels do not scratch my vinyl flooring.',
      agreeCount: 6,
      disagreeCount: 1,
      isHelpful: false
    }
  ],

  // 3. Sony WH-1000XM5
  'prod-3': [
    {
      id: 'sony-p1',
      productId: 'prod-3',
      authorName: 'Bryan Chen (Sengkang)',
      authorAvatar: '🎧',
      date: '4 days ago',
      sentiment: 'positive',
      rating: 5,
      answers: {
        matchedDescription: 'Official SG Set with warranty registered',
        qualitySize: 'Featherlight & ultra-comfortable earcups',
        wouldBuyAgain: 'Yes, ANC benchmark'
      },
      content: 'Noise cancellation completely mutes MRT train noise and office chatter! Microphone clarity on Zoom calls is significantly improved compared to the XM4. Battery easily lasts the whole work week.',
      agreeCount: 22,
      disagreeCount: 1,
      isHelpful: true,
      sellerReply: {
        sellerName: 'Sony Official Store',
        verified: true,
        date: '3 days ago',
        content: 'Glad you are enjoying the industry-leading ANC on your MRT commutes, Bryan! Enjoy the LDAC Hi-Res audio!'
      }
    },
    {
      id: 'sony-c1',
      productId: 'prod-3',
      authorName: 'Eileen Toh',
      authorAvatar: '✈️',
      date: '10 days ago',
      sentiment: 'critical',
      rating: 3,
      answers: {
        matchedDescription: 'Headband does not fold compactly',
        qualitySize: 'Bulky carrying case',
        wouldBuyAgain: 'Would consider XM4 instead for travel'
      },
      content: 'Unlike the XM4, the XM5 cannot fold inwards into a small ball! The carrying case takes up huge space in my backpack. Also auto-ANC occasionally shifts levels unexpectedly in windy places.',
      agreeCount: 15,
      disagreeCount: 2,
      isHelpful: true,
      isDispute: true,
      sellerReply: {
        sellerName: 'Sony Official Store',
        verified: true,
        date: '9 days ago',
        content: 'Hi Eileen, the new frictionless stepless headband was engineered for reduced head clamping pressure and acoustic seal. You can disable Adaptive Sound Control in the Sony Headphones app to lock ANC to maximum.'
      }
    }
  ],

  // 4. Nissin Instant Cup Noodles Laksa
  'prod-4': [
    {
      id: 'laksa-p1',
      productId: 'prod-4',
      authorName: 'Felicia Ng (Ang Mo Kio)',
      authorAvatar: '🍜',
      date: '6 days ago',
      sentiment: 'positive',
      rating: 5,
      answers: {
        matchedDescription: 'Authentic local SG laksa broth taste',
        qualitySize: 'Full carton of 12 arrived fresh',
        wouldBuyAgain: 'Every month regular staple!'
      },
      content: 'The coconut milk powder packet and sambal paste give this cup noodles the closest taste to Katong Laksa! Noodles stay springy even after 4 minutes. Super quick supper fix.',
      agreeCount: 17,
      disagreeCount: 0,
      isHelpful: true
    },
    {
      id: 'laksa-c1',
      productId: 'prod-4',
      authorName: 'Jeremy Tan',
      authorAvatar: '🌶️',
      date: '2 weeks ago',
      sentiment: 'critical',
      rating: 3,
      answers: {
        matchedDescription: 'Slightly higher sodium',
        qualitySize: 'Carton arrived slightly dented',
        wouldBuyAgain: 'Yes, but handle delivery better'
      },
      content: 'Taste is delicious but 2 out of the 12 paper cups were slightly crushed on the side during courier delivery. Broth is also on the saltier side so use 80% of the soup base powder.',
      agreeCount: 11,
      disagreeCount: 1,
      isHelpful: true,
      isDispute: true,
      sellerReply: {
        sellerName: 'Shopee Supermarket',
        verified: true,
        date: '13 days ago',
        content: 'Dear Jeremy, we apologize for the parcel handling by the third-party logistics. We have credited a $3 Supermarket voucher to your wallet and updated our carton corner protectors.'
      }
    }
  ],

  // 5. Japanese Thermal Tumbler 500ml
  'prod-5': [
    {
      id: 'tumbler-p1',
      productId: 'prod-5',
      authorName: 'Zoe Wong (Pasir Ris)',
      authorAvatar: '☕',
      date: '1 week ago',
      sentiment: 'positive',
      rating: 5,
      answers: {
        matchedDescription: 'Color is lovely cream beige',
        qualitySize: 'True 500ml, fits car cup holders',
        wouldBuyAgain: 'Already gifted one to my colleague'
      },
      content: 'Put iced Americano at 8am, ice cubes were still rattling inside at 5pm in my aircon office! No condensation on the outside whatsoever. Spout is easy to drink from.',
      agreeCount: 14,
      disagreeCount: 0,
      isHelpful: true
    },
    {
      id: 'tumbler-c1',
      productId: 'prod-5',
      authorName: 'Darren Lee',
      authorAvatar: '🍵',
      date: '2 weeks ago',
      sentiment: 'critical',
      rating: 2,
      answers: {
        matchedDescription: 'Lid silicone ring requires careful cleaning',
        qualitySize: 'Paint can scratch if dropped on concrete',
        wouldBuyAgain: 'No'
      },
      content: 'If you drink milk tea or latte, the silicone gasket absorbs the smell unless you remove and boil it. Lid lock also popped open once inside my tote bag.',
      agreeCount: 10,
      disagreeCount: 2,
      isHelpful: true,
      isDispute: true,
      sellerReply: {
        sellerName: 'MujiStyle Living SG',
        verified: true,
        date: '12 days ago',
        content: 'Hello Darren, please ensure the safety latch is clicked UP into the locked position when inside bags. Replacement food-grade silicone rings are available upon request!'
      }
    }
  ],

  // 6. Logitech MX Master 3S
  'prod-6': [
    {
      id: 'mx-p1',
      productId: 'prod-6',
      authorName: 'Adrian Sim (Novena)',
      authorAvatar: '🖱️',
      date: '3 days ago',
      sentiment: 'positive',
      rating: 5,
      answers: {
        matchedDescription: 'Genuine Logitech SG warranty unit',
        qualitySize: 'Ergonomic palm support for long hours',
        wouldBuyAgain: 'Yes, unmatched productivity mouse'
      },
      content: 'The Quiet Clicks are amazing—silent in quiet conference rooms! MagSpeed electromagnetic scroll wheel lets me fly through 5,000-row Excel spreadsheets effortlessly. USB-C battery lasts months.',
      agreeCount: 19,
      disagreeCount: 0,
      isHelpful: true,
      sellerReply: {
        sellerName: 'Logitech Official Store',
        verified: true,
        date: '2 days ago',
        content: 'Thank you Adrian! The 8,000 DPI sensor also works seamlessly on glass tables without a mousepad.'
      }
    },
    {
      id: 'mx-c1',
      productId: 'prod-6',
      authorName: 'Valerie Koh',
      authorAvatar: '👩🏻‍💻',
      date: '1 week ago',
      sentiment: 'critical',
      rating: 3,
      answers: {
        matchedDescription: 'Right-handed only silhouette',
        qualitySize: 'A bit heavy for smaller hands',
        wouldBuyAgain: 'Would consider MX Anywhere 3S instead'
      },
      content: 'Great mouse if you have medium-to-large hands, but as a petite female with smaller hands my wrist gets strained after 4 hours of design work. Also no Bluetooth button on top, it is underneath.',
      agreeCount: 13,
      disagreeCount: 1,
      isHelpful: true,
      isDispute: true,
      sellerReply: {
        sellerName: 'Logitech Official Store',
        verified: true,
        date: '6 days ago',
        content: 'Hi Valerie, for compact hands we specifically recommend the Logitech MX Anywhere 3S or Lift Vertical Ergonomic series! Feel free to chat us for an exchange recommendation.'
      }
    }
  ]
};

// Fallback template for any other product
export const getFallbackDiscussions = (productId: string, productName: string): DiscussionPost[] => [
  {
    id: `${productId}-f-p1`,
    productId,
    authorName: 'Justin Tan (SG)',
    authorAvatar: '⭐️',
    date: '3 days ago',
    sentiment: 'positive',
    rating: 5,
    answers: {
      matchedDescription: 'Matches photos & specifications',
      qualitySize: 'Very solid build for the price',
      wouldBuyAgain: 'Yes, good value for money'
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
    authorName: 'Samantha Lee',
    authorAvatar: '📦',
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
