'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const User = use('App/Models/User');

class Auth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response }, next) {
    // call next to advance the request
    let token = request.header('Authorization');

    if (!token) {
      return response.status(401).json({ status: false, message: 'Unauthenticated' })
    }else{
      let checkToken = await User.query().where('api_token', token).first();
      if(!checkToken) {
        return response.status(401).json({ status: false, message: 'Unauthenticated' })
      }
    }
    await next()
  }
}

module.exports = Auth
