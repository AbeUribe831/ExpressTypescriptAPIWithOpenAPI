export interface SQLComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface InsertComment {
  post_id: number;
  name: string;
  email: string;
  body: string;
}
