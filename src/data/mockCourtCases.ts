import { CourtCase } from '../types';

export const INITIAL_COURT_CASES: CourtCase[] = [
  {
    id: 'CC-8492',
    productId: 'prod-1',
    productName: 'UGREEN 65W GaN Fast Charger USB C 3-Port Laptop Adapter',
    productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS2dN2s8loa1JMOWczYIG-6OZLp_38szT7s3kQFkPSVv5cV6K6EbbpPD0FRpIqRuYrqpqYlWg93PuQojIozLN6fHWRWqSWsaNjzEMZjL4gWLMKECVFpE6h20MUbt2i6cv6-1lWBQmBj4TBTOPFkwYzjBewWn4vCNdT8Da-espiLVSoZ41JsB0GGdMYR9EBFRqEv_wVuO5YDdeXVeaEEMTzyiqO0YfWCtSfx_94cqtOOMeRNcWOY4Ei',
    productPrice: 32.90,
    category: 'Electronics',
    buyerName: 'J***n T. (+65 9***-1824)',
    sellerName: 'U*** Official SG Store',
    shippingAddress: 'Blk *** Bedok North Ave 3, #**-104, Singapore',
    createdAt: '1 day ago',
    closesInDays: 3,
    buyerClaim: 'Charger overheated to over 60°C after just 12 minutes of use with MacBook Pro, and port C1 completely stopped charging. Seller refused refund stating that charger was unsealed and claiming heat is normal. Photos clearly show scorch mark and zero voltage on USB meter.',
    photos: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDCqnzqbyLNG5eSK-wA-o3z38S6X_bhlgbVwi0FdvjCD-CLK71jbIzXTcvh5HhKDIbyjA3uhqzADYt80MiuPgAmmzO1x0zdB6KDaYrV85pG7G_Dniu61L6D4j9Nd_Jvy4_zFMuLymWm9S-V7mW2eC2iHZGhcdasZOfOuNOrvd8v-E4xL99OexXUN-NadNybt61cKjFHc_b-81VkvrSIwDWmgC2-Rwgw56DoB0O5iq5bro4SvQeRbHQv',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDS2dN2s8loa1JMOWczYIG-6OZLp_38szT7s3kQFkPSVv5cV6K6EbbpPD0FRpIqRuYrqpqYlWg93PuQojIozLN6fHWRWqSWsaNjzEMZjL4gWLMKECVFpE6h20MUbt2i6cv6-1lWBQmBj4TBTOPFkwYzjBewWn4vCNdT8Da-espiLVSoZ41JsB0GGdMYR9EBFRqEv_wVuO5YDdeXVeaEEMTzyiqO0YfWCtSfx_94cqtOOMeRNcWOY4Ei'
    ],
    chatExcerpt: [
      {
        sender: 'buyer',
        senderName: 'Buyer (J***n T.)',
        text: 'Hi seller, the 65W charger gets boiling hot to touch after 10 mins and port C1 completely stopped charging my laptop.',
        time: 'Oct 28, 14:12'
      },
      {
        sender: 'seller',
        senderName: 'Seller (U*** Official)',
        text: 'Hi buyer, fast charging generates natural warmth. As per our store warranty policy, packaging has been opened so item cannot be returned or refunded.',
        time: 'Oct 28, 14:25'
      },
      {
        sender: 'buyer',
        senderName: 'Buyer (J***n T.)',
        text: 'Port C1 is completely dead, it does not output any power! I tested with 3 cables and took multimeter readings. This is a defective unit, not normal heating.',
        time: 'Oct 28, 14:32'
      },
      {
        sender: 'seller',
        senderName: 'Seller (U*** Official)',
        text: 'We tested all units before sending. Defect not covered if used with non-certified cables. Please contact manufacturer directly.',
        time: 'Oct 28, 14:48'
      }
    ],
    sellerStatement: {
      hasReplied: true,
      statement: 'Buyer appears to be using an uncertified third-party cable which may have caused a port handshake short circuit. Our GaN chargers are PSB Singapore Safety Mark verified. Shop policy states open-box items with suspected user-induced shorts are not eligible for direct shop returns.',
      repliedDate: 'Yesterday at 4:15 PM'
    },
    votes: {
      buyerRight: 842,
      sellerRight: 295,
      notEnoughInfo: 98
    },
    userVote: null,
    status: 'voting'
  },
  {
    id: 'CC-9104',
    productId: 'prod-2',
    productName: 'Ergonomic Mesh Office Chair with Lumbar Support High Back',
    productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1SLqVlUxgncraEngFDmi1DwVxOR9YlUgUZx1J5uiLfnfFCniDLOrr_qyTFKP-yaO0anzYAMR0sCwflahrGgvZ4D2vSvM5zaqq4oJUZZpGp07zMsOvtmfo7tSGN5BLhQb0ZAsh1VMJfqhv1xgKtv3uOwj4I_ceCVoCB64f5wCp0C3Kn-EZA-nl3Dgym7UMNjIer-S117oRXc-3wBNDVEkHelZOFMBqA5UkJsLE27uFFXXvI04w3k_A',
    productPrice: 89.00,
    category: 'Home',
    buyerName: 'M***k L. (+65 8***-9921)',
    sellerName: 'C***Zone SG Store',
    shippingAddress: 'Blk *** Jurong West St 42, #**-88, Singapore',
    createdAt: '2 days ago',
    closesInDays: 3,
    buyerClaim: 'Chair armrest was snapped in half upon opening box, and missing 2 key hex screws. Seller claims courier damage is not seller liability and told me to lodge claim with SingPost myself. SingPost replied seller packed in flimsy bubble wrap without internal foam.',
    photos: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC1SLqVlUxgncraEngFDmi1DwVxOR9YlUgUZx1J5uiLfnfFCniDLOrr_qyTFKP-yaO0anzYAMR0sCwflahrGgvZ4D2vSvM5zaqq4oJUZZpGp07zMsOvtmfo7tSGN5BLhQb0ZAsh1VMJfqhv1xgKtv3uOwj4I_ceCVoCB64f5wCp0C3Kn-EZA-nl3Dgym7UMNjIer-S117oRXc-3wBNDVEkHelZOFMBqA5UkJsLE27uFFXXvI04w3k_A'
    ],
    chatExcerpt: [
      {
        sender: 'buyer',
        senderName: 'Buyer (M***k L.)',
        text: 'Received chair today, armrest is literally broken in two. Need replacement armrest urgently.',
        time: 'Oct 27, 11:05'
      },
      {
        sender: 'seller',
        senderName: 'Seller (C***Zone SG)',
        text: 'Damage during transit is courier responsibility. SingPost handled this parcel, please file compensation claim directly on their website.',
        time: 'Oct 27, 11:30'
      },
      {
        sender: 'buyer',
        senderName: 'Buyer (M***k L.)',
        text: 'SingPost said seller did not put inner foam! It was just in a flimsy single-layer carton. As seller you are responsible for safe delivery packaging.',
        time: 'Oct 27, 11:42'
      },
      {
        sender: 'seller',
        senderName: 'Seller (C***Zone SG)',
        text: 'Parcel left warehouse in good condition. We do not provide free parts once delivered.',
        time: 'Oct 27, 12:10'
      }
    ],
    sellerStatement: {
      hasReplied: false // Seller has not replied yet
    },
    votes: {
      buyerRight: 1240,
      sellerRight: 88,
      notEnoughInfo: 54
    },
    userVote: null,
    status: 'voting'
  },
  {
    id: 'CC-7730',
    productId: 'prod-5',
    productName: 'High-Tech Multi-Functional Air Styler & Blow Dryer Wand',
    productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR8nsUsllLGML_VugM2boqrbMr-YPVc-PjvS74wEw9aNGukvns0rBVBgSBpSrPjRDH_jNOOItpKJr7sdIIHt8AeosO_EnEu4PUWG6Bjt3a2A2iHYzOzEyxyfLDvhf9ONAaSstoBbmzQhLkZ_cjcG5t6uNVK0ClkEVynbmGBm4v5E4D5jDFhlV1XxqjFmI2zQXXK8RzRnH7uokidaHpeOdnjqhaeSFfoR3sLCC1kUYS_Z7iXZfvLa7s',
    productPrice: 89.00,
    category: 'Beauty',
    buyerName: 'E***y T. (+65 9***-4412)',
    sellerName: 'G*** Glamour SG',
    shippingAddress: 'Blk *** Ang Mo Kio Ave 4, #**-512, Singapore',
    createdAt: '3 days ago',
    closesInDays: 3,
    buyerClaim: 'Item arrived with EU 2-pin round plug with no safety mark, instead of SG 3-pin fused plug advertised on listing. Device sparked when plugged into wall adapter.',
    photos: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAR8nsUsllLGML_VugM2boqrbMr-YPVc-PjvS74wEw9aNGukvns0rBVBgSBpSrPjRDH_jNOOItpKJr7sdIIHt8AeosO_EnEu4PUWG6Bjt3a2A2iHYzOzEyxyfLDvhf9ONAaSstoBbmzQhLkZ_cjcG5t6uNVK0ClkEVynbmGBm4v5E4D5jDFhlV1XxqjFmI2zQXXK8RzRnH7uokidaHpeOdnjqhaeSFfoR3sLCC1kUYS_Z7iXZfvLa7s'
    ],
    chatExcerpt: [
      {
        sender: 'buyer',
        senderName: 'Buyer (E***y T.)',
        text: 'Hello, your listing says SG 3-pin plug but this is EU 2-pin without safety mark. It sparked in my socket.',
        time: 'Oct 26, 09:14'
      },
      {
        sender: 'seller',
        senderName: 'Seller (G*** Glamour)',
        text: 'Buyer can use international adapter plug. It is 220V compatible.',
        time: 'Oct 26, 09:40'
      }
    ],
    sellerStatement: {
      hasReplied: true,
      statement: 'Listing description noted warehouse exports may ship with compatible global plug and complimentary adapter. We offered $8 partial refund for an adapter.',
      repliedDate: '2 days ago'
    },
    votes: {
      buyerRight: 1105,
      sellerRight: 142,
      notEnoughInfo: 63
    },
    userVote: null,
    status: 'voting'
  }
];
