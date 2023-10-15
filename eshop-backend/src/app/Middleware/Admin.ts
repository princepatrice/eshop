import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Admin {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const user = await auth.use('api').authenticate()
    if (user.isAdmin) {
      await next()
    } else {
      return response.unauthorized('Unauthorized action')
    }
  }
}
