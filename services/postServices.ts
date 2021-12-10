// import { posts } from "../Posts";
import axios from "axios";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const getAllData = async () => {
  const url = "https://test-logicloud.s3.us-west-2.amazonaws.com/data.json";
  const { data } = await axios.get<Post[]>(url);
  return data;
  //return posts
};

export const getSingleData = async (id: string) => {
  const url = "https://test-logicloud.s3.us-west-2.amazonaws.com/data.json";
  const { data } = await axios.get<Post[]>(url);

  const post = data.find((post) => post.id === parseInt(id));
  return post;
};
