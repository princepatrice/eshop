# Initial Database structure

User {
   firstName
lastName
phoneNumber
email
password
shippingAddress
shippingCity
hippingCountry
billingAddress
billingCity
billingCountry
}

Manufacturer {
ManufacturerName
ManufacturerAddress
}

Item {
name
price
available
}

PurchaseHistory {
userId (User)
PurchaseLot,
purchaseDate
estimatedDeliveryDate
totalPrice
trackingNumber,
manufacturerId (Manufacturer)
shippingAddress,
manufactureAddress,
}

PurchasedItems {
purchaseID (PurchaseHistory)
itemId (Item)
itemName
itemPrice
Quantity
}
