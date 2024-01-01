import "../style/cart.css";
import { FunctionComponent, useEffect, useState } from "react";
import Product from "../interfaces/Product";
import { deleteFromCart, getCart, sumCartPrice } from "../services/cartsService";
import { errorMsg, successMsg } from "../services/feedbackService";
import Cart from "../interfaces/Cart";
import User from "../interfaces/User";
import { getUserByEmail } from "../services/usersService";
import { Link, NavLink, Navigate, useNavigate  } from "react-router-dom";



interface CartProps {
    userInfo:any;
}
 
const CartPage: FunctionComponent<CartProps> = ({userInfo}) => {
    let navigate = useNavigate();
    const userId:string = userInfo.userId;
    let[productsInCart,setProductsInCart]= useState<Product[]>([])
    let[cartPrice,setCartPrice]= useState<number>(0)

    useEffect(() => {
        getCart(userId)
        .then((res)=> {setProductsInCart(res.data.products);handleCartPrice(res.data)})
        .catch((err)=>console.log(err))
    
    }, [productsInCart]);

let handleCartPrice = (userCart:Cart) =>{
    if(!userCart || !userCart.products || userCart.products.length === 0) return 0;

    else{
        setCartPrice(sumCartPrice(userCart))
    }
}

let handleDeleteItem = (productId:string) => {
    if(window.confirm("Are you sure you want to remove this product from your cart?"))
    {
    deleteFromCart(userId , productId)
    .then(()=> successMsg("Product was successfully removed from your cart!"))
    .catch(()=> errorMsg("Sorry! something went wrong."))
    }
}
const handleCheckout = () => {
    navigate("/checkout", { state: { cartPrice } });
};

    return (
<>

<section className="h-100 h-custom" style={{ backgroundColor: '#ddebeb', height: '100%' }}>
    <div className="container-fluid py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col">
            <div className="card checkoutcard">
            <div className="card-body p-4">
                <div className="row">
                <div className="col-lg-12">
                    <h5 className="mb-3">
                    <NavLink to={"/products"} className="text-body">
    <i className="fas fa-long-arrow-alt-left me-2"></i>Continue shopping
</NavLink>
                    </h5>
                    <hr />
                    <div className="d-flex justify-content-center align-items-center mb-4">
                    <div>
                        <p className="mb-1">Your Shopping cart</p>
                        <p className="mb-0">You have {productsInCart.length} items in your cart</p>
                    </div>
                    </div>

                    {productsInCart.length ? (
                    <table className="table table-striped table-hover">
                        <thead className="thead-dark">
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                        </thead>
                        <tbody>
                        {productsInCart.map((product) => (
                            <tr key={product._id}>
                            <td><img  className="img-thumbnail img-fluid" src={product.image} style={{ width: '80px', height: 'auto', objectFit:'cover' }} alt="" /></td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>
                                <i
                                onClick={() => handleDeleteItem(product._id as string)}
                                className="fa-regular fa-square-minus px-2"
                                ></i>
                                {product.quantity}
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    ) : (
                    <p>Your cart is empty</p>
                    )}
                    <div>
                    <p>Total Price: ${cartPrice.toFixed(2)}</p>
                    </div>
                 {(productsInCart.length>0) && (   
                    <button onClick={()=>handleCheckout() } className="btn w-100 mt-3" >Proceed to checkout</button>)}
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </section>
    
    </>
    );
}

export default CartPage;