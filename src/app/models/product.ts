export interface Product {
  id: number;
  slug: string;
  name: string;
  image: ProductImageSet;
  category: string;
  categoryImage: ProductImageSet;
  new: boolean;
  price: number;
  description: string;
  features: string;
  includes: IncludedItem[];
  gallery: ProductGallery;
  others: RelatedProduct[];
}

export interface ProductImageSet {
  mobile: string;
  tablet: string;
  desktop: string;
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
