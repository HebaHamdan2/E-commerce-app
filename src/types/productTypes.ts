interface Review {
    _id: string;
    comment: string;
    rating: number;
    createdBy: {
      profilePic: string | null;
      _id: string;
      userName: string;
    };
    productId: string;
    orderId: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  interface MainImage {
    public_id: string;
    secure_url: string;
  }
  
 export interface Product {
    _id: string;
    name: string;
    price: number;
    mainImage: MainImage;
    reviews: Review[];
  }
  
  export interface ProductsResponse {
    message: string;
    page: number;
    total: number;
    products: Product[];
  }
  