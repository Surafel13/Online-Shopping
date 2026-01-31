import Product from "../model/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, imageUrl } = req.body;    
    const newProduct = await Product.create({
        name,
        description,
        price,  
        category,
        quantity,
        imageUrl
    });    
    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }            
};