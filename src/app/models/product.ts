export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  new: boolean;
  price: number;
  description: string;
  features: string;
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
  quantity: number;
  item: string;
}

export interface ProductGallery {
  first: ProductImageSet;
  second: ProductImageSet;
  third: ProductImageSet;
}

export interface RelatedProduct {
  slug: string;
  name: string;
  image: ProductImageSet;
}
