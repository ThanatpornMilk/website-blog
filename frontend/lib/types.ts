/**
 * Shared Type Definitions for the Blog Application
 */

export interface BlogImage {
  id: string;
  blogId: string;
  url: string;
  isCover: boolean;
  createdAt: string;
}

export interface Comment {
  id: string;
  blogId: string;
  author: string;
  message: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  blog?: {
    title: string;
    slug: string;
  };
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  authorName: string;
  published: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
  images: BlogImage[];
  comments: Comment[];
  _count?: {
    comments: number;
  };
}
