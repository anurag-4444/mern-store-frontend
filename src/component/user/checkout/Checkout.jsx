import React, { useEffect, useState } from 'react'
import './checkout.css'
import { Country, State, City } from 'country-state-city';
import { Toast } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeIsUpdateState, getProductToCart } from '../../../store/slices/userCart';
import { addNewOrder, changeProductPrice, getProductCart } from '../../../store/slices/orderDetail';
import { useNavigate } from 'react-router-dom';
import MetaData from '../../MetaData';
// import { toast, ToastContainer } from 'react-toastify';


const Checkout = () => {

    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showToast, setShowToast] = useState({ status: false, msg: '' });
    const [address, setAddress] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    const { cart } = useSelector(state => state.UserCart)
    const { shippingCost, productPrice, order, totalPrice } = useSelector(state => state.UserOrder)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductToCart()).finally(() =>
            dispatch(changeIsUpdateState())
        )
        dispatch(getProductCart()).finally(() => dispatch(changeProductPrice()))
    }, [])

    const handlePhoneNumberChange = (e) => {
        const inputValue = e.target.value;

        // console.log((/^[0-9 ()-]*$/.test(inputValue)));
        if (/^\d{0,10}$/.test(inputValue)) {
            setPhoneNumber(inputValue);
        }
        //  else {
        //     toast.error('Please enter a valid 10-digit phone number');
        // }
    };


    const handleInputChange = (e) => {
        const input = e.target.value;

        // Check if the input is a number and has a length of 6
        if (/^\d{0,6}$/.test(input)) {
            setPostalCode(input);
        } else {
            // toast.error('Postal code must be a 6-digit number');
        }
    };

    const handleContinueClick = () => {

        if (phoneNumber.length !== 10) {
            // console.log(phoneNumber.length);
            setShowToast({ status: true, msg: 'Invalid phone number. Please enter a 10-digit number.' });
            return
        }

        if (address.length <= 5) {
            setShowToast({ status: true, msg: 'Address must be at least 6 characters long' })
            return
        }
        if (country.length === 0) {
            setShowToast({ status: true, msg: 'Please Select the Country' })
            return
        }
        if (state.length === 0) {
            setShowToast({ status: true, msg: 'Please Select the State' })
            return
        }
        if (city.length === 0) {
            setShowToast({ status: true, msg: 'Please Select the City' })
            return
        }

        if (postalCode.length !== 6) {
            setShowToast({ status: true, msg: 'Postal Code should be 6-digit number' })
            return
        }

        // console.log(productsPrice);

        dispatch(addNewOrder({
            shippingInfo: {
                address,
                city,
                state,
                country,
                pinCode: postalCode,
                phoneNo: phoneNumber,
            },
            orderItems: order,
            itemsPrice: productPrice,
            shippingPrice: shippingCost,
            totalPrice
        }))
        navigate('/payment')

    };

    return (
        <>
        <MetaData title={`Checkout Page`} />
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
                <Toast.Header style={{ background: '#dc3545', color: '#fff' }}>
                    <strong className="me-auto">Error</strong>
                </Toast.Header>
                <Toast.Body style={{ background: '#f8d7da', color: '#721c24' }}>
                    {showToast.msg}
                </Toast.Body>
            </Toast>



           

            <section className="bg-light py-5">
                <div className="container">
                    <div className="row">
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
                                                    value={phoneNumber}
                                                    onChange={handlePhoneNumberChange}
                                                    pattern="[0-9]*"
                                                />
                                            </div>
                                        </div>

                                        
                                    </div>

                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">Keep me up to date on news</label>
                                    </div>

                                    <hr className="my-4" />

                                    <h5 className="card-title mb-3">Shipping info</h5>

                                   

                                    <div className="row">
                                        <div className="col-sm-8 mb-3">
                                            <p className="mb-0">Address</p>
                                            <div className="form-outline">
                                                <input type="text" id="typeText" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Type here" className="form-control" />
                                            </div>
                                        </div>

                                        <div className="col-sm-4 mb-3">
                                            <p className="mb-0">Country</p>
                                            <select className="form-select" value={country} onChange={(e) => setCountry(e.target.value)}>
                                                <option value="">Select Country</option>
                                                {Country && Country.getAllCountries().map((item) => (<option key={item.isoCode} value={item.isoCode}>{item.name}</option>))}
                                            </select>
                                        </div>

                                        <div className="col-sm-4 mb-3">
                                            <p className="mb-0">State</p>
                                            <select className="form-select" value={state} onChange={(e) => setState(e.target.value)}>
                                                <option value="">Select State</option>
                                                {country.length !== 0 && State.getStatesOfCountry(country).map((item) => (<option key={item.isoCode} value={item.isoCode}>{item.name}</option>))}
                                            </select>
                                        </div>

                                        <div className="col-sm-4 mb-3">
                                            <p className="mb-0">City</p>
                                            <select className="form-select" value={city} onChange={(e) => setCity(e.target.value)}>
                                                <option value="">Select City</option>
                                                {(country.length !== 0 && state.length !== 0) && City.getCitiesOfState(country, state).map((item) => (<option key={item.latitude} value={item.isoCode}>{item.name}</option>))}
                                            </select>
                                        </div>

                                       

                                        <div className="col-sm-4 col-6 mb-3">
                                            <p className="mb-0">Postal code</p>
                                            <div className="form-outline">
                                                <input
                                                    type="text"
                                                    id="postalCode"
                                                    name="postalCode"
                                                    value={postalCode}
                                                    onChange={handleInputChange}
                                                    maxLength={6}
                                                    placeholder="Enter 6-digit postal code"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                       
                                    </div>

                                    {/* <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault1">Save this address</label>
                                    </div> */}

                                    <div className="mb-3">
                                        <p className="mb-0">{'Message to seller (Optional).'}</p>
                                        <div className="form-outline">
                                            <textarea className="form-control" value={message} onChange={(e) => setMessage(e.target.value)} id="textAreaExample1" rows="2"></textarea>
                                        </div>
                                    </div>

                                    <div className="float-end">
                                        <button className="btn btn-light border me-2">Cancel</button>
                                        <button
                                            className="btn btn-success shadow-0 border"
                                            onClick={handleContinueClick}
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 d-flex justify-content-center justify-content-lg-end">
                            <div key={6} className="ms-lg-4 mt-4 mt-lg-0" style={{ maxWidth: '320px' }}>
                                <h6 className="mb-3">Summary</h6>
                                <div key={1} className="d-flex justify-content-between">
                                    <p className="mb-2">Total price:</p>
                                    <p className="mb-2">${productPrice}</p>
                                </div>
                                <div key={2} className="d-flex justify-content-between">
                                    <p className="mb-2">Discount:</p>
                                    <p className="mb-2 text-danger">- $60.00</p>
                                </div>
                                <div key={3} className="d-flex justify-content-between">
                                    <p className="mb-2">Shipping cost:</p>
                                    <p className="mb-2">+ ${shippingCost}</p>
                                </div>
                                <hr />
                                <div key={4} className="d-flex justify-content-between">
                                    <p className="mb-2">Total price:</p>
                                    <p className="mb-2 fw-bold">${totalPrice}</p>
                                </div>

                                <div className="input-group mt-3 mb-4">
                                    <input type="text" className="form-control border" name="" placeholder="Promo code" />
                                    <button className="btn btn-light text-primary border">Apply</button>
                                </div>

                                <hr />
                                <h6 className="text-dark my-4">Items in cart</h6>

                                {cart.length !== 0 && cart.map((item, idx) => {
                                    // productsPrice += item.product.price * item.quantity;
                                    // changeProductPrice(item.product.price, item.quantity)
                                    return (
                                        <div key={idx} className="d-flex align-items-center mb-4">
                                            <div className="me-3 position-relative">
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-secondary">
                                                    3
                                                </span>
                                                <img src={item.product.images[0].url} style={{ height: '96px', width: '96px' }} className="img-sm rounded border" />
                                            </div>
                                            <div className="">
                                                <a href="#" className="nav-link">{item.product.name}</a>
                                                <div>Quantity: {item.quantity}</div>
                                                <div className="price text-muted">Total: ${item.product.price}</div>
                                            </div>
                                        </div>)
                                }
                                )}


                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}

export default Checkout