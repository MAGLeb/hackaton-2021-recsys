export interface IBook {
  id: number;
  title: string;
  author: string;
  year: number;
  annotation: string;
  age_resctriction: number | undefined;
  volume: number;
  rubrics: string[];
}

export enum ContentMode {
  recommendations = "recommendations",
  populdar = "popular",
}

export enum BookType {
  classic = "classic",
  modern = "modern",
}
