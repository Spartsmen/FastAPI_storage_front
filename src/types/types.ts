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
      status_get: string | null;
      status_add: string | null;
      status_del: string | null;
      status_search: string | null;
      result_search: SearchResult | null;
      docId: string | null;
  }
  interface SearchResult {
    matching_documents: Document[];
    references: Reference[];
  }
  interface Document {
    name: string;
    id: number;
  }
  
  interface Reference {
    name: string;
    id: number;
    target_id: number;
  }
export interface docs {
    id: string | null;
    owner_id: string | null;
    name: string | null;
    content: string | null;
}
export interface addDocsParams {
  name: string | null;
  content: string | null;
  referrals: string | null;
}
export interface searchDocsParams {
  name: string | null;
  depth: string | null;
  limit: string | null;
}