import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserRequestValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    first_name: schema.string.optional(),
    last_name: schema.string.optional(),
    email: schema.string({ trim: true },[
      rules.email(),
      rules.unique({
        table: 'users',
        column: 'email'
      }),
      rules.normalizeEmail({ allLowercase: true})
    ]),
    password: schema.string(),
    is_admin: schema.boolean.optional(),
  })

  public messages: CustomMessages = {}
}
