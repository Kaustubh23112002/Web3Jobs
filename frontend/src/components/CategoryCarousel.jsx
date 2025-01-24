import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Blockchain Developer",
            "Smart Contract Developer",
            "Solidity Developer",
            "Web3 Developer",
            "Blockchain Architect",
            "Cryptocurrency Analyst",
            "Blockchain Project Manager",
            "Blockchain Security Engineer",
            "Blockchain UX/UI Designer",
            "Crypto Community Manager",
            "Blockchain Researcher",
            "Blockchain Tester",
            "Ethereum Developer",
            "NFT Developer",
            "Metaverse Developer",
            "DeFi Developer",
            "Crypto Compliance Officer",
            "Crypto Auditor",
            "Web Developer",
            "Frontend Developer",
            "Backend Developer",
            "Full Stack Developer",
            "DevOps Engineer",
            "Database Administrator",
            "Cloud Engineer",
            "Cybersecurity Specialist",
            "Data Scientist",
            "AI/ML Engineer",
            "Systems Administrator",
            "IT Support Specialist",
            "Network Engineer",
            "Software Engineer",
            "Game Developer",
            "Technical Writer",
            "Quality Assurance Engineer",
            "Product Manager",
            "DevOps Manager",
            "Blockchain Consultant",
            "Blockchain Developer",
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20 text-black">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem 
                                className="category-item md:basis-1/3 lg:basis-1/3 sm:basis-1/2 sm:mx-1" 
                            >
                                <Button 
                                    onClick={() => searchJobHandler(cat)} 
                                    style={{
                                        background: "linear-gradient(90deg, #81c315 0%, #ffd300 100%)",
                                        color: "white",
                                    }} 
                                    className="rounded-full w-full"
                                >
                                    <span className="category-text">{cat}</span>
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <style jsx>{`
                /* Set flex-basis to 0 for mobile screens */
                .category-item {
                    flex-basis: 0; /* Default to 0 on mobile */
                }

                /* For screens larger than 400px */
                @media (min-width: 300px) {
                    .category-item {
                        flex-basis: 40%; /* Two items per row */
                    }
                }

                @media (max-width: 470px) {
                    .category-text {
                        font-size: 0.60rem; /* Smaller text size for mobile screens */
                    }
            `}</style>
        </div>
    )
}

export default CategoryCarousel;
