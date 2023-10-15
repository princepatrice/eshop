import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PurchaseHistory extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public userId: number

  @column()
  public purchaseLot: string

  @column()
  public purchaseDate: Date

  @column()
  public estimatedDeliveryDate: Date

  @column()
  public totalPrice: number

  @column()
  public trackingNumber: string

  @column()
  public manufacturerId: number

  @column()
  public shippingAddress: string

  @column()
  public manufactureAddress: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
