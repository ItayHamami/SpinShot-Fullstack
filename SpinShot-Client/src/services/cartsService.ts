import axios from "axios";
import Product from "../interfaces/Product";
import _ from "lodash"
import Cart from "../interfaces/Cart";

let api: string = `${process.env.REACT_APP_API}/carts`;

// get cart by userId
export function getCart(userId: string) {
return axios.get(`${api}?userId=${userId}&active=true` ,{headers: {Authorization:JSON.parse(sessionStorage.getItem("token") as string).token }} );
}

export function createCart(userId: string){
return axios.post(api, {userId, products: [], active:true},{headers: {Authorization:JSON.parse(sessionStorage.getItem("token") as string).token }})
}

export function addToCart(productToAdd: Product) {

    let product = _.pick(productToAdd, [
    "_id",
    "name",
    "category",
    "description",
    "price",
    "image",
    ]);
    return axios.post(api, product, {
    headers: {
        Authorization: JSON.parse(sessionStorage.getItem("token") as string).token,
    },
    });

}

export function deleteFromCart(userId:string,productId: string) {

    return axios.delete(`${api}/${userId}`, {
    headers: {
        Authorization: JSON.parse(sessionStorage.getItem("token") as string).token,
    },
      data: { productId },  // Pass productId in the request body
    });
}

export function sumCartPrice(userCart:Cart){
    if (!userCart || !userCart.products || userCart.products.length ===0)
    return 0;
else{
    const totalPrice = userCart.products.reduce(
        (accumulator, product) => accumulator + product.price * product.quantity!,
        0
    );
    return parseFloat(totalPrice.toFixed(2));
}
}

export function deleteCart(userId: string) {
    axios.delete(api, {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string).token,
        },
          data: { userId },  
        })
  }
