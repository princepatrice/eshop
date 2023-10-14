'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PurchaseHistorySchema extends Schema {
  up () {
    this.create('purchase_histories', (table) => {
      table.increments()
      table
      .integer('userId')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
    table.string('purchaseLot', 100)
    table.datetime('purchaseDate')
    table.datetime('estimatedDeliveryDate')
    table.decimal('totalPrice', 10, 2)
    table.string('trackingNumber', 100).unique()
    table
      .integer('manufacturerId')
      .unsigned()
      .references('id')
      .inTable('manufacturers')
      .onDelete('CASCADE')
      table.string('shippingAddress', 255)
      table.string('manufactureAddress', 255)
      table.string('card', 255)
      table.timestamps()
    })
  }

  down () {
    this.drop('purchase_histories')
  }
}

module.exports = PurchaseHistorySchema
