'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.integer('user_role_id').notNullable()
      table.string('nama', 191).notNullable()
      table.string('email', 191).notNullable()
      table.string('password', 191).notNullable()
      table.string('photo_profile', 191).notNullable()
      table.string('api_token', 191)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
