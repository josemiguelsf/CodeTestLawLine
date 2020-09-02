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
import ReactInterval from "react-interval";
import ReactHtmlParser, {
    processNodes,
    convertNodeToElement,
    htmlparser2
} from "react-html-parser";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import NumberFormat from "react-number-format";

export default function ProductForm(props) {
    const [user_id, setUserId] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = useState("");
    const [showForm, setShowForm] = useState(true);
    const { register, handleSubmit, setValue, errors } = useForm();
    const [name, setName] = useState();
    const [rice, setPrice] = useState();
    const [show, setShow] = useState(false);
    const [descrition, setDescription] = useState("");
    const [dirty, setDirty] = React.useState(false);
    const [inpFile, setInpFile] = useState();
    const [imageEdit, setImageEdit] = useState("");
    const [previewContainer, setPreviewContainer] = useState();
    const { image, setImage } = useState();
    const [flag, setFlag] = useState(false);
    const [urlApi, setUrlApi] = useState(
        $("#urlApi")
            .text()
            .trim()
    );
    let msg2 = "";
    console.log("BBBBBBBBBBBBBBBBB");
    console.log(urlApi);
    console.log(
        $("#urlApi")
            .text()
            .trim()
    );
    console.log("BBBBBBBBBBBBBBBBBB");

    console.log("OUTSIDE IF");
    console.log(props);
    console.log(props.dat.imagen);
    console.log("OUTSIDE IF");
    //DISPLAYING IMAGE IN CASE OF EDIT
    if (props && props.dat.image) props.dat.editImage = props.dat.image;
    //setImageEdit(props.dat.imagen);
    if (props && props.dat.editImage && !flag) {
        console.log("INSIDE IF");
        console.log(props);
        console.log(
            "/code-test-master/docs/productImages/" + props.dat.editImage
        );
        console.log(urlApi + "/docs/productImages/" + props.dat.editImage);
        console.log('INSIDE IF');
        //	console.log('INSIDE INSIDE PROPS DATA IMAGE');
        let editImage = urlApi + "/docs/productImages/" + props.dat.editImage;
        
        $(".image-preview__image1").prop(
            "src", "/code-test-master/docs/productImages/sevenproduct.jpg"
        );
        $(".image-preview__image1").css("display", "block");
        $(".image-preview__default-text").css("display", "none");
        //console.log('SECOND INSIDE INSIDE PROPS DATA IMAGE');
    }
    console.log("algo es algo");
    // console.log(flagText);
    if (props.dat.user_id) setValue("user_id", props.dat.user_id);
    if (props.dat.id) setValue("id", props.dat.id);

    const imageSelectedHandler = event => {
        const selectedFile = event.target.files[0];
        const file = event.target.files[0];
        //const inpFile = document.getElementById('inpFile');
        setFlag(true);
        setInpFile(document.getElementById("inpFile"));
        //const previewContainer = document.getElementById('imagePreview');
        const previewContainer = document.getElementById("imagePreview");
        const previewImage = previewContainer.querySelector(
            ".image-preview__image1"
        );
        const previewDefaultText = previewContainer.querySelector(
            ".image-preview__default-text"
        );
        //console.log('NNNNNNNNNNNNNNNNNNNNNN');
        //console.log(file);
        //console.log('NNNNNNNNNNNNNNNNNNNNNN');
        if (file) {
            const reader = new FileReader();

            previewDefaultText.style.display = "none";
            previewImage.style.display = "block";
            reader.addEventListener("load", function() {
                //console.log('INSIDE FILE');
                //console.log(reader.result);
                //console.log('INSIDE FILE');
                previewImage.setAttribute("src", reader.result);
            });
            reader.readAsDataURL(file);
        }
        props.dat.image = selectedFile;
        //atencion aquí...
        props.dat.editImage = URL.createObjectURL(event.target.files[0]);

        const ext = selectedFile.name.substr(
            selectedFile.name.lastIndexOf(".") + 1
        );
        if (
            !(
                ext == "jpg" ||
                ext == "gif" ||
                ext == "jpeg" ||
                ext == "png" ||
                ext == "bmp"
            )
        ) {
            msg2 = "invalid image format....";
            setShowMsg(true);
        }
    }

    /*const handleOnChangeText = (e, editor) => {
		console.log(editor.getData());
		const data = editor.getData();
		setEditorVal(data);
		console.log(e);
		console.log(data);
	}; */

    const onSubmit = data => {
        setShowMsg(true);
        //setMsg("fernandito")

        if (data.name == "") msg2 = "Please enter product name";
        if (data.description == "")
            msg2 = "Please enter description of product";
        if (data.price == "") msg2 = "Please enter product price";
         if (props.dat.image.name == "") msg2 = "Please choose an image";
        console.log("BEGINNING OF SUBMIT");
        console.log(data);
        console.log(props.dat.image.name);
        console.log("BEGINNING OF SUBMIT");

        setMsg(msg2);
        if (msg == "") {
            console.log("NO ERROR MESSAGE");
            setShowMsg(false);
            let formData = new FormData();
            console.log("XXXXXXXXXXXXXXXXXXX");
            let details = JSON.stringify(data);
            formData.append("data", details);
            if (props.dat.image && props.dat.image.name)
                formData.append("image", props.dat.image, props.dat.image.name);

            let mounted = true;
            const result = axios
                .post(urlApi + "/api/saveProduct", formData)
                .then(response => {
                    console.log("555555555555555555");
                    console.log(response.data);
                    console.log("666666666666666666");
                    //if (mounted) {
                    if (response.data == "success") {
                        setShowMsg(true);
                        setMsg("Product saved");
                        props.showProducts(true);
                    }
                    //}
                })
                .catch(error => {});
            return (mounted = false);
        }
    };

    const deleteProduct = data => {
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
                        Back to products
                    </button>
                </div>
                <div className="col-md-8 offset-md-2">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        encType="multipart/form-data"
                    >
                        <input type="hidden" name="id" ref={register} />
                        <input type="hidden" name="editImage" ref={register} />
                        {showMsg && (
                            <p className="alert alert-danger mt-3 mb-3">
                                {msg}
                            </p>
                        )}

                        <FormGroup controlId="titulo" bssize="large">
                            <FormLabel className="formLabel">
                                {errors.name && (
                                    <span style={{ color: "Red" }}>
                                        {" "}
                                        required
                                    </span>
                                )}{" "}
                                Name
                            </FormLabel>

                            <FormControl
                                className="capitalize"
                                defaultValue={props.dat.name}
                                name="name"
                                ref={register}
                            />
                        </FormGroup>
                        <FormGroup controlId="description" bssize="large">
                            <FormLabel className="formLabel">
                                Description
                            </FormLabel>

                            <FormControl
                                className="capitalize"
                                name="description"
                                defaultValue={props.dat.description}
                                ref={register}
                            />
                        </FormGroup>
                        <FormGroup controlId="price" bssize="large">
                            <FormLabel className="formLabel">Price</FormLabel>

                            <FormControl
                                name="price"
                                defaultValue={props.dat.price}
                                ref={register}
                                type="number"
                            />
                        </FormGroup>
                        <div className="row">
                            <div className="col-md-6">
                                <FormLabel className="formLabel">
                                    Image
                                </FormLabel>
                                <input
                                    name="inpFile"
                                    id="inpFile"
                                    type="file"
                                    onChange={imageSelectedHandler}
                                />
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
