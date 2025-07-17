import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { resetCart } from "../../slices/cartSlice";
import { setPaymentLoading } from "../../slices/courseSlice";

const { DUMMY_PAYMENT_API } = studentEndpoints; // ✅ Add this to your endpoints config

export async function buyCourse(token, courseId, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Processing dummy payment...");
    dispatch(setPaymentLoading(true));

    try {
        const response = await apiConnector("POST", DUMMY_PAYMENT_API,
            { courseId },
            {
                Authorization: `Bearer ${token}`,
            });

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("🎉 Enrollment successful!");
        dispatch(resetCart());
        navigate("/dashboard/enrolled-courses");
    } catch (error) {
        console.error("DUMMY PAYMENT ERROR:", error);
        toast.error(error.response?.data?.message || "Payment failed");
    }

    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}
