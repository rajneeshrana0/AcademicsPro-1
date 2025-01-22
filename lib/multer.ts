import multer from "multer";

// Configure Multer for file storage (in-memory)
const storage = multer.memoryStorage();

export const upload = multer({ storage });

export const uploadSingleFile = upload.single("profilePic");
