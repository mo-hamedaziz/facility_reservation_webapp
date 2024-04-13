const President = require('../models/presidentsModel');

// Get all presidents
const getAllPresidents = async (req, res) => {
    try {
        const presidents = await President.find({}).sort({ name: 1 });
        res.status(200).json(presidents);
    } catch (error) {
        console.error("Error fetching presidents:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    getAllPresidents
};