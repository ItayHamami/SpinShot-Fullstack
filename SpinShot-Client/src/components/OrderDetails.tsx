import { FunctionComponent, useEffect, useState } from "react";
import Product from "../interfaces/Product";
import { deleteCart, getCart } from "../services/cartsService";
import { errorMsg } from "../services/feedbackService";
import { useLocation, useNavigate } from "react-router-dom";

interface OrderDetailsProps {
    userInfo:any;
}
 
const OrderDetails: FunctionComponent<OrderDetailsProps> = ({userInfo}) => {
    let navigate = useNavigate();
    let[userCart,setUserCart]= useState<Product[]>([])
    const location = useLocation();
    const orderDetails = location.state?.orderDetails || "";

useEffect(() => {
    getCart(userInfo._id as string)
    .then((res)=> {
        setUserCart(res.data.products);})
    .catch(()=> errorMsg("Something went wrong."))
}, []);


    return ( <>
        <div className="container my-4">

    <div className="order-summary">
        <h3>Order Summary</h3>
        <table className="table">
        <thead>
            <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>

            </tr>
        </thead>
        <tbody>
            {userCart.map((product) => (
            <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>${product.price}</td>
            </tr>
            ))}
        </tbody>
        </table>
<p><strong>Total: {orderDetails.totalPrice}</strong></p>
    </div>

    <div className="address-details">
        <h3>Shipping Address</h3>
        <p>
        <strong>{orderDetails.address}</strong> 
        </p>
    
    </div>
    </div>
    <button className="btn " onClick={()=> {navigate("/");
 deleteCart(userInfo.userId as string)} }>Click here to return to the main page.</button>
    </>);
}

export default OrderDetails;