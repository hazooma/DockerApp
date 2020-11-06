import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as Router from 'koa-router'
import { ServiceContainer } from '../../container'
import * as middleware from '../middlewares'
import { MovieController} from './controller'
import * as validators from './validators'

export function init(server: Koa, container: ServiceContainer) {
  const router = new Router({ prefix: '/api/movies' })
  const controller = new MovieController(container.managers.movie)

  router.post(
    '/',
    bodyParser(),
    middleware.validate({ request: { body: validators.createMovie } }),
    controller.create.bind(controller)
  )

  router.get('/:id/reviews', controller.getMovieReviews.bind(controller))
  router.get('/', controller.getAll.bind(controller))
  router.get('/:id', controller.get.bind(controller))
  server.use(router.routes())
}
