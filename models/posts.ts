import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";

export interface PostAttributes {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export type PostCreationAttributes = Optional<PostAttributes, "user_id">;

export interface PostInstance
  extends Model<PostAttributes, PostCreationAttributes>,
    PostAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Post = sequelize.define<PostInstance>("Post", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.UUID,
    unique: true,
  },
  user_id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: false,
    type: DataTypes.UUID,
    unique: false,
  },
  title: {
    allowNull: true,
    autoIncrement: false,
    primaryKey: false,
    type: DataTypes.TEXT,
    unique: false,
  },
  body: {
    allowNull: true,
    autoIncrement: false,
    primaryKey: false,
    type: DataTypes.TEXT,
    unique: false,
  },
});

export default Post;
