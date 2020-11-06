import { Movie } from '../../entities'

export interface CreateMovie {
  name: string
  description: string
  genre: string
  director: string
}

export class MovieModel {
  public id: number
  public name: string
  public description: string
  public genre: string
  public director: string
  public created: Date
  public updated: Date

  constructor(movie: Movie) {
    this.id = movie.id
    this.name = movie.name
    this.genre = movie.genre
    this.director = movie.director
    this.created = movie.created
    this.updated = movie.updated
  }
}
