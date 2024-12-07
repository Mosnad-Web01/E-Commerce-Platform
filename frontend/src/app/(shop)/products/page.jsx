'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import HeaderProducts from '@/components/products/HeaderProducts'
import FilterSidebar from '@/components/products/FilterSidebar'
import HeroProducts from '@/components/products/HeroProducts'
import Card from '@/components/common/Card'
import Loading from '@/components/common/Loading'


const Products = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [isSortByOpen, setIsSortByOpen] = useState(false)
    const [sortBy, setSortBy] = useState('newest')
    const [viewMode, setViewMode] = useState('grid')
    const [priceRange, setPriceRange] = useState([0, 1000])
    const [selectedRating, setSelectedRating] = useState(0)

    const [categories, setCategories] = useState([])
    const [featuredProducts, setFeaturedProducts] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('/productsTest.json')
            .then((response) => {
                const allProducts = response.data.products;
                const featured = allProducts.filter(product => product.is_featured === true);
                setFeaturedProducts(featured);
                setProducts(allProducts);
                setCategories(response.data.categories)
            })
            .catch((error) => console.error('Error loading data:', error))
    }, [])

    if (!featuredProducts.length || !categories.length || !products.length) {
        return <div className="flex justify-center items-center h-screen">
            <Loading size="lg" shape="circle" speed="" color="" text="products loading..." />
        </div>
    }

    return (
        <div className="min-h-screen bg-light-background dark:bg-dark-background">
            <HeaderProducts
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
                isSortByOpen={isSortByOpen}
                setIsSortByOpen={setIsSortByOpen}
                sortBy={sortBy}
                setSortBy={setSortBy}
                viewMode={viewMode}
                setViewMode={setViewMode}
                Categories={categories}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex gap-8">
                    <FilterSidebar
                        isFilterOpen={isFilterOpen}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        selectedRating={selectedRating}
                        setSelectedRating={setSelectedRating}
                    />
                    <div className="flex-1 overflow-hidden">
                        {/* Hero Section */}
                        <HeroProducts featuredProducts={featuredProducts} />
                        {/* Product Grid */}
                        <div
                            className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'grid-cols-1 gap-4'} `}
                        >
                            {products.map(product => (
                                <Card
                                    key={product.id}
                                    product={product}
                                    viewMode={viewMode}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products


