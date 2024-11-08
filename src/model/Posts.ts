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
}
