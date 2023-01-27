import { NextFunction, Request, Response } from 'express';
import { SearchItem } from '@/interfaces/media.interface';
import { MediaService } from '@/services/media.service';

export class MediaController {
  public userService = new MediaService();

  public getSearch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const search = String(req.query.s ?? '' /* 'Just Dance ALL SONGS (500+) Just Dance 1- 2020 Compilation' */);

      if (!search || search.length === 0) {
        res.status(400).send('Requires s query');
      }

      const findAllUsersData: SearchItem[] = await this.userService.search(search);

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getVideoById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const videoId = String(req.params.id);

      if (!videoId) {
        res.status(400).send('Requires id param');
      }

      const [video] = await this.userService.getFormatVideo(videoId);

      const { mimeType } = video;
      const [contentType] = mimeType.split(';');
      res.setHeader('Content-Type', contentType);
      const stream = await this.userService.getVideo(videoId, video);
      stream.pipe(res);
    } catch (error) {
      next(error);
    }
  };

  /*   public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const createUserData: User = await this.userService.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const userData: CreateUserDto = req.body;
      const updateUserData: User[] = await this.userService.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const deleteUserData: User[] = await this.userService.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  }; */
}
