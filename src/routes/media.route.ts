import { Router } from 'express';
/* import { CreateUserDto } from '@dtos/users.dto'; */
import { Routes } from '@interfaces/routes.interface';
/* import validationMiddleware from '@middlewares/validation.middleware'; */
import { MediaController } from '@/controllers/media.controller';

export class MediaRoute implements Routes {
  public path = '/media';
  public router = Router();
  public mediaController = new MediaController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/search`, this.mediaController.getSearch);
    this.router.get(`${this.path}/video/:id`, this.mediaController.getVideoById);
    /*
    this.router.get(`${this.path}/list`, this.usersController.getVideoById); 
    this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
    this.router.delete(`${this.path}/:id(\\d+)`, this.usersController.deleteUser);
    */
  }
}
