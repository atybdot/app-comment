import React from "react";
import useComment from "../store/commentContext";
import { useEffect } from "react";
import { useState } from "react";
import { Loading, onInvalid, onSuccess } from "../utils/utils";
import { commentDB } from "../lib/appwrite";
import { useForm } from "react-hook-form";

function PostForm() {
  const { postId, setPostId, setComments } = useComment();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      posts: postId,
    },
  });
  const whenSubmit = async (data) => {
    try {
      setPostId(data.posts);
      const db = await commentDB(data.posts);
      await setComments(db.documents);
      await onSuccess("comments loaded");
    } catch (err) {
      onInvalid("unable to find comments with provided postId");
    }
   
  };
  return (
    <form
      className="m-auto flex items-center justify-center gap-2 flex-col"
      onSubmit={handleSubmit(whenSubmit)}
    >
      <div className="flex gap-2 flex-wrap items-center justify-center mb-3">
        <p className="w-full text-center p-1 font-bold text-lg uppercase text-zinc-600 dark:text-zinc-400">Posts</p>
        <label htmlFor="post-1">
          <input
          className="mr-1"
            {...register("posts")}
            type="radio"
            value="lorem-post"
            id="post-1"
          />
          lorem-post
        </label>
        <label htmlFor="post-2">
          <input
          className="mr-1"
            {...register("posts")}
            type="radio"
            value="lorem-post-2"
            id="post-2"
          />
          lorem-post-2
        </label>
        <label htmlFor="post-3">
          <input
          className="mr-1"
            {...register("posts")}
            type="radio"
            value="random-post"
            id="post-3"
          />
          random-post
        </label>
      </div>

      <button
        type="submit"
        className="p-2 rounded-md bg-zinc-500 hover:bg-zinc-600 transition-colors duration-150 text-zinc-100 mb-2 m-auto"
      >
        {isSubmitting ? <Loading /> : "LIST COMMENT"}
      </button>
    </form>
  );
}

export default PostForm;
