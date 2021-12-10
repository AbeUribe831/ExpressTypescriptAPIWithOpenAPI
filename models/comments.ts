import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";
import Post from "./posts";

export interface CommentAttributes {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
}

export type CommentCreationAttributes = Optional<CommentAttributes, "post_id">;

export interface CommentInstance
  extends Model<CommentAttributes, CommentCreationAttributes>,
    CommentAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Comment = sequelize.define<CommentInstance>("Comment", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.UUID,
    unique: true,
  },
  post_id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: false,
    type: DataTypes.UUID,
    unique: false,
  },
  name: {
    allowNull: true,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.TEXT,
    unique: false,
  },
  email: {
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

Comment.hasOne(Post, {
  sourceKey: "id",
  foreignKey: "post_id",
  as: "post",
});

export default Comment;
