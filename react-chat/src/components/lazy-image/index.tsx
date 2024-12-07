import React from "react";
import { useEffect, useRef, useState } from "react";


export const LazyImage = ({ src, alt = '', className = '' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const imageRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                })
            },
            { threshold: 0.1 }
        );

        if (imageRef.current) {
            observer.observe(imageRef.current);
        }
        return () => {
            if (imageRef.current) {
                observer.unobserve(imageRef.current);
            }
        };
    }, [])

    return (
        <img
            ref={imageRef}
            src={isVisible ? src : ''}
            alt={alt}
            className={className}
            loading="lazy"
        />
    );
};