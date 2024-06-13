import React, { useEffect, useState } from "react";
import { Profileimg, Postfollow, Namebutton, PostCard, Footer } from "./index";
import { Link } from "react-router-dom";
import dbservice from "../appwrite/database";
import { Query } from "appwrite";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

function Profile() {
  // const post = ["krishnaRadha", "krishnaMohan", "krishnagopal", "fruit"];
  // const post = [];
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const authStatus = useSelector((state) => state.auth.status);
  const [loading, setLoading] = useState(true);
  console.log(useSelector((state) => state.auth));
  useEffect(() => {
    if (userData) {
      setLoading(true);
      console.log("inside profile.");
      dbservice
        .getPosts([Query.equal("userId", userData.$id)])
        .then((posts) => {
          if (posts) {
            setPosts(posts.documents);
            console.log("inside profile.", posts);
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        })
        .finally(() => setLoading(false));
    }
  }, []);
  return (
    <>
      <div className="ml-8 mr-10 minheigth ">
        {/* <div className="flex  justify-center"> */}
        <div className=" w-full  my-11 items-center ">
          <div className=" flex  gap-32  gap-y-14 flex-wrap ">
            <Profileimg></Profileimg>
            <div className=" flex flex-col flex-wrap gap-y-6  ">
              <Namebutton />
              <Postfollow numberofpost={posts.length} />
            </div>
          </div>
          <hr className="w-full mt-40" />
        </div>

        <div className="text-2xl">
          posts
          {/* display post */}
        </div>

        {posts.length === 0 ? (
          <div className="w-full py-8 mt-4 text-center">
            <div className="w-full max-w-7xl mx-auto px-4">
              <div className="flex flex-wrap">
                <div className="w-full p-2">
                  <h1
                    className="text-2xl font-bold hover:text-gray-500"
                    style={{ margin: "12vh 0" }}
                  >
                    {authStatus && loading ? (
                      <ClipLoader color="#46494f" />
                    ) : (
                      <div className="text-blue-800 my-8">
                        Share photos When you share photos, they will appear on
                        your profile.
                      </div>
                    )}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full  flex flex-wrap justify-center  my-2 mb-8 ">
            <div className="w-full gap-x-1 gap-y-1 flex flex-wrap  ">
              {posts?.map((post) => (
                <PostCard {...post} />
              ))}
            </div>
          </div>
        )}
        {/* </div> */}
      </div>
      <Footer></Footer>
    </>
  );
}

export default Profile;
