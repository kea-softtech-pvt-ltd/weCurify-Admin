
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toaster() {
    return (
        <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            // newestOnTop={false}
            closeOnClick
            style={{top:'80px'}}
            rtl={false}
            // pauseOnFocusLoss
            // draggable
            theme="light"
        />
    )
}