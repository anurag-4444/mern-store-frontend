import React, { useState } from 'react'
import ReactStars from 'react-rating-stars-component'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addProductToCart } from '../../store/slices/userCart'
import { addProductToWishlist } from '../../store/slices/wishlistCart'
import { Toast } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify'

const Product = ({ product }) => {

    const [showToast, setShowToast] = useState({ status: false, error: false, msg: '' });
    const dispatch = useDispatch()
    const { isAuthenticated, error } = useSelector(state => state.User)
    const navigate = useNavigate()

    const options = {
        edit: false,
        color: "rgba(20, 20, 20, 0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 15 : 20,
        value: product.ratings,
        isHalf: true,
    }

    const addToCart = () => {

        if (isAuthenticated)
            dispatch(addProductToCart({ productId: product._id })).finally(() => {
                setShowToast({ status: true, msg: 'Product Added to Cart.', error: false });
            })
        else
            setShowToast({ status: true, msg: 'Login/Signup First', error: true });
    }

    const addWishlist = () => {

        if (isAuthenticated)
            dispatch(addProductToWishlist({ productId: product._id })).finally(() => {
                setShowToast({ status: true, msg: 'Product Added to Wishlist.', error: false });
            })
        else
            setShowToast({ status: true, msg: 'Login/Signup First', error: true });
    }

    // if (error) {
    //     toast.error(`${error} sdgfdsfg!`, {
    //         position: toast.POSITION.BOTTOM_CENTER
    //     });
    //     return <ToastContainer />
    // }

    return (<>
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


        <div className="col-md-3">

            <div className="product-card">
                <div className="product-card-img">
                    <label className="stock bg-success">{product.Stock <= 0 ? "Out Of Stock" : "In Stock"}</label>
                    <Link to={`product/${product._id}`}>
                        <img src={product.images[0].url} alt={product.name} />
                    </Link>
                </div>
                <div className="product-card-body">
                    {/* <p className="product-brand">HP</p> */}
                    <h5 className="product-name">
                        <a href="">{product.name} </a>
                    </h5>
                    <div>
                        <ReactStars {...options} />
                    </div>
                    <div>
                        <span className="selling-price">${product.price}</span>
                        <span className="original-price">${product.price + 200}</span>
                    </div>
                    <div className="mt-2">
                        <a href="#" onClick={() => (addToCart())} className="btn btn1">Add To Cart</a>
                        <a href="#" onClick={() => (addWishlist())} className="btn btn1"> <i className="fa fa-heart"></i> </a>
                        <a href={`product/${product._id}`} className="btn btn1"> View </a>
                    </div>
                </div>
            </div>

        </div>
    </>
    )
}

export default Product