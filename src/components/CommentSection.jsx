import { useEffect } from "react";
import { Suspense } from "react";
import { useState } from "react";
import { commentDB, getUser, logoutUser } from "../lib/appwrite";
import { CommentProvider } from "../store/commentContext";
import { onInvalid, onSuccess } from "../utils/utils";
import Comment from "./Comment";
import CustomToast from "./CustomToast";
import PostComment from "./PostComment";
import PostForm from "./PostForm";

export default function CommentSection({ defaultPost }) {
  const [loginState, updateLoginState] = useState(false);
  const [user, updateUser] = useState({ id: "", name: "" });
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState(defaultPost);

  const handleLogout = async () => {
    try {
      await logoutUser();
      updateLoginState(false);
      updateUser({ name: "", id: "" });
      onSuccess("Logout successful");
    } catch (err) {
      console.error(err);
      onInvalid("unable to logout");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const db = await commentDB(postId);
        setComments(db.documents);
      } catch (error) {
        onInvalid("unable to load comment");
        console.log(error);
      }

      try {
        const loggedIn = await getUser();
        updateUser({ name: loggedIn.name, id: loggedIn.$id });
        updateLoginState(true);
      } catch (error) {
        updateUser({ name: "", id: "" });
        updateLoginState(false);
      }
    })();
  }, []);

  return (
    <CommentProvider
      value={{
        loginState,
        user,
        comments,
        postId,
        setComments,
        updateUser,
        updateLoginState,
        setPostId,
      }}
    >
      <div className="max-w-2xl mx-auto p-4 text-zinc-900 dark:text-zinc-100">
        <PostForm />
        <CustomToast />
        <h2 className="text-2xl font-bold mb-4 text-zinc-800 dark:text-white">
          Comments
        </h2>
        {loginState && (
          <button
            type="button"
            onClick={handleLogout}
            className="p-2 rounded-md bg-blue-500 hover:bg-red-600 transition-colors duration-150 text-zinc-100 mb-2 m-auto"
          >
            {`logout ${user.name}`}
          </button>
        )}
        <PostComment showLogin={!loginState} />

        <div className="space-y-4 mt-6">
          <Suspense fallback={<p>loading comments</p>}>
            {comments.map((comment) => (
              <Comment
                key={comment.$id}
                content={comment.content}
                timestamp={comment.$updatedAt}
                username={comment.username}
                commentId={comment.$id}
                permissions={comment.$permissions}
              />
            ))}
          </Suspense>
        </div>
      </div>
    </CommentProvider>
  );
}
