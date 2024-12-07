import React, { useEffect, useState } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import propTypes from "prop-types";

const HeroProducts = ({ featuredProducts }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timeout);
    }, []);

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto my-4">
                <Skeleton className="h-56 w-full rounded-2xl" />
            </div>
        );
    }

    return (
        <div
            className="max-w-6xl h-56 mx-auto my-2 px-4 sm:px-6 lg:px-8
                rounded-2xl bg-gradient-to-r
                from-[var(--tw-color-secondary)] via-[var(--tw-color-border)] to-[var(--tw-color-accent)]
                overflow-hidden 
            "
        >
            <Carousel
                autoPlay
                infiniteLoop
                showStatus={false}
                showArrows={false}
                showThumbs={false}
                swipeable
                transitionTime={500}
                interval={4000}
                className=" overflow-hidden w-full h-[150px] sm:h-[200px] md:h-[250px]"
            >
                {featuredProducts.map((product, index) => {
                    const primaryImage = product.images.find((img) => img.is_primary).image_path ;
                    return (
                        <div key={index} className="relative flex flex-col md:flex-row items-center justify-center">
                            {/* Text Section */}
                            <div className="flex-1 text-center md:text-left px-4 md:px-6">
                                <h1 className="text-xl sm:text-2xl font-bold text-[var(--tw-color-text)] leading-tight">
                                    {product.name}
                                </h1>
                                <p className="text-sm sm:text-base font-medium text-[var(--tw-color-text)] mt-2">
                                    {product.description}
                                </p>
                                <p className="text-lg sm:text-xl font-bold text-[var(--tw-color-accent)] mt-2">
                                    ${product.price}{" "}
                                    <span className="line-through text-gray-400 text-sm">${product.discount_price}</span>
                                </p>
                            </div>

                            {/* Image Section */}
                            <div className="relative flex-1 w-full h-[100px] md:h-[250px] sm:h-[200px] max-w-[150px] sm:max-w-[200px] md:max-w-[250px] mt-4 md:mt-0">
                                <Image
                                    src={primaryImage}
                                    alt={product.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </div>
                        </div>
                    );
                })}
            </Carousel>
        </div>
    );
};

HeroProducts.propTypes = {
    featuredProducts: propTypes.arrayOf(
        propTypes.shape({
            id: propTypes.number.isRequired,
            name: propTypes.string.isRequired,
            description: propTypes.string.isRequired,
            price: propTypes.number.isRequired,
            discount_price: propTypes.number,
            images: propTypes.arrayOf(
                propTypes.shape({
                    is_primary: propTypes.bool,
                    image_path: propTypes.string.isRequired,
                })
            ),
        })
    ).isRequired,
};

export default HeroProducts;
