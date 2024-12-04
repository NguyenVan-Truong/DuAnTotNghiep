export interface Posts {
    id: number;
    title: string;
    content: string;
    slug: string;
    meta_description: string;
    meta_keywords: string;
    user_id: number;
    created_at: string;  
    updated_at: string;  
    folow: number;
    image: string;       
    status: number;
    avatar: string | null; 
    catelogues: PostCatelogues[];
}
export interface PostCatelogues {
    id: number; 
    name: string; 
    description?: string; 
    slug: string; 
    avatar?: string; 
    metaTitle?: string; 
    metaDescription?: string; 
    metaKeywords?: string; 
    userId?: number; 
    _lft?: number; 
    _rgt?: number; 
    parentId?: number | null; 
    level?: number; 
    status?: string; 
    deletedAt?: string | null; 
    createdAt?: string; 
    updatedAt?: string; 
}
