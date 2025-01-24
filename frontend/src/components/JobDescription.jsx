import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const [isApplied, setIsApplied] = useState(false);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });

                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                } else {
                    toast.error('Job not found or has been deleted.');
                    dispatch(setSingleJob({}));
                }
            } catch (error) {
                console.log('Error fetching job:', error);
                toast.error(error.response?.data?.message || 'Failed to fetch job details.');
                dispatch(setSingleJob({}));
            }
        };

        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    if (!user) {
        return (
            <div className="max-w-7xl mx-auto my-10">
                <motion.div
                    className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white p-8 rounded-lg shadow-lg text-center"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                    >
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Please Sign In</h2>
                        <p className="mb-6 text-gray-600">You need to sign in to view the job description.</p>
                        <Button onClick={() => navigate('/login')} className="bg-[#7209b7] hover:bg-[#5f32ad] text-white px-4 py-2">
                            Sign In
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        );
    }

    if (!singleJob?.title) {
        return (
            <div className="max-w-7xl mx-auto my-10">
                <div className="text-center text-red-600 font-bold text-lg">
                    Job not found or has been deleted.
                </div>
            </div>
        );
    }

    return (
        <motion.div
            className="max-w-7xl mx-auto my-10 bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="font-extrabold text-2xl text-gray-900">{singleJob?.title}</h1>
                    <motion.div
                        className="flex items-center gap-2 mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Badge className="text-blue-700 font-bold px-4 py-2 bg-blue-100 rounded-lg">{singleJob?.position} Positions</Badge>
                        <Badge className="text-[#F83002] font-bold px-4 py-2 bg-red-100 rounded-lg">{singleJob?.jobType}</Badge>
                        <Badge className="text-[#7209b7] font-bold px-4 py-2 bg-purple-100 rounded-lg">{singleJob?.salary} </Badge>
                    </motion.div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`mt-4 md:mt-0 rounded-lg px-6 py-2 transition-all duration-300 ${
                        isApplied
                            ? 'bg-gray-400 text-white cursor-not-allowed'
                            : 'bg-[#7209b7] hover:bg-[#5f32ad] text-white'
                    }`}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>

            <h1 className="border-b-2 border-b-gray-300 font-medium py-4 mt-6 text-xl">Job Description</h1>
            <motion.div
                className="my-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
            >
                <h1 className="font-bold my-2">Role: <span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span></h1>
                <h1 className="font-bold my-2">Location: <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span></h1>
                <h1 className="font-bold my-2">Description: <span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span></h1>
                <h1 className="font-bold my-2">Experience: <span className="pl-4 font-normal text-gray-800">{singleJob?.experienceLevel} yrs</span></h1>
                <h1 className="font-bold my-2">Salary: <span className="pl-4 font-normal text-gray-800">{singleJob?.salary} </span></h1>
                <h1 className="font-bold my-2">Total Applicants: <span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length}</span></h1>
                <h1 className="font-bold my-2">Posted Date: <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split("T")[0]}</span></h1>
            </motion.div>
        </motion.div>
    );
};

export default JobDescription;
