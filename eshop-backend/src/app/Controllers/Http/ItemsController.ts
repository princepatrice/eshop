import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Item from 'App/Models/Item'
import CreateItemRequestValidator from 'App/Validators/CreateItemRequestValidator';
import UpdateItemRequestValidator from 'App/Validators/UpdateItemRequestValidator';

export default class ItemsController {
  public async index({request}: HttpContextContract) {
    let { page, search } = request.get();
    const pageValue = page??1
    const searchValue= search??1
    const perPage=20
    return await Item.query()
    .where('name', 'like', '%' + searchValue + '%')
    .orderBy('name', 'asc').preload("manufacturer").paginate(pageValue, perPage);
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(CreateItemRequestValidator)
    const user = new Item().fill(data)
    return await user.save();
  }

  public async show({ params }: HttpContextContract) {
    return (await Item.query().where("id",params.id).preload("manufacturer"))[0]
  }

  public async update({ params, request }: HttpContextContract) {
    const data = await request.validate(UpdateItemRequestValidator)
    const user = await Item.findOrFail(params.id)
    user.merge(data)
    return await user.save()
  }

  public async destroy({ params }: HttpContextContract) {
    const user = await Item.findOrFail(params.id)
    await user.delete()
  }
}
