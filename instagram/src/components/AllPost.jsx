import React, { useState, useEffect } from "react";
import { Container, ReelsPostCard } from "./index";
import dbservice from "../appwrite/database";
import { useSelector } from "react-redux";
import { Query } from "appwrite";
import { ClipLoader } from "react-spinners";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData) {
      setLoading(true);
      dbservice
        .getPosts()
        .then((posts) => {
          console.log(posts);
          if (posts) {
            setPosts(posts.documents);
          }
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <div className="w-full py-8  text-center ">
      <Container>
        <div className="w-full flex flex-wrap justify-center ">
          {loading ? (
            <div className="w-full p-2  flex justify-center items-center min-h-screen ">
              <ClipLoader color="#46494f" />
            </div>
          ) : posts.length === 0 ? (
            <center>
              <div className="text-lg">No post Available</div>
            </center>
          ) : (
            posts.map((post) => (
              <div key={post.$id} className="p-2 w-full ">
                <ReelsPostCard {...post} />
              </div>
            ))
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
