import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Manufacturer from './Manufacturer'

export default class Item extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public price: number

  @column()
  public remaining: number

  @column()
  public manufacturerId: number

  @belongsTo(() => Manufacturer,{
    foreignKey: 'manufacturerId'
  })
  public manufacturer: BelongsTo<typeof Manufacturer>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
