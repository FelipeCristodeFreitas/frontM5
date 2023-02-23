export interface Genre {
  id: number;
  name: string;

}
export interface Genres {
  gameId: number;
  genreId: number;
  genre: Genre

}
export interface Jogos {
  genres?: Genres[];
  id: string;
  title: string;
  categoria: string;
  description: string;
  CoverImageUrl: string;
  year: number;
  imdbScore: number;
  trailerYouTubeUrl: string;
  gameplayYouTubeUrl: string;
}
