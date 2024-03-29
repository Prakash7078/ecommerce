import express from 'express';
import { generateToken, isAuth } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
const orderRoutes=express.Router();
orderRoutes.post('/',
    isAuth,expressAsyncHandler(async(req,res)=>{
        const newOrder=new Order({
            orderItems:req.body.orderItems.map((x)=>({...x,product:x._id})),
            shippingAddress:req.body.shippingAddress,
            paymentMethod:req.body.paymentMethod,
            itemsPrice:req.body.itemsPrice,
            shippingPrice:req.body.shippingPrice,
            taxPrice:req.body.taxPrice,
            totalPrice:req.body.totalPrice,
            user:req.body._id
        });
        const order=await newOrder.save();
        res.status(201).send({message:'New Order Created',order});
    }));

export default orderRoutes;