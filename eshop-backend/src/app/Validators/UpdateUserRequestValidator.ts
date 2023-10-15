import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUserRequestValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    first_name: schema.string.optional(),
    last_name: schema.string.optional(),
    card_type: schema.string.optional(),
    billing_address: schema.string.optional(),
    billing_city: schema.string.optional(),
    billing_country: schema.string.optional(),
    card_number: schema.string.optional(),
  })

  public messages: CustomMessages = {}
}
