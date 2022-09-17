import getSymbolFromCurrency from 'currency-symbol-map'
import React from 'react'
import { authUserDetails } from '../../libs/app';
import OrderItemAction from './OrderItemAction'

const OrderItem = ({ item, update = false , setItemId, getOrderItems}) => {
    const { store, token } = authUserDetails();
console.log(token,'token')
    return (
        <tr>
            <td>
                <div className="d-flex">
                    <div className="flex-shrink-0 avatar-md bg-light rounded p-1">
                        <img
                            src={(item.image) ? (window.isource + item.image) : "assets/images/products/img-8.png"}
                            className="img-fluid d-block"
                        />
                    </div>
                    <div className="flex-grow-1 ms-3">
                        <h5 className="fs-15">
                            <a
                                href="apps-ecommerce-product-details.html"
                                className="link-primary"
                            >
                                {item.name}
                            </a>
                        </h5>
                        {
                            item.variation ? (
                                <>
                                    <p className="text-muted mb-0">
                                        Color: <span className="fw-medium">Pink</span>
                                    </p>
                                    <p className="text-muted mb-0">
                                        Size: <span className="fw-medium">M</span>
                                    </p>
                                </>
                            ) : null
                        }
                    </div>
                </div>
            </td>
            <td>{ getSymbolFromCurrency(store?.currency?.abbr) + item.price.toFixed(2) }</td>
            <td>{ item.quantity }</td>
            <td className="fw-medium text-end">{ getSymbolFromCurrency(store?.currency?.abbr) + (item.quantity * item.price.toFixed(2)) }</td>
            {
                update === true ? (
                    <td>
                        <OrderItemAction setItemId={setItemId} item={item} getOrderItems={ getOrderItems} />
                    </td>
                ) : null
            }
        </tr>
    )
}

export default OrderItem