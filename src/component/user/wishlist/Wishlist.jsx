import React, { useEffect, useState } from 'react'
import './wishlist.css'
import { useDispatch, useSelector } from 'react-redux'
import { changeIsUpdatedState, deleteProductFromWishlist, getProductFromWishlist } from '../../../store/slices/wishlistCart'
import { addProductToCart } from '../../../store/slices/userCart'
import { toast, ToastContainer } from 'react-toastify'
import { Toast } from 'react-bootstrap';
import NotAvailable from '../../Not-Available/NotAvailable'
import MetaData from '../../MetaData'

const Wishlist = () => {

    const { wishlist, isUpdated, error, status } = useSelector(state => state.Wishlist)

    const [showToast, setShowToast] = useState({ status: false, error: false, msg: '' });

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProductFromWishlist()).finally(() => dispatch(changeIsUpdatedState()))
    }, [isUpdated])

    const deleteWishlist = (id) => {
        dispatch(deleteProductFromWishlist({ productId: id })).finally(() => {
            setShowToast({ status: true, msg: 'Successfully Product Deleted From Wishlist', error: false });
        })
    }

    const wishlistToCart = (id) => {
        dispatch(addProductToCart({ productId: id })).finally(() => {
            setShowToast({ status: true, msg: 'Successfully Product Added to Cart', error: false });
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
            <MetaData title={`Your Wishlist`} />
            <Toast
                show={showToast.status}
                onClose={() => setShowToast({ status: false, msg: '' })}
                style={{
                    position: 'fixed',
                    bottom: 10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 9999, // Higher z-index
                }}
                autohide
                delay={5000} // Auto-hide after 5 seconds
            >
                {showToast.error === false ? (
                    <Toast.Header style={{ background: '#28a745', color: '#fff' }}>
                        <strong className="me-auto">Success</strong>
                    </Toast.Header>
                ) : (
                    <Toast.Header style={{ background: '#dc3545', color: '#fff' }}>
                        <strong className="me-auto">Failure</strong>
                    </Toast.Header>
                )}
                <Toast.Body style={{ background: showToast.error === false ? '#d4edda' : '#f8d7da', color: showToast.error === false ? '#155724' : '#721c24' }}>
                    {showToast.msg}
                </Toast.Body>
            </Toast>

            {status === 'loading' ? <div className="d-flex justify-content-center">
                <div className="spinner-grow text-primary" role="status">
                    <span className="visually-hidden"></span>
                </div></div> : !wishlist.length ? <NotAvailable message={'Oops! The Orders is currently not available.'} /> : <section className="bg-light my-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9">
                                <div className="card border shadow-0">
                                    <div className="m-4">
                                        <h4 className="card-title mb-4">Your shopping cart</h4>

                                        {wishlist.length !== 0 && wishlist.map((item) => (<div className="row gy-3 mb-4" key={item._id}>
                                            <div className="col-lg-5">
                                                <div className="me-lg-5">
                                                    <div className="d-flex">
                                                        <img src={item.images[0].url} className="border rounded me-3" style={{ width: '96px', height: '96px' }} />
                                                        <div className="">
                                                            <a href="#" className="nav-link">{item.name}</a>
                                                            <p className="text-muted">{item.category}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                                                {/* <div className="">
                                                <select style={{ width: '100px' }} className="form-select me-4">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                </select>
                                            </div> */}
                                                <div className="">
                                                    <span className="h6">${item.price}</span> <br />
                                                    {/* <small className="text-muted text-nowrap"> $460.00 / per item </small> */}
                                                </div>
                                            </div>
                                            <div className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                                                <div className="float-md-end">
                                                    <a href="#!" onClick={() => (wishlistToCart(item._id))} className="btn btn-light border me-2 px-2 icon-hover-primary"><i className="fa-solid fa-cart-plus fa-lg px-1 text-secondary"></i></a>
                                                    {/* <a href="#" className="btn btn-outline-primary w-100">Add to cart</a> */}
                                                    <a href="#" onClick={() => (deleteWishlist(item._id))} className="btn btn-light border text-danger icon-hover-danger"> Remove</a>
                                                </div>
                                            </div>
                                        </div>))}

                                    </div>

                                    <div className="border-top pt-4 mx-4 mb-4">
                                        <p><i className="fas fa-truck text-muted fa-lg"></i> Free Delivery within 1-2 weeks</p>
                                        <p className="text-muted">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3">
                                <div className="card mb-3 border shadow-0">
                                    <div className="card-body">
                                        <form>
                                            <div className="form-group">
                                                <label className="form-label">Have coupon?</label>
                                                <div className="input-group">
                                                    <input type="text" className="form-control border" name="" placeholder="Coupon code" />
                                                    <button className="btn btn-light border">Apply</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="card shadow-0 border">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                            <p className="mb-2">Total price:</p>
                                            <p className="mb-2">$329.00</p>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p className="mb-2">Discount:</p>
                                            <p className="mb-2 text-success">-$60.00</p>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p className="mb-2">TAX:</p>
                                            <p className="mb-2">$14.00</p>
                                        </div>
                                        <hr />
                                        <div className="d-flex justify-content-between">
                                            <p className="mb-2">Total price:</p>
                                            <p className="mb-2 fw-bold">$283.00</p>
                                        </div>

                                        <div className="mt-3">
                                            <a href="#" className="btn btn-success w-100 shadow-0 mb-2"> Make Purchase </a>
                                            <a href="#" className="btn btn-light w-100 border mt-2"> Back to shop </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>}
        </>
    )
}

export default Wishlist