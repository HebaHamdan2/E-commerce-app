export interface SignUpFormData {
    userName: string;
    email: string;
    password: string;
    cPassword: string;
  }
  export interface SignUpResponse {
    message: string;
    validationArray?: string[];
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