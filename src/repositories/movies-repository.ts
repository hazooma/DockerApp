import { Movie, Review } from '../entities'
import { NotFoundError, ValidationError } from '../errors'
import { MySql } from '../lib/database'
import  {fetchMovieDetail}  from '../services/OMDb'


export class MovieRepository {
  private readonly TABLE: string = 'movies'
  private db: MySql

  constructor(db: MySql) {
    this.db = db
  }

  
  public async findMovieReviews(id: number): Promise<Review[]> {
    const conn = await this.db.getConnection()
    const results = await conn
      .select()
      .from('reviews')
      .where({ movie_id: id })
      .orderBy('updated', 'DESC') 
    return results;
  }


  public async findById(id: number): Promise<Movie> {
    const conn = await this.db.getConnection()
    const row = await conn
      .table(this.TABLE)
      .where({ id })
      .first()

    if (!row) {
      throw new NotFoundError('Movie does not exist')
    }

    return this.transform(row)
  }
  public async getAll(): Promise<Movie[]> {
    const conn = await this.db.getConnection()
    const rows = await conn.table(this.TABLE)
    return rows.map(r => this.transform(r))
  }
  

  public async insert(movie: Movie): Promise<Movie> {
    movie.created = new Date()
    movie.updated = new Date()

    const conn = await this.db.getConnection()

    try {
      const movieInfo = await fetchMovieDetail(movie.name)
      if (!movieInfo) {
        throw new NotFoundError(`Unknown! Movie ${movie.name} Not Found in our library`)
      
      }
      
      const result = await conn.table(this.TABLE).insert({
        name: movie.name,
        description: movie.description,
        genre: movieInfo.Genre,
        director: movieInfo.Director,
        created: movie.created,
        updated: movie.updated
      })

      movie.id = result[0]

      return movie
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ValidationError(`Movie ${movie.name} already exists`, err)
      }

      throw err
    }
  }

  private transform(row: any): Movie {
    return {
      id: row.id,
      name:row.name,
      description:row.description,
      genre: row.genre,
      director: row.director,
      created: row.created,
      updated: row.updated
    }
  }
}
