import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'purchased_items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('purchase_id')
        .unsigned()
        .references('id')
        .inTable('purchase_histories')
        .onDelete('CASCADE')
      table
        .integer('item_id')
        .unsigned()
        .references('id')
        .inTable('items')
        .onDelete('CASCADE')
      table.string('item_name', 255)
      table.decimal('item_price', 10, 2)
      table.integer('quantity').defaultTo(1)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
