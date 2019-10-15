'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SaranaSchema extends Schema {
  up () {
    this.create('saranas', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('saranas')
  }
}

module.exports = SaranaSchema
