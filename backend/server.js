require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");  // ✅ Correctly Import `fetch`
const cors = require("cors");

const app = express();
const PORT = 5000;
const API_KEY = process.env.SPOONACULAR_API_KEY;

app.use(cors());
app.use(express.json());

app.get("/api/recipe/random", async (req, res) => {
    try {
        const apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}`;
        console.log("Fetching from Spoonacular:", apiUrl);

        const response = await fetch(apiUrl);  // ✅ Now `fetch` works
        const data = await response.json();

        if (!data || !data.recipes) {
            return res.status(500).json({ error: "Invalid response from API" });
        }

        res.json(data);
    } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).json({ error: "Error fetching recipe" });
    }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
