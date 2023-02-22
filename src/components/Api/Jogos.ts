export interface Product {
  
  name: string;
  categoria: string;
  description: string;
  imageUrl: string;
  ano: string;
  score: string;
  treiler: string;
  gameplay: string;
}

export interface ProductUpdate {
  product: Product;
  id: string;
}

export interface jogosResponse {
  id: string;
  name: string;
  description: string;
  categoria: string;
  imageUrl: string;
  ano: string;
  score: string;
  treiler: string;
  gameplay: string;
  updatedAt?: string;
  createdAt?: string;
}
