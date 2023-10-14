'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ManufacturerSchema extends Schema {
  up () {
    this.create('manufacturers', (table) => {
      table.increments()
      table.string('name', 255)
      table.string('address', 255)
      table.timestamps()
    })
  }

  down () {
    this.drop('manufacturers')
  }
}

module.exports = ManufacturerSchema
