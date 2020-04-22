export interface PostResponse {
  ok: boolean;
  posts: Post[];
  page: number;
}

export interface Post {
  imgs?: string[];
  _id?: string;
  message?: string;
  coords?: string;
  user?: User;
  created?: string;
}

export interface User {
  avatar?: string;
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
}
