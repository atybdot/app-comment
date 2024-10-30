import { Check, Edit2, Trash2, X } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { deleteComment, updateComment } from "../lib/appwrite"
import { CreationDate, Loading, onInvalid, onSucess } from "../utils/utils"

import useComment from "../store/commentContext"

export default function Comment({
  content: initialContent,
  username,
  timestamp,
  commentId,
  permissions = [],
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, isSubmitting },
  } = useForm({
    defaultValues: {
      updateCommentContent: initialContent,
    },
  })

  const { setComments, user } = useComment()

  const showEdit = permissions.includes(`update("user:${user.id}")`)
  const showDel = permissions.includes(`delete("user:${user.id}")`)

  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(initialContent)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedContent(initialContent)
  }

  const updateCommentContent = async (data) => {
    try {
      const res = await updateComment(data.updateCommentContent, commentId)
      setComments((prev) => prev.filter((item) => item.$id !== commentId))
      setComments((prev) => [res, ...prev])
      isSubmitSuccessful && onSucess("comment updated")
      setIsEditing(false)
      setEditedContent(data?.updateCommentContent)
    } catch (error) {
      setIsEditing(false)
      onInvalid(error.message)
      setEditedContent(initialContent)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    deleteComment(commentId)
      .then(() => {
        // removeComment(commentId);
        setComments((prev) => prev.filter((item) => item.$id !== commentId))
        setIsDeleting(false)
        onSucess("comment deleted")
      })
      .catch((err) => {
        onInvalid(err.message)
        setIsDeleting(false)
        console.error(err)
      })
  }

  return (
    <div className="bg-zinc-50 drop-shadow-md dark:bg-zinc-800 rounded-lg p-4">
      <div className="flex items-start space-x-4">
        <div className="flex-1">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="font-medium tetx-sm text-zinc-600 dark:text-zinc-400">
              {username}
            </h3>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {timestamp && <CreationDate date={timestamp} />}
            </span>
          </div>
          {isEditing ? (
            // if isediting is true then show form
            <div className="mt-2">
              <textarea
                {...register("updateCommentContent", {
                  maxLength: {
                    value: 500,
                    message: "comment should not be longer than 500 characters",
                  },
                  minLength: {
                    value: 1,
                    message: "comment should be at least 1 characters",
                  },
                })}
                className="w-full p-2 text-zinc-600 dark:text-zinc-300 bg-white dark:bg-zinc-600 border border-zinc-300 dark:border-zinc-500 rounded-md resize-none"
                rows={3}
              />
              <div className="mt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-3 py-1 text-sm bg-zinc-200 dark:bg-zinc-600 text-zinc-700 dark:text-zinc-200 rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-500 transition-colors duration-150 flex items-center"
                >
                  <X size={16} className="mr-1" />
                  Cancel
                </button>
                <button
                  disabled={isSubmitting}
                  type="button"
                  onClick={handleSubmit(updateCommentContent, onInvalid)}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-150 flex items-center gap-1"
                >
                  {isSubmitting ? (
                    <Loading height={4} />
                  ) : (
                    <Check size={16} className="mr-1" />
                  )}
                  {isSubmitting ? "updating..." : "save"}
                </button>
              </div>
            </div>
          ) : (
            // form is till here
            // redner regular comment if is editing is false
            <p className="mt-1 text-zinc-600 dark:text-zinc-300">
              {initialContent}
            </p>
          )}
          <div className="mt-2 flex space-x-2">
            {showEdit ? (
              <button
                type="button"
                onClick={handleEdit}
                className="p-1 text-zinc-500 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors duration-150"
                aria-label="Edit comment"
              >
                <Edit2 size={18} strokeWidth={1} />
              </button>
            ) : null}

            {showDel ? (
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-1 text-zinc-500 hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-400 transition-colors duration-150 inline-flex gap-1 items-center"
                aria-label="Delete comment"
              >
                {isDeleting ? (
                  <Loading />
                ) : (
                  <Trash2 size={18} strokeWidth={1} />
                )}
                {isDeleting ? "deleting..." : ""}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
