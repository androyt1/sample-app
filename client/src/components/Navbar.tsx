import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RootState, useAppSelector, useAppDispatch } from "@/store/store";
import { Button } from "./ui/button";
import { logout } from "@/store/authSlice";

const Navbar: React.FC = () => {
    const dispatch = useAppDispatch();
    const { token } = useAppSelector((state: RootState) => state.auth);
    const [isOpen, setIsOpen] = useState(false); // For mobile menu toggle

    return (
        <nav className='bg-blue-900 text-white shadow-md'>
            <div className='container mx-auto flex items-center justify-between p-4'>
                {/* Logo */}
                <motion.div
                    className='text-2xl font-bold'
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}>
                    <Link to='/'>MyLogo</Link>
                </motion.div>

                {/* Hamburger Icon for mobile */}
                <div className='md:hidden'>
                    <button onClick={() => setIsOpen(!isOpen)} className='focus:outline-none'>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}>
                            {isOpen ? "Close" : "Menu"}
                        </motion.div>
                    </button>
                </div>

                {/* Navigation Links */}
                <div className={`hidden md:flex space-x-4`}>
                    <motion.div
                        className='inline-block'
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}>
                        <Link to='/' className='hover:underline'>
                            Home
                        </Link>
                    </motion.div>
                    <motion.div
                        className='inline-block'
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}>
                        <Link to='/about' className='hover:underline'>
                            About
                        </Link>
                    </motion.div>

                    {!token && (
                        <motion.div
                            className='inline-block'
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}>
                            <Link to='/login' className='hover:underline'>
                                Login
                            </Link>
                        </motion.div>
                    )}

                    {token && (
                        <>
                            <motion.div
                                className='inline-block'
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}>
                                <Link to='/profile' className='hover:underline'>
                                    Profile
                                </Link>
                            </motion.div>
                            <motion.div
                                className='inline-block'
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}>
                                <Button onClick={() => dispatch(logout())}>Logout</Button>
                            </motion.div>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='md:hidden flex flex-col space-y-2 p-4 bg-blue-900'>
                    <Link to='/' className='hover:underline' onClick={() => setIsOpen(false)}>
                        Home
                    </Link>
                    <Link to='/about' className='hover:underline' onClick={() => setIsOpen(false)}>
                        About
                    </Link>

                    {!token && (
                        <Link
                            to='/login'
                            className='hover:underline'
                            onClick={() => setIsOpen(false)}>
                            Login
                        </Link>
                    )}

                    {token && (
                        <>
                            <Link
                                to='/profile'
                                className='hover:underline'
                                onClick={() => setIsOpen(false)}>
                                Profile
                            </Link>
                            <Button onClick={() => dispatch(logout())}>Logout</Button>
                        </>
                    )}
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
