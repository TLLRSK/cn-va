import { Attributes, ReactNode } from "react";

/* Types */
export type Parent = "home" | "footer" | "menu";

export type DisplayStatus = "opening" | "open" | "closing" | "closed";

export type MenuProps = {
  email: string;
  social: SocialMedia[];
};

export type TLink = {
  index?: number;
  href: string;
  label: string;
};

export type SocialMedia = {
  acronym: string;
  url: string;
  svg_code: string;
};

export type NavMenuProps = {
  menuData: {
    email: string;
    social: SocialMedia[];
  };
};

export interface ProjectData {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  featured_media?: MediaDetails;
  // _embedded: any;
  content: {
    rendered: string;
  };
  categories: TransformedCategory[];
  gallery: ProjectGalleryBlock[];
  project_details: ProjectDetail[];
  link: AcfLink;
}

export interface SingleProjectData {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf: {
    main_image: MediaDetails;
    gallery: ProjectGalleryBlock[];
    project_details: ProjectDetail[];
    link: AcfLink;
    description_colors: Record<string, string>;
  };
  categories: TransformedCategory[];
}

export type TransformedSingleProjectData = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  description_colors: Record<string, string>;
  imagesArr: MediaDetails[];
  main_image: MediaDetails;
  gallery: TransformedProjectGalleryBlock[];
  project_details: ProjectDetail[];
  link: AcfLink;
};

export type TransformedImageData = {
  id: string;
  alt: string;
  url: string;
  srcSet: string;
  sizes: {
    full: string;
    thumbnail: string;
  };
};
type AcfLink = {
  url: string;
  text: string;
};
type PostInfo = {
  url: string;
  title: string;
};

export type FeaturingListBlock = {
  name: string;
  type: string;
  list_items: FeaturingListAccordionItems[];
};
export type FeaturingListAccordionItems = {
  publication_image?: PublicationImage;
  main_text: string;
  secondary_text: string;
  url: string;
};
export type PublicationImage = {
  url: string;
  alt: string;
  sizes: Record<string, string>[];
};

export type Category = number;

export type TransformedCategory = {
  id: number;
  name: string;
  slug: string;
};

export type IndexedPosts = {
  prev: PostInfo | null;
  next: PostInfo | null;
};

export type SinglePostDetail = {
  name: string;
  value: string;
};

export type SingleProjectHeader = {
  title: string;
  content: {
    rendered: string;
    sanitized?: string;
  };
  featured_media: MediaDetails;
  project_details: {
    year: string;
    client: {
      type: string;
      name: string;
    };
  };
  link: AcfLink;
};

export type SwipeState = {
  phase: "start" | "end" | null;
  direction: "next" | "prev" | null;
};

export type PortfolioContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export type InfoItem = {
  year: string;
  client: {
    name: string;
    type: string;
  };
};

export type Content = {
  rendered: string;
  sanitized?: string;
  protected?: boolean;
};

export type ProductCategory = {
  id: number;
  name: string;
  slug: string;
};

export type ProductAttribute = {
  name: string;
  position: number;
  visible: number;
  variation: number;
  options: string[];
};

export type FormAddProductProps = {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    stock_status: string;
    stock_quantity: number;
    shipping_class_id: number;
    // [key: string]: any;
  };
};

export type CartProduct = {
  id: number;
  name: string;
  price: number;
  image: TransformedImageData;
  quantity?: number;
  stock_status: string;
  stock_quantity: number;
  // [key: string]: any;
};

export type CartState = {
  isOpen: boolean;
  displayStatus: DisplayStatus;
  isClosing: boolean;
  isLoading: boolean;
  products: CartProduct[];
  productsCount: number;
  subtotal: number;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  addProduct: (product: CartProduct, quantity: number) => void;
  removeProduct: (productId: number) => void;
  updateProductAmount: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  sendToCheckout: () => void;
};

export type Country = {
  code: string;
  name: string;
  states: Option[] | [];
};

export type ShippingZone = {
  id: number;
};

export type ShippingLocation = {
  code: string;
};

export type ShippingAddress = {
  email: string;
  firstName: string;
  lastName: string;
  address1: string;
  postalCode: string;
  countryCode: string;
  stateCode?: string;
  additionalInfo?: string;
};

/* Interfaces */
export interface MenuLinksProps {
  parent: Parent;
  onClosing?: () => void;
}

export interface IInfo {
  info_list: InfoItem[];
  description?: string;
}

export interface AmountInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export interface InputLocationsProps {
  onChange?: (countryCode: string) => void;
  defaultCountryCode?: string;
  defaultStateCode?: string;
  placeholderCountry?: string;
  placeholderState?: string;
  required?: boolean;
}

export interface AppContextType {
  projectsList: ProjectData[];
  setProjectsList: (projectsList: ProjectData[]) => void;
}

export interface FilterContextValue<T> {
  isOpen: boolean;
  toggleFilter: () => void;
  handleCategoryChange: (id: undefined | number) => void;
  itemsType: string;
  allItems: T[];
  filteredItems: T[];
  categories: TransformedCategory[];
  activeCategory: TransformedCategory | undefined;
  categoryCounts: Record<string | number, number>;
  selectCategory: (id: string | number | undefined) => void;
  clearCategory: () => void;
}

export interface FilterProviderProps<T> {
  children: ReactNode;
  itemsType: string;
  allItems: T[];
  categories: TransformedCategory[];
  categoryKey?: string;
}

export interface ProductData {
  id: number;
  slug: string;
  name: string;
  price: string;
  categories: TransformedCategory[];
  featured_media: TransformedImageData;
  external_url: string;
  stock_status: string;
}

export interface SingleProductData extends ProductData {
  content: {
    rendered: string;
  };
  images: TransformedImageData[];
  _product_image_gallery: string;
  "short-description": string;
  description: string;
  attributes: ProductAttribute[];
  stock_quantity: number;
}
export type AllowedSizeKey = keyof MediaDetails["sizes"];

export interface MediaDetails {
  id: number;
  url: string;
  alt: string;
  sizes: {
    source_url?: string;
    medium?: string;
    large?: string;
    thumbnail?: string;
    medium_large?: string;
    woocommerce_thumbnail?: string;
    woocommerce_single?: string;
    woocommerce_gallery_thumbnail?: string;
    full?: string;
  };
}
export interface WordPressMediaResponse {
  id: number;
  alt_text: string;
  guid: {
    rendered: string;
  };
  media_details: MediaDetails;
}

export interface IProjectsContext {
  allProjects: ProjectData[];
  filteredProjects: ProjectData[];
  categories: TransformedCategory[];
  activeCategory: TransformedCategory | undefined;
  categoryCounts: Record<string, number>;
  getCurrentIndex: (slug: string) => void;
  currentIndex: number | number;
  selectCategory: (id: number) => void;
  clearCategory: () => void;
}

export interface ISingleProjectContext extends TransformedSingleProjectData {
  description_colors: Record<string, string>;
  lightboxOpen: boolean;
  clickedIndex: number | null;
  handleImageClick: (image: MediaDetails) => void;
  closeLightbox: () => void;
}

export interface IShopProductsContext {
  allProducts: ProductData[];
  filteredProducts: ProductData[];
  categories: TransformedCategory[];
  activeCategory: TransformedCategory | undefined;
  categoryCounts: Record<number, number>;
  selectCategory: (id: number) => void;
  clearCategory: () => void;
}

export type ProjectDetail = {
  detail: {
    title: string;
    list: { text: string }[];
  };
};

export type ProjectGalleryBlock = {
  gallery_block: SingleImageBlock | TwoImagesBlock | GridBlock | AsimetricBlock;
};

export type SingleImageDisplay = "Screen width" | "Screen height";

export type AsimetricFrame = "first" | "last";

export type SingleImageBlock = {
  block_type: "Single Image";
  single_image_block: {
    image: MediaDetails;
    display: SingleImageDisplay;
    background_color: string;
  };
};

export type TwoImagesBlock = {
  block_type: "Two Images";
  two_images_block: {
    images: MediaDetails[];
    framed: boolean;
    background_color: string;
  };
};

export type GridBlock = {
  block_type: "Grid";
  grid_block: {
    images: MediaDetails[];
    columns: string;
    background_color: string;
  };
};

export type AsimetricBlock = {
  block_type: "Asimetric";
  asimetric_block: {
    images: MediaDetails[];
    framed_image: AsimetricFrame;
    background_color: string;
  };
};

export type TransformedSingleImageBlock = {
  block_type: "Single Image";
  image: MediaDetails;
  display: SingleImageDisplay;
  background_color: string;
};

export type TransformedTwoImagesBlock = {
  block_type: "Two Images";
  images: MediaDetails[];
  framed: boolean;
  background_color: string;
};

export type TransformedGridBlock = {
  block_type: "Grid";
  images: MediaDetails[];
  columns: string;
  background_color: string;
};

export type TransformedAsimetricBlock = {
  block_type: "Asimetric";
  images: MediaDetails[];
  framed_image: AsimetricFrame;
  background_color: string;
};

export type TransformedProjectGalleryBlock =
  | TransformedSingleImageBlock
  | TransformedTwoImagesBlock
  | TransformedGridBlock
  | TransformedAsimetricBlock;

export type ProjectGallery = ProjectGalleryBlock[];

export interface ProductData {
  id: number;
  name: string;
  price: string;
  image?: string;
  stock?: number;
  type: string;
  external_url: string;
  // [key: string]: any;
}

export interface CartItem extends ProductData {
  quantity: number;
}

export interface Option {
  label: string;
  value: string;
}

export interface ShippingProps {
  countries: Country[];
  onChange?: (countryCode: string) => void;
  defaultCountryCode?: string;
  defaultStateCode?: string;
  placeholderCountry?: string;
  placeholderState?: string;
  required?: boolean;
}

export interface InputSelectProps {
  name: string;
  label?: string;
  options: Option[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
}

export type AddToCartHandler = (product: ProductData, quantity: number) => void;

export interface MenuState {
  isMenuOpen: boolean;
  displayStatus: "opening" | "open" | "closing" | "closed";
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
}

export type OrderData = {
  id: number;
  order_number: string;
  order_key: string;
  status: string;
  total: string;
  currency: string;
  date_created: string;
  billing: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address_1: string;
    city: string;
    postcode: string;
    country: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    total: string;
    product_id: number;
    image: string | null;
  }>;
};

export interface RevalidationData {
  type: 'post' | 'page' | 'category' | 'product';
  action: 'created' | 'updated' | 'deleted';
  slug: string;
  id: number;
  title?: string;
  name?: string;
  taxonomy?: string;
  categories?: string[];
  tags: string[];
};

/* Type guards */
export const isNormalizedCategory = (
  category: number | TransformedCategory
): category is TransformedCategory => {
  return typeof category !== "number" && "id" in category;
};
