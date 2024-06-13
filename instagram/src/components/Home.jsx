import React, { useEffect, useState } from "react";
import { Homesuggetion, Footer } from "./index";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import dbservice from "../appwrite/database";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData);
  useEffect(() => {
    if (userData) {
      setLoading(true);
      dbservice
        .getPosts()
        .then((posts) => {
          setLoading(false);
          console.log(posts);
          if (posts) {
            const users = [];
            posts.documents.forEach((element) => users.push(element.userName));
            console.log(users, Array.from(new Set(users)));
            const uniqeUser = Array.from(new Set(users));
            setPosts(uniqeUser);
            setLoading(false);
          }
        })
        .finally(() => setLoading(false));
    }
  }, []);
  return (
    <>
      {loading && (
        <div className="flex justify-center items-center min-h-screen w-full">
          <ClipLoader className="w-full flex justify-center" />
        </div>
      )}
      {!loading && posts.length !== 0 && (
        <div className="w-full flex justify-center m-8 font-semibold">
          Suggested for you
        </div>
      )}
      <div className="w-1/2 flex flex-col m-auto minheigth">
        {posts.map((user) => (
          <Homesuggetion key={user} user={user} />
        ))}
      </div>
      <Footer></Footer>
    </>
  );
}
export default Home;
