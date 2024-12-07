import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { FaHeart, FaInfoCircle } from 'react-icons/fa';
import Tooltip from './Tooltip';
import Badge from './Badge';
import Tag from './Tags';
import Link from 'next/link';

const Card = ({ product, viewMode }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const {
        id,
        name,
        description,
        price,
        discount_price,
        category,
        sub_category,
        images = [],
        vendor,
        is_featured,
        stock_quantity,
        release_date,
    } = product;

    const primaryImage = images.find((img) => img.is_primary) || images[0];
    const secondaryImage = images.length > 1 ? images[1] : null;


    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(favorites.includes(id));
    }, [id]);

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (!isFavorite) {
            favorites.push(id);
        } else {
            favorites = favorites.filter((item) => item !== id);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        window.dispatchEvent(new Event('favoriteUpdated'));
    };

    // Helper Functions
    const calculateDiscount = () => {
        if (!discount_price) return null;
        return Math.round(((price - discount_price) / price) * 100);
    };

    const isNewProduct = () => {
        const currentDate = new Date();
        const release = new Date(release_date);
        const diffDays = Math.ceil((currentDate - release) / (1000 * 60 * 60 * 24));
        return diffDays <= 30;
    };

    return (
        <div
            className={`bg-light-background dark:bg-dark-background 
                ${viewMode === 'list' ? 'flex flex-row w-full' : 'max-w-sm'} border rounded-2xl
                ${isFavorite ? 'border-light-primary dark:border-dark-primary' : 'border-gray-300 dark:border-gray-600'}
                shadow-glowLight dark:shadow-glowDark overflow-hidden hover:shadow-glowLightHover dark:hover:shadow-glowDarkHover transition-all duration-300 relative h-full w-full`}
        >
            {/* Image Section */}
            <div className={`relative  ${viewMode === 'list' ? 'w-1/3 h-full flex' : 'w-full h-64'}`}>
                {primaryImage ? (
                    <div className={`relative ${viewMode === 'list' && secondaryImage ? 'w-1/2' : 'w-full'} h-full`}>
                        <Image
                            src={primaryImage.image_path}
                            alt={name}
                            layout="fill"
                            objectFit="cover"
                            className="hover:scale-105 transition-transform duration-500 ease-in-out"
                        />
                    </div>
                ) : (
                    <div className="flex items-center justify-center w-full h-64 bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                        <span>No Image Available</span>
                    </div>
                )}
                {viewMode === 'list' && secondaryImage && (
                    <div className="relative w-1/2 h-full">
                        <Image
                            src={secondaryImage.image_path}
                            alt={`${name} - secondary`}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-t-2xl hover:scale-105 transition-transform duration-500 ease-in-out"
                        />
                    </div>
                )}

                {/* Actions */}
                <div className={`absolute ${viewMode === 'list' ? 'top-2 right-2 space-y-32' : 'top-4 right-4 space-y-36'}`}>
                    <Tooltip text="Add to Favorites" position="bottom">
                        <div
                            onClick={handleFavoriteClick}
                            className={`p-3 rounded-full bg-white bg-opacity-20 text-lg 
                                ${isFavorite ? 'text-red-600' : 'text-gray-500'}
                                hover:scale-110 hover:bg-opacity-70 transition-transform`}
                        >
                            <FaHeart />
                        </div>
                    </Tooltip>

                    <Tooltip text="View Details" position="top">
                        <Link href={`/products/${id}`}>
                            <div
                                className="p-3 rounded-full bg-white bg-opacity-20 text-gray-500 text-lg
                            hover:scale-110 hover:bg-opacity-70 transition-transform"
                            >
                                <FaInfoCircle />
                            </div>
                        </Link>
                    </Tooltip>
                </div>
            </div>

            {/* Content Section */}
            <div className={`p-4 ${viewMode === 'list' ? 'w-2/3' : ''}`}>
                {/* Title */}
                <h2 className="text-2xl mb-2 font-semibold text-light-text dark:text-dark-text truncate">{name}</h2>

                {/* Tags Section */}
                <div className="flex flex-col gap-2">
                    {vendor && (
                        <Tag
                            tags={[{ text: vendor.name }]}
                            color="blue"
                            onClick={(usertId) => `/profile/${usertId}`}
                        />

                    )}
                    {category && (
                        <Tag
                            tags={[
                                { text: category.name },
                                ...(sub_category ? [{ text: sub_category.name }] : []),
                            ]}
                            color="green"
                            onClick={(categoryName) => `/products?category=${categoryName}`}
                        />
                    )}
                </div>

                {/* Description */}
                <p className="text-sm text-light-muted dark:text-dark-muted mt-2">{description}</p>

                {/* Price */}
                <div className="flex items-center space-x-4 mt-2">
                    <p className="text-lg font-semibold text-light-primary dark:text-dark-primary">
                        ${price.toFixed(2)}
                    </p>
                    {discount_price && (
                        <p className="text-sm line-through text-light-muted dark:text-dark-muted">
                            ${discount_price.toFixed(2)}
                        </p>
                    )}
                </div>

                {/* Badges Section */}
                <div className="mt-4 flex flex-wrap gap-2">
                    {is_featured && <Badge text="Featured" variant="success" size="sm" />}
                    {stock_quantity <= 0 && <Badge text="Out of Stock" variant="danger" size="sm" />}
                    {isNewProduct() && <Badge text="NEW" variant="info" size="sm" />}
                    {discount_price && (
                        <Badge
                            text={`${calculateDiscount()}% Off`}
                            variant="warning"
                            size="sm"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

Card.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        price: PropTypes.number.isRequired,
        discount_price: PropTypes.number,
        category: PropTypes.shape({
            name: PropTypes.string,
        }),
        sub_category: PropTypes.shape({
            name: PropTypes.string,
        }),
        images: PropTypes.arrayOf(
            PropTypes.shape({
                image_path: PropTypes.string.isRequired,
                is_primary: PropTypes.bool,
            })
        ),
        vendor: PropTypes.shape({
            name: PropTypes.string,
        }),
        is_featured: PropTypes.bool,
        stock_quantity: PropTypes.number,
        release_date: PropTypes.string,
    }),
    viewMode: PropTypes.oneOf(['grid', 'list']),
};

export default Card;
