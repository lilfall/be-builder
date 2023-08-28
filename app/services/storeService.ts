export async function getAll(id: string) {
  const user_id = parseInt(id);
  try {
    const store = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
      select: {
        store: {
          include: {
            products: false,
          },
        },
      },
    });
    return store;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function createStore(data: {
  user_id: string;
  store_name: string;
}) {
  const user_id = parseInt(data.user_id);

  try {
    const create = await prisma.store.create({
      data: {
        store_name: data.store_name,
        user_id: user_id,
        store_setting: {},
      },
    });
    return create;
  } catch (error) {
    throw error;
  }
}

export async function setSetting(data: { store_id: string; setting: any }) {
  const id = parseInt(data.store_id);
  try {
    const setting = await prisma.store.update({
      where: {
        store_id: id,
      },
      data: {
        store_id: id,
        store_setting: data.setting,
      },
    });
    return setting;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteStore(data: { store_id: string }) {
  const id = parseInt(data.store_id);
  try {
    const deletes = await prisma.store.delete({
      where: {
        store_id: id,
      },
    });
    return deletes;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
