'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('firstName', 255)
      table.boolean('isAdmin').defaultTo(false)
      table.string('lastName', 255)
      table.string('password', 60).notNullable()
      table.string('phoneNumber', 20)
      table.string('email', 30).unique().notNullable()
      table.string('shippingAddress', 255)
      table.string('shippingCity', 100)
      table.string('shippingCountry', 100)
      table.string('billingAddress', 255)
      table.string('billingCity', 100)
      table.string('billingCountry', 100)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
