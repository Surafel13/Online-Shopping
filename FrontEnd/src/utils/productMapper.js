export const normalizeProduct = (product) => {
  const normalized = {
    ...product,
    id: product._id || product.id,
    image: product.image || product.imageUrl,
    imageUrl: product.imageUrl || product.image
  };

  if (!normalized.colors || normalized.colors.length === 0) {
    normalized.colors = ["Default"];
  }

  if (!normalized.sizes || normalized.sizes.length === 0) {
    normalized.sizes = ["Default"];
  }

  return normalized;
};
