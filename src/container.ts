import { Logger } from 'pino'
import { MySql } from './lib/database'
import { HealthMonitor } from './lib/health'
import { MovieManager, ReviewsManager } from './managers'
import { MovieRepository, ReviewRepository } from './repositories'

export interface ServiceContainer {
  health: HealthMonitor
  logger: Logger
  repositories: {
    movie: MovieRepository
    review: ReviewRepository
  }
  managers: {
    movie: MovieManager
    review: ReviewsManager
  }
}

export function createContainer(db: MySql, logger: Logger): ServiceContainer {
  const movieRepo = new MovieRepository(db)
  const reviewRepo = new ReviewRepository(db)
  const healthMonitor = new HealthMonitor()

  return {
    health: healthMonitor,
    logger,
    repositories: {
      movie: movieRepo,
      review: reviewRepo
    },
    managers: {
      movie: new MovieManager(movieRepo),
      review: new ReviewsManager(reviewRepo)
    }
  }
}
