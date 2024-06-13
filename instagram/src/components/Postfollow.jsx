import React from "react";

function Postfollow({ numberofpost }) {
  return (
    <div className="flex text-xm ">
      <div>{numberofpost} post</div>
      <div className="mx-8">16M followers</div>
      <div> 100 following</div>
    </div>
  );
}

export default Postfollow;
