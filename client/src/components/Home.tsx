import { motion } from "framer-motion";

const Home = () => {
    return (
        <section className='relative flex-1 flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-700 text-white overflow-hidden'>
            {/* Rotating Background Elements */}
            <motion.div
                className='absolute inset-0 overflow-hidden'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}>
                <motion.div
                    className='absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-blue-300 opacity-30 rounded-full'
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className='absolute -bottom-1/2 -right-1/2 w-[200%] h-[200%] bg-indigo-300 opacity-30 rounded-full'
                    initial={{ rotate: 0 }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
            </motion.div>

            {/* Content */}
            <div className='relative z-10 text-center px-4 md:px-0'>
                <motion.h1
                    className='text-3xl md:text-5xl font-extrabold mb-4 md:mb-6'
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}>
                    Welcome to My Portfolio
                </motion.h1>
                <motion.p
                    className='text-base md:text-lg mb-6 md:mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.7 }}>
                    I create stunning web experiences with modern technologies.
                </motion.p>
                <motion.button
                    className='px-6 py-2 md:px-8 md:py-3 bg-yellow-500 text-black rounded-lg text-base md:text-lg font-semibold shadow-lg transition-transform transform hover:scale-105'
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.9 }}>
                    Get in Touch
                </motion.button>
            </div>
        </section>
    );
};

export default Home;
