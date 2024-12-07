'use client'
import React from 'react'
import { Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import propTypes from 'prop-types'

const FilterSidebar = ({ isFilterOpen, priceRange, setPriceRange, selectedRating, setSelectedRating }) => {
    return (
        <Transition
            show={isFilterOpen}
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 translate-x-[-100%]"
            enterTo="opacity-100 translate-x-0"
            leave="transition ease-in duration-300"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 translate-x-[-100%]"
            className="w-64 flex-shrink-0 bg-light-background dark:bg-dark-background shadow-lg rounded-lg"
        >
            <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Filters</h3>
                {/* Price Range Filter */}
                <div className="mb-6">
                    <h4 className="font-medium mb-2">Price Range</h4>
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-light-muted dark:bg-dark-muted rounded-lg"
                    />
                    <div className="flex justify-between mt-2 text-sm text-light-muted dark:text-dark-muted">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                    </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                    <h4 className="font-medium mb-2">Minimum Rating</h4>
                    <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map(rating => (
                            <button
                                key={rating}
                                onClick={() => setSelectedRating(rating)}
                                className={`p-1 ${selectedRating >= rating ? 'text-yellow-400' : 'text-light-muted dark:text-dark-muted'}`}
                            >
                                <FontAwesomeIcon icon={faStar} className="h-6 w-6" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </Transition>
    )
}

FilterSidebar.propTypes = {
    isFilterOpen: propTypes.bool.isRequired,
    priceRange: propTypes.arrayOf(propTypes.number).isRequired,
    setPriceRange: propTypes.func.isRequired,
    selectedRating: propTypes.number.isRequired,
    setSelectedRating: propTypes.func.isRequired,
}

export default FilterSidebar