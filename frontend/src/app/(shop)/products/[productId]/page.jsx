'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { StarIcon, HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';

const ProductPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/productsTest.json`);
                const products = response.data.products;

                const product = products.find((item) => item.id === parseInt(productId));
                setProduct(product || null);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-ring-spin rounded-full h-32 w-32 border-b-2 border-[var(--tw-color-primary)]"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold text-[var(--tw-color-text)]">Product not found</h1>
            </div>
        );
    }

    return (
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[var(--tw-color-background)] text-[var(--tw-color-text)]">
            <div className="flex flex-col md:flex-row gap-8">



                {/* Image Gallery */}
                <div className="md:w-1/2 flex flex-col items-center">
                    {/* Main Image with 3D rotation effect */}
                    <div className="relative w-full max-w-lg overflow-hidden rounded-xl shadow-xl transition-transform duration-700 group hover:scale-105">
                        <img
                            src={product.images[selectedImage].image_path}
                            alt={product.name}
                            className="h-full w-full object-cover object-center group-hover:scale-110 transition-all duration-500 ease-in-out transform group-hover:rotate-3d"
                        />
                        {/* Zoom effect overlay */}
                        <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-0 transition-opacity duration-300"></div>
                    </div>

                    {/* Thumbnail Image Gallery with dynamic highlighting and hover effects */}
                    <div className="mt-4 flex space-x-4 overflow-x-auto pb-4 pt-2">
                        {product.images.map((image, index) => (
                            <div
                                key={image.id}
                                onClick={() => setSelectedImage(index)}
                                className={`relative w-24 h-24 overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 group`}
                            >
                                <div
                                    className={`absolute inset-0 flex justify-center items-center bg-[var(--tw-color-background)] rounded-lg shadow-lg transform scale-100 border border-[var(--tw-color-muted)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl ${selectedImage === index ? 'scale-110 border-4 border-[var(--tw-color-primary)]' : 'scale-100'
                                        }`}
                                >
                                    <img
                                        src={image.image_path}
                                        alt={`Product ${index + 1}`}
                                        className="h-full w-full object-cover object-center rounded-lg transform transition-all duration-500 group-hover:rotate-12"
                                    />
                                </div>
                                {/* Bottom highlight for selected image */}
                                {selectedImage === index && (
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[var(--tw-color-primary)] transform transition-all duration-300"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>




                {/* Product Info */}
                <div className="md:w-1/2">
                    <div className="mb-4">
                        <h1 className="text-3xl font-bold text-[var(--tw-color-primary)] transition-transform duration-500 hover:scale-105">
                            {product.name}
                        </h1>
                        <div className="mt-2">
                            <nav aria-label="Breadcrumb">
                                <ol className="flex items-center space-x-2 text-sm text-[var(--tw-color-muted)]">
                                    <li>
                                        <a href="#" className="hover:text-[var(--tw-color-primary)]">{product.category.name}</a>
                                    </li>
                                    <li><span>/</span></li>
                                    <li>{product.name}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                    {/* Price Section */}
                    <div className="mt-4">
                        {product.discount_price ? (
                            <div className="flex items-baseline">
                                <span className="text-3xl font-bold text-[var(--tw-color-primary)] shadow-lg transform transition-transform duration-500 hover:scale-110">
                                    ${product.discount_price}
                                </span>

                                <span className="ml-2 text-lg text-[var(--tw-color-muted)] line-through">
                                    ${product.price}
                                </span>
                                <span className="ml-2 text-sm text-green-600">
                                    {Math.round(((product.price - product.discount_price) / product.price) * 100)}% OFF
                                </span>
                            </div>
                        ) : (
                            <span className="text-3xl font-bold text-[var(--tw-color-primary)]">${product.price}</span>
                        )}
                    </div>

                    {/* Stock Status */}
                    <div className="mt-4">
                        {product.stock_quantity > 0 ? (
                            <span className="text-green-600">
                                In Stock ({product.stock_quantity} available)
                            </span>
                        ) : (
                            <span className="text-red-600">Out of Stock</span>
                        )}
                    </div>

                    {/* Add to Cart Section */}
                    <div className="mt-6">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center border rounded-lg border-[var(--tw-color-border)]">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-2 text-[var(--tw-color-text)] hover:text-[var(--tw-color-primary)]"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-16 text-center border-none focus:ring-0 bg-transparent"
                                />
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-2 text-[var(--tw-color-text)] hover:text-[var(--tw-color-primary)]"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                className="flex-1 bg-[var(--tw-color-background)] text-[var(--tw-color-text)] border border-[var(--tw-color-border)] px-6 py-3 rounded-lg hover:shadow-glowLightHover dark:hover:shadow-glowDarkHover transition-colors"
                                disabled={product.stock_quantity === 0}
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <ShoppingCartIcon className="h-5 w-5" />
                                    Add to Cart
                                </span>
                            </button>
                            <button className="p-3 rounded-lg border border-[var(--tw-color-border)] hover:border-[var(--tw-color-primary)] transition-colors">
                                <HeartIcon className="h-6 w-6 text-[var(--tw-color-muted)] hover:text-[var(--tw-color-primary)]" />
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="mt-8">
                        <div className="border-b border-[var(--tw-color-border)]">
                            <nav className="flex space-x-8" aria-label="Tabs">
                                {['description', 'details', 'reviews'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`${activeTab === tab
                                            ? 'border-[var(--tw-color-primary)] text-[var(--tw-color-primary)]'
                                            : 'border-transparent text-[var(--tw-color-muted)] hover:text-[var(--tw-color-primary)] hover:border-[var(--tw-color-border)]'
                                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="mt-8">
                            {activeTab === 'description' && (
                                <div className="prose max-w-none">
                                    {product.description}
                                </div>
                            )}
                            {activeTab === 'details' && (
                                <div className="space-y-4">
                                    {product.attributes.map((attr) => (
                                        <div key={attr.id} className="flex border-b pb-2 border-[var(--tw-color-border)]">
                                            <span className="font-medium w-1/4">{attr.name}:</span>
                                            <span className="text-[var(--tw-color-text)]">{attr.value}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {activeTab === 'reviews' && (
                                <div className="space-y-6">
                                    {product.reviews.map((review) => (
                                        <div key={review.id} className="border-b pb-4 border-[var(--tw-color-border)]">
                                            <div className="flex items-center mb-2">
                                                <div className="flex items-center">
                                                    {[...Array(5)].map((_, i) => (
                                                        <StarIcon
                                                            key={i}
                                                            className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="ml-2 text-sm text-gray-600">
                                                    {new Date(review.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <h4 className="font-medium">{review.title}</h4>
                                            <p className="text-gray-600 mt-1">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>




            </div>
        </div>
    );
};

export default ProductPage;