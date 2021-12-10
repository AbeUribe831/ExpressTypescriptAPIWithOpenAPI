import { NextFunction, Request, Response } from "express";
import { getAllData, getSingleData } from "../services/postServices";
// import { getAllData, getSingleData } from "../services/posts";

export const getAllPosts = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await getAllData();
    return res.status(200).json({ posts });
  } catch (e) {
    return next(e);
  }
};

export const getSinglePost = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const foundValue = await getSingleData(req.params.id);

    if (!foundValue) throw new Error("No Post found");
    //return res.json({"message": "no id found"})
    res.status(200).json({ foundValue });
  } catch (e) {
    return next(e);
  }
};
