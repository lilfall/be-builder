// models/plan.ts

import { DataTypes, Model } from "sequelize";
import sequelize from "../../utils/sequelize";

class Plan extends Model {
  public plan_id!: number;
  public plan_name!: string;
  public description?: string;
  public price!: number;
  public duration!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Plan.init(
  {
    plan_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    plan_name: {
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
    duration: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Plan",
  }
);

export default Plan;
