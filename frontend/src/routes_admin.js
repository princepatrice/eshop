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

import ProductsList from "views/ProductList";
import UserList from "views/UserList";
import ProductInfo from "views/item";
import UserPurchases from "views/purchases/UserPurchases";

const adminRoutes = [
  {
    path: "/dashboard",
    name: "Users",
    icon: "nc-icon nc-chart-pie-35",
    component: UserList,
    layout: "/admin",
    visible:true
  },
  {
    path: "/products",
    name: "Products",
    icon: "nc-icon nc-notes",
    component: ProductsList,
    layout: "/admin",
    visible:true
  },
  {
    path: "/user/:id/purchase",
    name: "Purchases",
    icon: "nc-icon nc-notes",
    component: UserPurchases,
    layout: "/admin"
  },
  {
    path: "/product/:id",
    name: "Product Detail",
    icon: "nc-icon nc-notes",
    component: ProductInfo,
    layout: "/admin"
  },
];

export default adminRoutes;
