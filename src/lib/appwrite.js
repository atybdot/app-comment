import {
  Account,
  Client,
  Databases,
  ID,
  Permission,
  Query,
  Role,
} from "appwrite"

const {
  VITE_APPWRITE_BASE,
  VITE_APPWRITE_PROJECT,
  VITE_APPWRITE_DATABASE,
  VITE_APPWRITE_COMMENT_COLLECTION,
} = import.meta.env

const app = new Client()
  .setEndpoint(VITE_APPWRITE_BASE)
  .setProject(VITE_APPWRITE_PROJECT)

const db = new Databases(app)
const accounts = new Account(app)

async function emailSignup(name, email, password) {
  return await accounts.create(ID.unique(), email, password, name)
}

async function emailLogin(email, password) {
  return await accounts.createEmailPasswordSession(email, password)
}

async function getUser() {
  return await accounts.get()
}
async function logoutUser() {
  return await accounts.deleteSessions()
}
async function commentDB(postId) {
  return await db.listDocuments(
    VITE_APPWRITE_DATABASE,
    VITE_APPWRITE_COMMENT_COLLECTION,
    [Query.equal("postId", postId), Query.orderDesc("$createdAt")],
  )
}

async function addComment(data, userid) {
  return await db.createDocument(
    VITE_APPWRITE_DATABASE,
    VITE_APPWRITE_COMMENT_COLLECTION,
    ID.unique(),
    data,
    [
      Permission.read(Role.any()),
      Permission.update(Role.user(userid)),
      Permission.delete(Role.user(userid)),
    ],
  )
}

async function updateComment(newContent, commentId) {
  return await db.updateDocument(
    VITE_APPWRITE_DATABASE,
    VITE_APPWRITE_COMMENT_COLLECTION,
    commentId,
    {
      content: newContent,
    },
  )
}

async function deleteComment(commentId) {
  return await db.deleteDocument(
    VITE_APPWRITE_DATABASE,
    VITE_APPWRITE_COMMENT_COLLECTION,
    commentId,
  )
}

export {
  emailSignup,
  emailLogin,
  getUser,
  commentDB,
  addComment,
  updateComment,
  deleteComment,
  logoutUser,
}
