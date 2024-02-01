import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../../store/slices/orderDetail';
import { toast, ToastContainer } from 'react-toastify';
import NotAvailable from '../../Not-Available/NotAvailable';
import MetaData from '../../MetaData';


const Orders = () => {

    const { myOrders, error, status } = useSelector(state => state.UserOrder)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOrder())
    }, [dispatch])

    if (error) {
        toast.error(`${error} !`, {
            position: toast.POSITION.BOTTOM_CENTER
        });
        return <ToastContainer />
    }

    return (
        <>
        <MetaData title={`Your Orders`} />
            {status === 'loading' ? <div className="d-flex justify-content-center">
                <div className="spinner-grow text-primary" role="status">
                    <span className="visually-hidden"></span>
                </div></div> : !myOrders.length ? <NotAvailable message={'Oops! The product is currently not available.'} /> :<section className="bg-light py-5">
                <div className="container">
                    {myOrders.map((item) => (<div className="row" style={{ maxHeight: '65vh', overflow: 'auto' }} key={item._id}>
                        <div className="col-xl-8 col-lg-8 mb-4">


                            <div className="card shadow-0 border">
                                <div className="p-4">
                                    <h5 className="card-title mb-3">Guest checkout</h5>
                                    <div className="row">

                                        <div className="col-6 mb-3">
                                            <p className="mb-0">Phone No.</p>
                                            <div className="form-outline">
                                                <input
                                                    type="text"
                                                    id="typePhone"
                                                    className="form-control"
                                                    value={item.shippingInfo.phoneNo}
                                                    readOnly
                                                />
                                            </div>
                                        </div>


                                    </div>



                                    <hr className="my-4" />

                                    <h5 className="card-title mb-3">Shipping info</h5>



                                    <div className="row">
                                        <div className="col-sm-8 mb-3">
                                            <p className="mb-0">Address</p>
                                            <div className="form-outline">
                                                <input type="text" id="typeText" value={item.shippingInfo.address} className="form-control" readOnly />
                                            </div>
                                        </div>

                                        <div className="col-sm-4 mb-3">
                                            <p className="mb-0">Country</p>
                                            <input type="text" id="typeText" readOnly value={item.shippingInfo.country} className="form-control" />
                                        </div>

                                        <div className="col-sm-4 mb-3">
                                            <p className="mb-0">State</p>
                                            <input type="text" id="typeText" readOnly value={item.shippingInfo.state} className="form-control" />
                                        </div>

                                        <div className="col-sm-4 mb-3">
                                            <p className="mb-0">City</p>
                                            <input type="text" id="typeText" readOnly value={item.shippingInfo.city} className="form-control" />
                                        </div>



                                        <div className="col-sm-4 col-6 mb-3">
                                            <p className="mb-0">Postal code</p>
                                            <div className="form-outline">
                                                <input
                                                    type="text"
                                                    id="postalCode"
                                                    name="postalCode"
                                                    value={item.shippingInfo.pinCode}
                                                    readOnly
                                                    maxLength={6}
                                                    placeholder="Enter 6-digit postal code"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>


                                    </div>




                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 d-flex justify-content-center justify-content-lg-end">
                            <div className="ms-lg-4 mt-4 mt-lg-0" style={{ maxWidth: '320px' }}>
                                <h6 className="mb-3">Summary</h6>
                                <div className="d-flex justify-content-between">
                                    <p className="mb-2">Total price:</p>
                                    <p className="mb-2">${item.itemsPrice}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className="mb-2">Discount:</p>
                                    <p className="mb-2 text-danger">- $60.00</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className="mb-2">Shipping cost:</p>
                                    <p className="mb-2">+ ${item.shippingPrice}</p>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <p className="mb-2">Total price:</p>
                                    <p className="mb-2 fw-bold">${item.totalPrice}</p>
                                </div>



                                <hr />
                                <h6 className="text-dark my-4">Items in cart</h6>

                                {item.orderItems.length !== 0 && item.orderItems.map((item) => {

                                    return (
                                        <div className="d-flex align-items-center mb-4" key={item._id}>
                                            <div className="me-3 position-relative">
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-secondary">
                                                    3
                                                </span>
                                                <img src={item.image} alt='No Image' style={{ height: '96px', width: '96px' }} className="img-sm rounded border" />
                                            </div>
                                            <div className="">
                                                <a href="#" className="nav-link">{item.name}</a>
                                                <div>Quantity: {item.quantity}</div>
                                                <div className="price text-muted">Total: ${item.price}</div>
                                            </div>
                                        </div>)
                                }
                                )}


                            </div>
                        </div>
                    </div>))}
                </div>
            </section >}


        </>
    )
}

export default Orders