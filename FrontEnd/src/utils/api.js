const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const parseErrorMessage = async (response) => {
  try {
    const data = await response.json();
    if (data?.message) return data.message;
  } catch {
    // ignore parse errors
  }
  return `Request failed with status ${response.status}`;
};

export const apiFetch = async (path, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message);
  }

  if (response.status === 204) return null;
  return response.json();
};

export const fetchProducts = () => apiFetch("/api/products/products");

export const fetchProductById = (productId) =>
  apiFetch("/api/products/product", {
    method: "POST",
    body: JSON.stringify({ productId })
  });

export const createProduct = (payload) =>
  apiFetch("/api/products/create-product", {
    method: "POST",
    body: JSON.stringify(payload)
  });

export const updateProduct = (productId, payload) =>
  apiFetch(`/api/products/update-product/${productId}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  });

export const deleteProduct = (productId) =>
  apiFetch("/api/products/delete-product", {
    method: "POST",
    body: JSON.stringify({ productId })
  });
