/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Icons from "views/Icons.js";
import Notifications from "views/Notifications.js";
import ProductsList from "views/ProductList";
import ProductInfo from "views/item";
import MyPurchases from "views/purchases/MyPurchases";
import CardItems from "views/card";
import MyPurchasesLot from "views/purchases/MyPurchasesLot";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Shopping",
    icon: "nc-icon nc-notes",
    component: ProductsList,
    layout: "/admin",
    visible:true
  
  },
  {
    path: "/user",
    name: "Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
    visible:true
  
  },
  {
    path: "/product/:id",
    name: "Product Detail",
    icon: "nc-icon nc-notes",
    component: ProductInfo,
    layout: "/admin"
  },

  {
    path: "/purchase-hisrory",
    name: "Purchase History",
    icon: "nc-icon nc-notes",
    component: MyPurchases,
    layout: "/admin",
    visible:true
  },
  {
    path: "/cart",
    name: "Cart",
    icon: "fa fa-shopping-cart",
    component: CardItems,
    layout: "/admin",
    visible:true
  },
  {
    path: "/purchase-search-lot",
    name: "Purchase Search",
    icon: "nc-icon fa fa-search",
    component: MyPurchasesLot,
    layout: "/admin",
    visible:true
  },  {
    path: "/purchase-invoice/:id",
    name: "Purchase Invoice",
    icon: "nc-icon nc-notes",
    component: MyPurchasesLot,
    layout: "/admin",
    visible:false
  },

];

export default dashboardRoutes;
