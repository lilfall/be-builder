// models/product.ts

import { DataTypes, Model } from "sequelize";
import sequelize from "../../utils/sequelize";
import Store from "./store";

class Product extends Model {
  public product_id!: number;
  public product_name!: string;
  public description?: string;
  public price!: number;
  public stock!: number;
  public extra_data?: object; // JSON data
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public store_id!: number;
}

Product.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    extra_data: {
      type: DataTypes.JSON,
    },
  },
  {
    sequelize,
    modelName: "Product",
  }
);

Product.belongsTo(Store, { foreignKey: "store_id" });

export default Product;

// Jalankan migrasi untuk membuat tabel di basis data
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Migrasi selesai");
  })
  .catch((error) => {
    console.error("Error saat migrasi:", error);
  });
