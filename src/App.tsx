import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/signIn/signIn";
import Dashboard from "./pages/dashboard/dashboard";
import CreatePost from "./pages/createPost/createPost";
import EditPost from "./pages/editPost/editPost";
import PostComments from "./pages/postComment/postComments";
export interface IPost {
  _id: string;
  title: string;
  content: string;
  timestamp: Date;
  published: boolean;
}
function App() {
  const [JWT, setJWT] = useState<string>("");
  const [posts, setPosts] = useState<[IPost] | null>(null);

  // get jwt from localstorage
  useEffect(() => {
    let tokenFromStorage = localStorage.getItem("jwt");
    if (tokenFromStorage) {
      setJWT(tokenFromStorage);
    }
  }, []);
  //put jwt in localstorage
  useEffect(() => {
    localStorage.setItem("jwt", JWT);
  }, [JWT]);
  useEffect(() => {
    console.log(JWT);
  }, [JWT]);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn setJWT={setJWT}></SignIn>}></Route>
          <Route
            path="/dashboard"
            element={
              <Dashboard
                JWT={JWT}
                posts={posts}
                setPosts={setPosts}
              ></Dashboard>
            }
          ></Route>
          <Route path="/create-post" element={<CreatePost JWT={JWT} />}></Route>
          <Route path="/posts/:postId" element={<EditPost JWT={JWT} />}></Route>
          <Route
            path="/posts/:postId/comments"
            element={<PostComments></PostComments>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
