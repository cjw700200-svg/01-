export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  soldCount: string;
  imageUrl: string;
  badge?: 'Mall' | 'SG Local' | 'Supermarket' | 'SG In Stock' | 'Preferred';
  tag?: string;
  brand?: string;
  category: string;
  description: string;
  stock: number;
  options?: string[];
  reviewsCount?: number;
  shippingInfo?: string;
  coinsCashback?: boolean;
}

export interface FlashDealItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  imageUrl: string;
  soldPercent: number;
  soldLabel: string;
  category: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedOption?: string;
  selected: boolean;
}

export interface Voucher {
  id: string;
  title: string;
  description: string;
  discountAmount: number;
  isPercent: boolean;
  minSpend: number;
  type: 'shipping' | 'cashback' | 'discount' | 'mall';
  expiryDate: string;
  claimed: boolean;
  code: string;
}

export interface MallBrand {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  bannerImg?: string;
  discountBadge: string;
  category: string;
  followers: string;
  rating: number;
  productsCount: number;
}

export interface NotificationItem {
  id: string;
  type: 'order' | 'promo' | 'wallet' | 'live';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: string;
  actionText?: string;
}

export interface LiveStream {
  id: string;
  title: string;
  hostName: string;
  viewers: string;
  likes: number;
  coverImage: string;
  featuredProduct: Product;
  badge?: string;
  liveDiscountText: string;
}

export interface DiscussionPost {
  id: string;
  productId: string;
  authorName: string;
  authorAvatar?: string;
  isCurrentUser?: boolean;
  date: string;
  sentiment: 'positive' | 'critical';
  rating: number;
  answers: {
    matchedDescription: string;
    qualitySize: string;
    wouldBuyAgain: string;
  };
  content: string;
  agreeCount: number;
  disagreeCount: number;
  userVoted?: 'agree' | 'disagree' | null;
  isHelpful?: boolean;
  sellerReply?: {
    sellerName: string;
    verified: boolean;
    date: string;
    content: string;
  };
  isDispute?: boolean;
}
