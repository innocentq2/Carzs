import React, { useEffect, useRef } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(contentRef.current.children, {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 80%", // Start animation when top of footer hits 80% with viewport
                    toggleActions: "play none none reverse"
                }
            });

            // Pulse animation for the glowing text
            gsap.to(".glow-pulse", {
                textShadow: "0 0 20px rgba(255, 51, 51, 0.9), 0 0 40px rgba(255, 51, 51, 0.6)",
                repeat: -1,
                yoyo: true,
                duration: 2,
                ease: "sine.inOut"
            });

        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} className="relative bg-black py-20 border-t border-white/5 overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full z-0 opacity-75">
                <video
                    src="https://cdn.pixabay.com/video/2019/07/20/25380-350507864_large.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
            </div>

            <div ref={contentRef} className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-2">
                        <h2 className="text-4xl font-display font-bold text-white mb-6 glow-pulse text-glow">
                            TURBO<span className="text-red-500">EX</span>
                        </h2>
                        <p className="text-gray-400 max-w-sm mb-8">
                            Redefining the boundaries of automotive performance. We don't just build cars; we craft experiences.
                        </p>
                        <div className="flex gap-4">
                            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-red-500 hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,51,51,0.5)]">
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold uppercase tracking-wider mb-6 border-b border-red-500/50 pb-2 inline-block">Explore</h4>
                        <ul className="space-y-4">
                            {['Models', 'Technology', 'Racing', 'Bespoke', 'Pre-Owned'].map(item => (
                                <li key={item}><a href="#" className="text-gray-500 hover:text-red-500 transition-colors hover:pl-2 duration-300 block">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold uppercase tracking-wider mb-6 border-b border-red-500/50 pb-2 inline-block">Contact</h4>
                        <ul className="space-y-4 text-gray-500">
                            <li className="hover:text-white transition-colors">123 Speedster Blvd, Auto City</li>
                            <li className="hover:text-white transition-colors">+1 (555) 000-TURBO</li>
                            <li className="hover:text-white transition-colors text-red-500 cursor-pointer glow-pulse">contact@turboex.com</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-gray-600 text-sm flex flex-col md:flex-row justify-between items-center">
                    <p>&copy; {new Date().getFullYear()} TurboEx Automotive. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-red-500 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-red-500 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
