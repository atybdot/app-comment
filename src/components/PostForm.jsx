import React from "react";
import useComment from "../store/commentContext";
import { useEffect } from "react";
import { useState } from "react";
import { Loading, onInvalid, onSucess } from "../utils/utils";
import { commentDB } from "../lib/appwrite";
import { useForm } from "react-hook-form";

function PostForm() {
    const { postId, setPostId, setComments } = useComment();
    const {register,handleSubmit,formState:{isSubmitting}} = useForm({defaultValues : {
        postIdForm : postId
    }})
  const whenSubmit = async (data) => {
      try {
         setPostId(data.postIdForm);
        const db = await commentDB(data.postIdForm)
        await setComments(db.documents)
        await onSucess("comments loaded")
     } catch (err) {
        onInvalid("unable to find comments with provided postId")
     }
    }
  return (
    <form className="m-auto flex items-center justify-center gap-2 flex-col" onSubmit={handleSubmit(whenSubmit)}>
      <input
        type="text"
        className="appearance-none relative block px-3 py-2 border placeholder-zinc-500 text-zinc-900 rounded-md focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 focus:z-10 sm:text-sm w-2/3"
        placeholder="post ID"
        {...register("postIdForm",{
            required : true,
            minLength : 3
        })}
      />

      <button
        type="submit"
        className="p-2 rounded-md bg-zinc-500 hover:bg-zinc-600 transition-colors duration-150 text-zinc-100 mb-2 m-auto"
      >
        {isSubmitting ? <Loading/> : "LIST COMMENT"}
      </button>
    </form>
  );
}

export default PostForm;
