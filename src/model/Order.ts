export interface OrderItem {
    id: number;
    product_name: string;
    quantity: number;
    price: string;
    total: string;
    variant: string;
}

export interface OrderDetailProps {
    data: {
        id: number;
        customer_name: string;
        customer: {
            id: number;
            customer_name: string;
        };
        promotion: {
            promotion_code: string | null;
            promotion_discount: string | null;
        };
        payment_method: {
            payment_method_name: string;
        };
        total_amount: string;
        discount_amount: string;
        final_amount: string;
        status: string;
        payment_status: string;
        shipping_address: string;
        shipping_fee: string;
        created_at: string;
        updated_at: string;
        order_items: OrderItem[];
    };
}
