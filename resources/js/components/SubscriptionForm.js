import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
    Button,
    Modal,
    FormGroup,
    FormControl,
    FormLabel
} from "react-bootstrap";
import axios from "axios";
import { useForm } from "react-hook-form";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

export default function SubscriptionForm(props) {
    const [loading, setLoading] = useState(false);
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = useState("");
    const [showForm, setShowForm] = useState(true);
    const { register, handleSubmit, setValue, errors } = useForm();
    const [name, setName] = useState();
    const [productName, setProductName] = useState();
    const [price, setPrice] = useState();
    const [show, setShow] = useState(false);
    const [descrition, setDescription] = useState("");
    const [dirty, setDirty] = React.useState(false);
    const [inpFile, setInpFile] = useState();
    const [imageEdit, setImageEdit] = useState("");
    const [previewContainer, setPreviewContainer] = useState();
    const { image, setImage } = useState();
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState([]);
    const [flag, setFlag] = useState(false);
    const [urlApi, setUrlApi] = useState(
        $("#urlApi")
            .text()
            .trim()
    );
    let msg2 = "";
    if (props && props.dat.image) props.dat.editImage = props.dat.image;
    if (props.loggedUser.id) setValue("user_id", props.loggedUser.id);

    function getProducts() {
        useEffect(() => {
            const fetchData = async () => {
                const result = await axios(urlApi + "/api/getProducts");
                setProducts(result.data.data);
                setLoading(false);
            };
            fetchData();
        }, []);
    }
    getProducts();
    const productChangeHandler = event => {
        setProductName(event.target.value);
        axios
            .get(urlApi + "/api/getProducts", {
                params: { productName: event.target.value }
            })
            .then(response => {
                setProduct(response.data);
                setLoading(false);
                setValue("id", response.data.id);
                $(".image-preview__image1").prop(
                    "src",
                    "/code-test-master/docs/productImages/" +
                        response.data.image
                );
                $(".image-preview__image1").css("display", "block");
                $(".image-preview__default-text").css("display", "none");
            });
    };
    const onSubmit = data => {
        setShowMsg(true);
        setShowMsg(false);
        let mounted = true;
        const result = axios
            .post(urlApi + "/api/saveSubscription", data)
            .then(response => {
                         if (response.data == "success") {
                    setShowMsg(true);
                    setMsg("Subscription saved");
                    props.showSubscription(true);
                } else {
                    setShowMsg(true);
                    setMsg("Already subscribed to this product");
                }
            })
            .catch(error => {});
        return (mounted = false);
    };

    const deleteSubscription = data => {
        console.log(data);
    };

    if (loading) {
        <h2>Loading...</h2>;
    }

    return (
        <div className="container formMt">
            <div className="row">
                <div className="col-8  offset-7">
                    <button
                        className="btn btn-lg login-button"
                        onClick={props.cancelar}
                    >
                        Back to Subscriptions
                    </button>
                </div>
                <div className="col-md-8 offset-md-2">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        encType="multipart/form-data"
                    >
                        <input type="hidden" name="id" ref={register} />
                        <input type="hidden" name="user_id" ref={register} />
                        <input type="hidden" name="editImage" ref={register} />
                        {showMsg && (
                            <p className="alert alert-danger mt-3 mb-3">
                                {msg}
                            </p>
                        )}
                        <FormGroup controlId="id_product" bssize="large">
                            <FormLabel className="formLabel">Product</FormLabel>
                            <select
                                ref={register}
                                name="id_product"
                                style={{ height: "37px" }}
                                onChange={productChangeHandler}
                            >
                                <option>Seleccionar</option>
                                {products.map((item, index) => (
                                    <option value={item.id} key={index}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </FormGroup>
                        <FormGroup controlId="description" bssize="large">
                            <FormLabel className="formLabel">
                                Description
                            </FormLabel>

                            <FormControl
                                className="capitalize"
                                name="description"
                                defaultValue={product.description}
                                ref={register}
                            />
                        </FormGroup>
                        <FormGroup controlId="price" bssize="large">
                            <FormLabel className="formLabel">Price</FormLabel>

                            <FormControl
                                name="price"
                                defaultValue={product.price}
                                ref={register}
                                type="number"
                            />
                        </FormGroup>
                        <div className="row">
                            <div className="col-md-6">
                                <FormLabel className="formLabel">
                                    Image
                                </FormLabel>

                                <div
                                    className="image-preview"
                                    id="imagePreview"
                                >
                                    <img
                                        src=""
                                        className="image-preview__image1"
                                    />
                                    <span className="image-preview__default-text">
                                        Image Preview
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <input
                                type="submit"
                                value="Save"
                                className="btn btn-lg btn-block login-button"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
