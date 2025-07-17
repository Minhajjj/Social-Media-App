import { useReducer } from "react";
import { createContext } from "react";

export const PostList_C = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postID
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

  const addPost = (userID, postTitle, postBody, reactions, tags) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reactions: reactions,
        userID: userID,
        tags: tags,
      },
    });
  };

  const deletePost = (postID) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postID,
      },
    });
  };

  return (
    <PostList_C.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostList_C.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Going to Islamabad",
    body: "Hi frineds i am going to Islamabad to enjoy my vocations",
    reactions: 13,
    userID: "user-9",
    tags: ["vocation", "Islamabad", "Enjoying"],
  },
  {
    id: "2",
    title: "Going to Karachi",
    body: "Hi frineds i am going to Karachi to see the arbian sea ",
    reactions: 77,
    userID: "user-11",
    tags: ["travelling", "Karachi", "Sea"],
  },
];

export default PostListProvider;
