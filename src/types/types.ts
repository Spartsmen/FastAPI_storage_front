export interface authState {
    user: any;
    token: string | null;
    isLoading: Boolean;
    status: string | null;
  }
  
  export interface registerParams {
    email: string | null;
    username: string | null;
    password: string | null;
  }
  