import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as Router from 'koa-router'
import { ServiceContainer } from '../../container'
import * as middleware from '../middlewares'
import { ReviewController } from './controller'
import * as validators from './validators'

export function init(server: Koa, container: ServiceContainer) {
  const router = new Router({ prefix: '/api/reviews' })
  const controller = new ReviewController(container.managers.review)

  router.get(
    '/:id',
    controller.get.bind(controller)
  )

  router.get(
    '/',
    controller.getAll.bind(controller)
  )
  router.post(
    '/',
    bodyParser(),
    middleware.validate({ request: { body: validators.createReview } }),
    controller.create.bind(controller)
  )



  server.use(router.routes())
}
