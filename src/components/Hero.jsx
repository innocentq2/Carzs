import React, { useEffect, useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Intro Animation
            gsap.from(textRef.current.children, {
                y: 100,
                opacity: 0,
                duration: 1.5,
                stagger: 0.2,
                ease: 'power4.out',
                delay: 0.5
            });

            // Parallax Effect
            gsap.to(videoRef.current, {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });

            gsap.to(textRef.current, {
                yPercent: -50,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            })
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-[120%] -top-[10%]">
                <video
                    ref={videoRef}
                    src="https://cdn.pixabay.com/video/2015/11/09/1295-145209438_large.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/40" />
            </div>

            <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10 px-4" ref={textRef}>
                <h2 className="text-red-500 font-bold tracking-[0.2em] uppercase text-sm mb-4">The Future of Driving</h2>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black text-white uppercase tracking-tighter mb-6 leading-none">
                    Limit<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">less</span>
                </h1>
                <p className="text-gray-300 max-w-xl text-lg md:text-xl font-light tracking-wide mb-10">
                    Experience engineering perfection. Where speed meets luxury in a symphony of motion.
                </p>

                <div className="flex gap-6">
                    <button className="px-8 py-3 bg-red-600 text-white font-bold uppercase tracking-wider hover:bg-red-700 transition-all transform hover:scale-105 rounded-none border border-red-600">
                        Discover
                    </button>
                    <button className="px-8 py-3 bg-transparent text-white font-bold uppercase tracking-wider hover:bg-white/10 transition-all border border-white">
                        Book Test Drive
                    </button>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20 text-white/50">
                <FaChevronDown size={24} />
            </div>
        </div>
    );
};

export default Hero;
