/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'



Route.group(() => {
  Route.group(() => {

    Route.group(() => {
      Route.resource('users', 'UsersController').apiOnly();
      Route.get('users/:id/purchase-history', 'PurchaseHistoriesController.userPurchaseHistory');
    }).middleware('auth:api')

    Route.group(() => {
      Route.group(() => {
        Route.get('my/purchase-history', 'PurchaseHistoriesController.getMyPurchaseHistory');
        Route.get('my/purchase-history-lot', 'PurchaseHistoriesController.getMyPurchaseHistoryByLot');
        Route.post('my/purchase', 'PurchaseHistoriesController.purchase');
        Route.get('me', 'AuthController.user')
        Route.post('user/update', 'UsersController.updateInfo')
        Route.post('logout', 'AuthController.logout')
        Route.post('change-password', 'AuthController.changePassword')
      }).prefix('auth')

    }).middleware('auth:api')
    
    Route.post('auth/login', 'AuthController.loginUser')
    Route.post('auth/register', 'AuthController.register')
    Route.post('auth/admin/login', 'AuthController.loginAdmin')
    Route.post('auth/forgot-password', 'AuthController.forgotPassword')
    Route.resource('items', 'ItemsController').apiOnly().only(["index","show"]);

  }).prefix('api/v1')
})