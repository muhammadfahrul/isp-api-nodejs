'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class KodefikasiSchema extends Schema {
  up () {
    this.create('kodefikasis', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('kodefikasis')
  }
}

module.exports = KodefikasiSchema
