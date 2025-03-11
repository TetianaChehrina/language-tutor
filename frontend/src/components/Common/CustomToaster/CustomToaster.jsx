import { Toaster } from "react-hot-toast";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlinePendingActions } from "react-icons/md";

const CustomToaster = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        success: {
          style: {
            background: "#4CAF50",
            color: "#fff",
            fontSize: "20px",
            fontWeight: "bold",
            borderRadius: "8px",
            padding: "12px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          },
          icon: <AiOutlineCheckCircle size={20} />,
        },
        error: {
          style: {
            background: "#e74c3c",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "16px",
            borderRadius: "8px",
            padding: "12px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          },
          icon: <AiOutlineCloseCircle size={20} />,
        },
        loading: {
          style: {
            background: "#f39c12",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "8px",
            padding: "12px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          },
          icon: <MdOutlinePendingActions size={20} />,
        },
        duration: 4000,
      }}
    />
  );
};

export default CustomToaster;
