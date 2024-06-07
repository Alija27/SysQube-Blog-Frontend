import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import moment from "moment";


export const View = () => {



  const { id } = useParams()
  const { data: post, isLoading } = useQuery("posts", async () => {
    const response = await axios.get(`http://localhost:8000/api/posts/${id}`);
    return response.data;
  });
  console.log("data", post);


  return (
    <>
      {isLoading && <div>Loading...</div>}
      {post && (


        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {" "}
            {post.title}
          </h1>
          <div>
            <img
              src={post.image ? post.image : "https://via.placeholder.com/150"}
              alt={post.title}
              className="my-4 w-full h-[300px] object-cover object-center"
            />
          </div>
          <p className="text-gray-500">
            {post.description}

          </p>
          <div className="flex justify-end space-x-4">
            <p className="text-gray-500 text-sm">
              <p className="font-semibold text-sm">By:</p> {post.user}
            </p>
            <p className="text-gray-500 text-sm">
              <p className="font-semibold text-sm">Published on: </p>{" "}
              {moment(post.created_at).format("ll")}
            </p>
          </div>
        </div>





      )}

    </>
  )
}
export default View;
