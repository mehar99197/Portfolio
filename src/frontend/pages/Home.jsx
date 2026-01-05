import React, { useState, useEffect, memo, useMemo } from 'react';
import { FaArrowDown, FaLinkedin, FaGithub, FaReact, FaNodeJs, FaCode } from 'react-icons/fa';
import { SiTypescript, SiKalilinux } from 'react-icons/si';
import profileImage from '../../assets/ahmad.jpg';

const Home = memo((props) => {
    const [adminProfile, setAdminProfile] = useState(null);

    const apiUrl = useMemo(() => {
        if (process.env.NODE_ENV === 'production') {
            return import.meta.env.VITE_API_URL 
                ? `${import.meta.env.VITE_API_URL}/auth/admin-profile`
                : 'https://your-backend-api-url.com/api/auth/admin-profile'; // User will need to update this later
        }
        return window.location.hostname === 'localhost' 
            ? 'http://localhost:5000/api/auth/admin-profile'
            : `http://${window.location.hostname}:5000/api/auth/admin-profile`;
    }, []);

    useEffect(() => {
        const fetchAdminProfile = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                if (data.success) setAdminProfile(data.user);
            } catch {}
        };
        fetchAdminProfile();
    }, [apiUrl]);

    const displayName = adminProfile?.name || props.name;
    const displayImage = adminProfile?.profilePicture || profileImage;

    return (
        <section id="home" className='min-h-screen flex items-center mx-2 my-16 sm:m-[15vh] justify-center px-2 xs:px-4 sm:px-6 lg:px-8'>
            <div className='max-w-7xl w-full mx-auto'>
                <div className='flex flex-col-reverse lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-12'>
                
                    <div className='flex-1 text-center lg:text-left space-y-4 sm:space-y-6'>
                        <div className='space-y-1 sm:space-y-2'>
                            <h2 className='text-lg xs:text-xl sm:text-3xl md:text-4xl text-gray-300 font-light animate-[wave_3s_ease-in-out_infinite]'>
                                Hello, <span className='text-green-400'>I am</span>
                            </h2>
                            <h1 className='text-xl xs:text-2xl sm:text-3xl md:text-5xl lg:text-5xl font-bold bg-clip-text text-transparent bg-[linear-gradient(90deg,#00ffff,#ff8c00,#00ff00,#00ffff,#ff8c00)] bg-[length:200%_100%] animate-[gradient-flow_4s_ease_infinite,text-glow_3s_ease-in-out_infinite] typing-animation break-words'>
                                {displayName}
                            </h1>
                            <h3 className='text-lg xs:text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold bg-clip-text text-transparent bg-[linear-gradient(90deg,#00ffff,#00ff00,#0080ff,#00ffff,#00ff00)] bg-[length:200%_100%] animate-[gradient-flow_5s_ease_infinite,text-glow-green_4s_ease-in-out_infinite] break-words'>
                                {props.devtype}
                            </h3>
                        </div>

                        <p className='text-sm xs:text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 px-2'>
                            Crafting elegant solutions with modern technologies. 
                            Passionate about creating seamless user experiences.
                        </p>

                        <div className='flex flex-wrap justify-center lg:justify-start gap-4 xs:gap-6 sm:gap-8 pt-4 sm:pt-6'>
                            <div className='text-center lg:text-left'>
                                <h4 className='text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-green-400'>1+</h4>
                                <p className='text-xs xs:text-sm sm:text-base text-gray-400 mt-1'>Years of<br />Experience</p>
                            </div>
                            <div className='text-center lg:text-left'>
                                <h4 className='text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-green-400'>5+</h4>
                                <p className='text-xs xs:text-sm sm:text-base text-gray-400 mt-1'>Projects Completed<br />Around the World</p>
                            </div>
                        </div>

                        <div className='flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 pt-3 sm:pt-4 px-2'>
                            <a 
                                href="#contact" 
                                className='px-4 xs:px-6 sm:px-8 py-2 xs:py-3 sm:py-4 text-sm xs:text-base bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg'
                            >
                                Get In Touch
                            </a>
                            <a 
                                href="#projects" 
                                className='px-4 xs:px-6 sm:px-8 py-2 xs:py-3 sm:py-4 text-sm xs:text-base bg-transparent border-2 border-green-600 hover:bg-green-600 text-green-400 hover:text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105'
                            >
                                View Projects
                            </a>
                        </div>

                        <div className='flex justify-center lg:justify-start gap-3 sm:gap-4 pt-3 sm:pt-4'>
                            <a 
                                href="https://www.linkedin.com/in/ahmad-nawaz-b97b85327/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className='p-2 xs:p-3 bg-gray-800 hover:bg-blue-600 text-white rounded-full transition-all duration-300 transform hover:scale-110'
                            >
                                <FaLinkedin className='text-lg xs:text-xl sm:text-2xl' />
                            </a>
                            <a 
                                href="https://github.com/mehar99197" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className='p-2 xs:p-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-all duration-300 transform hover:scale-110'
                            >
                                <FaGithub className='text-lg xs:text-xl sm:text-2xl' />
                            </a>
                        </div>
                    </div>

                    <div className='flex-shrink-0'>
                        <div className='relative'>
                            <div className='absolute inset-0 w-48 h-48 xs:w-56 xs:h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96'>
                                <div className='absolute inset-0 rounded-full bg-gradient-to-br from-green-400/40 to-blue-500/40 blur-xl animate-[nova-pulse_3s_ease-in-out_infinite]'></div>
                                <div className='absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/30 to-purple-500/30 blur-2xl animate-[nova-pulse_4s_ease-in-out_infinite] [animation-delay:0.5s]'></div>
                                <div className='absolute inset-0 rounded-full border-2 border-green-400/60 animate-[nova-ring_2.5s_ease-out_infinite]'></div>
                                <div className='absolute inset-0 rounded-full border-2 border-blue-400/60 animate-[nova-ring_2.5s_ease-out_infinite] [animation-delay:0.8s]'></div>
                                <div className='absolute inset-0 rounded-full border-2 border-purple-400/60 animate-[nova-ring_2.5s_ease-out_infinite] [animation-delay:1.6s]'></div>
                            </div>
                            
                            <div className='w-48 h-48 xs:w-56 xs:h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-green-400 to-blue-500 p-1 animate-pulse-slow relative z-10'>
                                <div className='w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden'>
                                    <img 
                                        src={displayImage} 
                                        alt="Ahmad Nawaz" 
                                        className='w-full h-full object-cover rounded-full'
                                    />
                                </div>
                            </div>
                            
                            <div className='absolute inset-0 z-20 animate-[spin_10s_linear_infinite]'>
                                <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                                    <div className='bg-blue-500 p-2 xs:p-3 rounded-full shadow-xl border-2 border-white animate-[spin_10s_linear_infinite_reverse]'>
                                        <FaReact className='text-lg xs:text-xl sm:text-2xl text-white' />
                                    </div>
                                </div>
                            </div>
                            
                            <div className='absolute inset-0 z-20 rotate-[72deg] animate-[spin_10s_linear_infinite]'>
                                <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                                    <div className='bg-blue-600 p-2 xs:p-3 rounded-full shadow-xl border-2 border-white animate-[spin_10s_linear_infinite_reverse]'>
                                        <SiTypescript className='text-lg xs:text-xl sm:text-2xl text-white' />
                                    </div>
                                </div>
                            </div>
                            
                            <div className='absolute inset-0 z-20 rotate-[144deg] animate-[spin_10s_linear_infinite]'>
                                <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                                    <div className='bg-green-600 p-2 xs:p-3 rounded-full shadow-xl border-2 border-white animate-[spin_10s_linear_infinite_reverse]'>
                                        <FaNodeJs className='text-lg xs:text-xl sm:text-2xl text-white' />
                                    </div>
                                </div>
                            </div>
                            
                            <div className='absolute inset-0 z-20 rotate-[216deg] animate-[spin_10s_linear_infinite]'>
                                <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                                    <div className='bg-gray-800 p-2 xs:p-3 rounded-full shadow-xl border-2 border-white animate-[spin_10s_linear_infinite_reverse]'>
                                        <SiKalilinux className='text-lg xs:text-xl sm:text-2xl text-white' />
                                    </div>
                                </div>
                            </div>
                            
                            <div className='absolute inset-0 z-20 rotate-[288deg] animate-[spin_10s_linear_infinite]'>
                                <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                                    <div className='bg-purple-600 p-2 xs:p-3 rounded-full shadow-xl border-2 border-white animate-[spin_10s_linear_infinite_reverse]'>
                                        <FaCode className='text-lg xs:text-xl sm:text-2xl text-white' />
                                    </div>
                                </div>
                            </div>
                            
                            <div className='absolute -bottom-2 -right-2 xs:-bottom-4 xs:-right-4 bg-green-500 text-white px-2 xs:px-4 py-1 xs:py-2 rounded-full shadow-lg'>
                                <span className='text-xs xs:text-sm font-semibold'>Available for work</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex justify-center mt-8 sm:mt-16 lg:mt-20'>
                    <a href="#about" className='animate-bounce'>
                        <FaArrowDown className='text-2xl sm:text-3xl text-green-400 hover:text-green-500 transition-colors' />
                    </a>
                </div>
            </div>
        </section>
    );
});

export default Home;

