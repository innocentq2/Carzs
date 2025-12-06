import React, { useEffect, useRef } from 'react';
import { cars } from '../data/cars';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WebAnimation from './WebAnimation';

gsap.registerPlugin(ScrollTrigger);

const CarShowcase = () => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const totalWidth = sectionRef.current.scrollWidth;
            const windowWidth = window.innerWidth;
            const scrollWidth = totalWidth - windowWidth;

            // Horizontal Scroll Tween
            const tween = gsap.to(sectionRef.current, {
                x: -scrollWidth,
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: () => `+=${scrollWidth + 500}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        // Velocity-based Skew Effect
                        const skew = self.getVelocity() / 300;
                        // Clamp skew to avoid excessive distortion
                        const clampedSkew = Math.max(-10, Math.min(10, skew));

                        gsap.to(sectionRef.current, {
                            skewX: clampedSkew,
                            overwrite: 'auto',
                            duration: 0.1,
                            ease: "power1.out"
                        });
                    }
                }
            });

            // Parallax Image Effect
            cardsRef.current.forEach((card) => {
                if (!card) return;
                const img = card.querySelector('img.parallax-img');

                // Image moves slightly faster/slower than container to create depth
                gsap.fromTo(img,
                    { xPercent: -15, scale: 1.2 },
                    {
                        xPercent: 15,
                        scale: 1.2, // Maintain scale
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            containerAnimation: tween,
                            start: "left right", // when left of card hits right of viewport
                            end: "right left",   // when right of card hits left of viewport
                            scrub: true,
                        }
                    }
                );
            });

        }, triggerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={triggerRef} className="overflow-hidden bg-[#050505] relative z-20">
            <WebAnimation />
            <div ref={sectionRef} className="flex h-screen items-center px-[10vw] w-fit will-change-transform component-padding relative z-10">

                {/* Title Section Intro */}
                <div className="flex-shrink-0 w-[400px] md:w-[30vw] pr-20 flex flex-col justify-center">
                    <h2 className="text-6xl md:text-8xl font-display font-black text-white mb-6 uppercase leading-[0.9] mix-blend-difference italic">
                        The <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Lineup</span>
                    </h2>
                    <p className="text-gray-400 text-xl font-light tracking-wide">
                        Drag, scroll, and witness the velocity. <br />
                        <span className="text-red-500 text-sm uppercase tracking-widest mt-4 block">→ Scroll Horizontal</span>
                    </p>
                </div>

                {/* Car Cards */}
                {cars.map((car, index) => (
                    <div
                        key={car.id}
                        ref={el => cardsRef.current[index] = el}
                        className="relative w-[85vw] md:w-[600px] h-[75vh] flex-shrink-0 mx-6 md:mx-10 group rounded-none overflow-hidden border-l border-white/10 bg-gray-900"
                    >
                        {/* Image Container with Parallax */}
                        <div className="absolute inset-0 overflow-hidden">
                            <img
                                src={car.image}
                                alt={car.name}
                                className="parallax-img w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                            />
                        </div>

                        {/* Overlay & Content */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                        {/* Card Text Content */}
                        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                            <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                <p className="text-red-500 font-mono text-xs md:text-sm uppercase tracking-[0.2em] mb-2">{car.brand} // {car.id.toString().padStart(2, '0')}</p>
                                <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 uppercase italic">{car.name}</h3>

                                <div className="grid grid-cols-2 gap-y-4 gap-x-8 border-t border-white/20 pt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    <div>
                                        <span className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1">Top Speed</span>
                                        <span className="block text-xl font-display text-white">{car.speed}</span>
                                    </div>
                                    <div>
                                        <span className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1">0-60 MPH</span>
                                        <span className="block text-xl font-display text-white">{car.acceleration}</span>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1">Starting At</span>
                                        <span className="block text-2xl font-display text-red-500">{car.price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hover Decoration */}
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="w-12 h-12 border border-red-600 rounded-full flex items-center justify-center text-red-600 text-xl">
                                ↗
                            </div>
                        </div>
                    </div>
                ))}

                {/* End Spacer */}
                <div className="w-[10vw]"></div>
            </div>
        </section>
    );
};

export default CarShowcase;
