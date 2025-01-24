import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Space from '../assets/space.jpg';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector((store) => store.job);
    const [filteredJobs, setFilteredJobs] = useState(allJobs);

    const matchesSalary = (filterSalary, jobSalary) => {
        if (!filterSalary) return true;
        if (!jobSalary) return false;

        const parseSalary = (salary) => {
            const isLPA = salary.toLowerCase().includes('lpa');
            const isK = salary.toLowerCase().includes('k');
            const multiplier = isLPA ? 1_00_000 : isK ? 1_000 : 1;
        
            const [min, max] = salary
                .replace(/[^\d.\-]/g, '')
                .split('-')
                .map((val) => parseFloat(val.replace(/[^\d.-]/g, '').trim()) * multiplier);
        
            return {
                min: min || 0,
                max: max || min,
            };
        };

        const filterRange = parseSalary(filterSalary);
        const jobRange = parseSalary(jobSalary);

        if (jobRange.min > filterRange.max || jobRange.max < filterRange.min) {
            return false;
        }

        return (
            (jobRange.min >= filterRange.min && jobRange.min <= filterRange.max) ||
            (jobRange.max >= filterRange.min && jobRange.max <= filterRange.max) ||
            (jobRange.min <= filterRange.min && jobRange.max >= filterRange.max)
        );
    };

    const matchesIndustry = (jobTitle, industryRole) => {
        // Match the exact industry role phrase in the job title (whole word match, case insensitive)
        const regex = new RegExp(`\\b${industryRole.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")}\\b`, 'i');
        return regex.test(jobTitle);
    };

    useEffect(() => {
        if (searchedQuery) {
            const filtered = allJobs.filter((job) => {
                const query = typeof searchedQuery === 'string' ? searchedQuery.toLowerCase() : '';
                const matchesTitle = job.title.toLowerCase().includes(query);
                const matchesDescription = job.description.toLowerCase().includes(query);
                const matchesLocation = job.location.toLowerCase().includes(query);

                let matchesFilter = true;

                if (typeof searchedQuery === 'object') {
                    if (searchedQuery.Location && job.location !== searchedQuery.Location) {
                        matchesFilter = false;
                    }

                    if (searchedQuery.Industry) {
                        const industry = searchedQuery.Industry;
                        // Check if the job title matches the selected industry role
                        if (!matchesIndustry(job.title, industry)) {
                            matchesFilter = false;
                        }
                    }

                    if (searchedQuery.Salary && !matchesSalary(searchedQuery.Salary, job.salary)) {
                        matchesFilter = false;
                    }
                }

                return (
                    (matchesTitle || matchesDescription || matchesLocation) && matchesFilter
                );
            });

            setFilteredJobs(filtered);
        } else {
            setFilteredJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
            {/* Space background */}
            <style>
                {`
                @keyframes spaceMove {
                    0% {
                        background-position: 0 0;
                    }
                    100% {
                        background-position: 5000px 5000px;
                    }
                }
            `}</style>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `url(${Space}) repeat`,
                    backgroundSize: 'cover',
                    animation: 'spaceMove 60s linear infinite',
                    zIndex: -1,
                }}
            ></div>

            <Navbar />
            <div className="max-w-7xl mx-auto mt-5 relative z-10">
                <div className="flex flex-col sm:flex-row gap-5">
                    {/* FilterCard for mobile/tablet view and side-by-side on desktop */}
                    <div className="w-full sm:w-1/5 sm:block flex-none">
                        <FilterCard />
                    </div>

                    {/* Job Cards */}
                    {filteredJobs.length <= 0 ? (
                        <div className="text-center text-white flex-1 flex items-center justify-center">
                            <span className="text-xl font-bold">No jobs found. Try adjusting the filters!</span>
                        </div>
                    ) : (
                        <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                            {/* Responsive Grid: 1 card in mobile, 2 in tablet, 3 in desktop */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredJobs.map((job) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3 }}
                                        key={job?._id}
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Jobs;
