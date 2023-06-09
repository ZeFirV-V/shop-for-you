export interface IProduct {
  id: number,
  title: string,
  price: number,
  category: string,
  description: string,
  image: string,
  rating: IProductsRating,
}

export interface IProductsRating {
  rate: number,
  count: number,
}

export interface IProductWithQuantity extends IProduct {
  quantity: number;
}

export type SortOption = "title" | "price" | "category" | "rating" | "id";
export type SortOrder = "asc" | "desc";
