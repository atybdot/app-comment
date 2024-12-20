import { createContext, useContext } from "react";

export const CommentContext = createContext({
  loginState: false,
  user: { name: "", id: "" },
  comments: [],
  postId : ""
});

export const CommentProvider = CommentContext.Provider;

export default function useComment() {
  return useContext(CommentContext);
}
