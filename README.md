> [!CAUTION]  
> This is a prototype
# app-comment-prototype

# Getting started 🚀

### Pre-requisites

- [set up appwrite](https://appwrite.io/docs/quick-starts/web)
- In collection settings, **enable the document security** and add roles ![screenshot of proper permissions for collections](/src/assets/coll-permissions.png)
![screenshot of proper permissions for collections](/src/assets/document-security.png)


## Running prototype
clone this repo
```bash
git clone --branch development https://github.com/atybdot/app-comment.git
```
Install all the dependencies
```bash
npm i
```
Obtain the following from appwrite
1. API End-Point
2. Project ID
3. database ID
4. collection ID

In the project folder create an .env file like this ![screenshot for proper env variables](/src/assets/env.png)

Now run 
```bash
npm run dev --open
```

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

## Todo 📑
- [ ] add OAuth2
---
### Project Goal
The eventual goal of this project is to add comment section in your blogs / project with as little hassle as possible using appwrite.  

such that you just install this as
```bash
npm i app-comment
```
then in your layout project
```jsx
// layout.jsx
import CommentSection from "app-comment"
.... your code
<CommentSection postId={slug-of-your-post}>
```
This pkg is available on npm but it has error when importing  
you can check the main branch for npm pkg code
[or check app-comment on npm](https://www.npmjs.com/package/app-comment)

