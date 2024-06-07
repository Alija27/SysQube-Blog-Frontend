import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useMutation } from "react-query";
import axiosInstance from "../config/axiosInstance";
import { useAuth } from "../Providers/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Login = () => {
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const navigate = useNavigate();
  const { user, setUser } = useAuth()

  const onSubmit = (data) => {
    console.log("Form Submitted", data);
    mutate(data);
  }

  const loginApi = async (data) => {
    try {
      const response = await axiosInstance.post("/login", data);
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      navigate("/dashboard/posts");
      toast.success("Login Successful");
      console.log("Login Successful", response.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login Failed")
      console.log("Login Failed", error);
    }
  }

  const useLogin = () => {
    return useMutation(loginApi);
  }

  const { mutate } = useLogin();

  useEffect(() => {
    if (user) {
      navigate("/dashboard/posts")
    }
  }, [user])

  return (
    <>
      <div className=" items-center font-sans h-screen flex justify-center">
        <div className="bg-white w-[400px] h-[320 px] rounded-md shadow-lg border border-gray-200  flex flex-col">
          <h1 className="text-gray-500 font-semibold text-xl px-4 mt-8">Sign in to your account</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  p-4">
            <label className="text-gray-500 font-semibold" htmlFor="username">Email</label>
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
            <button className="bg-blue-500 text-white p-2 rounded-md mt-5">Sign in</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login;
