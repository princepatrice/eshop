import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User"
import Hash from '@ioc:Adonis/Core/Hash'
import CreateUserRequestValidator from "App/Validators/CreateUserRequestValidator"

export default class AuthController {

  public async login({ auth, request, response }) {

    const email = request.input('email')
    const password = request.input('password')
    const user = await User.query()
      .where('email', email)
      .first()

    try {
      const token = await auth.use('api').attempt(email, password)
      return { user, token:token.token }
    } catch {
      return response.unauthorized('Invalid credentials')
    }

  }



  public async register({ auth, request, response }: HttpContextContract) {

    try {
      const data = await request.validate(CreateUserRequestValidator)
      const user = new User().fill({ ...data, password: await Hash.make(data.password) })
      const userInfo = await user.save();
      const token = await auth.use('api').generate(userInfo)
      return {
        token: token.token,
        user
      }
    } catch (error) {
      console.log(error.messages.errors)
      return response.unauthorized('The Account Already Exists')
    }
  }



  public async user({ auth, response }) {
    try {
      await auth.use('api').authenticate()
      return auth.user
    } catch (err) {
      return response.unauthorized('Invalid credentials')
    }
  }

  public async changePassword({ auth, request }) {
    try {
      await auth.use('api').authenticate()
      const user = auth.user
      const password = request.input('password')
      const newpassword = request.input('newpassword')
      if (await Hash.verify(user.password, password)) {
        user.merge({ password: newpassword })
        await user.save()
        const token = await auth.use('api').attempt(user.email, newpassword)
        return {
          status: true, data: {
            token: token.token,
            user
          }, message: "Password updated successfully"
        }
      } else {
        return { status: false, message: "Incorrect Password" }
      }

    } catch (err) {
      console.log(err)
      return { status: false, message: "An Error Occurs" }
    }
  }





  public async logout({ auth }) {
    await auth.use('api').revoke()
    return {
      revoke: true
    }
  }

}
