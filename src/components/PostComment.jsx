import { Send } from "lucide-react"
/* eslint-disable no-unused-vars */
import React from "react"
import { Loading, onInvalid, onSucess } from "../utils/utils"

import { useForm } from "react-hook-form"
import { addComment } from "../lib/appwrite"
import AuthForm from "./AuthForm"

import useComment from "../store/commentContext"

export function AddComment({ postId }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
  } = useForm()

  const { user, setComments } = useComment()

  const createComment = async (data) => {
    const commentData = {
      postId: postId,
      content: data.newComment,
      username: user.name,
    }
    try {
      isValid &&
        (await addComment(commentData, user.id).then((data) => {
          setComments((prev) => [data, ...prev])
        }))

      onSucess("comment added")
      reset()
    } catch (error) {
      onInvalid("unable to add comment")
      console.error(error)
    }
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(createComment, (data) => {
          console.log(data.newComment)
          onInvalid(data.newComment.message)
        })}
        className="space-y-4 relative"
      >
        <textarea
          {...register("newComment", {
            required: {
              value: true,
              message: "comment sholud be 8 to 500 characters",
            },
            maxLength: {
              value: 500,
              message: "comment should not be longer than 500 characters",
            },
            minLength: {
              value: 1,
              message: "comment should be at least 1 characters",
            },
          })}
          placeholder="Add a comment..."
          className="w-full px-3 py-2 text-zinc-700 border rounded-lg focus:outline-none focus:border-blue-400 dark:bg-zinc-700 dark:text-white dark:border-zinc-600"
          rows={3}
        />
        {}
        <button
          type="submit"
          className="absolute right-2 bottom-2 p-2 text-zinc-900 hover:text-blue-600 dark:text-zinc-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loading /> : <Send className="w-5 h-5" />}
        </button>
      </form>
    </>
  )
}

function Skeleton() {
  const dialogeRef = React.useRef()
  return (
    <div className="overflow-hidden rounded-md relative ring-1 ring-zinc-800 dark:ring-zinc-400">
      <AuthForm ref={dialogeRef} />
      <div className="absolute w-full h-full backdrop-blur-[2px] rounded-md text-center place-content-center top-0 left-0 z-10">
        <button
          type="button"
          onClick={() => dialogeRef.current.showModal()}
          className="text-blue-500"
        >
          Login
        </button>{" "}
        to Post comment
      </div>
      <div className="relative">
        <textarea
          placeholder="Add a comment..."
          className="w-full px-3 py-2 text-zinc-700 border rounded-lg focus:outline-none focus:border-blue-400 dark:bg-zinc-700 dark:text-white dark:border-zinc-600 pointer-events-none"
          rows={3}
        />
        <button
          type="submit"
          className="absolute right-2 bottom-2 p-2 text-zinc-900 hover:text-blue-600 dark:text-zinc-100"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

function PostComment({ showLogin, postId }) {
  return <>{showLogin ? <Skeleton /> : <AddComment postId={postId} />}</>
}
export default PostComment
