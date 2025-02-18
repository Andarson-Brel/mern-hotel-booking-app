import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles =
    type === "SUCCESS"
      ? "fixed top-4 right-4 z-50 rounded-md bg-green-600 text-white max-w-md py-3 px-5 shadow-lg"
      : "fixed top-4 right-4 z-50 rounded-md bg-red-600 text-white max-w-md py-3 px-5 shadow-lg";
  return (
    <div className={styles}>
      <div className="flex justify-center items-center">
        <span className=" text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
