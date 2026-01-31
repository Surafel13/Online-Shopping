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