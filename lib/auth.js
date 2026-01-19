const {
    WORDPRESS_API_URL,
    WORDPRESS_USERNAME,
    WORDPRESS_PASSWORD
} = process.env;

export async function getAuthToken() {
  const res = await fetch(`${WORDPRESS_API_URL}/wp-json/jwt-auth/v1/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: WORDPRESS_USERNAME,
      password: WORDPRESS_PASSWORD,
    }),
  });

  if (!res.ok) {
    throw new Error("Error al obtener el token JWT");
  }

  const data = await res.json();
  return data.token;
}