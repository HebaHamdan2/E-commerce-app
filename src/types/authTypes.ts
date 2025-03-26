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