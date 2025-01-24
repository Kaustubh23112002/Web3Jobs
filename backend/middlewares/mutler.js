import multer from "multer";

// Configure storage to keep files in memory
const storage = multer.memoryStorage();

// Middleware for single file upload
export const singleUpload = multer({ storage }).single("file");

