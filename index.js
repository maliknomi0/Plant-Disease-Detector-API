const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
const port = 3000;

// Multer setup for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Initialize GoogleGenerativeAI client
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Helper function to convert an image file to base64
function fileToGenerativePart(path, mimeType) {
    return {
        inlineData: {
            data: fs.readFileSync(path).toString("base64"),
            mimeType,
        },
    };
}

// Endpoint to upload a plant image and get disease and solution
app.post('/analyze-plant', upload.single('leafImage'), async (req, res) => {
    try {
        const plantName = req.body.plantName;
        const imagePath = req.file.path;
        const mimeType = req.file.mimetype;

        if (!plantName || !req.file) {
            return res.status(400).json({ message: "Please provide both plant name and image" });
        }

        // Convert the image to the required format
        const imagePart = fileToGenerativePart(imagePath, mimeType);

        // Generate content using Gemini API
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `This is a leaf from a ${plantName} plant. Analyze it for diseases and suggest a solution.`;

        const result = await model.generateContent([prompt, imagePart]);

        // Send response
        res.json({
            plant: plantName,
            diagnosis: result.response.text(),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while processing the image." });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Plant disease analysis API running at http://localhost:${port}`);
});
