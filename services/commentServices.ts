import axios from "axios";

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const getAllData = async () => {
  const url = "https://jsonplaceholder.typicode.com/comments";
  const { data } = await axios.get<Comment[]>(url);
  return data;
};

export const getSingleData = async (id: string) => {
  const url = "https://jsonplaceholder.typicode.com/comments";
  const { data } = await axios.get<Comment[]>(url);

  const comment = data.find((com) => com.id === parseInt(id));
  return comment;
};
