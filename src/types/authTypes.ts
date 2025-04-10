export interface SignUpFormData {
    userName: string;
    email: string;
    password: string;
    cPassword: string;
  }

  export interface AuthContextType {
    user: any;
    logout: () => void;
    setUser: (user: any) => void; 
    getuserId: () => void; 
    userId:string;
    isAuthenticated: boolean;
  }
  
   
  export interface LoginFormData {
    email: string;
    password: string
  }
  export interface SendCodeFormData {
    email: string;
  }
  export interface ResetFormData {
    email: string;
    password: string;
    code: string;
  }
  export interface userResponse{
message:string,
user:User
  }
    
 export interface Image {
    public_id: string;
    secure_url: string;
  }
 
  export interface User{
    profilePic:Image | null;
    _Id:string;
    userName:string;
    email:string;
    password:string;
    confirmEmail:boolean;
    status:string;
    role:string;
    address:string;
    phone:string;
    gender:"Female" | "Male";
    sendCode:string |null;
    createdAt:string;
    updatedAt:string
  }
