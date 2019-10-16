'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Klasifikasi extends Model {
    static get table () {
        return 'klasifikasi'
    }
    Identitas(){
    	return this.belongTo('App/Models/Identitas')
    }
    kodefikasi() {
        return this.belongsTo('App/Models/Klasifikasi')
    }
}

module.exports = Klasifikasi
