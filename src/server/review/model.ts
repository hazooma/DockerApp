import { Review } from '../../entities'

export interface CreateReview {
  content: string
  movie_id: string
}

export class ReviewModel {
  public id?: number
  public content: string
  public movie_id: number
  public created: Date
  public updated: Date

  constructor(review: Review) {
    this.id = review.id
    this.content = review.content
    this.movie_id = review.movie_id
    this.created = review.created
    this.updated = review.updated
  }
}
