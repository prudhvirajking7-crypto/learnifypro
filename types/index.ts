import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

export interface CourseWithDetails {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string | null;
  thumbnail?: string | null;
  previewVideo?: string | null;
  price: number;
  discountPrice?: number | null;
  currency: string;
  level: string;
  language: string;
  status: string;
  featured: boolean;
  totalDuration: number;
  totalLectures: number;
  requirements: string[];
  objectives: string[];
  tags: string[];
  instructor: {
    id: string;
    name?: string | null;
    image?: string | null;
    bio?: string | null;
  };
  category?: {
    id: string;
    name: string;
    slug: string;
  } | null;
  sections: SectionWithLectures[];
  reviews: ReviewWithUser[];
  _count: {
    enrollments: number;
    reviews: number;
  };
  averageRating?: number;
}

export interface SectionWithLectures {
  id: string;
  title: string;
  order: number;
  lectures: {
    id: string;
    title: string;
    description?: string | null;
    videoUrl?: string | null;
    duration: number;
    order: number;
    isFree: boolean;
    type: string;
    resources: string[];
  }[];
}

export interface ReviewWithUser {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt: Date;
  user: {
    name?: string | null;
    image?: string | null;
  };
}

export interface CartItem {
  id: string;
  courseId: string;
  course: {
    id: string;
    title: string;
    thumbnail?: string | null;
    price: number;
    discountPrice?: number | null;
    currency: string;
    instructor: {
      name?: string | null;
    };
  };
}
