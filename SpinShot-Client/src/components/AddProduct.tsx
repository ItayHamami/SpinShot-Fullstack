import { useFormik } from "formik";
import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { addProduct } from "../services/productsService";
import { successMsg } from "../services/feedbackService";

interface AddProductProps {
    
}
 
const AddProduct: FunctionComponent<AddProductProps> = () => {
    let navigate = useNavigate();
    let formik = useFormik({
        initialValues: {
        name: "",
        price:0,
        category:"",
        description:"",
        image: "",
        },
        validationSchema : yup.object({
            name: yup.string().required().min(2), 
            price: yup.number().required().min(0), 
            category: yup.string().required().min(2), 
            description: yup.string().required().min(2),
            image:yup.string().required().min(2),
        }),
        onSubmit: (values)=> {
            addProduct(values)
            .then((res)=> {
                successMsg("Product added successfully!")
            navigate(-1)})
            .catch((err)=> console.log(err));
        }
    })
useEffect(() => {
    formik.setFieldValue("price", ""); 
}, []);

    return (
<>
<div className="container">
<form className="mb-3" onSubmit={formik.handleSubmit}>
<h6 className="display-6">ADD NEW PRODUCT</h6>
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
<select
    className="form-select"
    id="category"
    name="category"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.category}>
    <option value="" disabled>Select a category</option>
    <option value="Handball Balls">Handball Balls</option>
    <option value="Shoes">Shoes</option>
    <option value="Protective Gear">Protective Gear</option>
    <option value="Resin">Resin</option>
</select>
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
>Add new Product</button>
</form>
</div>

</> 
    );
}

export default AddProduct;