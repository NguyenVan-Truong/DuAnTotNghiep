export interface Product {
    id: number;
    user_id: number | null;
    brand_id: number;
    name: string;
    slug: string;
    sku: string;
    detailed_description: string;
    image_url: string;
    price: number;
    discount_price: number;
    discount_percentage: number;
    stock: number;
    weight: number;
    ratings_avg: number;
    ratings_count: number;
    status: number;
    is_featured: number;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    meta_description: string | null;
    meta_keywords: string | null;
}
