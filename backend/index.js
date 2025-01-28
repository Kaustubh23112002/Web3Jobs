import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import { Job } from './models/job.model.js'; // Use named import
import path from "path";

dotenv.config({});

const app = express();

const _dirname = path.resolve();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: 'https://thrmweb3jobs.org',
    credentials: true
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 8000;

// Default route (add this here)
// app.get('/', (req, res) => {
//     res.send('Server is up and running!');
// });

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Delete job route
app.delete('/api/jobs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedJob = await Job.findByIdAndDelete(id); // Deleting job from DB
        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete job', error });
    }
});

// Update job route
app.put('/api/v1/job/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        // Find the job by ID and update the fields
        const job = await Job.findByIdAndUpdate(id, updatedData, { new: true }); // { new: true } returns the updated document

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Job updated successfully',
            job: job // Optionally return the updated job details
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update job', error });
    }
});

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

// Server listening (ensure it binds to 0.0.0.0)
app.listen(PORT, '0.0.0.0', () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});
