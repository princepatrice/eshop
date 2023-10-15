import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Item from 'App/Models/Item';
import PurchaseHistory from 'App/Models/PurchaseHistory';
import PurchasedItem from "App/Models/PurchasedItem";
import PurchaseValidator from 'App/Validators/PurchaseValidator';

export default class PurchaseHistoriesController {
  async getUserPurchases(userId, page, perPage, search) {
    if (search) {
      return await PurchasedItem.query()
        .whereHas('purchaseHistory', (builder) => {
          builder.where('userId', userId)
            .whereRaw('DATE(purchase_date) = ?', search);
        }).preload("purchaseHistory").orderBy('created_at', 'desc').paginate(page, perPage);

    } else {
      return await PurchasedItem.query()
        .whereHas('purchaseHistory', (builder) => {
          builder.where('userId', userId);
        }).preload("purchaseHistory").orderBy('created_at', 'desc').paginate(page, perPage);
    }
  }

  async getUserPurchasesByLot(userId, page, perPage, search) {
    return await PurchasedItem.query()
      .whereHas('purchaseHistory', (builder) => {
        builder.where('userId', userId)
          .where((builder) => {
            builder.orWhere("purchaseLot", search)
            builder.orWhere("trackingNumber", search)
          })


      }).preload("purchaseHistory").orderBy('created_at', 'desc').paginate(page, perPage);

  }


  public formatUiidCodeDate(id) {
    const date = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `Unq${year}${id}${month}${day}US`;
  }
  public async purchase({ auth, request }: HttpContextContract) {
    await auth.use('api').authenticate()
    const user = auth.user
    const data = await request.validate(PurchaseValidator)
    var purchaseCategories = {}
    const lotId = "LOT" + Math.floor(Date.now() / 1000)
    for (let index = 0; index < data.data.length; index++) {
      const element = data.data[index];
      const item = (await Item.query().where("id", element.id).preload("manufacturer"))[0]
      const trackingNumber = this.formatUiidCodeDate(item?.manufacturer?.id)
      const itemCost = item.price * element.quantity
      if (!(trackingNumber in purchaseCategories)) {
        let estimatedDeliveryDate = new Date()
        estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 15)
        purchaseCategories[trackingNumber] = {
          userId: user?.id, // Foreign key to User
          purchaseLot: lotId,
          purchaseDate: new Date(),
          estimatedDeliveryDate: estimatedDeliveryDate,
          totalPrice: 0,
          trackingNumber: trackingNumber,
          manufacturerId: item.manufacturer.id, // Foreign key to Manufacturer
          shippingAddress: user?.shippingAddress,
          manufactureAddress: item.manufacturer.address,
          items: []
        }
      }
      purchaseCategories[trackingNumber]["totalPrice"] += itemCost
      purchaseCategories[trackingNumber]["items"].push({
        itemId: item.id,
        itemName: item.name,
        itemPrice: item.price,
        quantity: element.quantity
      })


    }

    //Save Purchase

    for (let key in purchaseCategories) {
      let purchase = purchaseCategories[key]
      let items = purchase["items"]
      delete purchase["items"]
      const purchaseHistory = await PurchaseHistory.create(purchase)
      items = items.map((item) => { return { ...item, purchaseId: purchaseHistory.id } })
      await PurchasedItem.createMany(items)

      //let suppose the if the item has enough quanity the operation will be done
      // and reduce the quantity

      for (let i = 0; i < items.length; i++) {

        const itemEntity = await Item.findOrFail(items[i].itemId)
        itemEntity.remaining -= items[i]?.quantity
        await itemEntity.save()
      }

    }

    return { lot: lotId }

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

  public async getMyPurchaseHistoryByLot({ auth, request }: HttpContextContract) {
    await auth.use('api').authenticate()
    const user = auth.user
    let { page, search } = request.get();
    const pageValue = page ?? 1
    const perPage = 20
    const userId = user?.id
    return await this.getUserPurchasesByLot(userId, pageValue, perPage, search)
  }
}
