import { ExegesisContext } from "exegesis-express";
import { NextFunction, Request, Response } from "express";
import { getAllData, getSingleData } from "../services/postServices";
// import { getAllData, getSingleData } from "../services/posts";

export const getAllPosts = async (context: ExegesisContext) => {
  try {
    const posts = await getAllData();
    return context.res.status(200).json({ posts });
  } catch (e) {
    throw context.makeError(400, (e as Error).message);
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
