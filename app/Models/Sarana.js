'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sarana extends Model {
    static get table () {
        return 'sarana'
    }
}

module.exports = Sarana
