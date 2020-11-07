import { Context } from 'koa'
import { Movie } from '../../entities'
import { MovieManager } from '../../managers'
import { CreateMovie, MovieModel } from './model'

export class MovieController {
         private manager: MovieManager;

         constructor(manager: MovieManager) {
           this.manager = manager;
         }

         public async create(ctx: Context) {
           const movieBody: CreateMovie = ctx.request.body;
           const newMovie = await this.manager.create(movieBody as Movie);

           ctx.body = new MovieModel(newMovie);
           ctx.status = 201;
         }

         public async getAll(ctx: Context) {
           const movies = await this.manager.getAll();
           ctx.body = movies;
           ctx.status = 200;
         }

         public async get(ctx: Context) {
           const movie = await this.manager.find(ctx.params.id);
           ctx.body = new MovieModel(movie);
           ctx.status = 200;
         }

         public async getMovieReviews(ctx: Context) {
           const reviews = await this.manager.findMovieReviews(ctx.params.id);
           ctx.body = reviews;
           ctx.status = 200;
         }
       }
