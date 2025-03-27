
export interface Category {
    _id: string;
    name: string;
    image: string;
  }

  export interface CategoriesResponse {
    categories: { _id: string; name: string; image: { secure_url: string } }[];
    totalCategories: number;
  }