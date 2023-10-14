'use strict'

/*
|--------------------------------------------------------------------------
| ExcelSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const ExcelJS = require('exceljs')
const Manufacturer = use("App/Models/Manufacturer")
const User = use("App/Models/User")
const PurchaseHistory = use("App/Models/PurchaseHistory")
const PurchasedItem = use("App/Models/PurchasedItem")
const Items = use("App/Models/Item")
class ExcelSeeder {


  getMatchers(listRecords) {

  }
  async run() {
    try {
      const workbook = new ExcelJS.Workbook()
      await workbook.xlsx.readFile('database/seeds/Purchaseing_info_Dataset.xlsx')

      const worksheet = workbook.getWorksheet("Sheet1")
      if (!worksheet) {
        console.log('Worksheet not found in the Excel file.');
        return;
      }

      const dataMapping = {
        ID: 'A',
        FirstName: 'B',
        LastName: 'C',
        ShippingAddress: 'D',
        ShippingCity: 'E',
        ShippingCountry: 'F',
        CardNumber: 'G',
        CardType: 'H',
        BillingCity: 'I',
        BillingAddress: 'J',
        BillingCountry: 'K',
        TrackingNumber: 'L',
        ItemName: 'M',
        PricePerItem: 'N',
        PurchaseDate: 'O',
        EstimatedDelivery: 'P',
        ItemAmount: 'Q',
        ShippedFrom: 'R',
        ManufacturedFrom: 'S',
        Phone: 'T',
        Email: 'U',
      };

      const userList = {}
      const manufacturerList = {}

      // Loop through the rows and populate the database
      for (let i = 2; i <= worksheet.rowCount; i++) {
        const row = worksheet.getRow(i)
        const itemPrice = row.getCell(dataMapping.PricePerItem)
        .value.replace("$", "").replace(".00 ", "").replace(". 00", "")
        const data = {
          ID: row.getCell(dataMapping.ID).value,
          FirstName: row.getCell(dataMapping.FirstName).value,
          LastName: row.getCell(dataMapping.LastName).value,
          ShippingAddress: row.getCell(dataMapping.ShippingAddress).value,
          ShippingCity: row.getCell(dataMapping.ShippingCity).value,
          ShippingCountry: row.getCell(dataMapping.ShippingCountry).value,
          CardNumber: row.getCell(dataMapping.CardNumber).value,
          CardType: row.getCell(dataMapping.CardType).value,
          BillingCity: row.getCell(dataMapping.BillingCity).value,
          BillingAddress: row.getCell(dataMapping.BillingAddress).value,
          BillingCountry: row.getCell(dataMapping.BillingCountry).value,
          TrackingNumber: row.getCell(dataMapping.TrackingNumber).value,
          ItemName: row.getCell(dataMapping.ItemName).value,
          PricePerItem: itemPrice,
          PurchaseDate: row.getCell(dataMapping.PurchaseDate).value,
          PurchaseTotal: Number(itemPrice) * Number(row.getCell(dataMapping.ItemAmount).value),
          EstimatedDelivery: row.getCell(dataMapping.EstimatedDelivery).value,
          ItemAmount: row.getCell(dataMapping.ItemAmount).value,
          ShippedFrom: row.getCell(dataMapping.ShippedFrom).value,
          ManufacturedFrom: row.getCell(dataMapping.ManufacturedFrom).value,
          Phone: row.getCell(dataMapping.Phone).value,
          Email: row.getCell(dataMapping.Email).value,
        };
        // Check User
        if (!(data.Email in userList)) {
          userList[data.Email] = {
            info: {
              firstName: data.FirstName,
              lastName: data.LastName,
              password: "password",
              phoneNumber: data.Phone,
              email: data.Email,
              shippingAddress: data.ShippingAddress,
              shippingCity: data.ShippingCity,
              shippingCountry: data.ShippingCountry,
              billingAddress: data.BillingAddress,
              billingCity: data.BillingCity,
              billingCountry: data.BillingCountry,
            }, purchases: []
          }
        }

        //Check Manufacturer
        let manufacturer = null

        if (!(data.ShippedFrom in manufacturerList)) {
          manufacturer = {
            name: "Manufacturer From " + data.ManufacturedFrom,
            address: data.ShippedFrom,
            items: []
          }
          manufacturerList[data.ShippedFrom] = manufacturer
        } else {
          manufacturer = manufacturerList[data.ShippedFrom]
        }

        let item = manufacturer["items"].find((itemData) => itemData.name === data.ItemName)
        if (!item) {
          manufacturerList[data.ShippedFrom]["items"].push({
            name: data.ItemName,
            price: data.PricePerItem,
            remaining: 10000,
          })
        }

        let purchases = userList[data.Email]["purchases"];
        let purchaseOfSameTrack = purchases.find((purchase) => purchase.trackingNumber == data.TrackingNumber)
        purchases = purchases.filter((purchase) => purchase.trackingNumber !== data.TrackingNumber)
        if (!purchaseOfSameTrack) {
          purchaseOfSameTrack = {
            userId: data.Email, // Foreign key to User
            purchaseLot: 'LOT' + data.TrackingNumber,
            purchaseDate: new Date(data.PurchaseDate),
            estimatedDeliveryDate: new Date(data.EstimatedDelivery),
            totalPrice: data.PurchaseTotal,
            trackingNumber: data.TrackingNumber,
            manufacturerId: data.ShippedFrom, // Foreign key to Manufacturer
            shippingAddress: data.ShippingAddress,
            manufactureAddress: data.ShippedFrom,
            items: []
          }
        } else {
          purchaseOfSameTrack[totalPrice] = purchaseOfSameTrack[totalPrice] + data.PurchaseTotal
        }

        purchaseOfSameTrack["items"].push({
          purchaseID: null, // Foreign key to PurchaseHistory
          itemId: null, // Foreign key to Item
          itemName: data.ItemName,
          itemPrice: data.PricePerItem,
          Quantity: data.ItemAmount,
        })

        purchases.push(purchaseOfSameTrack)

        userList[data.Email]["purchases"] = purchases

        // Create a User record in the database using the Factory
        // await Factory.model('App/Models/User').create(data)

      }

      console.log(userList["zavadsky@yahoo.ca"]["purchases"][0])
      //Save manufactuere and items
      console.log("----------------- Insertion of manufacturers and items ----------------------------------")
      
      let manufacturedSavedList = []
      let progress = 0
      let count = Object.keys(manufacturerList).length;
      for (let key in manufacturerList) {
        progress++
        console.log(progress,"/", count)
        let manufacturer = manufacturerList[key]
        let items = manufacturer["items"]
        delete manufacturer["items"]
        let manufacturersaved = await Manufacturer.create(manufacturer)
        items = items.map((item) => { return { ...item, manufacturerId: manufacturersaved.id } })
        let itemsSaved = await Items.createMany(items)
        const itemsData =  itemsSaved.map((item)=> {return {id:item.id, name:item.name}})
        manufacturedSavedList.push({ ...manufacturer, id: manufacturersaved.id, items: itemsData })
      }

      //save User Information and Purchases
      console.log("----------------- Insertion of user dans purchases----------------------------------")
      progress=0
      count = Object.keys(userList).length;
      for (let key in userList) {
        progress++
        console.log(progress,"/", count)
        let user = userList[key]["info"]
        let userSaved = await User.create(user)
        let purchases = userList[key]["purchases"]
       for (let key in purchases) {
          let purchase = purchases[key]
          let purchasedItems = purchase["items"]
          delete purchase["items"]
          purchase["userId"] = userSaved.id
         const manufactuererUsed = manufacturedSavedList.find((manufacturer) => manufacturer.address === purchase["manufactureAddress"])
          purchase["manufacturerId"] = manufactuererUsed.id
          const purchaseSaved = await PurchaseHistory.create(purchase)
          for (let key in purchasedItems) {
            let item = purchasedItems[key]
            const itemUsed = manufactuererUsed["items"].find((itemData) => itemData.name === item["itemName"])
            await PurchasedItem.create({ 
              ...item,
              purchaseID: purchaseSaved.id,
              itemId: itemUsed.id,
            })
          }
        }

      }





      console.log('Seed completed.')

    } catch (error) {
      console.error('Error reading the Excel file:', error);
    }
  }

  storeManufacturerAndItem(manufacturer) {

  }

}

module.exports = ExcelSeeder


