// models/user.ts
import { Model, DataTypes } from "sequelize";
import sequelize from "../../utils/sequelize";

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public fullName!: string;
  public address!: string;
  public phoneNumber!: string;
  public additionalData!: object; // Kolom untuk menyimpan JSON

  // ... tambahkan kolom tambahan lainnya sesuai kebutuhan
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    additionalData: {
      type: DataTypes.JSON, // Menggunakan JSON untuk menyimpan JSON
      allowNull: true,
      defaultValue: {}, // Nilai default JSON kosong
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users", // Nama tabel di basis data
  }
);

export default User;
