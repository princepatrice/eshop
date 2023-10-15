// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User"
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthController {

  public async loginAdmin({ auth, request, response }) {

    const email = request.input('email')
    const password = request.input('password')
    console.log(email, password)
    const user = await User.query()
      .where('email', email)
      .first()
      
      /*if (!user || !(await Hash.verify(user.password, password))) {
        return response.unauthorized('Invalid credentials')
      }*/
      if(user){
        const token = await auth.use('api').generate(user)
        return {
          token: token.token,
          user
        }
      }else{
        return response.unauthorized('Email or password incorrect')
      }
     


  }



  public async loginUser({ auth, request, response }) {
    const email = request.input('email')
    const password = request.input('password')
    if (!(email && password)) {
      return response.unauthorized('Input all the required parameter')
    }
    const user = await User.query()
      .where('email', email)
      .where('isAdmin', false)
      .first()
      
      /*if (!user || !(await Hash.verify(user.password, password))) {
        return response.unauthorized('Invalid credentials')
      }*/
      if(user){
        const token = await auth.use('api').generate(user)
        return {
          token: token.token,
          user
        }
      }else{
        return response.unauthorized('Email or password incorrect')
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
