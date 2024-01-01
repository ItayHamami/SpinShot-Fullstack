import { FunctionComponent, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Product from "../interfaces/Product";
import { deleteProduct, getProducts } from "../services/productsService";
import { Link } from "react-router-dom";
import { errorMsg, successMsg } from "../services/feedbackService";
import { addToCart, getCart } from "../services/cartsService";
import "../style/products.css"


interface ProductsProps {
userInfo:any; 
}

const Products: FunctionComponent<ProductsProps> = ({userInfo}) => {
    let [products , setProducts] = useState<Product[]>()
    let [productsChanged, setProductChanged] = useState<boolean>(false);
    const [filteredProducts, setFilteredProducts] = useState<Product[] | undefined>(undefined);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | "All">("All");
    let render = () => {
        setProductChanged(!productsChanged);
    };


let handleAddToCart = (productToAdd: Product) => {
addToCart(productToAdd)
.then(()=> successMsg("Product added successfully!"))
.catch((err)=> errorMsg("Sorry , Something went wrong."))
    }
let handleDelete= (id:string) =>{
if(window.confirm("Are you sure you want to delete this product?")){
    deleteProduct(id)
    .then((res)=> {
        successMsg("Product deleted successfully!")
        render();
})
    .catch((err)=> console.log(err))
}
}
const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterProducts(category);
};

const filterProducts = (category: string) => {
    if (category === "All") {
    setFilteredProducts(products);
    } else {
    const filtered = products?.filter((product) => product.category === category);
    setFilteredProducts(filtered);
    }
};
useEffect(() => {
    getProducts()
    .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data)
        const allCategories:string[] = Array.from(new Set(res.data.map((product:Product) => product.category)));
        setCategories(["All", ...allCategories]);
    })
    .catch((err) => console.log(err));
}, [productsChanged]);
    return (
        <>
<div className="container">


        <h1>Products</h1>


        {
            userInfo.isAdmin && <Link to="/addproduct" className="btn btn-success">Add Product </Link>
        }
        <div className="mb-3">
        <label htmlFor="categoryFilter" className="form-label">
        Filter by Category:
        </label>
        <select
        className="form-select"
        id="categoryFilter"
        onChange={(e) => handleCategoryChange(e.target.value)}
        value={selectedCategory}
        >
        {categories.map((category) => (
            <option key={category} value={category}>
            {category}
            </option>
        ))}
        </select>
    </div>

        {filteredProducts?.length ? (
        <div className="container">
            <div className="row">
            {filteredProducts.map((product: Product) => (
                <div
                key={product._id}
                className="card product-card col-md-4 m-2"
                >
                <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                />
                <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">
                    {product.category}
                    </h6>
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text text-success product-price">{product.price} ₪</p>
                
               <button className="add-to-cart-button">
               <i onClick={()=> handleAddToCart(product)} className="fa-solid fa-cart-shopping"></i> Add to Cart
                </button> 
                
                {userInfo.isAdmin && (
                    <>
                    <Link to={`/updateproduct/${product._id}`} className="btn btn-warning mx-1">
                        <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <button className="btn btn-danger">
                        <i onClick={()=> handleDelete(product._id as string)} className="fa-solid fa-trash"></i>
                    </button>
                    </>
                )}
                </div>
            </div>
            ))}
        </div>
        </div>
    ) : (
        <p>No products</p>
    )}
</div>
    </>
    );
}

export default Products;