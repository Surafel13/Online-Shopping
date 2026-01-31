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


export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getProductById = async (req, res) => {
    try {   
        const productId = req.body.productId;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }   
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }   

};

export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const updates = req.body;   
        const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }   
};

export const deleteProduct = async (req, res) => {
    try {
        const productId = req.body.productId;
        const deletedProduct = await Product.findByIdAndDelete(productId);  
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }   
};