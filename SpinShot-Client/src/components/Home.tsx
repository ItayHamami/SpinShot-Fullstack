import { FunctionComponent, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Product from "../interfaces/Product";
import { deleteProduct, getProducts } from "../services/productsService";
import { Link, useNavigate } from "react-router-dom";
import { successMsg, errorMsg } from "../services/feedbackService";
import "../style/products.css"

interface HomeProps {
userInfo:any
}
 
const Home: FunctionComponent<HomeProps> = ({userInfo}) => {
    let navigate = useNavigate()
    let userId:string;
    if(userInfo.userEmail){
        userId = userInfo.userId;
    }
    else{
        userId = "";
    } 
    
        let [posts , setPosts] = useState<Product[]>([]);
        let [postsChanged , setPostsChanged]= useState<boolean> (false);
        let render = () => {
            setPostsChanged(!postsChanged);
        }

        useEffect(() => {
            getProducts()
            .then((res)=> setPosts(res.data))
        }, [postsChanged]);


        let handleDelete = (id:string)=> { 
            if(window.confirm("Are you sure you would like to delete this product?"))
            {
                deleteProduct(id).then((res)=> {successMsg("Product was successfully deleted!"); setPostsChanged(!postsChanged)})
                .catch(()=> errorMsg(`Sorry! Something went wrong.`))
            }
        }


        const displayedPosts = posts.slice(0, 3);
        
    return (  
        <>
        <div className="page-container">
        <div className="fullscreen-image">
 <img src="/images/handball.jpg" alt="" />


</div>
        
        <div className="container">
            <h1 className="my-4">SpinShot Central</h1>
<p className="my-3">Welcome to SpinShot Central! Elevate your handball experience with our curated selection of top-tier gear. From professional handballs to cutting-edge shoes and protective equipment, gear up with confidence and dominate the court. Your passion for handball deserves the best, and we're here to deliver.</p>
        
        
        
        
            {displayedPosts?.length ? (
                <div className="container card-container"  style={{ marginBottom: '3rem' }}>
                    <div className="row ">
                    {displayedPosts.map((post: Product) => (
                    
                        <div
                        key={post._id}
                        className="card product-card col-md-4 my-2 mx-auto"
                        style={{ width: "20rem" }}
                        >
                        <img
                        src={post.image}
                        className="card-img-top"
                        alt={"Product image"}
                        />
                        <div className="card-body">
                            <h5 className="card-title">{post.name}</h5>
                            <p className="card-text">{post.category}</p>
                            <hr />
                            <p className="product-price"><b>Price:</b>{post.price}</p>
                        </div>
                        <div className="card-footer">
                            <p>{post.description}</p>
                            {userInfo.isAdmin && (
                                
                                <>
                            <a onClick={()=> handleDelete(post._id!)}><i className="fa-solid fa-trash-can fa-lg mx-2"></i></a>
                            <Link to={`/updateproduct/${post._id}`}><i className="fa-solid fa-pencil fa-lg m-2" style={{color: "#000000"}}></i></Link>
                                </>
                            )}
                        </div>
                        
                    </div>
                    ))}
                
                </div>
<div className="text-center my-2">
<button className="btn w-50 " onClick={()=> navigate("/products")}>Browse products</button>
</div>

                </div>
            ) : (
                <p>No Posts at the moment , stay tuned!</p>
            )}
        
        </div>
        </div>
            </>
    );
    
}
 
export default Home;