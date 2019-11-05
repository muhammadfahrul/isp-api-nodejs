'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Identita extends Model {
    static get table () {
        return 'identitas'
    }

    klasifikasi() {
        return this.belongsTo('App/Models/Klasifikasi')
    }

    users(){
        return this.belongsTo('App/Models/User')
    }

    // galeri(){
    //     return this.hasMany('App/Models/Galeri')
    // }

    sarana(){
        return this.belongsTo('App/Models/Sarana')
    }

    kodefikasi() {
        return this.belongsTo('App/Models/Kodefikasi')
    }
}

module.exports = Identita
