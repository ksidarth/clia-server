import express from "express";
import db from "./mongoAPI.mjs";

const router = express.Router();

// Fetches purchases from Mongo
router.get("/", async (req, res) => {
  try {
    const collection = db.collection("prod-lab-data");
    const query = {}; 
    const projection = {}; 
    const limit = 500;

    const results = await collection.find(query).project(projection).limit(limit).toArray();
    
    res.status(200).send(results);
  } catch (error) {
    console.error("Error fetching lab data:", error);
    res.status(500).send("An error occurred while fetching lab data.");
  }
});

router.get("/key-results", async (req, res) => {
  try {
    const collection = db.collection("prod-lab-data");
    const query = {'Facility Type': {$nin: ['Pharmacy', 'Skilled Nursing/Nursing Facility',
       'Prison', 'Insurance', 'Hospice', 
      'Assisted Living Facility', 'Ambulance', 
      'Ambulatory Surgery Center']}}; 
    const projection = {'Laboratory Name': 1, 
      'State': 1, 'CLIA Expiration': 1,
      'Certificate Type' : 1, 'Facility Type' : 1,
      'CAP Accreditation': 1,
    'Total Annual Test Volume': 1}; 
    const limit = 500;

    const results = await collection.find(query).project(projection).limit(limit).sort({'Total Annual Test Volume': -1}).toArray();
    
    res.status(200).send(results);
  } catch (error) {
    console.error("Error fetching lab data:", error);
    res.status(500).send("An error occurred while fetching lab data.");
  }
});

export default router;
