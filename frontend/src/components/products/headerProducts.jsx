'use client'
import React,{ useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSliders, faThLarge, faBars, faFilter } from '@fortawesome/free-solid-svg-icons'
import propsTypes from 'prop-types'

const HeaderProducts = ({ isFilterOpen, setIsFilterOpen, isSortByOpen, setIsSortByOpen, sortBy, setSortBy, viewMode, setViewMode, Categories }) => {
    const [selectedCategory, setSelectedCategory] = useState(1)
    return (
        <div className="sticky top-0 h-16 z-10 bg-light-background dark:bg-dark-background shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Filter Button */}
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="p-2 rounded-lg  text-light-text dark:text-dark-text hover:bg-light-primary hover:text-white dark:hover:bg-dark-primary transition"
                    >
                        <FontAwesomeIcon icon={faSliders} className="h-5 w-6 " />
                    </button>

                    {/* Sort Dropdown */}
                    <div className="relative w-20">
                        <button
                            onClick={() => setIsSortByOpen(!isSortByOpen)}
                            className="flex items-center px-4 py-2 rounded-lg  text-light-text dark:text-dark-text hover:bg-light-primary hover:text-white dark:hover:bg-dark-primary transition "
                        >
                            {sortBy}
                            <FontAwesomeIcon icon={faFilter} className="h-5 w-5 mr-2" />
                        </button>
                        {isSortByOpen && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-light-background dark:bg-dark-background rounded-lg shadow-lg z-10">
                                {['newest', 'price_low', 'price_high', 'popular'].map(option => (
                                    <button
                                        key={option}
                                        onClick={() => setSortBy(option)}
                                        className="block w-full text-left px-4 py-2 text-light-text dark:text-dark-text hover:bg-light-muted dark:hover:bg-dark-muted"
                                    >
                                        {option.replace('_', ' ').toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Categories */}
                    <div className="flex-1 mx-4 h-16 overflow-hidden relative">
                        <div
                            className="flex items-center space-x-4 py-1 px-6 overflow-hidden hover:overflow-x-auto scrollbar-thin scrollbar-thumb-light-muted dark:scrollbar-thumb-dark-muted"
                            onMouseEnter={(e) => {
                                e.currentTarget.style.overflowX = 'auto'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.overflowX = 'hidden'
                            }}
                        >
                            {Categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`whitespace-nowrap px-4 py-2 rounded-full shadow-sm transition-colors duration-300 ease-in-out 
                            ${selectedCategory === category.id
                                            ? ' bg-light-primary text-white dark:bg-dark-primary'
                                            : 'bg-transparent text-light-text dark:text-dark-text hover:bg-light-primary hover:text-white dark:hover:bg-dark-primary'
                                        }`}
                                    tabIndex="0" // لجعل الزر قابل للتفاعل باستخدام لوحة المفاتيح
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex items-center space-x-4 mx-4">
                        <div className="flex border border-light-border dark:border-dark-border rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-light-muted dark:bg-dark-muted' : ''}`}
                            >
                                <FontAwesomeIcon
                                    icon={faThLarge}
                                    className="h-5 w-5 text-light-text dark:text-dark-text"
                                />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded ${viewMode === 'list' ? 'bg-light-muted dark:bg-dark-muted' : ''}`}
                            >
                                <FontAwesomeIcon
                                    icon={faBars}
                                    className="h-5 w-5 text-light-text dark:text-dark-text"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

HeaderProducts.propTypes = {
    isFilterOpen: propsTypes.bool.isRequired,
    setIsFilterOpen: propsTypes.func.isRequired,
    isSortByOpen: propsTypes.bool.isRequired,
    setIsSortByOpen: propsTypes.func.isRequired,
    sortBy: propsTypes.string.isRequired,
    setSortBy: propsTypes.func.isRequired,
    viewMode: propsTypes.string.isRequired,
    setViewMode: propsTypes.func.isRequired,
    Categories: propsTypes.array.isRequired
}

export default HeaderProducts;
