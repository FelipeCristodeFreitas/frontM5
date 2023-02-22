export interface Product {

  title: string;
  categoria: string;
  description: string;
  CoverImageUrl: string;
  year: number;
  imdbScore: number;
  trailerYouTubeUrl: string;
  gameplayYouTubeUrl: string;
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
