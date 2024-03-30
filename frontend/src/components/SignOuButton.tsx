import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { UseAppContext } from "../contexts/AppContexts";
import { useNavigate } from "react-router-dom";
const SignOutButton = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = UseAppContext();
  const mutation = useMutation(apiClient.logOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "logged Out ", type: "SUCCESS" });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  const handleCLick = () => {
    mutation.mutate();
  };
  return (
    <button
      className="flex items-center text-blue-600 px-3 font-bold hover:bg-gray-100  bg-gray-200 "
      onClick={handleCLick}
    >
      Sign out
    </button>
  );
};
export default SignOutButton;
