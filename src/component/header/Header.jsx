import React, { useEffect, useState } from 'react'
import ApplyFilters from '../filter/ApplyFilters'
import { FaFilter } from "react-icons/fa"
import { categoryChangeState, searchChangeState } from '../../store/slices/products'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai'
import { fetchProfileDetails, logoutUser } from '../../store/slices/user'
import { changeIsUpdateState, getProductToCart } from '../../store/slices/userCart'
import { changeIsUpdatedState, getProductFromWishlist } from '../../store/slices/wishlistCart'
// import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

const Header = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true);
    const [cookies, setCookie] = useCookies(['token']);

    const { wishlist, error: wishlistError } = useSelector(state => state.Wishlist)
    const { cart, error: cartError } = useSelector(state => state.UserCart)
    const { isAuthenticated, user, error } = useSelector((state) => state.User)
    // console.log(user);
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchProfileDetails()).finally(() => {
            setIsLoading(false)
        });
        dispatch(getProductToCart()).finally(() => dispatch(changeIsUpdateState()))
        dispatch(getProductFromWishlist()).finally(() => dispatch(changeIsUpdatedState()))
    }, [])

    // useEffect(() => {
    //     const checkAuthentication = async () => {
    //         // Check if the user has a token in cookies
    //         // console.log(document.cookie);
    //         const tokenFromCookies = document.cookie
    //             .split('; ')
    //             .find(row => row.startsWith('token='))
    //             ?.split('=')[1];

    //         // Check if the user has a token in local storage
    //         // const tokenFromLocalStorage = localStorage.getItem('yourTokenKey');

    //         // const [cookies] = useCookies(['token']);
    //         const token = tokenFromCookies;
    //         console.log(cookies);

    //         if (token) {
    //             // If token is present, try to fetch user details to verify authentication
    //             try {
    //                 dispatch(fetchProfileDetails()).finally(() => {
    //                     setIsLoading(false)
    //                     dispatch(getProductToCart()).finally(() => dispatch(changeIsUpdateState()));
    //                     dispatch(getProductFromWishlist()).finally(() => dispatch(changeIsUpdatedState()));
    //                 });
    //                 // setIsLoading(false);
    //             } catch (error) {
    //                 // If fetching user details fails, the token might be invalid or expired
    //                 // Handle this situation, you might want to clear the token and set isAuthenticated to false
    //                 console.error('Error fetching user details:', error);
    //                 dispatch(logoutUser()); // Clear token and set isAuthenticated to false
    //                 setIsLoading(false);
    //             }
    //         } else {
    //             // If no token is present, set isAuthenticated to false
    //             setIsLoading(false);
    //         }
    //     };

    //     checkAuthentication();
    // }, []);


    // console.log(user, user.role);

    // console.log('header');

    const [keywords, setKeywords] = useState("")
    const handleShowResult = (e) => {
        e.preventDefault()
        dispatch(searchChangeState(keywords))
    }

    const userLogout = () => {
        dispatch(logoutUser())
    }

    return (<>

        <div className="main-navbar shadow-sm sticky-top">
            <div className="top-navbar">
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-md-2 col-sm-3 col-6 d-flex align-items-center">
                            <h5 className="brand-name m-0">Ecommerce</h5>
                        </div>

                        <div className="col-md-5 col-sm-6 col-12 my-auto d-none d-sm-block">
                            <form role="search">
                                <div className="input-group">
                                    <input type="search" placeholder="Search your product" className="form-control" value={keywords} onChange={(e) => (setKeywords(e.target.value))} onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleShowResult(e);
                                        }
                                    }} />

                                    <button className="btn" type="submit" style={{ backgroundColor: 'orange' }} onClick={(e) => (handleShowResult(e))}>
                                        <i className="fa fa-search"></i>
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="col-md-5 col-sm-3 col-6 d-flex align-items-center justify-content-end">


                            {isLoading === false && <>
                                {isAuthenticated === false && <>
                                {/* <Link style={{ color: 'white' }} to="/auth/google">Login</Link> 
                                <span>/</span> */}
                                <button type="button" className="btn btn-primary me-1" style={{ backgroundColor: '#0000ff63' }} onClick={() => navigate('/auth/google')}>Login</button>
                                <button type="button" className="btn btn-primary" style={{ backgroundColor: '#0000ff63' }} onClick={() => navigate('/auth/google')}>SignUp</button>
                                {/* <Link style={{ color: 'white' }} to="/auth/google">SignUp</Link> */}
                                </>}

                                {isAuthenticated === true && user && <> <div style={{ position: 'relative' }}>

                                    <Link className="text-reset me-3" to="/mycart">
                                        <i className="fas fa-shopping-cart"></i>
                                    </Link>
                                    <span className="badge rounded-pill badge-notification bg-danger wishlist-number">{cart.length}</span>
                                </div>

                                    <div className="dropdown wishlist">
                                        <Link
                                            className="text-reset me-3  hidden-arrow"
                                            to="/wishlist"
                                            id="navbarDropdownMenuLink"
                                            role="button"
                                            data-mdb-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <AiFillStar />
                                            <span className="badge rounded-pill badge-notification bg-danger wishlist-number">{wishlist.length}</span>
                                        </Link>

                                    </div>

                                    <div className="dropdown">

                                        <a
                                            className="dropdown-toggle d-flex align-items-center hidden-arrow"
                                            href="/"
                                            id="navbarDropdownMenuAvatar"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            style={{ color: 'blue' }}
                                        >
                                            <img
                                                src={user.avatar}
                                                className="rounded-circle"
                                                height="25"
                                                alt="Black and White Portrait of a Man"
                                                style={{
                                                    width: '25px',
                                                    height: '25px',
                                                    objectFit: 'cover'
                                                }}
                                                loading="lazy"
                                            />


                                        </a>
                                        <ul
                                            className="dropdown-menu dropdown-menu-end"
                                            aria-labelledby="navbarDropdownMenuAvatar"
                                        >
                                            <li><Link className="dropdown-item" to="/account"><i className="fa fa-user"></i> Profile</Link></li>
                                            <li><Link className="dropdown-item" to="/myorders"><i className="fa fa-list"></i> My Orders</Link></li>
                                            <li><Link className="dropdown-item" to="/wishlist   "><i className="fa fa-heart"></i> My Wishlist</Link></li>
                                            <li><Link className="dropdown-item" to="/mycart"><i className="fa fa-shopping-cart"></i> My Cart</Link></li>
                                            <li><Link className="dropdown-item" to="/" onClick={() => (userLogout())}><i className="fa fa-sign-out"></i> Logout</Link></li>
                                            {isAuthenticated && user && user.role === "admin" && <li><Link className="dropdown-item" to="/admin"><i className="fa fa-sign-out"></i> Admin</Link></li>}
                                            {/* <li><Link className="dropdown-item" to="/checkout" ><i className="fa fa-sign-out"></i> Checkout</Link></li> */}
                                            {/* <li><Link className="dropdown-item" to="/payment" ><i className="fa fa-sign-out"></i> Payment</Link></li> */}
                                        </ul>

                                    </div></>}
                            </>}

                        </div>

                        <div className="col-md-5 col-sm-6 col-12 my-auto d-block d-sm-none">
                            <form role="search">
                                <div className="input-group">
                                    <input type="search" placeholder="Search your product" className="form-control" value={keywords} onChange={(e) => (setKeywords(e.target.value))} onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleShowResult(e);
                                        }
                                    }} />

                                    <button className="btn" type="submit" style={{ backgroundColor: 'orange' }} onClick={(e) => (handleShowResult(e))}>
                                        <i className="fa fa-search"></i>
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'orange' }}>
                <div className="container-fluid">
                    <a className="navbar-brand d-block d-sm-block d-md-none d-lg-none" href="/">
                        Ecommerce
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => (dispatch(categoryChangeState({ category: 'Smartphones' })))}>New SmartPhones</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => (dispatch(categoryChangeState({ category: 'Laptop' })))}>New Arrivals</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => (dispatch(categoryChangeState({ category: 'Camera' })))}>Featured Products</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => (dispatch(categoryChangeState({ category: 'Footwear' })))}>For You</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => (dispatch(categoryChangeState({ category: 'Attire' })))}>Attire</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => (dispatch(categoryChangeState({ category: 'Tops' })))}>Tops</a>
                            </li>

                        </ul>
                    </div>

                    <button className="btn btn-link" type="button" id='md-filter' data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><FaFilter /></button>

                    <div className="offcanvas offcanvas-start" data-bs-scroll="true" style={{ width: '70%' }} tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Apply Filters</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ApplyFilters />
                        </div>
                    </div>
                </div>
            </nav>
        </div >

    </>
    )
}

export default Header