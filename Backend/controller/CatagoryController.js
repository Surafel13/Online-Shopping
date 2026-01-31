import Catagory from "../model/Catagory.js";

export const createCatagory = async (req, res) => {
    try {
        const { name } = req.body;  
        const newCatagory = await Catagory.create({
            name
        });    
        res.status(201).json({ message: "Catagory created successfully", catagory: newCatagory });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }            
}


export const getAllCatagories = async (req, res) => {
    try {
        const catagories = await Catagory.find();   
        res.status(200).json(catagories);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }   
};

export const getCatagoryById = async (req, res) => {
    try {   
        const catagoryId = req.body.catagoryId;
        const catagory = await Catagory.findById(catagoryId);   
        if (!catagory) {
            return res.status(404).json({ message: "Catagory not found" });
        }
        res.status(200).json(catagory);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }   

};