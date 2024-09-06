import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store/store"; // Custom hooks
import { getProfile } from "../store/authSlice";
import { logout } from "../store/authSlice";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

const ProfileComponent = () => {
    const dispatch = useAppDispatch();
    const { name, email, status, error } = useAppSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const profileVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
    };

    if (status === "loading")
        return <div className='flex justify-center items-center h-screen text-lg'>Loading...</div>;
    if (error)
        return (
            <div className='flex justify-center items-center h-screen text-red-500 text-lg'>
                {JSON.stringify(error)}
            </div>
        );

    return (
        <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            className='min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4'>
            <motion.div
                variants={profileVariants}
                className='bg-white text-black p-8 rounded-lg shadow-xl max-w-md w-full text-center'>
                <h1 className='text-3xl font-bold mb-6'>Profile</h1>
                <p className='text-xl font-semibold mb-2'>
                    Name: <span className='font-normal'>{name}</span>
                </p>
                <p className='text-xl font-semibold'>
                    Email: <span className='font-normal'>{email}</span>
                </p>
                <Button className='mt-6' onClick={() => dispatch(logout())}>
                    logout <LogOut className='ml-2' />
                </Button>
            </motion.div>
        </motion.div>
    );
};

export default ProfileComponent;
