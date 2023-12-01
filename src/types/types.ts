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
  
  export interface docsState {
      document: docs | null;
      isLoading:  Boolean;
      status: string | null;
  }
export interface docs {
    id: string | null;
    owner_id: string | null;
    name: string | null;
    content: string | null;
}
