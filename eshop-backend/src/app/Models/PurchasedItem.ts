import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import PurchaseHistory from './PurchaseHistory'

export default class PurchasedItem extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public itemId: number

  @column()
  public purchaseId: number

  @column()
  public itemName: string

  @belongsTo(() => PurchaseHistory,{
    foreignKey: 'purchaseId'
  })
  public purchaseHistory: BelongsTo<typeof PurchaseHistory>

  @column()
  public itemPrice: number

  @column()
  public Quantity: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
