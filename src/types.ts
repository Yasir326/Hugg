export interface Brand {
  id: string;
  name: string;
  internal_name: string;
  description: string;
  created_at: string;
  updated_at: string;
  logo: string;
  logo_url: string;
  colour: string;
  success: string;
  share: string;
  weight: number;
  deleted_at: string | null;
  expiry: number;
  website: string | null;
  integration_id: number;
  user_id: string;
  email: string | null;
  vat: number;
  faq: string | null;
  redeem: string | null;
  location_text: string | null;
  map_pin_url: string;
  consolidated: number;
  default_location_description_markdown: string;
  products: string[];
  consolidated_products: string[];
  stores: string[];
}

export interface Product {
  id: string;
  created_at: string;
  updated_at: string;
  brand_id: string;
  description: string;
  campaign: string | null;
  label: string;
  internal_name: string;
  integration: string;
  price: string;
  over_18_offer: number;
  redemption_instructions: string;
  image: string;
  subtitle: string;
  weight: number;
  recipient_description: string;
  tag_group_id: string;
  tag_id: string;
  open_graph_image: string;
  active: number;
  on_app: number;
  on_imessage: number;
  handling_fee: number;
  sale_price: number;
  huggg_tag: string | null;
  vat_voucher_type: string;
  vat: string | null;
  brand_name: string;
  brand_weight: number;
  image_url: string;
  claim_image: string;
  claim_image_url: string;
  imessage_image: string;
  imessage_image_url: string;
  open_graph_image_url: string;
}

export interface Store {
  id: string;
  brand_id: string;
  latitude: string;
  longitude: string;
  website: string | null;
  name: string;
  description: string;
  visible: number;
  description_markdown: string;
  image: string;
  image_url: string;
}

export type BrandsResponse = {
  current_page: number;
  data: Brand[];
  from: number;
  last_page: number;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
  embedded: {
    products: Product[];
    stores: Store[];
  };
};

export type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: Pagination;
};

export type BrandParams = {
  id: string;
};

export type ProductParams = {
  id: string;
};

export type PaginationQuery = {
  page?: number;
  limit?: number;
};