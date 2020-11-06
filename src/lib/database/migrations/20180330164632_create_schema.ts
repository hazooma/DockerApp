import * as knex from 'knex'

export function up(db: knex) {
  return db.schema
    .createTable('movies', table => {
      table.increments('id').primary()
      table.string('name', 64).unique()
      table.text('description').notNullable()
      table.string('genre', 64).notNullable()
      table.string('director', 64).notNullable()
      table.dateTime('created').notNullable()
      table.dateTime('updated').notNullable()
    })
    .then(() => {
      return db.schema.createTable('reviews', table => {
        table.increments('id').primary()
        table.text('content').notNullable()
        table.dateTime('created').notNullable()
        table.dateTime('updated').notNullable()
        table
          .integer('movie_id')
          .notNullable()
          .unsigned()
          .references('id')
          .inTable('movies')
      })
    })
}

export function down(db: knex) {
  return db.schema.dropTable('movies').dropTable('reviews')
}
