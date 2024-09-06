import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { login, register } from "../store/authSlice";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { useNavigate } from "react-router-dom";
import GoogleSignInButton from "./GoogleSignInButton";

interface AppError {
    message: string;
}

const isAppError = (error: any): error is AppError => {
    return typeof error?.message === "string";
};

interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
}

const LoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { token, status, error: apperror } = useAppSelector((state: RootState) => state.auth);

    console.log("apperror", apperror);

    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errors, setErrors] = useState<FormErrors>({});

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!isLogin && !name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        if (validateForm()) {
            console.log(isLogin ? "Login" : "Register", { email, password, name });
        }
        e.preventDefault();
        if (isLogin) {
            dispatch(login({ email, password }));
        } else {
            dispatch(register({ name, email, password }));
        }
    };

    const pageVariants = {
        initial: { opacity: 0, x: "-100%" },
        in: { opacity: 1, x: 0 },
        out: { opacity: 0, x: "100%" },
    };

    const pageTransition = {
        type: "tween",
        ease: "anticipate",
        duration: 0.5,
    };

    const inputVariants = {
        focus: { scale: 1.05 },
        blur: { scale: 1 },
    };

    useEffect(() => {
        if (token) {
            navigate("/profile");
        }
    }, [token, navigate]);

    return (
        <div className='flex-1 flex items-center justify-center  bg-gray-100'>
            <motion.div
                initial='initial'
                animate='in'
                exit='out'
                variants={pageVariants}
                transition={pageTransition}
                className='bg-white p-8 rounded-lg shadow-md w-96'>
                <h2 className='text-2xl font-bold mb-6 text-center' id='form-title'>
                    {isLogin ? "Login" : "Register"}
                </h2>
                <form onSubmit={handleSubmit} className='space-y-4' aria-labelledby='form-title'>
                    <AnimatePresence>
                        {!isLogin && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}>
                                <label htmlFor='name' className='sr-only'>
                                    Name
                                </label>
                                <motion.input
                                    id='name'
                                    type='text'
                                    placeholder='Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-md ${
                                        errors.name ? "border-red-500" : ""
                                    }`}
                                    variants={inputVariants}
                                    whileFocus='focus'
                                    onBlur={() => {}}
                                    aria-invalid={errors.name ? "true" : "false"}
                                    aria-describedby='name-error'
                                />
                                {errors.name && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        id='name-error'
                                        className='text-red-500 text-sm mt-1'>
                                        {errors.name}
                                    </motion.p>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div>
                        <label htmlFor='email' className='sr-only'>
                            Email
                        </label>
                        <motion.input
                            id='email'
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md ${
                                errors.email ? "border-red-500" : ""
                            }`}
                            variants={inputVariants}
                            whileFocus='focus'
                            onBlur={() => {}}
                            aria-invalid={errors.email ? "true" : "false"}
                            aria-describedby='email-error'
                        />
                        {errors.email && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                id='email-error'
                                className='text-red-500 text-sm mt-1'>
                                {errors.email}
                            </motion.p>
                        )}
                    </div>
                    <div>
                        <label htmlFor='password' className='sr-only'>
                            Password
                        </label>
                        <motion.input
                            id='password'
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md ${
                                errors.password ? "border-red-500" : ""
                            }`}
                            variants={inputVariants}
                            whileFocus='focus'
                            onBlur={() => {}}
                            aria-invalid={errors.password ? "true" : "false"}
                            aria-describedby='password-error'
                        />
                        {errors.password && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                id='password-error'
                                className='text-red-500 text-sm mt-1'>
                                {errors.password}
                            </motion.p>
                        )}
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors'
                        type='submit'>
                        {isLogin ? "Login" : "Register"}
                    </motion.button>
                    <p>
                        {status === "loading" && <p>Loading...</p>}
                        {status === "failed" && (
                            <p className='text-red-500 text-sm mt-1 text-center'>
                                {isAppError(apperror)
                                    ? apperror.message
                                    : apperror?.message?.[0]?.msg}
                            </p>
                        )}
                    </p>
                </form>
                <div className='mt-4'>
                    <GoogleSignInButton isLogin={isLogin} />
                </div>
                <p className='mt-4 text-center'>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        className='text-blue-500 hover:underline'
                        onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Register" : "Login"}
                    </button>
                </p>
                <Alert className='mt-4 text-center'>
                    <AlertCircle className='h-4 w-4' />
                    <AlertDescription>
                        This is a demo app. Do not use real credentials.
                    </AlertDescription>
                </Alert>
            </motion.div>
        </div>
    );
};

export default LoginForm;
