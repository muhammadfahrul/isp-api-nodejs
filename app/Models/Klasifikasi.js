'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Klasifikasi extends Model {
    static get table () {
        return 'klasifikasi'
    }
    // identitas(){
    // 	return this.belongsTo('App/Models/Identita')
    // }
    kodefikasi() {
        return this.belongsTo('App/Models/Kodefikasi')
    }
    users() {
        return this.belongsTo('App/Models/User')
    }
}

module.exports = Klasifikasi
