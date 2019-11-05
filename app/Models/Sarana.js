'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sarana extends Model {
    static get table () {
        return 'sarana'
    }

    kodefikasi() {
        return this.hasMany('App/Models/Kodefikasi')
    }

    users() {
        return this.belongsTo('App/Models/User')
    }

    klasifikasi() {
        return this.belongsTo('App/Models/Klasifikasi')
    }

    identitas() {
        return this.belongsTo('App/Models/Identita')
    }

    galeri() {
        return this.belongsTo('App/Models/Galeri')
    }
}

module.exports = Sarana
