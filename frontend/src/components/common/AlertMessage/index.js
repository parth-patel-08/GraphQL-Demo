import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const alert = (message, type) => {
    toast(message, {
        type,
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: null,
        theme: "colored",
    });
}

const AlertMessage = () => {
    return (
        <ToastContainer />
    );
};

export default AlertMessage;
