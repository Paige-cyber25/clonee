import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { responseMessage, pageModalReset } from "../../libs/app";
import $ from "jquery";

const OrderItemAction = ({ item }) => {
  const { order_id } = useParams();
  const [orderItems, setOrderItems] = useState([]);
  const [selectedForUpdate, setSelectedForUpdate] = useState(null);


  useEffect(() => {
    getOrderItems();  
  }, []);

  async function getOrderItems() {
    try {
      var request = axios.get(`/order/items/${order_id}`);
      var response = (await request).data;

      if (response.success) {
        setOrderItems(response.items);
      } else {
        responseMessage("Unable to fetch data!", "error");
      }
    } catch (error) {
      responseMessage("Something went wrong, please try again!", "error");
    }
  }

  async function editOrder(order_id) {
    // try {
    //   var request = axios.get(`/order/items/${order_id}`);
    //   var response = (await request).data;
    //   console.log(request, "res");
    //   alert('hello')
    //   if (response.success == true) {
    //     setOrderItems(response.data);
    //   }
    //   else {
    //     responseMessage('Unable to fetch data!', 'error');
    //   }
    // } catch (error) {
    //   responseMessage('Something went wrong, please try again!', 'error');
    // }
  }

  return (
    <>
      
      <Link
        to="#showModal"
        className="text-primary me-2"
        onClick={() => editOrder(order_id)}
        data-bs-toggle="modal"
        data-bs-target="#showModal"
      >
        Edit
      </Link>
      <Link to={"#"} className="text-danger">
        Remove
      </Link>

    </>
  );
};

export default OrderItemAction;
