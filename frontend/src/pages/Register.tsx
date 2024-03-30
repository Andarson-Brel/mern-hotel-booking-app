import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";

import { UseAppContext } from "../contexts/AppContexts";
import { useNavigate } from "react-router-dom";
export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = UseAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.registerFunction, {
    onSuccess: async () => {
      showToast({ message: "Registered Successfully!", type: "SUCCESS" });
      queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <form className=" flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold ">Create An Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "This Field is required" })}
          />
          {errors.firstName && (
            <span className="text-red-600">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "This Field is required" })}
          />
          {errors.lastName && (
            <span className="text-red-600">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This Field is required" })}
          type="email"
        />
        {errors.email && (
          <span className="text-red-600">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This Field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          type="password"
        />
        {errors.password && (
          <span className="text-red-600">{errors.password.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This Field is Required";
              } else if (watch("password") !== val) {
                return "Your Password do not match";
              }
            },
          })}
          type="password"
        />
        {errors.confirmPassword && (
          <span className="text-red-600">{errors.confirmPassword.message}</span>
        )}
      </label>
      <span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};
export default Register;
