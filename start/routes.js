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

Route.post('api/v1/login/facebook', 'LoginController.facebook')
Route.post('api/v1/login/google', 'LoginController.google')

Route.group(() => {

  Route.get('/users', 'UserController.showUsers')
  Route.get('/users/:id', 'UserController.usersId')
  Route.post('/add-users', 'UserController.addUsers')
  Route.put('/update-users/:id', 'UserController.editUsers')
  Route.delete('/delete-users/:id', 'UserController.deleteUsers')


  Route.get('/user-role', 'UserRoleController.showUserRole')
  Route.get('/user-role/:id', 'UserRoleController.userRoleId')
  Route.post('/add-user-role', 'UserRoleController.addUserRole')
  Route.put('/update-user-role/:id', 'UserRoleController.editUserRole')
  Route.delete('/delete-user-role/:id', 'UserRoleController.deleteUserRole')

  Route.get('/identitas/search/', 'IdentitaController.searchAllKode')
  Route.get('/identitas/search/:kode/', 'IdentitaController.searchKode')
  Route.get('/identitas', 'IdentitaController.showIdentitas')
  Route.get('/identitas/:id', 'IdentitaController.identitasId')
  Route.post('/add-identitas', 'IdentitaController.addIdentitas')
  Route.put('/update-identitas/:id', 'IdentitaController.editIdentitas')
  Route.delete('/delete-identitas/:id', 'IdentitaController.deleteIdentitas')


  Route.get('/klasifikasi', 'KlasifikasiController.showKlasifikasi')
  Route.get('/klasifikasi/:id', 'KlasifikasiController.klasifikasiId')
  Route.post('/add-klasifikasi', 'KlasifikasiController.addKlasifikasi')
  Route.put('/update-klasifikasi/:id', 'KlasifikasiController.editKlasifikasi')
  Route.delete('/delete-klasifikasi/:id', 'KlasifikasiController.deleteKlasifikasi')


  Route.get('/kodefikasi', 'KodefikasiController.showKodefikasi')
  Route.get('/kodefikasi/:id', 'KodefikasiController.kodefikasiId')
  Route.post('/add-kodefikasi', 'KodefikasiController.addKodefikasi')
  Route.put('/update-kodefikasi/:id', 'KodefikasiController.editKodefikasi')
  Route.delete('/delete-kodefikasi/:id', 'KodefikasiController.deleteKodefikasi')


  Route.get('/sarana', 'SaranaController.showSarana')
  Route.get('/sarana/:id', 'SaranaController.saranaId')
  Route.post('/add-sarana', 'SaranaController.addSarana')
  Route.put('/update-sarana/:id', 'SaranaController.editSarana')
  Route.delete('/delete-sarana/:id', 'SaranaController.deleteSarana')


  Route.get('/galeri', 'GaleriController.showGaleri')
  Route.get('/galeri/:id', 'GaleriController.galeriId')
  Route.post('/add-galeri', 'GaleriController.addGaleri')
  Route.put('/update-galeri/:id', 'GaleriController.editGaleri')
  Route.delete('/delete-galeri/:id', 'GaleriController.deleteGaleri')
}).prefix('api/v1').middleware('Auth')
