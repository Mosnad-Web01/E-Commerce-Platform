import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Tags = ({ tags, onClick = () => '#', color = 'gray' }) => {
    const colorClasses = {
        gray: 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600',
        blue: 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-700 dark:text-blue-200 dark:hover:bg-blue-600',
        green: 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-700 dark:text-green-200 dark:hover:bg-green-600',
        red: 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-700 dark:text-red-200 dark:hover:bg-red-600',
        yellow: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-700 dark:text-yellow-200 dark:hover:bg-yellow-600',
    };

    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => {

                const tagText = typeof tag === 'string' ? tag : tag.text;
                const tagColor = typeof tag === 'string' ? color : tag.color || color;

                return (
                    <Link key={index} href={onClick ? onClick(tagText) : ''} passHref>
                        <span
                            className={`text-sm px-3 py-1 rounded-full cursor-pointer transition-all ${colorClasses[tagColor]} focus:outline-none`}
                        >
                            {tagText}
                        </span>
                    </Link>
                );
            })}
        </div>
    );
};

Tags.propTypes = {
    tags: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                text: PropTypes.string.isRequired,
                color: PropTypes.oneOf(['gray', 'blue', 'green', 'red', 'yellow']),
            }),
        ])
    ).isRequired,
    onClick: PropTypes.func,
    color: PropTypes.oneOf(['gray', 'blue', 'green', 'red', 'yellow']),
};

export default Tags;
