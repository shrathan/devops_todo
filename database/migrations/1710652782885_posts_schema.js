'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostsSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      
      table.string('title', 255).notNullable();
      table.text('description').nullable();
      table.enum('status', ['pending', 'completed']).notNullable().defaultTo('pending');
      table.date('due_date');
      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostsSchema
