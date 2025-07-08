import { ProductGallery } from "./product";

export interface Cart {
    id: number;
    product_id: number;
    name: string;
    price: number;
    quantity: number;
    user_id: string;
    product_gallery: ProductGallery[]
}
