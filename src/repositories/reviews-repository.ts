import { Review } from '../entities'
import { NotFoundError, ValidationError } from '../errors'
import { MySql } from '../lib/database'

export class ReviewRepository {
  private readonly TABLE: string = 'reviews'
  private db: MySql

  constructor(db: MySql) {
    this.db = db
  }

  public async find(id: number): Promise<Review> {
    const conn = await this.db.getConnection()
    const row = await conn
      .select()
      .from(this.TABLE)
      .where({ id })
      .first()

    if (!row) {
      throw new NotFoundError('Review does not exist')
    }

    return this.transform(row)
  }
  public async findAll(): Promise<Review[]> {
    const conn = await this.db.getConnection()
    const row = await conn.select().from(this.TABLE)

    return row.map(r => this.transform(r))
  }

  public async insert(review: Review): Promise<Review> {
    review.created = new Date()
    review.updated = new Date()

    const conn = await this.db.getConnection()
    try {
      const result = await conn.table(this.TABLE).insert({
        content: review.content,
        created: review.created,
        updated: review.updated,
        movie_id: review.movie_id
      })

      review.id = result[0]

      return review
    } catch (error) {
      throw new ValidationError(`Error Creating this Review !`, error)
    }
  }

  private transform(row: any): Review {
    return {
      id: row.id,
      content: row.content,
      movie_id: row.movie_id,
      created: row.created,
      updated: row.updated
    }
  }
}
