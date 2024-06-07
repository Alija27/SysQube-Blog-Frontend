import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import { useState } from "react";
import { toast } from "react-toastify";

const AddPostModal = ({ setIsModalOpen, setSelectedPost, selectedPost }) => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [image, setImage] = useState(null);
    const { mutate } = useMutation(async (data) => {
        const response = await axiosInstance.post("/posts", data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }

        });
        queryClient.invalidateQueries("postsAdmin");
        toast.success("Post added successfully");
        return response.json();
    });

    const { mutate: updatePost } = useMutation(async (data) => {
        const response = await axiosInstance.post(`/posts/${selectedPost.id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        queryClient.invalidateQueries("postsAdmin");
        toast.success("Post updated successfully");
        return response.json();
    });

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("slug", data.slug);
        formData.append("description", data.description);
        if(image){
            formData.append("image", image);
        }

        if (selectedPost) {
            formData.append("_method", "PUT");
            updatePost(formData);
        } else {
            mutate(formData);
        }
        setIsModalOpen(false);
        setSelectedPost(null);
    }



    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPost(null);
    };

    useEffect(() => {
        if (selectedPost) {
            setValue("title", selectedPost.title);
            setValue("slug", selectedPost.slug);
            setValue("description", selectedPost.description);
        }
    }, [selectedPost]);
    return (
        <div className="fixed inset-0 flex items-center justify-center z-10 mt-16">
            <div className="bg-white w-5/12  rounded-md shadow-lg border border-gray-200  flex flex-col">

                <div className="flex justify-between">
                    <h1 className="text-gray-500 font-semibold text-xl px-4 mt-8">Add Post</h1>
                    <button onClick={handleCloseModal} className="text-red-500 font-semibold text-md mt-2 m-2 ml-4">Close</button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  p-4">

                    <label className="text-gray-500 font-semibold" htmlFor="title">Title</label>
                    <input type="text" placeholder="title" id="title" name="title" {...register("title", {
                        required: {
                            value: true,
                            message: "Title is required"
                        },
                    })
                    } className="border border-gray-200 p-2 rounded-md " />
                    <p className="text-red-400 text-sm">{errors.title?.message}</p>

                    <label className="text-gray-500 font-semibold mt-5" htmlFor="slug">Slug</label>
                    <input type="text" placeholder="slug" id="slug" name="slug" {...register("slug", {
                        required: { 
                            value: true,
                            message: "slug is required"
                        },
                    })
                    } className="border border-gray-200 p-2 rounded-md " />
                    <p className="text-red-400 text-sm">{errors.slug?.message}</p>

                    <label className="text-gray-500 font-semibold mt-5">Description</label>
                    <input type="text" placeholder="description" id="description" name="description" {...register("description", {
                        required: {
                            value: true,
                            message: "description is required"
                        },
                    })
                    } className="border border-gray-200 p-2 rounded-md " />
                    <p className="text-red-400 text-sm">{errors.description?.message}</p>


                    <label className="text-gray-500 font-semibold mt-5">Image</label>
                    <input type="file" id="image" name="image"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="border border-gray-200 p-2 rounded-md " />
                    {selectedPost?.image && (
                        <img src={selectedPost.image} alt="post" className="w-20 h-20" />
                    )}
                    <p className="text-red-400 text-sm">{errors.image?.message}</p>

                    {/* <label className="text-gray-500 font-semibold mt-5">Status</label>
                        <select
                            {...register("status", {
                                required: {
                                    value: true,
                                    message: "status is required"
                                },
                            })}
                            className="border border-gray-200 p-2 rounded-md"
                        >
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                        </select>
                        <p className="text-red-400 text-sm">{errors.status?.message}</p> */}


                    <button className="bg-blue-500 text-white p-2 rounded-md mt-5">Add Post</button>
                </form>

            </div>
        </div>
    )
}

export default AddPostModal