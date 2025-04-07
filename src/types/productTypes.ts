export interface Review {
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
  }
  
  interface Image {
    public_id: string;
    secure_url: string;
  }
 
  
 export interface Product {
    _id: string;
    name: string;
    slug:string;
    description:string;
    stock:number;
    discount:number;
    price: number;
    finalPrice:number;
    number_sellers:number;
    mainImage: Image;
    subImages:Image[];
    reviews: Review[];
    avgRating:number
  }
  
  export interface ProductsResponse {
    message: string;
    page: number;
    total: number;
    products: Product[];
  }
   
  export interface ProductResponse {
    message: string;
    product: Product;
  }
  export interface ReviewResponse{
message:string,
review:Review,
avgRating:number
  }
export interface ReviewsResponse{
  message:string,
reviews?:Review[],
}