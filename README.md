> [!CAUTION]  
> This is a prototype
# app-comment

# Getting started 🚀

### Pre-requisites

- - [set up appwrite](https://appwrite.io/docs/quick-starts/web)
- In collection settings, **enable the document security** and add roles ![screenshot of proper permissions for collections](/src/assets/coll-permissions.png)
![screenshot of proper permissions for collections](/src/assets/document-security.png)

- Obtain the following from appwrite
    - API End-Point
    - Project ID
    - database ID
    - collection ID
- In your project create an .env file like this ![screenshot for proper env variables](/src/assets/env.png)


## Installation

```bash
npm i app-comment
```
Now you can insert CommentSection Component anywhere in your project
# Usage

> [!IMPORTANT]  
> you need to add postId in your files metadata and extract it 
```jsx
// layout.jsx
import CommentSection from "app-comment"
//... your code
<CommentSection postId={postId}>

```

# props
### postId
> you first need to add **postid** to all your files on which you are rendering commentSection  

This is required and will list comments based on this prop
If it is mismatched then wrong comments are rendered


# Todo 📑
- [ ] implement auth2 for google and github
- [ ] make it more customizable

### screenshots
home page
![home page of the project](/src/assets/user-loggedout.png)  

homepage after user login
![homepage after user login](/src/assets/user-loggedin.png)  


login
![login form](/src/assets/sign-in.png)  
  
sign-up
![signup from](/src/assets/sign-up.png)  

editing comment
![editing comment](/src/assets/user-editing.png)
