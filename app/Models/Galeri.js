'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Galeri extends Model {
    static get table () {
        return 'galeri'
    }
    
    users(){
        return this.belongsTo('App/Models/User')
    }
    
    identitas(){
    	return this.belongsTo('App/Models/Identita')
    }

}

module.exports = Galeri
