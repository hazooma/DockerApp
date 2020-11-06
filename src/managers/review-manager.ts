import { Review } from '../entities'
import { ReviewRepository } from '../repositories'

export class ReviewsManager {
  private repo: ReviewRepository

  constructor(repo: ReviewRepository) {
    this.repo = repo
  }

  public async find(id: number): Promise<Review> {
    return this.repo.find(id)
  }

  public async findAll(): Promise<Review[]> {
    return this.repo.findAll()
  }

  public async create(review: Review): Promise<Review> {
    return this.repo.insert(review)
  }
}
