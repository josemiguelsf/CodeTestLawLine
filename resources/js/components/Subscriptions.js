import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import Pagination from "react-js-pagination";
import SubscriptionForm from "../components/SubscriptionForm";

export default function Subscriptions(props) {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, setValue, errors } = useForm();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("Subscriptions");
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
    let userId = "juan";
    let role = "migelito";
    if (props && props.loggedUser && props.loggedUser.id)
        userId = props.loggedUser.id;
    if (props && props.loggedUser && props.loggedUser.role)
        role = props.loggedUser.role;
    
    const showSubscriptions = () => {
        setShow(true);
        setTitle("Subscriptions");
        setViewForm(false);
        handlePageChange(1);
    };

    const getSubscriptions = () => {
        useEffect(() => {
           let unmounted = false;
           const fetchData = async () => {
                setLoading(true);
                const result = await axios.get(
                    urlApi + "/api/getSubscriptions",
                    {
                        params: {
                            page: pageNumber
                        }
                    }
                );

                setSubscriptions(result.data.data);
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
    if (props && props.loggedUser) getSubscriptions();
    const handlePageChange = (pageNumber, searchStr) => {
        setActivePage(pageNumber);
        axios
            .get("/getSubscriptions", {
                params: {
                    page: pageNumber,
                    searchStr: "lucia",
                    user_id: userId,
                    role: role
                }
            })
            .then(response => {
                setSubscriptions(response.data.data);
                setItemsCountPerPage(response.data.per_page);
                setTotalItemsCount(response.data.total);
                setActivePage(response.data.current_page);
                setLoading(false);
                return function cleanup() {
                    abortController.abort();
                };
            });
    };
    const addSubscription = dat => {
        setShow(false);
        setViewForm(true);
        dat.title
            ? setTitle("Edit Subscription")
            : setTitle("New Subscription");

        if (dat) {
            if ((dat.title = "")) setShow(false);
            setData(dat);
        }
    };
    const deleteSubscription = data => {
        console.log(data);
        axios
            .get(urlApi + "/api/deleteSubscription", { params: { id: data } })
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
                            {title == "Subscriptions" && (
                                <div className="col-6">
                                    <h3 className="text-primary mb-3">
                                        Subscriptions
                                    </h3>
                                </div>
                            )}
                            {title == "Artículoxxxx" && (
                                <div className="col-9">
                                    <h3 className="text-primary mb-3">
                                        Subscription
                                    </h3>
                                </div>
                            )}
                            {(title == "Nuevo Artículoxxxx" ||
                                title == "Editar Artículoxxxx") && (
                                <div className="col-2">
                                    <p className="text-primary mb-3">{title}</p>
                                </div>
                            )}

                            <div className="col-2">
                                <button
                                    className="btn btn-link text-primary"
                                    onClick={addSubscription}
                                >
                                    Add Subscription
                                </button>
                            </div>
                        </div>
                    )}
                    {!show && viewForm && (
                        <SubscriptionForm
                            dat={data}
                            showSubscriptions={showSubscriptions}
                            loggedUser={props.loggedUser}
                            cancel={cancel}
                        />
                    )}

                    {show && (
                        <div>
                            <div className="table-responsivexx text-white">
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
                                        {subscriptions.map(subscription => (
                                            <tr key={subscription.image}>
                                                <td>{subscription.name}</td>
                                                <td>
                                                    {subscription.description}
                                                </td>
                                                <td>{subscription.price}</td>
                                                <td>
                                                    {subscription.image && (
                                                        <img
                                                            className="artImgTable"
                                                            src={
                                                                urlApi +
                                                                "/docs/productImages/" +
                                                                subscription.image
                                                            }
                                                        />
                                                    )}
                                                </td>

                                                <td className="capitalize authorArt cursorPointer">
                                                    <div className="divIcon">
                                                        <a
                                                            onClick={() =>
                                                                deleteSubscription(
                                                                    subscription.id
                                                                )
                                                            }
                                                        >
                                                            <h6>Remove </h6>
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
