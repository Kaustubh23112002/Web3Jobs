import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const fitlerData = [
    {
        fitlerType: 'Location',
        array: [ "Bengaluru",
            "Hyderabad",
            "Pune",
            "Mumbai",
            "Delhi",
            "Gurgaon",
            "Chennai",
            "Noida",
            "Kolkata",
            "Chandigarh",
            "Ahmedabad",
            "Jaipur",
            "Surat",
            "Coimbatore",
            "Indore",
            "Nagpur",
            "Lucknow",
            "Bhopal",
            "Thane",
            "Mysuru"],
    },
    {
        fitlerType: 'Industry',
        array: [
            "Blockchain Developer",
            "Smart Contract Developer",
            "Solidity Developer",
            "Web3 Developer",
            "Decentralized Application (DApp) Developer",
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
          ],
    },
    {
        fitlerType: 'Salary',
        array: ['20k-30k', '30k-50k', '50k-1LPA', '1LPA-3LPA', '3LPA-5LPA','6LPA-7LPA', '7LPA-12LPA'],
    },
];

const FilterCard = () => {
    const [selectedValues, setSelectedValues] = useState({
        Location: '',
        Industry: '',
        Salary: '',
    });
    const dispatch = useDispatch();

    const changeHandler = (filterType, value) => {
        setSelectedValues((prev) => ({
            ...prev,
            [filterType]: value,
        }));
    };

    useEffect(() => {
        // Dispatch the selected filter values
        dispatch(setSearchedQuery(selectedValues));
    }, [selectedValues, dispatch]);

    return (
        <div
            className="w-full p-5 rounded-lg shadow-md"
            style={{
                background: 'linear-gradient(145deg, #101820, #2F4F4F)', // Gradient background
            }}
        >
            <h1 className="font-bold text-lg text-white">Filter Jobs</h1>
            <hr className="mt-3 border-gray-500" />
            {fitlerData.map((data, index) => (
                <div key={index} className="mt-5">
                    <h1 className="font-bold text-lg text-gray-300">{data.fitlerType}</h1>
                    <select
                        value={selectedValues[data.fitlerType] || ''}
                        onChange={(e) => changeHandler(data.fitlerType, e.target.value)}
                        className="mt-2 w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        <option value="">Select {data.fitlerType}</option>
                        {data.array.map((item, idx) => (
                            <option key={idx} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    );
};

export default FilterCard;
