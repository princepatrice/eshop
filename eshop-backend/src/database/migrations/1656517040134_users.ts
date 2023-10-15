import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('first_name', 255);
      table.boolean('is_admin').defaultTo(false);
      table.string('last_name', 255);
      table.string('password', 60).notNullable();
      table.string('phone_number', 20);
      table.string('email', 30).unique().notNullable();
      table.string('shipping_address', 255);
      table.string('shipping_city', 100);
      table.string('shipping_country', 100);
      table.string('billing_address', 255);
      table.string('billing_city', 100);
      table.string('billing_country', 100);
      table.string('card_number', 16).notNullable();
      table.string('card_type', 255).notNullable();
      table.timestamp('verified_at', { useTz: true }).nullable().defaultTo(null)
      table.timestamp('deactivated_at', { useTz: true }).nullable().defaultTo(null)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}