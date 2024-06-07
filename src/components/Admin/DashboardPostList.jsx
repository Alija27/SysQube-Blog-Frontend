import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import { useQuery, useQueryClient } from "react-query";
import AddPostModal from "./AddPostModal";

const DashboardPostList = () => {
  const queryClient = useQueryClient();
  const [selectedPost, setSelectedPost] = useState(null);
  const { data, isLoading } = useQuery("postsAdmin", async () => {
    const response = await axiosInstance.get("/admin/posts");
    return response.data;
  });



  const truncateString = (text) => {
    return text.length > 150 ? text.slice(0, 150) + "..." : text;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPost = () => {
    setIsModalOpen(true);
  };

  const handleStatusChange = async (e, postId) => {
    const newStatus = e.target.value;
    try {
      await axiosInstance.put(`/posts/${postId}`, {
        status: newStatus,
      })
      toast.success("Post status updated successfully");
    }
     catch{
      console.error("Error updating post status:", error);
     }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleDelete = async (postId) => {
    try {
      await axiosInstance.delete(`/posts/${postId}`);
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries("postsAdmin");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  useEffect(() => {
    if (selectedPost) {
      setIsModalOpen(true);
    }
  }, [selectedPost]);

  return (
    <>
      <div className="w-8/12 bg-white border border-gray-200 shadow-md mx-8">
        <div className="flex justify-between mb-6 border-b border-gray-200">
          <p className="m-1 mx-4 my-4 text-2xl font-bold">All Post</p>
          <button
            className="my-4  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddPost}
          >
            Add Post
          </button>

          {isModalOpen && <AddPostModal setIsModalOpen={setIsModalOpen} selectedPost={selectedPost} setSelectedPost={setSelectedPost} />}
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SN.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{post.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{post.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{post.slug}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {truncateString(post.description)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={
                      post.image ? post.image : "https://via.placeholder.com/150"
                    }
                    alt={post.title}
                    className="h-10 w-10 rounded-full"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={post.status}
                    onChange={(e) => handleStatusChange(e, post.id)}
                    className="border border-gray-200 p-2 rounded-md"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-y-2 text-sm font-medium">
                  <button
                    onClick={
                      () => setSelectedPost(post)
                    }
                  className="text-white bg-indigo-600 hover:bg-indigo-800 rounded border p-1">
                    Edit
                  </button>
                  <button  onClick={()=>handleDelete(post.id)} className="text-white bg-red-600 hover:bg-red-800 rounded border p-1 mx-1">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </>
  );
};
export default DashboardPostList;
