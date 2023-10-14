'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaymentInformationSchema extends Schema {
  up () {
    this.create('payment_informations', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('card_number', 16).notNullable()
      table.string('card_type', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('payment_informations')
  }
}

module.exports = PaymentInformationSchema
