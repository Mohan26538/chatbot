const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const API_URL = "http://127.0.0.1:1234/v1/chat/completions"; 

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        console.log("User message:", message);

        const response = await axios.post(
            API_URL,
            {
                model: "meta-llama-3.1-8b-instruct:2", // ✅ Change this based on the model name in Llama Studio
                messages: [{ role: "user", content: message }],
            },
            {
                headers: { "Content-Type": "application/json" },
            }
        );

        console.log("API Response:", response.data);

        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        console.error("Server Error:", error.response?.data || error.message);
        res.status(500).json({
            error: "Internal Server Error",
            details: error.response?.data || error.message,
        });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
