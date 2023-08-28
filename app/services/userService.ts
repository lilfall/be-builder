import prisma from "../../prisma/client";
import bcrypt from "bcrypt";
export async function createUser(data: {
  email: string;
  password: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  // tambahkan field-field lainnya yang sesuai dengan model User
}): Promise<any> {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        fullName: data.fullName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        // tambahkan field-field lainnya sesuai dengan model User
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function loginUser(data: {
  email: string;
  password: string;
}): Promise<any> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) {
      const hashedPassword = await bcrypt.compare(data.password, user.password);
      if (hashedPassword) {
        return { status: "Success", user: user };
      } else {
        return { status: "Failed" };
      }
    } else {
      return { status: "Failed" };
    }
  } catch (error) {
    throw error;
  }
}

export async function getUserById(user_id: string) {
  const id = user_id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        _count: true,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
}
