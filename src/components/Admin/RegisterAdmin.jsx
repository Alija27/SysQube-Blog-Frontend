import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

const RegisterAdmin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { mutate } = useMutation(async (data) => {
        const response = await fetch("http://localhost:8000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return response.json();
    });
    const onSubmit = (data) => {
        mutate(data);
        
            navigate("/dashboard/users"); 
        
    }

    return (
        <>
            <div className="  font-sans h-screen flex justify-center">
                <div className="bg-white w-[400px] h-[400px] rounded-md shadow-lg border border-gray-200  flex flex-col">
                    <h1 className="text-gray-500 font-semibold text-xl px-4 mt-8">Add Admin</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  p-4">

                    <label className="text-gray-500 font-semibold" htmlFor="name">Name</label>
                        <input type="text" placeholder="name" id="name" name="name" {...register("name", {
                            required: {
                                value: true,
                                message: "Name is required"
                            },
                        })
                        } className="border border-gray-200 p-2 rounded-md " />
                        <p className="text-red-400 text-sm">{errors.name?.message}</p>

                        <label className="text-gray-500 font-semibold mt-5" htmlFor="email">Email</label>
                        <input type="text" placeholder="email@email.com" id="email" name="email" {...register("email", {
                            required: {
                                value: true,
                                message: "Email is required"
                            },
                        })
                        } className="border border-gray-200 p-2 rounded-md " />
                        <p className="text-red-400 text-sm">{errors.email?.message}</p>

                        <label className="text-gray-500 font-semibold mt-5">Password</label>
                        <input type="password" placeholder="Password" id="password" name="password" {...register("password", {
                            required: {
                                value: true,
                                message: "Password is required"
                            },
                        })
                        } className="border border-gray-200 p-2 rounded-md " />
                        <p className="text-red-400 text-sm">{errors.password?.message}</p>
                        <button className="bg-blue-500 text-white p-2 rounded-md mt-5">Add Admin</button>
                    </form>
                   
                </div>
            </div>
        </>
    )
}

export default RegisterAdmin