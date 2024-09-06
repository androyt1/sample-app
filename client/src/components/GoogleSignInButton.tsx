import { useAppDispatch } from "../store/store"; // Import the typed hook
import { auth, googleProvider } from "../firebase";
import { googleLogin } from "../store/authSlice";
import { signInWithPopup } from "firebase/auth";
import { Camera } from "lucide-react";
import { motion } from "framer-motion";

type GoogleButtonProp = {
    isLogin: boolean;
};

const GoogleSignInButton = ({ isLogin }: GoogleButtonProp) => {
    const dispatch = useAppDispatch(); // Use typed dispatch

    const handleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const idToken = await result.user?.getIdToken(); // Get the Firebase ID Token
            if (idToken) {
                dispatch(googleLogin(idToken)); // Dispatch the async thunk action
            }
        } catch (error) {
            console.error("Google sign-in error:", error);
        }
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center'
            onClick={handleSignIn}>
            <Camera className='mr-2' size={20} aria-hidden='true' />
            <span>{isLogin ? "Login" : "Register"} with Google</span>
        </motion.button>
    );
};

export default GoogleSignInButton;
