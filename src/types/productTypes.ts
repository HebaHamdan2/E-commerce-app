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
export interface OrderedProduct{
  productId: string,
  quantity: number,
  unitPrice: number,
  finalPrice: number,
  _id: string
}
export interface Order{
_id:string,
userId:string,
products:OrderedProduct[],
finalPrice:number,
phoneNumber:string,
address:string,
couponName:string,
paymentType:string,
createdAt:string,
updatedAt:string,
status:"pending"|"cancelled"| "confirmed"| "on_way"|"delivered",
}

export interface OrdersResponse{
  message:string,
  orders:Order[]
}