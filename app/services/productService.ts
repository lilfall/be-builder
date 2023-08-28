import { Product } from "@prisma/client";

export async function createProduct(data: Product) {
  const { product_name, description, price, stock, store_id } = data;
  try {
    const product = await prisma.product.create({
      data: {
        product_name,
        description,
        price,
        stock,
        store_id,
      },
    });
    return product;
  } catch (error) {
    throw error;
  }
}

export async function updateProduct(data: Product) {
  const product_id = data.product_id;
  const cleanedData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== null)
  );
  try {
    const product = await prisma.product.update({
      where: {
        product_id,
      },
      data: {
        ...cleanedData,
      },
    });
    return product;
  } catch (error) {
    throw error;
  }
}

export async function storeProduct(id: string) {
  try {
    const product = await prisma.store.findUnique({
      where: {
        store_id: id,
      },
      include: {
        products: true,
      },
    });
    return product;
  } catch (error) {
    throw error;
  }
}
