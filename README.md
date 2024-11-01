# Plant Disease Detector API

The Plant Disease Detector API allows users to upload an image of a plant leaf and provides a diagnosis of any disease, along with a recommended solution. This API utilizes Google Generative AI to analyze images and generate insights based on the uploaded plant leaf image.

## Features
- Upload an image of a plant leaf.
- Analyze the image for plant diseases and provide potential solutions.
- Supports any plant type by specifying the plant name.

## Requirements
- [Node.js](https://nodejs.org/) (version 14 or later)
- [Google Generative AI](https://cloud.google.com/generative-ai) API key
- An internet connection for accessing Google’s Generative AI model

## Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/maliknomi0/Plant-Disease-Detector-API.git
    cd Plant-Disease-Detector-API
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Create an `uploads` Directory**:
    Create an `uploads` folder in the project root for storing uploaded images temporarily.
    ```bash
    mkdir uploads
    ```

## Environment Variables
Create a `.env` file in the root directory and add your Google Generative AI API key:

```plaintext
API_KEY=your_google_generative_ai_api_key
```

Replace `your_google_generative_ai_api_key` with your actual API key from Google Generative AI.

## Usage

### Start the Server
To start the server, run:
```bash
node app.js
```
The server will run at `http://localhost:3000`.

### Endpoint

#### POST `/analyze-plant`

- **Description**: Upload a plant leaf image and provide the plant name to analyze it for potential diseases and suggested solutions.
- **Form Data Parameters**:
  - `plantName` (required): The name of the plant (e.g., `tomato`, `rose`).
  - `leafImage` (required): The image file of the plant leaf.
- **Response**: JSON object containing the diagnosis and solution for the specified plant.

### Example with Postman

1. Open Postman and create a new POST request.
2. Set the URL to `http://localhost:3000/analyze-plant`.
3. Under the **Body** tab, select **form-data**.
4. Add the following fields:
   - `plantName`: Enter the plant name (e.g., `tomato`).
   - `leafImage`: Select a leaf image file from your computer.
5. Send the request. You should see a JSON response with the diagnosis and solution.

### Example with cURL

```bash
curl -X POST http://localhost:3000/analyze-plant \
     -F "plantName=tomato" \
     -F "leafImage=@path/to/leaf-image.jpg"
```
Replace `path/to/leaf-image.jpg` with the path to your image file.

### Example Response
```json
{
  "plant": "tomato",
  "diagnosis": "The leaf shows signs of early blight. Apply a fungicide and ensure proper watering practices to prevent further spread."
}
```

## Contact

Feel free to reach out with any questions, suggestions, or feedback.

- GitHub: [github.com/maliknomi0](https://github.com/maliknomi0)
- LinkedIn: [linkedin.com/in/maliknomi0](https://www.linkedin.com/in/maliknomi0/)
- WhatsApp: +92 370 0204207
