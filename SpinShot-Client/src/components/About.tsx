import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup"
import { successMsg } from "../services/feedbackService";

interface AboutProps {
    
}
 
const About: FunctionComponent<AboutProps> = () => {
    let navigate= useNavigate();

    let formik = useFormik({
        initialValues: {
            name: "", email: "" , message: "" },
            validationSchema: yup.object({
                name:yup.string().required().min(2),
                email: yup.string().required().email(),
                message: yup.string().required().min(2),}),
                onSubmit: (values, {resetForm}) => {
                    successMsg(`Thank you ${values.name}, We have recived your message.`)
                    resetForm()

                },});

    return ( 
        <>
 
  <div className="container page-container my-4" id="about">
    <section className="row">
      <div className="col-md-7">
        <h1>SpinShot Central</h1>
        <p>Your Ultimate Destination for Handball Excellence!</p>
     
      </div>
      <div id="logodiv" className="col-md-5 d-none d-lg-block mb-2">
        <img id="weblogo" src="/images/weblogo.png" alt="website logo" />
      </div>
      <hr />
    </section>

    <section className="mission">
      <div className="container">
        <div className="row">
        <div className="col-md-10">
        <h2>Our Mission</h2>
        <p>
        Our mission is simple – to elevate your game. We believe that the right equipment can make all the difference, and that's why we strive to bring you the best in handball balls, apparel, protective gear, resin, and more. We're here to empower you to perform at your peak and enjoy the thrill of every spin shot.
        </p>
        </div>

        </div>

      </div>
    </section>
    <hr />

    <section className="browse my-3">
<p>Browse through our collection of handpicked products, each chosen to enhance your handball journey. From the latest handball balls to stylish apparel and essential protective gear, we've got everything you need to perform with confidence.<br></br>
</p>
<button className="btn" onClick={()=> navigate("/products")}>Browse products</button>

</section>
<hr />
<div className="row">
<div className="contact col-md-8 my-3">
<form onSubmit={formik.handleSubmit}>
    <div className="form-floating mb-3">
        <input
        type="text"
        className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
        id="floatingName"
        placeholder="John Doe"
        name="name"
        onChange={formik.handleChange}
        value={formik.values.name}
        onBlur={formik.handleBlur}
        />
        <label htmlFor="floatingName">Name</label>
        {formik.touched.name && formik.errors.name && (
        <p className="text-danger">{formik.errors.name}</p>
        )}
    </div>

    <div className="form-floating mb-3">
        <input
        type="email"
        className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
        id="floatingInput"
        placeholder="name@example.com"
        name="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        onBlur={formik.handleBlur}
        />
        <label htmlFor="floatingInput">Email address</label>
        {formik.touched.email && formik.errors.email && (
        <p className="text-danger">{formik.errors.email}</p>
        )}
    </div>

    <div className="form-floating">
        <textarea
        className={`form-control ${formik.touched.message && formik.errors.message ? 'is-invalid' : ''}`}
        id="floatingMessage"
        placeholder="Your message"
        name="message"
        onChange={formik.handleChange}
        value={formik.values.message}
        onBlur={formik.handleBlur}
        />
        <label htmlFor="floatingMessage">Message</label>
        {formik.touched.message && formik.errors.message && (
        <p className="text-danger">{formik.errors.message}</p>
        )}
      </div>

      <button
        className="btn my-3"
        disabled={!formik.isValid || !formik.dirty}
        type="submit"
      >
        Submit
      </button>
    </form>
</div>
<div className="col-md-4 my-3">
    <p>
    Need help ?<br />
    Want to reach out? <br />
    Feel free to contact us!</p>
</div>
</div>

  </div>


  </>
)
        }
export default About;