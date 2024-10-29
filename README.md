# app-comment-core

#### core binings for app-comment

> [!IMPORTANT]  
> If you are not using this with app-comment then you need to have **databaseId** and **collectionId**

# Getting started 🚀

### Pre-requisits

- signup for appwrite cloud or self-host it
- go to appwrite console and create a project
- go into projects setting and create api key with scope `database`, `auth` and `storage`
- you will need **projectId** , **api key** and **appwrite-baseurl (if you are using appwrite clound then it is [https://cloud.appwrite.io/v1] )**
- make sure you have nodeJs installed in your system if you are using this as stand alone

## Installation

```bash
npm i @app-comment/core
```

## Automated install

```bash
npx @app-comment/app-comment-cli
```

This will setup the app-comment project and install all the required dependencies.

# Usage

```javascript
// appcomment.js
import appComment from @app-comment/core
const appConfig = {
    baseURL : "https://cloud.appwrite.io/v1",
    projectId : <your project id>,
    api : <your appwrite api>,
    databaseId : <database id>, // optional
    collectionId : <collection id> // optional
}
const appcomment = new appComment(...appConfig)

export default appcomment
```

Now use `appcomment` in your project

# Quick Start ⏩
```javascript
import appcomment from <path-to-appcomment.js>

// list all the documents of a given collection
// top-level await is only avialable in nodejs 14+
const allDocuments = await appcomment.listDocuments()

//or

let allDocuments
;(async ()=>{
   allDocuments = await appcomment.listDocuments()
})()
console.log(allDocuments)
```
# built-in methods
|methods | arguments |
|--------------------|--------------------|
|createUser|email, password,name,userId|
|userLogin|email,password||
|userLogout|void||
|  getLoggedInUser |void||
|  getUser|userId||
|getAllUsers|query?, search? |  |
|createDatabase|databaseId?, databasename?| |
|getDatabase|databaseId | |
|createCollection|collectionId?, databaseId |  |
|getCollection| collectionId, databaseId| | 
|createDocument|databaseId, collectionId, data, userId| |
|getdocument| documentId | |
|listAllDocuments|    databaseId, collectionId, query? | | 
|deleteDocument|documentId | | 
|updateDocument|databaseId, collectionId, data | | 
|createBool| databaseId, collectionId, options| | 
|createString|databaseId, collectionId, options |  |
|createNumber| databaseId, collectionId, options|  |

