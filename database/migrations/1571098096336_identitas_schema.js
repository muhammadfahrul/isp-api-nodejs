'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IdentitasSchema extends Schema {
  up () {
    this.create('identitas', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('identitas')
  }
}

module.exports = IdentitasSchema
