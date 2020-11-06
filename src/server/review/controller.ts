import { Context } from 'koa'
import { Review } from '../../entities'
import { ReviewsManager } from '../../managers'
import { ReviewModel } from './model'

export class ReviewController {
  private manager: ReviewsManager

  constructor(manager: ReviewsManager) {
    this.manager = manager
  }

  public async get(ctx: Context) {
    const review = await this.manager.find(ctx.params.id)
    ctx.body = new ReviewModel(review)
    ctx.status = 200
  }
  
  public async getAll(ctx: Context) {
    const review = await this.manager.findAll()
    ctx.body = review
    ctx.status = 200
  }
  
  public async create(ctx: Context) {
    const review: Review = ctx.request.body

    const newReview = await this.manager.create(review)
    ctx.body = new ReviewModel(newReview)
    ctx.status = 201
    ctx.set('location', `/api/reviews/${newReview.id}`)
  }

}
