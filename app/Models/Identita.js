'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Identita extends Model {
    static get table () {
        return 'identitas'
    }
    User(){
        return this.hasMany('App/Models/User')
    }
}

module.exports = Identita
