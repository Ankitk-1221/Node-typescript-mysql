import { Router } from 'express';
import { getAllProducts,deleteProduct,addProduct ,updateProduct,getProduct } from './Products';
/*
import { getAllPosts,deletePost,addPost ,updatePost } from './Posts';

 
// Posts-route
const postsRouter = Router();
postsRouter.get('/all', getAllPosts);

postsRouter.delete('/delete/:id', deletePost);
 
postsRouter.post('/add/', addPost);

postsRouter.put('/update/', updatePost);
*/

// Products-route
const ProductsRouter = Router();
ProductsRouter.get('/all', getAllProducts);

ProductsRouter.get('/get/:id', getProduct);


ProductsRouter.delete('/delete/:id', deleteProduct);
 
ProductsRouter.post('/add/', addProduct);

ProductsRouter.put('/update/', updateProduct);


// Export the base-router
const baseRouter = Router();
baseRouter.use('/Posts', ProductsRouter);

baseRouter.use('/Products', ProductsRouter);




export default baseRouter;
