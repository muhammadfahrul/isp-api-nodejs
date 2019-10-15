'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Kodefikasi extends Model {
    static get table () {
        return 'kodefikasi'
    }
}

module.exports = Kodefikasi
