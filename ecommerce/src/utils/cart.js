const CART_KEY = 'nexus_cart_items';

export const getCartItems = () => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Auto-prune legacy items without ObjectIds
    return parsed.filter(item => {
      const id = item._id || item.id;
      // If it's a 24-char hex string, it's likely an ObjectId (safe)
      // If it's just a number, it's legacy
      return typeof id === 'string' && id.length >= 24;
    });
  } catch {
    return [];
  }
};

export const saveCartItems = (items) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const addToCart = (product, qty = 1) => {
  const items = getCartItems();
  // Support both _id (API) and id (Local) during transition, preferring _id
  const prodId = product._id || product.id;
  const existing = items.find((item) => (item._id || item.id) === prodId);

  if (existing) {
    existing.qty += qty;
  } else {
    items.push({
      _id: product._id || product.id,
      name: product.name || product.title,
      category: product.category,
      image: product.image || product.imageUrl,
      price: product.price,
      qty
    });
  }

  saveCartItems(items);
  return items;
};
