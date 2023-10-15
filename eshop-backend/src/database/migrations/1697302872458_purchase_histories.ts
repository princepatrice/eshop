import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'purchase_histories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
    table.string('purchase_lot', 100)
    table.datetime('purchase_date')
    table.datetime('estimated_delivery_date')
    table.decimal('total_price', 10, 2)
    table.string('tracking_number', 100)
    table
      .integer('manufacturer_id')
      .unsigned()
      .references('id')
      .inTable('manufacturers')
      .onDelete('CASCADE')
      table.string('shipping_address', 255)
      table.string('manufacture_address', 255)
      table.string('card', 255)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
