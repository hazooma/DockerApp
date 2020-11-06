import { Movie, Review } from '../entities'
import { MovieRepository } from '../repositories'

export class MovieManager {
  private repo: MovieRepository

  constructor(repo: MovieRepository) {
    this.repo = repo
  }

  public find(id: number): Promise<Movie> {
    return this.repo.findById(id)
  }
  public findMovieReviews(id: number): Promise<Review[]> {
    return this.repo.findMovieReviews(id)
  }

  public getAll(): Promise<Movie[]> {
    return this.repo.getAll()
  }

  public create(movie: Movie): Promise<Movie> {
    return this.repo.insert(movie)
  }
}
