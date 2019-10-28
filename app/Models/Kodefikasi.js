'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Kodefikasi extends Model {
    static get table () {
        return 'kodefikasi'
    }
    klasifikasi() {
        return this.hasMany('App/Models/Klasifikasi')
    }

    users() {
        return this.belongsTo('App/Models/User')
    }

    sarana() {
        return this.belongsTo('App/Models/Sarana')
    }
}

module.exports = Kodefikasi
