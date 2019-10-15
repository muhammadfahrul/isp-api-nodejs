'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
  Route.get('/users', 'UserController.showUsers')
  Route.get('/users/:id', 'UserController.usersId')
  Route.post('/add-users', 'UserController.addUsers')
  Route.put('/edit-users/:id', 'UserController.editUsers')
  Route.delete('/delete-users/:id', 'UserController.deleteUsers')

  
  Route.get('/user-role', 'UserController.showUserRole')
  Route.get('/user-role/:id', 'UserController.userRoleId')
  Route.post('/add-user-role', 'UserController.addUserRole')
  Route.put('/edit-user-role/:id', 'UserController.editUserRole')
  Route.delete('/delete-user-role/:id', 'UserController.deleteUserRole')


  Route.get('/identitas', 'IdentitaController.showIdentitas')
  Route.get('/identitas/:id', 'IdentitaController.identitasId')
  Route.post('/add-identitas', 'IdentitaController.addIdentitas')
  Route.put('/edit-identitas/:id', 'IdentitaController.editIdentitas')
  Route.delete('/delete-identitas/:id', 'IdentitaController.deleteIdentitas')


  Route.get('/klasifikasi', 'KlasifikasiController.showKlasifikasi')
  Route.get('/klasifikasi/:id', 'KlasifikasiController.klasifikasiId')
  Route.post('/add-klasifikasi', 'KlasifikasiController.addKlasifikasi')
  Route.put('/edit-klasifikasi/:id', 'KlasifikasiController.editKlasifikasi')
  Route.delete('/delete-klasifikasi/:id', 'KlasifikasiController.deleteKlasifikasi')


  Route.get('/kodefikasi', 'KodefikasiController.showKodefikasi')
  Route.get('/kodefikasi/:id', 'KodefikasiController.kodefikasiId')
  Route.post('/add-kodefikasi', 'KodefikasiController.addKodefikasi')
  Route.put('/edit-kodefikasi/:id', 'KodefikasiController.editKodefikasi')
  Route.delete('/delete-kodefikasi/:id', 'KodefikasiController.deleteKodefikasi')


  Route.get('/sarana', 'SaranaController.showSarana')
  Route.get('/sarana/:id', 'SaranaController.saranaId')
  Route.post('/add-sarana', 'SaranaController.addSarana')
  Route.put('/edit-sarana/:id', 'SaranaController.editSarana')
  Route.delete('/delete-sarana/:id', 'SaranaController.deleteSarana')

  Route.post('login/facebook', 'LoginController.facebook')
  Route.post('login/google', 'LoginController.google')

}).prefix('api/v1')
