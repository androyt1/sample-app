import { motion } from "framer-motion";

const About = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.3,
                when: "beforeChildren",
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
            },
        },
    };

    return (
        <motion.section
            className='flex-1 relative bg-gradient-to-br from-purple-600 to-indigo-800 text-white flex items-center justify-center overflow-hidden p-4 sm:p-8 md:p-12'
            initial='hidden'
            animate='visible'
            variants={containerVariants}>
            {/* Animated Background Circles */}
            <motion.div
                className='absolute top-0 left-0 w-40 h-40 sm:w-64 sm:h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70'
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
            />
            <motion.div
                className='absolute bottom-0 right-0 w-48 h-48 sm:w-80 sm:h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70'
                animate={{
                    x: [0, -100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
            />

            <div className='container mx-auto px-6 relative z-10'>
                <div className='flex flex-col md:flex-row items-center justify-between'>
                    {/* Text Section */}
                    <div className='md:w-1/2 mb-10 md:mb-0'>
                        <motion.h1
                            className='text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 md:mb-6'
                            variants={itemVariants}>
                            Welcome to the Future of Web Design
                        </motion.h1>
                        <motion.p
                            className='text-lg sm:text-xl md:text-2xl mb-6 md:mb-8'
                            variants={itemVariants}>
                            Experience the perfect blend of style and functionality.
                        </motion.p>
                        <motion.div variants={itemVariants}>
                            <motion.button
                                className='bg-white text-purple-600 font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full text-base sm:text-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg'
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}>
                                Get Started
                            </motion.button>
                        </motion.div>
                    </div>
                    {/* Image Section */}
                    <motion.div className='md:w-1/2' variants={itemVariants}>
                        <motion.img
                            src='/api/placeholder/500/500'
                            alt='Hero Image'
                            className='w-full h-auto rounded-lg shadow-2xl'
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        />
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className='absolute bottom-10 left-1/2 transform -translate-x-1/2'
                animate={{
                    y: [0, 10, 0],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                }}>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 sm:h-8 sm:w-8'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 14l-7 7m0 0l-7-7m7 7V3'
                    />
                </svg>
            </motion.div>
        </motion.section>
    );
};

export default About;
