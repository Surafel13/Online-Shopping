import express from 'express'
import { createCatagory, getAllCatagories, getCatagoryById, updateCatagory, deleteCatagory } from '../controller/CatagoryController.js'

const CatagoryRouter = express.Router();

CatagoryRouter.post("/createCatagory", createCatagory);
CatagoryRouter.get("/getAllCatagories", getAllCatagories);
CatagoryRouter.post("/getCatagoryById", getCatagoryById);
CatagoryRouter.post("/updateCatagory", updateCatagory);
CatagoryRouter.post("/deleteCatagory", deleteCatagory);

export default CatagoryRouter;