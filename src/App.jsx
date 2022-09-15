import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./Pages/Dashboard";

import Products from "./Pages/Products/Products";
import ProductUpload from "./Pages/Products/ProductUpload";
import ProductDetails from "./Pages/Products/ProductDetails";

import Orders from "./Pages/Orders/Orders";
import OrderDetail from "./Pages/Orders/OrderDetail";
import Customers from "./Pages/Customers/Customers";
import AppLayout from "./Shared/Layouts/AppLayout";
import Invoices from "./Pages/Invoice/Invoices";
import Invoice from "./Pages/Invoice/Invoice";
import CreateInvoice from "./Pages/Invoice/CreateInvoice";
import AuthCheck from "./Auth/AuthCheck";
import Chats from "./Pages/Chats/Chats";
import Profile from "./Pages/Profile";
import StoreDetails from "./Pages/Store/StoreDetails";
import $ from 'jquery'

const App = () => {

  var mode = localStorage.getItem('app-layout-mode') || 'light';
  $("html").attr('data-layout-mode', mode);

  useEffect(() => {}, []);

  return (
    <Routes>
      <Route path="auth/check" element={<AuthCheck />} />

      <Route path="/" element={<AppLayout />}>
        <Route path="" element={<Dashboard />} />
        <Route path="chats" element={<Chats />} />
        <Route path="products" element={<Products />} />
        <Route path="add-product" element={<ProductUpload mode="new" />} />
        <Route
          path="product-edit/:product_id"
          element={<ProductUpload mode="edit" />}
        />
        <Route
          path="product-details/:product_id"
          element={<ProductDetails />}
        />
        <Route path="orders" element={<Orders />} />
        <Route path="order/:order_id" element={<OrderDetail update={true} />} />
        <Route path="order/:order_id/details" element={<OrderDetail update={false} />} />
        <Route path="customers" element={<Customers />} />

        <Route path="invoices" element={<Invoices />} />
        <Route path="invoice/:invoice_id" element={<Invoice />} />
        <Route path="invoices/create" element={<CreateInvoice />} />
        <Route path="invoices/create/:order_id" element={<CreateInvoice />} />

        <Route path="settings/store-details" element={<StoreDetails />} />
        <Route path="settings/profile" element={<Profile />} />

        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here | 404!</p>
            </main>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
