'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CategoryCard from '@/components/common/CategoryCard'
import Link from 'next/link'

import testData from '../../public/test.json'


export default function Home() {
	const images = [
		'/heroImages/Hero1.png',
		'/heroImages/Hero2.png',
		'/heroImages/Hero3.png',
		'/heroImages/Hero4.png',
		'/heroImages/Hero5.png',
		'/heroImages/Hero6.png',
		'/heroImages/Hero7.png',
		'/heroImages/Hero8.png',
		'/heroImages/Hero9.png',
		'/heroImages/Hero10.png',
	]

	const [currentIndex, setCurrentIndex] = useState(0)
	const [isHovered, setIsHovered] = useState(false)
	const { ref: heroRef, inView: heroInView } = useInView()
	const { ref: categoryRef, inView: categoryInView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
	})

	useEffect(() => {
		if (!isHovered) {
			const interval = setInterval(() => {
				setCurrentIndex(prevIndex => (prevIndex + 1) % images.length)
			}, 4000)
			return () => clearInterval(interval)
		}
	}, [images.length, isHovered])

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.8,
				staggerChildren: 0.3,
			},
		},
	}

	const itemVariants = {
		hidden: { y: 50, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.8,
				ease: 'easeOut',
			},
		},
	}

	return (
		<div className="relative w-full min-h-screen bg-gradient-to-br from-light-background via-light-background/95 to-light-primary/20 dark:from-dark-background dark:via-dark-background/95 dark:to-dark-primary/20 text-light-text dark:text-dark-text overflow-hidden">
			{/* Animated Background */}
			<div className="absolute inset-0 w-full h-full">
				<div className="absolute w-full h-full opacity-20">
					{[...Array(20)].map((_, i) => (
						<motion.div
							key={i}
							className="absolute rounded-full bg-light-primary dark:bg-dark-primary"
							style={{
								top: `${Math.random() * 100}%`,
								left: `${Math.random() * 100}%`,
								width: `${Math.random() * 50 + 10}px`,
								height: `${Math.random() * 50 + 10}px`,
							}}
							animate={{
								y: [0, Math.random() * 100 - 50],
								x: [0, Math.random() * 100 - 50],
								scale: [1, Math.random() + 0.5],
							}}
							transition={{
								duration: Math.random() * 10 + 5,
								repeat: Infinity,
								repeatType: 'reverse',
							}}
						/>
					))}
				</div>
			</div>

			{/* Hero Section */}
			<motion.section
				ref={heroRef}
				initial="hidden"
				animate={heroInView ? 'visible' : 'hidden'}
				variants={containerVariants}
				className="container mx-auto flex flex-col md:flex-row items-center justify-between min-h-screen px-6 md:px-16 py-20"
			>
				{/* Text Section */}
				<motion.div
					variants={itemVariants}
					className="space-y-8 text-center md:text-left max-w-lg z-10"
				>
					<motion.h1
						className="text-6xl md:text-7xl font-black leading-tight bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent bg-clip-text text-transparent"
						variants={itemVariants}
					>
						Discover Handcrafted Masterpieces
					</motion.h1>
					<motion.p className="text-xl font-light leading-relaxed" variants={itemVariants}>
						Unique, artistic, and made with passion—support local artisans with every purchase.
					</motion.p>
					<motion.div variants={itemVariants}>
						<Link href="./products">
							<button
								className="group relative flex items-center justify-center px-16 py-5 text-lg font-medium rounded-full 
							bg-light-primary dark:bg-dark-primary text-white transform transition-transform group-hover:scale-110 group-hover:translate-x-1
							shadow-glowLight dark:shadow-glowDark hover:shadow-glowLightHover dark:hover:shadow-glowDarkHover
							duration-500 animate-horizontal-wiggle"
							>
								<span className="relative z-10">Shop Now</span>
								<span className="absolute right-5 transform transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-125">
									→
								</span>
								<div className="absolute inset-0 bg-gradient-to-r from-light-accent to-light-primary dark:from-dark-accent dark:to-dark-primary opacity-30 blur-xl rounded-full transform scale-125 group-hover:opacity-50 transition-opacity duration-500"></div>

							</button>
						</Link>
					</motion.div>
				</motion.div>

				{/* Image Slider */}
				<motion.div
					variants={itemVariants}
					className="relative w-full md:w-1/2 h-[80vh] mt-12 md:mt-0 group"
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					<AnimatePresence mode="wait">
						<motion.div
							key={currentIndex}
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							transition={{ duration: 0.5 }}
							className="absolute w-full h-full flex items-center justify-center"
						>
							<div className="relative group">
								<Image
									src={images[currentIndex]}
									alt={`Slide ${currentIndex + 1}`}
									width={600}
									height={500}
									className="rounded-2xl transform transition-transform duration-500 group-hover:scale-105"
									style={{ objectFit: 'contain' }}
								/>
								<div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
							</div>
						</motion.div>
					</AnimatePresence>

					{/* Slider Navigation */}
					<div
						className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
					>
						{images.map((_, i) => (
							<button
								key={i}
								onClick={() => setCurrentIndex(i)}
								className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex
									? 'w-8 bg-light-primary dark:bg-dark-primary'
									: 'bg-gray-400/50'
									}`}
							/>
						))}
					</div>
				</motion.div>

			</motion.section>

			{/* Categories Section */}
			<motion.section
				ref={categoryRef}
				initial="hidden"
				animate={categoryInView ? 'visible' : 'hidden'}
				variants={containerVariants}
				className="py-32 px-6"
			>
				<div className="container mx-auto">
					<motion.h2 variants={itemVariants} className="text-4xl font-bold text-center mb-16">
						Explore Categories
					</motion.h2>
					<motion.div
						variants={containerVariants}
						className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
					>
						{testData.categoriesRes.data.map(category => (
							<motion.div
								key={category.id}
								variants={itemVariants}
								whileHover={{ y: -10 }}
								className="group overflow-hidden rounded-2xl pt-[100px]"
							>
								<CategoryCard
									title={category.name}
									image={category.image}
									description={`Explore unique ${category.name.toLowerCase()} crafted by talented artisans`}
									onClick={() => console.log(`Clicked on ${category.name}`)}
								/>
								<div className="absolute bottom-0 left-0 w-full h-1 bg-light-primary dark:bg-dark-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
							</motion.div>
						))}
					</motion.div>
				</div>
			</motion.section>
		</div>
	)
}
