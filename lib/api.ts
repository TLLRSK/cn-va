// import { getAuthToken } from "./auth";

// const {
//   WORDPRESS_API_URL,
// } = process.env;

// export async function fetchApiData() {
//   const token = await getAuthToken();

//   const res = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/posts`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!res.ok) {
//     throw new Error("Error al obtener los posts");
//   }

//   return res.json();
// }