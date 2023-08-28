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
    throw error;
  }
}
