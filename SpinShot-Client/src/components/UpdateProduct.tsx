import { useFormik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { successMsg } from "../services/feedbackService";
import { addProduct, getProductById, updateProduct } from "../services/productsService";
import * as yup from "yup";
import Product from "../interfaces/Product";

interface UpdateProductProps {
    
}
 
const UpdateProduct: FunctionComponent<UpdateProductProps> = () => {
    let {id} = useParams();
    let navigate = useNavigate();
    useEffect(() => {
getProductById(id as string)
.then((res)=>setproduct(res.data))
.catch((err)=> console.log(err))
    }, []);
let [product , setproduct] = useState<Product>({
    name: "",
    price:0,
    category:"",
    description:"",
    image: ""
});    
let formik = useFormik({
    initialValues: {
    name: product.name,
    price: product.price,
    category: product.category,
    description: product.description,
    image: product.image,
    },
    enableReinitialize: true,
    validationSchema: yup.object({
    name: yup.string().required().min(2),
    price: yup.number().required().min(0),
    category: yup.string().required().min(2),
    description: yup.string().required().min(2),
    image: yup.string().required().min(2),
    }),
    onSubmit: (values) => {
    updateProduct(values, id as string)
        .then((res) => {
        navigate(-1);
        successMsg("Product updated successfully!");
        })
        .catch((err) => console.log(err));
    },
  });

    return (
<>
<div className="container">
<form className="mb-3" onSubmit={formik.handleSubmit}>
<h6 className="display-6">UPDATE PRODUCT</h6>
<div className="form-floating mb-3">
    <input
type="text"
className="form-control"
id="name"
placeholder="Product name"
name="name"
onChange={formik.handleChange}
value={formik.values.name}
onBlur={formik.handleBlur}
    />
    <label htmlFor="name">Name</label>
    {formik.touched.name && formik.errors.name && (
    <p className="text-danger">{formik.errors.name}</p>
    )}
</div>
<div className="form-floating mb-3">
    <input
    type="number"
    className="form-control"
    id="price"
    placeholder="Price"
    name="price"
    onChange={formik.handleChange}
    value={formik.values.price}
    onBlur={formik.handleBlur}
    />
    <label htmlFor="price">Price</label>
    {formik.touched.price && formik.errors.price && (
    <p className="text-danger">{formik.errors.price}</p>
    )}
</div>
<div className="form-floating">
    <input
    type="text"
    className="form-control"
    id="category"
    placeholder="Novel"
    name="category"
    onChange={formik.handleChange}
    value={formik.values.category}
    onBlur={formik.handleBlur}
    />
    <label htmlFor="category">Category</label>
    {formik.touched.category && formik.errors.category && (
    <p className="text-danger">{formik.errors.category}</p>
    )}
</div>
<div className="form-floating mt-3">
    <input
    type="text"
    className="form-control"
    id="description"
    placeholder="Novel"
    name="description"
    onChange={formik.handleChange}
    value={formik.values.description}
    onBlur={formik.handleBlur}
    />
    <label htmlFor="description">Description</label>
    {formik.touched.description && formik.errors.description && (
    <p className="text-danger">{formik.errors.description}</p>
    )}
</div>
<div className="form-floating mt-3">
    <input
    type="text"
    className="form-control"
    id="image"
    placeholder="URL here:"
    name="image"
    onChange={formik.handleChange}
    value={formik.values.image}
    onBlur={formik.handleBlur}
    />
    <label htmlFor="description">Image URL:</label>
    {formik.touched.image && formik.errors.image && (
    <p className="text-danger">{formik.errors.image}</p>
    )}
</div>
<button
disabled={!formik.isValid || !formik.dirty}
type="submit"
className="btn btn-success w-100 mt-3"
>Update</button>
</form>
</div>

</> 
    );
}
 
export default UpdateProduct;