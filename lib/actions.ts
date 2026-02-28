import {
  TransformedImageData,
  TransformedCategory,
  ProductCategory,
  OrderData,
  ProjectGalleryBlock,
  SingleProjectData,
  MediaDetails,
  TransformedSingleProjectData,
  TransformedProjectGalleryBlock,
  FeaturingListBlock,
} from "@/types/types";
import { getAuthToken } from "./auth";
import { normalizeMediaData, normalizeMediaSizes } from "./utils";

const { NEXT_PUBLIC_API_URL, WC_API_URL, APP_ORIGIN } = process.env;

/* FETCH */
export const getPageData = async (pageSlug: string) => {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_API_URL}/pages?slug=${pageSlug}&_fields=id,slug,title,categories,acf`,
      {
        next: {
          revalidate: 3600,
          tags: [`page-${pageSlug}`],
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data[0];
  } catch (error) {
    console.error(`Error fetching page data for ${pageSlug}:`, error);
    throw new Error(`Failed to fetch page data for ${pageSlug}`);
  }
};

export const getAboutData = async () => {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_API_URL}/pages?slug="about"&_embed&_fields=_links,_embedded,id,slug,title,featured_media,categories,acf&acf_format=standard`,
      {
        next: {
          revalidate: 3600,
          tags: ["page-about"],
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const featuredMedia = data[0]._embedded?.["wp:featuredmedia"]?.[0];

    const normalizedFeaturedmedia: MediaDetails | {} = featuredMedia
      ? {
          url: featuredMedia.source_url,
          alt: featuredMedia.alt_text ?? "",
          sizes: normalizeMediaSizes(featuredMedia.media_details?.sizes),
        }
      : {};

    const normalizedFeaturingList = data[0].acf?.featuring_list?.map(
      (block: FeaturingListBlock) => {
        if (block.type !== "publication") {
          return block;
        }

        return {
          ...block,
          list_items: block.list_items.map((item: any) => ({
            ...item,
            publication_image: item.publication_image
              ? normalizeMediaData(item.publication_image)
              : null,
          })),
        };
      }
    );

    const TransformedPageData = {
      ...data[0],
      featured_media: normalizedFeaturedmedia,
      acf: {
        ...data[0].acf,
        featuring_list: normalizedFeaturingList,
      },
    };

    return TransformedPageData;
  } catch (error) {
    console.error(`Error fetching page data for About page:`, error);
    throw new Error(`Failed to fetch page data for About page`);
  }
};

export const getPrivacyPolicy = async () => {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_API_URL}/pages?slug=privacy-policy&_fields=content`,
      {
        next: {
          revalidate: 3600,
          tags: ["page-privacy-policy"],
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error(`Error fetching privacy policy:`, error);
    throw new Error(`Failed to fetch privacy policy`);
  }
};

export const getTerms = async () => {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_API_URL}/pages?slug=terms&_fields=content`,
      {
        next: {
          revalidate: 86400,
          tags: ["page-terms"],
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error(`Error fetching terms:`, error);
    throw new Error(`Failed to fetch terms`);
  }
};

export const getPostsData = async () => {
  const response = await fetch(
    `${NEXT_PUBLIC_API_URL}/posts?_embed&_fields=_links,_embedded,id,slug,title,categories`,
    {
      next: {
        revalidate: 3600,
        tags: ["posts"],
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return data.map((post: any) => {
    const categories = post._embedded["wp:term"][0].map((cat: any) => {
      return {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
      };
    });
    const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0]

    const featured_media: MediaDetails | null = featuredMedia
      ? {
          id: featuredMedia.id,
          url: featuredMedia.source_url,
          alt: featuredMedia.alt_text ?? "",
          sizes: normalizeMediaSizes(featuredMedia.media_details?.sizes),
        }
      : null;

    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      featured_media,
      categories,
    };
  });
};

export const getCategories = async () => {
  console.log(NEXT_PUBLIC_API_URL);
  try {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/categories`, {
      next: {
        revalidate: 86400,
        tags: ["categories"],
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Categories response:", response);

    const data = await response.json();

    return data.map((category: TransformedCategory, i: number) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories data");
  }
};

export const getSinglePost = async (slug: string) => {
  const response = await fetch(
    `${NEXT_PUBLIC_API_URL}/posts?slug=${slug}&_fields=id,slug,title,content,acf&acf_format=standard`,
    {
      next: {
        revalidate: 3600,
        tags: [`post-${slug}`],
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  if (!data[0]) {
    throw new Error(`Post with slug "${slug}" not found`);
  }

  const post = data[0];
  const transformedPost = await transformSinglePostData(post);

  return transformedPost;
};

const transformSinglePostData = async (
  post: SingleProjectData
): Promise<TransformedSingleProjectData> => {
  const { id, slug, title, content } = post;
  const { main_image, description_colors, project_details, link, gallery } =
    post.acf;

  let transformedGallery: TransformedProjectGalleryBlock[] = [];
  const TransformedMainImage = normalizeMediaData(main_image);
  let imagesArr: MediaDetails[] = [];

  if (gallery.length > 0) {
    transformedGallery = gallery.map((block: ProjectGalleryBlock): any => {
      const { gallery_block } = block;

      switch (gallery_block.block_type) {
        case "Single Image":
          const { single_image_block } = gallery_block;
          const normalized = normalizeMediaData(single_image_block.image);

          imagesArr.push(normalized);
          return {
            block_type: gallery_block.block_type,
            image: normalized,
            display: single_image_block.display,
            background_color: single_image_block.background_color,
          };
        case "Two Images":
          const { two_images_block } = gallery_block;
          const normalizedTwoImg = two_images_block.images.map(
            (media: MediaDetails) => {
              const normalized = normalizeMediaData(media);
              imagesArr.push(normalized);
              return normalized;
            }
          );

          return {
            block_type: gallery_block.block_type,
            images: normalizedTwoImg,
            framed: two_images_block.framed,
            background_color: two_images_block.background_color,
          };
        case "Asimetric":
          const { asimetric_block } = gallery_block;
          let normalizedAsimImg = asimetric_block.images.map(
            (media: MediaDetails) => {
              const normalized = normalizeMediaData(media);
              imagesArr.push(normalized);
              return normalized;
            }
          );

          return {
            block_type: gallery_block.block_type,
            images: normalizedAsimImg,
            framed_image: asimetric_block.framed_image,
            background_color: asimetric_block.background_color,
          };
        case "Grid":
          const { grid_block } = gallery_block;
          const normalizedGridImg = grid_block.images.map(
            (media: MediaDetails) => {
              const normalized = normalizeMediaData(media);
              imagesArr.push(normalized);
              return normalized;
            }
          );

          return {
            block_type: gallery_block.block_type,
            images: normalizedGridImg,
            columns: grid_block.columns,
            background_color: grid_block.background_color,
          };
      }
    });
  }

  return {
    id,
    slug,
    title,
    content,
    description_colors,
    main_image: TransformedMainImage,
    project_details: project_details,
    imagesArr,
    link,
    gallery: transformedGallery,
  };
};

export const getProductsCategories = async () => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${WC_API_URL}/products/categories`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 3600,
        tags: ["products-categories"],
      },
    });
    const data = await response.json();

    const transformedCategories = await Promise.all(
      data.map(async (cat: any) => {
        return {
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
        };
      })
    );

    return transformedCategories;
  } catch (error) {
    console.error(`Error fetching products categories`, error);
    throw new Error("Failed to fetch products categories");
  }
};

export const getProductsData = async () => {
  try {
    const token = await getAuthToken();
    const response = await fetch(
      `${WC_API_URL}/products?_fields=id,name,slug,images,categories,price,type,external_url,stock_status`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 3600,
          tags: ["products"],
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const transformedProductsData = await Promise.all(
      data.map(async (product: any) => {
        const {
          id,
          name,
          slug,
          images,
          categories,
          price,
          type,
          external_url,
          stock_status,
          attributes,
        } = product;

        const transformedImages = images.map((image: any) => {
          return {
            url: image?.src,
            alt: image.alt,
            sizes: image?.sizes,
          };
        });
        const transformedCategories = categories.map((cat: ProductCategory) => {
          return {
            id: cat.id,
            name: cat.name,
            slug: cat.slug,
          };
        });
        return {
          id,
          name,
          slug,
          categories: transformedCategories,
          price,
          type,
          external_url,
          stock_status,
          attributes,
          images: transformedImages,
          featured_media: transformedImages[0],
        };
      })
    );
    return transformedProductsData;
  } catch (error) {
    console.error("Error fetching products data:", error);
    throw new Error("Failed to fetch products data");
  }
};

export const getSingleProduct = async (slug: string) => {
  const token = await getAuthToken();
  const url = `${WC_API_URL}/products?slug=${slug}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 3600,
        tags: [`product-${slug}`],
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const product = await response.json();

    const transformedImages: TransformedImageData = product[0].images.map(
      (image: any) => {
        return {
          url: image.src,
          alt: image.alt,
          srcSet: image.srcset,
          sizes: {
            full: image.src,
            thumbnail: image.thumbnail,
          },
        };
      }
    );
    return {
      ...product[0],
      images: transformedImages,
    };
  } catch (error) {
    console.error(`Error fetching product "${slug}":`, error);
    throw new Error(`Failed to fetch product "${slug}"`);
  }
};

export const getOrderData = async (
  token: string
): Promise<OrderData | null> => {
  try {
    if (!token) {
      console.error("No token provided");
      return null;
    }
    const res = await fetch(`${APP_ORIGIN}/api/get-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
      cache: "no-store",
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: "unknown" }));
      console.error("Failed to fetch order:", {
        status: res.status,
        error: err,
      });
      return null;
    }

    const data = await res.json();

    if (data?.error) {
      console.error("Order error:", data.error);
      return null;
    }

    return data as OrderData;
  } catch (err) {
    console.error("Error fetching order:", err);
    return null;
  }
};
