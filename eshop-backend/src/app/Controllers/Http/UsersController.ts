import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserRequestValidator from 'App/Validators/CreateUserRequestValidator';
import UpdateUserRequestValidator from 'App/Validators/UpdateUserRequestValidator';

export default class UsersController {
  public async index({ request }: HttpContextContract) {
    const { page, search } = request.get();
    const pageValue = page || 1;
    const searchValue = search || "";
    const perPage = 100;
  
    return await User.query()
      .where("is_admin", 0)
      .where(function (builder) {
        builder.orWhere('first_name', 'like', '%' + searchValue + '%')
            .orWhere('last_name', 'like', '%' + searchValue + '%')
            .orWhere('email', 'like', '%' + searchValue + '%')
            .orWhere('phone_number', 'like', '%' + searchValue + '%');
      })
      .orderBy('last_name', 'asc')
      .paginate(pageValue, perPage);
  }
  

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(CreateUserRequestValidator)
    const user = new User().fill(data)
    return await user.save();
  }

  public async show({ params }: HttpContextContract) {
    return await User.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const data = await request.validate(UpdateUserRequestValidator)
    const user = await User.findOrFail(params.id)
    user.merge(data)
    return await user.save()
  }

  public async updateInfo({ auth, request }: HttpContextContract) {
    await auth.use('api').authenticate()
    const user = auth.user
    const data = await request.validate(UpdateUserRequestValidator)
    const userInfo = await User.findOrFail(user?.id)
    userInfo.merge(data)
    return await userInfo.save()
  }

  

  public async destroy({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await user.delete()
  }
}
