export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  new: boolean;
  price: number;
  description: string;
  features: string;
  product_gallery: ProductGallery[];
  product_images: ProductImageSet[];
  product_includes: IncludedItem[];

}

export interface ProductImageSet {
  id: number;
  product_id: number;
  type: string;
  mobile_url: string;
  tablet_url: string;
  desktop_url: string;
}

export interface IncludedItem {
  product_id: number;
  quantity: number;
  item: string;
}

export interface ProductGallery {
  product_id: number;
  position: string;
  mobile_url: string;
  tablet_url: string;
  desktop_url: string;
}

export interface RelatedProduct {
  product_id: number;
  related_product_id: number;
  image_mobile: string;
  image_tablet: string;
  image_desktop: string;
  name: string;
}
