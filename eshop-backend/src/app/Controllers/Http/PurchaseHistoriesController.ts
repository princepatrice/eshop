import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PurchasedItem from "App/Models/PurchasedItem";
import PurchaseValidator from 'App/Validators/PurchaseValidator';

export default class PurchaseHistoriesController {
  async getUserPurchases(userId, page, perPage, search) {
    if (search) {
      return await PurchasedItem.query()
        .whereHas('purchaseHistory', (builder) => {
          builder.where('userId', userId)
            .whereRaw('DATE(purchase_date) = ?', search);
        }).preload("purchaseHistory").paginate(page, perPage);

    } else {
      return await PurchasedItem.query()
        .whereHas('purchaseHistory', (builder) => {
          builder.where('userId', userId);
        }).preload("purchaseHistory").paginate(page, perPage);
    }
  }

  public async purchase({ auth, request }: HttpContextContract) {
    await auth.use('api').authenticate()
    const user = auth.user
    const data = await request.validate(PurchaseValidator)
    /*var purchaseCategories=[]
    data.data.forEach(element => {
      
    });*/

  }
  public async userPurchaseHistory({ params, request }: HttpContextContract) {
    let { page, search } = request.get();
    const pageValue = page ?? 1
    const perPage = 20
    const userId = params.id
    return await this.getUserPurchases(userId, pageValue, perPage, search)
  }

  public async getMyPurchaseHistory({ auth, request }: HttpContextContract) {
    await auth.use('api').authenticate()
    const user = auth.user
    let { page, search } = request.get();
    const pageValue = page ?? 1
    const perPage = 20
    const userId = user?.id
    return await this.getUserPurchases(userId, pageValue, perPage, search)
  }
}
