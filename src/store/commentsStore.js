import { create } from "zustand"

const useCommentStore = create((set) => ({
  loginState: false,
  user: { name: "", id: "" },
  comments: ["noice"],
  updateLoginState: (newStatus) => {
    set(() => ({ loginState: newStatus }))
  },
  updateUser: (newUser) => set(() => ({ user: newUser })),
  setComments: (newComments) => {
    set(() => ({ comments: newComments }))
  },
  addAComment: (newCom) => {
    set((old) => ({ commnets: old.comments.unshift(newCom) }))
  },

  removeComment: (commentId) => {
    set((old) => ({
      comments: old.comments.filter((item) => item?.$id !== commentId),
    }))
  },
}))
export default useCommentStore
