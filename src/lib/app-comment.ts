import type {
  IntergerOpt,
  allUserParams,
  boolOpt,
  createDoc,
  createUser,
  documentId,
  listDocs,
  stringOpt,
  updateDoc,
  user,
} from "@src/types/app-comment"
import * as sdk from "node-appwrite"

class appcomment {
  client = new sdk.Client()
  databases
  account
  users
  constructor(
    public baseUrl: string,
    public projectId: string,
    public api: string,
    public databaseId?: string,
    public collectionId?: string,
  ) {
    if (!collectionId) {
      this.setCollectionId("comments")
    }
    if (!databaseId) {
      this.setDatabaseId("app-comment")
    }
    this.client.setEndpoint(baseUrl).setProject(projectId).setKey(api)

    this.databases = new sdk.Databases(this.client)
    this.account = new sdk.Account(this.client)
    this.users = new sdk.Users(this.client)
  }

  // ##### CLIENT ######
  setDatabaseId(id: string) {
    return (this.databaseId = id)
  }

  setCollectionId(id: string) {
    return (this.collectionId = id)
  }

  get config() {
    return {
      databaseContainer: this.databases,
      accountContainer: this.account,
      databaseID: this.databaseId,
      collectionID: this.collectionId,
      projectID: this.projectId,
      baseURL: this.baseUrl,
    }
  }

  // ################## AUTH ####################

  async createUser({ email, password, name, userId }: createUser) {
    if (this.getUser(userId) === null || userId.length >= 36) {
      throw new Error("userId already exist")
    }
    try {
      const account = await this.account.create(userId, email, password, name)
      if (account) {
        this.login({ email, password })
        return account
      }
    } catch (err) {
      throw new Error(`Unable to create user :: appwrite\n ${err}`)
    }
  }

  async login({ email, password }: user) {
    try {
      return await this.account.createEmailPasswordSession(email, password)
    } catch (err) {
      throw new Error(`Unable to login\ncheck email or password\n ${err}`)
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get()
    } catch (error) {
      throw new Error(`Unable to get current user :: appwrite\n ${error}`)
    }
  }

  async logout() {
    try {
      this.account.deleteSessions()
    } catch (error) {
      throw new Error(`Unable to logout :: appwrite\n ${error}`)
    }
  }

  async getUser(userId: string) {
    try {
      return await this.users.get(userId)
    } catch (err) {
      console.error("No user found with given userId\n", err)
    }
  }

  async getAllUsers({ query, search }: allUserParams) {
    try {
      return await this.users.list(query, search)
    } catch (err) {
      console.error(
        "Unable to get all users\nMake sure you have correct permissions\n",
        err,
      )
    }
  }
  // ############ DATABSE #################

  async createDatabase(databaseName = "app-comment") {
    try {
      this.databaseId = "app-comment"
      return await this.databases.create("app-comment", databaseName)
    } catch (err) {
      throw new Error(`Error creating database :: appwrite\n ${err}`)
    }
  }

  async getDatabase(databaseId = this.databaseId) {
    try {
      if (databaseId) {
        return await this.databases.get(databaseId)
      }
    } catch (err) {
      throw new Error(`Error getting database :: appwrite\n ${err}`)
    }
  }

  async createCollection(databaseId = this.databaseId) {
    try {
      if (databaseId && this.collectionId) {
        return await this.databases.createCollection(
          databaseId,
          this.collectionId,
          "comments",
        )
      }
    } catch (err) {
      throw new Error(`Error creating collection :: appwrite\n ${err}`)
    }
  }

  async getCollection(
    collectionId = this.collectionId,
    databaseId = this.collectionId,
  ) {
    try {
      if (collectionId && databaseId) {
        return await this.databases.getCollection(databaseId, collectionId)
      }
    } catch (err) {
      throw new Error(`Error getting collection :: appwrite\n ${err}`)
    }
  }

  async createDocument({
    databaseId = this.databaseId,
    collectionId = this.collectionId,
    data = {},
    userId,
  }: createDoc) {
    try {
      if (databaseId && collectionId) {
        return await this.databases.createDocument(
          databaseId,
          collectionId,
          sdk.ID.unique(),
          data,
          [
            sdk.Permission.read(sdk.Role.any()),
            sdk.Permission.update(sdk.Role.user(userId)),
            sdk.Permission.delete(sdk.Role.user(userId)),
          ],
        )
      }
    } catch (err) {
      throw new Error(`Unable to create document :: appwrite\n ${err}`)
    }
  }

  async listDocuments({
    databaseId = this.databaseId,
    collectionId = this.collectionId,
    query,
  }: listDocs) {
    try {
      if (databaseId && collectionId) {
        return await this.databases.listDocuments(
          databaseId,
          collectionId,
          query,
        )
      }
    } catch (err) {
      throw new Error(`Unable to list documents :: appwrite\n ${err}`)
    }
  }

  async deleteDocument({
    databaseId = this.databaseId,
    collectionId = this.collectionId,
    documentId,
  }: documentId) {
    try {
      if (databaseId && collectionId) {
        return await this.databases.deleteDocument(
          databaseId,
          collectionId,
          documentId,
        )
      }
    } catch (err) {
      throw new Error(`Unable to delete document :: appwrite\n ${err}`)
    }
  }

  async updateDocument({
    databaseId = this.databaseId,
    collectionId = this.collectionId,
    documentId,
    data,
  }: updateDoc) {
    try {
      if (databaseId && collectionId && documentId) {
        return await this.databases.updateDocument(
          databaseId,
          collectionId,
          documentId,
          data,
        )
      }
    } catch (err) {
      throw new Error(`Unable to update document :: appwrite\n ${err}`)
    }
  }
  // ########## ATTRIBUTES ############
  async createBoolean({
    databaseId = this.databaseId,
    collectionId = this.collectionId,
    options,
  }: boolOpt) {
    const name = options.name.trim().split(" ").join("-")
    const defaultValue = options?.isArray ? undefined : options?.defaultValue

    try {
      if (collectionId && databaseId) {
        return await this.databases.createBooleanAttribute(
          databaseId,
          collectionId,
          name,
          options?.isRequired || false,
          defaultValue,
          options?.isArray,
        )
      }
    } catch (err) {
      throw new Error(`Unable to create boolean attribute :: appwrite\n ${err}`)
    }
  }

  async createString({
    databaseId = this.databaseId,
    collectionId = this.collectionId,
    options,
  }: stringOpt) {
    const name = options.name.trim().split(" ").join("-")
    const defaultValue = options?.isArray ? undefined : options?.defaultValue
    try {
      if (collectionId && databaseId) {
        return await this.databases.createStringAttribute(
          databaseId,
          collectionId,
          name,
          options?.size || 200,
          options?.isRequired || false,
          defaultValue,
          options?.isArray,
          options?.isEncrypted,
        )
      }
    } catch (err) {
      throw new Error(`Unable to create string attribute :: appwrite\n ${err}`)
    }
  }

  async createNumber({
    databaseId = this.databaseId,
    collectionId = this.collectionId,
    options,
  }: IntergerOpt) {
    const name = options.name.trim().split(" ").join("-")
    const defaultValue = options?.isArray ? undefined : options?.defaultValue
    try {
      if (collectionId && databaseId) {
        return await this.databases.createIntegerAttribute(
          databaseId,
          collectionId,
          name,
          options?.isRequired || false,
          options?.minValue,
          options?.maxValue,
          defaultValue,
          options?.isArray,
        )
      }
    } catch (err) {
      throw new Error(`Unable to create number attribute :: appwrite\n ${err}`)
    }
  }
}
export default appcomment
