'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PurchasedItemsSchema extends Schema {
  up () {
    this.create('purchased_items', (table) => {
      table.increments()
      table
        .integer('purchaseId')
        .unsigned()
        .references('id')
        .inTable('purchase_histories')
        .onDelete('CASCADE')
      table
        .integer('itemId')
        .unsigned()
        .references('id')
        .inTable('items')
        .onDelete('CASCADE')
      table.string('itemName', 255)
      table.decimal('itemPrice', 10, 2)
      table.integer('quantity').defaultTo(1)
      table.timestamps()
    })
  }

  down () {
    this.drop('purchased_items')
  }
}

module.exports = PurchasedItemsSchema
