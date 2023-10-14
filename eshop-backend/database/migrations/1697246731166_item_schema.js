'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemSchema extends Schema {
  up () {
    this.create('items', (table) => {
      table.increments()
      table.string('name', 255)
      table.decimal('price', 10, 2)
      table.integer('remaining').defaultTo(0)
      table
      .integer('manufacturerId')
      .unsigned()
      .references('id')
      .inTable('manufacturers')
      .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('items')
  }
}

module.exports = ItemSchema
