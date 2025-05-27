import { useState, useEffect } from "react";
export const Corousel = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    //@ts-ignore
    const [transitionDirection, setTransitionDirection] = useState('right');
    const slides = [
        {
            image: {
                url: "/assets/homecooking.avif",
                alt: "Indian housewife cooking"
            },
            title: "Come, taste a new kind of Home.",
            description: "Meals from a professionally managed kitchen, made with a mother's touch."
        },
        {
            image: {
                url: "/assets/familyeating.jpg",
                alt: "Happy family eating together"
            },
            title: "Family-style meals delivered",
            description: "Enjoy the warmth of shared meals, even when you're dining alone."
        },
        {
            image: {
                url: "/assets/flavors.jpg",
                alt: "Traditional Indian thali"
            },
            title: "Authentic flavors every day",
            description: "Traditional recipes prepared with care and the finest ingredients."
        },
        {
            image: {
                url: "/assets/chief.jpg",
                alt: "Chef cooking in kitchen"
            },
            title: "Professional quality, homemade taste",
            description: "Our chefs combine professional expertise with homestyle cooking techniques."
        }
    ];
    useEffect(() => {
        const interval = setInterval(() => {
            setTransitionDirection('right');
            setCurrentIndex((prevIndex) =>
                prevIndex === slides.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [slides.length]);
    //@ts-ignore
    const goToSlide = (index) => {
        setTransitionDirection(index > currentIndex ? 'right' : 'left');
        setCurrentIndex(index);
    };

    const goToPrevSlide = () => {
        setTransitionDirection('left');
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    };

    const goToNextSlide = () => {
        setTransitionDirection('right');
        setCurrentIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
    };
    return (
    <div className="relative  overflow-hidden  py-12 bg-[#f8f9f0] h-[500px]">
        {/* Slides container */}
        <div className="flex h-full  transition-transform duration-500 ease-in-out"
            style={{
                transform: `translateX(-${currentIndex * 100}%)`,
            }}>
            {slides.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0 flex flex-col md:flex-row items-center justify-between gap-8 h-full">
                    {/* Text Section */}
                    <div className="w-full md:w-1/2 text-left space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-[#154313] leading-tight">
                            {slide.title.split('\n').map((line, i) => (
                                <span key={i}>
                                    {line}
                                    <br />
                                </span>
                            ))}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-700 font-medium">
                            {slide.description}
                        </p>
                    </div>

                    {/* Image Section */}
                    <div className="w-full md:w-2/3">
                        <div className="relative    overflow-hidden rounded-xl shadow-md h-full">
                            <img
                                src={slide.image.url}
                                alt={slide.image.alt}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Navigation controls */}
        <div className="absolute bottom-4 left-0 right-0  flex justify-center gap-2">
            {slides.map((_, index) => (
                <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full cursor-pointer ${currentIndex === index ? 'bg-[#154313]' : 'bg-gray-400'}`}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>

        <button
            onClick={goToPrevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white z-10"
            aria-label="Previous slide"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
        </button>
        <button
            onClick={goToNextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white z-10"
            aria-label="Next slide"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </button>
    </div>
        
    )
}