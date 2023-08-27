// models/subscription.ts

import { DataTypes, Model } from "sequelize";
import sequelize from "../../utils/sequelize";
import User from "./user";
import Plan from "./plan";

class Subscription extends Model {
  public subscription_id!: number;
  public start_date!: Date;
  public end_date?: Date;
  public status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public user_id!: number;
  public plan_id!: number;
}

Subscription.init(
  {
    subscription_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    start_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    end_date: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Subscription",
  }
);

Subscription.belongsTo(User, { foreignKey: "user_id" });
Subscription.belongsTo(Plan, { foreignKey: "plan_id" });

export default Subscription;
