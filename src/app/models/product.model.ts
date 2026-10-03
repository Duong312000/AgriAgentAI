export interface Product {
  id: string;
  name: string;
  priceText: string;
  priceNum: number;
  unit: string;
  image: string;
  location: string;
  stock: string;
  farmer: string;
  desc: string;
  tags: string[];
  category?: string;
}
