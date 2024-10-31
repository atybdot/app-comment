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
![home page of the project](https://i.ibb.co/ZTmMdcz/screenzy-1730369746745.png)  

homepage after user login
![homepage after user login](https://i.ibb.co/VH8SKTM/screenzy-1730369982150.png)  
  
login
![login form](https://i.ibb.co/3r7DfcK/screenzy-1730370125971.png)  
  
sign-up
![signup from](https://i.ibb.co/jZnFLvF/screenzy-1730370139127.png)  

editing comment
![editing comment](https://i.ibb.co/g7S2dL6/screenzy-1730370053341.png)