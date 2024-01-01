import { FormikValues, useFormik } from "formik";
import "../style/cart.css"
import { FunctionComponent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup"
import { successMsg } from "../services/feedbackService";
interface CheckoutProps {
    userInfo:any;
}
 
const Checkout: FunctionComponent<CheckoutProps> = ({userInfo}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const cartPrice = location.state?.cartPrice || 0;
    let formik = useFormik({
        initialValues: {
        name: "",
        card_number: "",
        card_type: "",
        exp_date: "",
        cvv: "",
        country: "",
        city: "",
        street: "",
        houseNumber: "",
        },
        validationSchema: yup.object({
        name: yup.string().required("Cardholder Name is required"),
        card_number: yup.number().min(8).required("Card Number is required"),
        card_type: yup.string().required("Card Type is required"),
        exp_date: yup.date().required("Expiry Date is required"),
        cvv: yup.string().required("CVV is required"),
        country: yup.string().required("Country is required"),
        city: yup.string().required("City is required"),
        street: yup.string().required("Street is required"),
        houseNumber: yup.string().required("House Number is required"),
        }),
        onSubmit(values) {
            const combinedAddress = `${values.country}, ${values.city}, ${values.street}, ${values.houseNumber}`;
let orderDetails = { 
    address: combinedAddress,
    totalPrice: cartPrice
}
            navigate('/order-details', { state: { orderDetails } });
            successMsg("Order has ben sent!")
        },
    });
    
    return ( <>
<div className="container-fluid mainscreen">
<div className="row">
    <div className="card my-5">
    <form onSubmit={formik.handleSubmit} className="form-container">
        <div className="row">
        <div className="leftside col">
            <h2>Address Information</h2>
            <p>Country</p>
            <input
            type="text"
            className="inputbox"
            name="country"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.country}
            />
            {formik.touched.country && formik.errors.country ? (
            <div className="text-danger">{formik.errors.country}</div>
            ) : null}
            <p>City</p>
            <input
            type="text"
            className="inputbox"
            name="city"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            />
            {formik.touched.city && formik.errors.city ? (
            <div className="text-danger">{formik.errors.city}</div>
            ) : null}
                        <p>Street</p>
            <input
            type="text"
            className="inputbox"
            name="street"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.street}
            />
            {formik.touched.street && formik.errors.street ? (
            <div className="text-danger">{formik.errors.street}</div>
            ) : null}

            <p>House Number</p>
            <input
            type="text"
            className="inputbox"
            name="houseNumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.houseNumber}
            />
            {formik.touched.houseNumber && formik.errors.houseNumber ? (
            <div className="text-danger">{formik.errors.houseNumber}</div>
            ) : null}
        </div>
        <div className="rightside col">
            <h2>Payment Information</h2>
            <p>Cardholder Name</p>
            <input
      type="text"
      className="inputbox"
      name="name"
      value={formik.values.name}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
    {formik.touched.name && formik.errors.name ? (
      <div className="error-message">{formik.errors.name}</div>
    ) : null}

    <p>Card Number</p>
    <input
      type="number"
      className="inputbox"
      name="card_number"
      id="card_number"
      required
      value={formik.values.card_number}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
    {formik.touched.card_number && formik.errors.card_number ? (
      <div className="error-message">{formik.errors.card_number}</div>
    ) : null}

    <p>Card Type</p>
    <select
      className="inputbox"
      name="card_type"
      id="card_type"
      required
      value={formik.values.card_type}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    >
      <option value="">--Select a Card Type--</option>
      <option value="Visa">Visa</option>
      <option value="RuPay">American</option>
      <option value="MasterCard">MasterCard</option>
    </select>
    {formik.touched.card_type && formik.errors.card_type ? (
      <div className="error-message">{formik.errors.card_type}</div>
    ) : null}

    <div className="expcvv mt-5">
      <p className="expcvv_text">Expiry</p>
      <input
        type="date"
        className="inputbox"
        name="exp_date"
        id="exp_date"
        required
        value={formik.values.exp_date}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.exp_date && formik.errors.exp_date ? (
        <div className="error-message">{formik.errors.exp_date}</div>
      ) : null}

      <p className="expcvv_text2">CVV</p>
      <input
        type="password"
        className="inputbox"
        name="cvv"
        id="cvv"
        required
        value={formik.values.cvv}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.cvv && formik.errors.cvv ? (
        <div className="error-message">{formik.errors.cvv}</div>
      ) : null}
    </div>
        
        </div>
        </div>
        <button disabled={!formik.isValid || !formik.dirty} type="submit" className="btn-button w-100 my-2">
            Checkout: {cartPrice}
            </button>
    </form>
    </div>
</div>
</div>

    </> );
}
 
export default Checkout;