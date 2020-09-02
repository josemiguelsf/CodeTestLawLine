import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import Pagination from "react-js-pagination";
import ProductForm from "../components/ProductForm";

export default function Products(props) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, setValue, errors } = useForm();
    const [user_id, setUser_Id] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [title, setTitle] = useState('Products');
    const [urlApi, setUrlApi] = useState(
        $("#urlApi")
            .text()
            .trim()
    );

    const [show, setShow] = useState(true);
    const [viewForm, setViewForm] = useState(false);
    const [data, setData] = useState({});
    const [activePage, setActivePage] = useState(1);
    const [itemsCountPerPage, setItemsCountPerPage] = useState(1);
    const [totalItemsCount, setTotalItemsCount] = useState(1);
    const [pageRangeDisplayed, setPageRangeDisplayed] = useState(3);
    const [pageNumber, setPageNumber] = useState(1);

    let logged = "";
    let role = "";
    if (props && props.data) {
        logged = props.data;
        role = props.data.role;
    }

    const showProducts = () => {
       setShow(true);
        setTitle('Products')
        setViewForm(false)
        handlePageChange(1);
    };

    const getProducts = () => {
        useEffect(() => {
            let unmounted = false;
            const fetchData = async () => {
                setLoading(true);
                const result = await axios.get(urlApi + "/api/getProducts", {
                    params: { page: pageNumber, searchStr: "" }
                });

                setProducts(result.data.data);
                setItemsCountPerPage(result.data.per_page);
                setTotalItemsCount(result.data.total);
                setActivePage(result.data.current_page);
                setLoading(false);
            };

            if (!unmounted) fetchData();
            return () => {
                return (unmounted = true);
            };
        }, []);
    };
    getProducts();
    const handlePageChange = (pageNumber, searchStr) => {
        setActivePage(pageNumber);
        axios
            .get("/getProducts", {
                params: { page: pageNumber, searchStr: searchStr }
            })
            .then(response => {
                setProducts(response.data.data);
                setItemsCountPerPage(response.data.per_page);
                setTotalItemsCount(response.data.total);
                setActivePage(response.data.current_page);
                setLoading(false);
                return function cleanup() {
                    abortController.abort();
                };
            });
    };
    const addProduct = dat => {
        setShow(false);
        setViewForm(true);
        dat.title ? setTitle("Edit Product") : setTitle("New Product");

        if (dat) {
            if ((dat.title = "")) setShow(false);
           setData(dat);
        }
    };
    const deleteProduct = data => {
        console.log(data);
        axios
            .get(urlApi + "/api/deleteProduct", { params: { id: data } })
            .then(response => {
                handlePageChange(1);
            });
    };
    const cancel = () => {
        setTitle("");
        setShow(true);
    };

    return (
        <div className="container componentMt">
            <div className="row">
                <div className="col-8 offset-2">
                    {show && (
                        <div className="row">
                            {title == "Products" && (
                                <div className="col-6">
                                    <h3 className="text-primary mb-3">
                                        {" "}
                                        Products
                                    </h3>
                                </div>
                            )}
                            {title == "Artículoxxxx" && (
                                <div className="col-9">
                                    <h3 className="text-primary mb-3">
                                        Product
                                    </h3>
                                </div>
                            )}
                            {(title == "Nuevo Artículoxxxx" ||
                                title == "Editar Artículoxxxx") && (
                                <div className="col-2">
                                    <p className="text-primary mb-3">
                                        {" "}
                                        {title}
                                    </p>
                                </div>
                            )}

                            <div className="col-2">
                                <button
                                    className="btn btn-link text-primary"
                                    onClick={addProduct}
                                >
                                    Add product
                                </button>
                            </div>
                        </div>
                    )}
                    {!show && viewForm && (
                        <ProductForm
                            dat={data}
                            showProducts={showProducts}
                            cancel={cancel}
                        />
                    )}

                    {show && (
                        <div>
                            <div className="text-white">
                                <table className="table table-striped tableProd2">
                                    <thead className="tableHeadArt">
                                        <tr>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th> Price</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {products.map(product => (
                                            <tr key={product.image}>
                                                <td>{product.name}</td>
                                                <td>{product.description}</td>
                                                <td>{product.price}</td>
                                                <td>
                                                    {product.image && (
                                                        <img
                                                            className="artImgTable"
                                                            src={
                                                                urlApi +
                                                                "/docs/productImages/" +
                                                                product.image
                                                            }
                                                        />
                                                    )}
                                                </td>
                                                
                                                <td className="capitalize authorArt cursorPointer">
                                                  
                                                            <div className="divIcon">
                                                                <a
                                                                    onClick={() => {
                                                                        addProduct(
                                                                            product
                                                                        );
                                                                    }}
                                                                >
                                                                    <img
                                                                        className="iconTable cursorPointer"
                                                                        src={
                                                                            urlApi +
                                                                            "/public/images/edit.jpg"
                                                                        }
                                                                        title="edit"
                                                                    />
                                                                </a>

                                                                <a
                                                                    onClick={() =>
                                                                        deleteProduct(
                                                                            product.id
                                                                        )
                                                                    }
                                                                >
                                                                    <img
                                                                        className="iconTable cursorPointer"
                                                                        src={
                                                                            urlApi +
                                                                            "/public/images/delete.png"
                                                                        }
                                                                        title="delete"
                                                                    />
                                                                </a>
                                                            </div>
                                                       
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="d-flex justify-content-center">
                                    <Pagination
                                        activePage={activePage}
                                        itemsCountPerPage={itemsCountPerPage}
                                        totalItemsCount={totalItemsCount}
                                        pageRangeDisplayed={pageRangeDisplayed}
                                        onChange={handlePageChange}
                                        itemClass='"page-item'
                                        linkClass="page-link"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
