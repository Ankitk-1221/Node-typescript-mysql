import { Request, Response } from 'express';
import { paramMissingError } from '@shared/constants';
import { StatusCodes } from 'http-status-codes';
import { databaseService } from 'src/services/db';
import { Product } from 'src/models/products.model';
const { BAD_REQUEST, CREATED, OK } = StatusCodes;
 
export async function getAllProducts(req: Request, res: Response) {
    let Products: Product[] = await databaseService.getAllProducts("");
    return res.status(OK).json(Products);
}

export async function getProduct(req: Request, res: Response) {
    let id: number = 0;
    if (req.params.id)
        id = parseInt(req.params.id);
    let Products = await databaseService.getProduct(id);
    console.log(Products)
    if(Products)
    return res.status(OK).json({message:"success!",data:Products});
    else
    return res.status(OK).json({message:"unable to get"});
}

export async function deleteProduct(req: Request, res: Response) {
    let id: number = 0;
    if (req.params.id)
        id = parseInt(req.params.id);
    let numDelete = await databaseService.deleteProduct(id);
    if(numDelete)
    return res.status(OK).json({message:"deleted!"});
    else
    return res.status(OK).json("unable to delete ");
}

export async function addProduct(req: Request, res: Response) {
    let Product = <Product>req.body;
    let numAdded = await databaseService.addProduct(Product);
    if(numAdded)
    return res.status(OK).json({message:"Added!",data:Product,status:200});
    else
    return res.status(OK).json("unable to add ");
    //return res.status(OK).json(numAdded);
}

export async function updateProduct(req: Request, res: Response) {
    let Product = <Product>req.body;
    let numAdded = await databaseService.updateProduct(Product);
    if(numAdded)
    return res.status(OK).json({message:"updated!",status:200});
    else
    return res.status(OK).json("unable to add ");
    //return res.status(OK).json(numAdded);
}