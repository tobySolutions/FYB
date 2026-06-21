export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  isNew?: boolean;
  created_at?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  image: string;
}
