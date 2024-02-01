import React, { useEffect, useState } from 'react'
import './adminUpdateOrder.css'
import { adminGetOrder, adminUpdateOrder } from '../../../store/slices/adminStore'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import MetaData from '../../MetaData'

const AdminUpdateOrder = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    const { order, error, } = useSelector((state) => (state.AdminStore))
    // console.log(order);
    useEffect(() => {
        const call = async () => {
            dispatch(adminGetOrder(id))
        }
        call()
    }, [dispatch])

    const adminOrder = (msg) => {
        dispatch(adminUpdateOrder({ status: msg, id })).finally(() => {
            dispatch(adminGetOrder(id))
        })
    }

    if (error) {
        toast.error(`${error} !`, {
            position: toast.POSITION.BOTTOM_CENTER
        });
        return <ToastContainer />
    }

    return (
        <>
           
           <MetaData title={`Update Order`} />
            {order && order.user &&
                (<div className='col-md-9'>

                    <div className="row">

                        <div className="col-md-9">

                            <div className="row mb-2" style={{ borderRadius: '20px', background: '#000000b5', color: 'white' }}>
                                <div className="col-md-12 pt-3">
                                    <h3 className='p-2 ps-3' style={{ borderRadius: '50px', background: '#31316d' }}>Shipping Info</h3>
                                    <p className='m-0 p-1 ps-3 mb-2' style={{ borderRadius: '50px', background: '#1f1f66' }}>Name: <span>{order.user.name}</span></p>
                                    <p className='m-0 p-1 ps-3 mb-2' style={{ borderRadius: '50px', background: '#1f1f66' }}>Phone No: <span>{order.shippingInfo.phoneNo}</span> </p>
                                    <p className='m-0 p-1 ps-3 mb-3' style={{ borderRadius: '50px', background: '#1f1f66' }}>Address: <span>{order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.state}</span> </p>
                                </div>
                            </div>

                            <div className="row mb-2" >
                                <div className="col-6 p-0">
                                    <div className='p-2 ps-3' style={{ borderRadius: '20px', background: '#000000b5', color: 'white' }}>
                                        <h3 className='p-2 ps-3' style={{ borderRadius: '50px', background: '#31316d' }}>Payment</h3>
                                        <p className='m-0 p-1 ps-3 mb-2' style={{ borderRadius: '50px', background: '#1f1f66' }}>Status: <span>PAID</span></p>
                                        <p className='m-0 p-1 ps-3 mb-2' style={{ borderRadius: '50px', background: '#1f1f66' }}>Amount: <span>{order.totalPrice}</span> </p>
                                    </div>
                                </div>

                                <div className="col-6 pe-0">
                                    <div className='p-2 ps-3' style={{ borderRadius: '20px', background: '#000000b5', color: 'white' }}>
                                        <h3 className='p-2 ps-3' style={{ borderRadius: '50px', background: '#31316d' }}>Order Status</h3>
                                        <p className='m-0 p-1 ps-3 mb-2' style={{ borderRadius: '50px', background: '#1f1f66' }}>Status: <span>{order.orderStatus}</span></p>
                                    </div>
                                </div>

                            </div>

                            <div className="row mb-2" style={{ borderRadius: '20px', background: '#000000b5', color: 'white' }}>
                                <div className="col-md-12 pt-3">
                                    <h3 className='p-2 ps-3' style={{ borderRadius: '50px', background: '#31316d' }}>Your Cart Items</h3>
                                    <div className="row overflow-x-auto">

                                        {order.orderItems.map((ele, idx) =>
                                            <div className="col-12 col-sm-6" key={idx}>

                                                <div className='row'>

                                                    <div className="col-5 pb-3 d-flex justify-content-center align-items-center" >
                                                        {/* <div className='d-flex justify-content-center' style={{ background: 'rgb(49, 49, 109)', borderRadius: '20px' }}> */}

                                                        <img src={ele.image} alt={idx} style={{ width: '63%', height: '100%', borderRadius: '20px', objectFit: 'cover' }} />
                                                        {/* </div> */}
                                                    </div>
                                                    <div className="col-7">

                                                        <p className='m-0 mb-1 ps-2' style={{ background: 'rgb(49, 49, 109)', borderRadius: '20px' }}>{ele.name}</p>
                                                        <p className='m-0 mb-1 ps-2' style={{ background: 'rgb(49, 49, 109)', borderRadius: '20px' }}>Price: {ele.price}</p>
                                                        <p className='m-0 mb-1 ps-2' style={{ background: 'rgb(49, 49, 109)', borderRadius: '20px' }}>Quantity: {ele.quantity}</p>
                                                        <p className='m-0 mb-1 ps-2' style={{ background: 'rgb(49, 49, 109)', borderRadius: '20px' }}>Net Price: {ele.price * ele.quantity}</p>
                                                    </div>
                                                </div>

                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>

                        </div>

                        <div className="col-md-3">
                            <div className="dropdown" style={{ display: order.orderStatus === "Delivered" ? "none" : "block" }}>
                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Update Status
                                </button>
                                <ul className="dropdown-menu" style={{ borderRadius: '30px' }}>

                                    {order && order.orderStatus === "Processing" && <li><a className="dropdown-item" href="#" onClick={() => adminOrder("Shipped")}>Shipped</a></li>}
                                    {order && order.orderStatus === "Shipped" && <li><a className="dropdown-item" href="#" onClick={() => adminOrder("Delivered")}>Delivered</a></li>}

                                    {/* <li><a className="dropdown-item" href=" #">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li> */}
                                </ul>
                            </div>
                        </div>

                    </div>

                </div>)}
        </>
    )
}

export default AdminUpdateOrder