'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Galeri extends Model {
    static get table () {
        return 'galeri'
    }
    Identitas(){
    	return this.belongsTo('App/Models/Identitas')
    }
    User(){
        return this.belongsTo('App/Models/User')
    }
}

module.exports = Galeri