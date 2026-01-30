export interface Event {
  id: string;
  slug: string;
  title: string;
  date: string;
  city: string;
  venue: string;
  poster: string;
  description: string;
  ticketUrl: string;
  featured?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'tshirts' | 'hoodies' | 'caps' | 'accessories';
  price: number;
  images: string[];
  colors: string[];
  sizes: string[];
  description: string;
  featured?: boolean;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  date: string;
  type: 'photo' | 'video' | 'news' | 'case';
  cover: string;
  excerpt: string;
  content: string;
  featured?: boolean;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  event: string;
  date: string;
  featured?: boolean;
}
