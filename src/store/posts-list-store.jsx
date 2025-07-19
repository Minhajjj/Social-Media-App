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
  } else if (action.type === "LIKE_POST") {
    newPostList = currPostList.map((post) =>
      post.id === action.payload.postID
        ? { ...post, likePost: post.likePost + 1 }
        : post
    );
  } else if (action.type === "DISLIKE_POST") {
    newPostList = currPostList.map((post) =>
      post.id === action.payload.postID && post.views > 0
        ? { ...post, dislikePost: post.dislikePost - 1 }
        : post
    );
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

  const addPost = (userID, postTitle, postBody, views, tags) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        views: views,
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

  const likePost = (postID) => {
    dispatchPostList({
      type: "LIKE_POST",
      payload: { postID },
    });
  };

  const dislikePost = (postID) => {
    dispatchPostList({
      type: "DISLIKE_POST",
      payload: { postID },
    });
  };

  return (
    <PostList_C.Provider
      value={{ postList, addPost, deletePost, likePost, dislikePost }}
    >
      {children}
    </PostList_C.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Going to Islamabad",
    body: "Hi frineds i am going to Islamabad to enjoy my vocations",
    views: 13,
    userID: "user-9",
    likePost: 123,
    dislikePost: 43,
    tags: ["vocation", "Islamabad", "Enjoying"],
  },
  {
    id: "2",
    title: "Going to Karachi",
    body: "Hi frineds i am going to Karachi to see the arbian sea ",
    views: 77,
    userID: "user-11",
    likePost: 23,
    dislikePost: 11,
    tags: ["travelling", "Karachi", "Sea"],
  },
];

export default PostListProvider;
