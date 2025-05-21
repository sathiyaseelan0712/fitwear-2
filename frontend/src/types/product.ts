// types/product.ts
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  category: string;
  sizes: string[];
  colors: string[];
  stock: number;
  images: {
    data: string; // Base64 encoded image
    contentType: string;
    _id?: string;
  }[];
  brand: string;
  ratings?: {
    average: number;
    count: number;
  };
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}