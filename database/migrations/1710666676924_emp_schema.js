'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmpSchema extends Schema {
  up () {
    this.create('emps', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('emps')
  }
}

module.exports = EmpSchema
