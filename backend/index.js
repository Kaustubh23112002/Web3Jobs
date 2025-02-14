import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import { Job } from './models/job.model.js';
import path from "path";
import compression from "compression"; // Gzip & Brotli compression
import helmet from "helmet"; // Security headers
import request from "request"; // Required for fetching from Rendertron

dotenv.config({});
const app = express();
const _dirname = path.resolve();
const RENDERTRON_URL = "https://render-tron.appspot.com/render/";

const PORT = process.env.PORT || 8000;

// 🌍 CORS Configuration
const corsOptions = {
    origin: 'https://thrmweb3jobs.org',
    credentials: true,
    methods: "GET,POST,PUT,DELETE"
};
app.use(cors(corsOptions));

// ⚡ Performance Optimizations
app.use(compression()); // Compress responses (Brotli/Gzip)
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
                imgSrc: ["'self'", "data:", "https://res.cloudinary.com/", "https://coin-images.coingecko.com"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                connectSrc: ["'self'", "https://res.cloudinary.com/", "https://nominatim.openstreetmap.org","https://api.coingecko.com"],
                frameAncestors: ["'self'"],
                objectSrc: ["'none'"],
                upgradeInsecureRequests: [],
            },
        },
    })
); // Secure headers
app.use(express.json({ limit: "1mb" })); // Prevent large payloads
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());

// 🕵️‍♂️ Detect Bots & Serve Pre-Rendered Content
const botUserAgents = [
    "googlebot", "bingbot", "yandex", "duckduckbot", "baiduspider", 
    "twitterbot", "facebookexternalhit", "rogerbot", "linkedinbot", "embedly"
];

app.use((req, res, next) => {
    const userAgent = req.headers["user-agent"];
    if (userAgent && botUserAgents.some(bot => userAgent.toLowerCase().includes(bot))) {
        const botUrl = `${RENDERTRON_URL}${req.protocol}://${req.get("host")}${req.originalUrl}`;
        // console.log(`Serving Rendertron for: ${req.originalUrl}`);

        request(botUrl, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                res.send(body);
            } else {
                console.error("Rendertron Error:", error);
                next();
            }
        });
    } else {
        next();
    }
});

// 🚀 API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// 🗑 Delete Job Route
app.delete('/api/jobs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedJob = await Job.findByIdAndDelete(id);
        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete job', error });
    }
});

// 🔄 Update Job Route
app.put('/api/v1/job/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const job = await Job.findByIdAndUpdate(id, updatedData, { new: true });
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({ success: true, message: 'Job updated successfully', job });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update job', error });
    }
});

// 🎯 Serve React Frontend with Caching
app.use(express.static(path.join(_dirname, "/frontend/dist"), {
    maxAge: "1y", // Cache assets for 1 year
    etag: false // Disable etags for better performance
}));

app.get('*', (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

// 🚀 Start Server
app.listen(PORT, '0.0.0.0', () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});
