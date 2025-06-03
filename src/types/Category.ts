export interface Category {
  id: number;
  name: string;
  position: number;
}

export interface Categories {
  categories: Category[];
  page: number;
  perPage: number;
  total: number;
}
