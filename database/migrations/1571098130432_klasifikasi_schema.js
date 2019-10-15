'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class KlasifikasiSchema extends Schema {
  up () {
    this.create('klasifikasis', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('klasifikasis')
  }
}

module.exports = KlasifikasiSchema
