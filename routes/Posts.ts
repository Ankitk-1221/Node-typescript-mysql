import { Request, Response } from 'express';
import { paramMissingError } from '@shared/constants';
import { StatusCodes } from 'http-status-codes';
import { databaseService } from 'src/services/db';
import { Post } from 'src/models/post.model';
const { BAD_REQUEST, CREATED, OK } = StatusCodes;
 
export async function getAllPosts(req: Request, res: Response) {
    let posts: Post[] = await databaseService.getAllPosts("");
    return res.status(OK).json(posts);
}
