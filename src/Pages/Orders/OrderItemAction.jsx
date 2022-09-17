import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { responseMessage, pageModalReset } from "../../libs/app";
import $ from "jquery";
import { Button } from "bootstrap";
import axios from "axios";

const OrderItemAction = ({ item, setItemId, getOrderItems }) => {
  const { order_id } = useParams();
  // const [orderItems, setOrderItems] = useState([]);
  const [selectedForUpdate, setSelectedForUpdate] = useState(null);

  // useEffect(() => {
  //   getOrderItems();  
  // }, []);

  // async function getOrderItems() {
  //   try {
  //     var request = axios.get(`/order/items/${order_id}`);
  //     var response = (await request).data;

  //     if (response.success) {
  //       setOrderItems(response.items);
  //     } else {
  //       responseMessage("Unable to fetch data!", "error");
  //     }
  //   } catch (error) {
  //     responseMessage("Something went wrong, please try again!", "error");
  //   }
  // }

  function editOrder(order_id) {
    console.log(order_id, "id for order")
    setItemId(order_id)
   
  }
  async function deleteOrder(order_id) {
   console.log("clicked")

   console.log("clicked", order_id)
    try {
        console.log("make request")

      let request = axios.delete(`/order/item/remove/${order_id}`);
      let response = (await request).data;
      console.log(response, "res");
      if (response.success == true) {
                responseMessage('order deleted', 'success');
getOrderItems()
      }
      else {
        responseMessage('Unable to fetch data!', 'error');
      }
    } catch (error) {
      responseMessage('Something went wrong, please try again!', 'error');
    }
}
  return (
    <>
      
      <Link
        to="#showModal"
        className="text-primary me-2"
        onClick={() => editOrder(item?.id)}
        data-bs-toggle="modal"
        data-bs-target="#showModal"
      >
        Edit
      </Link>
      <Link className="text-danger" onClick={()=> deleteOrder(item?.id)}>
        Remove
      </Link>

    </>
  );
};

export default OrderItemAction;
