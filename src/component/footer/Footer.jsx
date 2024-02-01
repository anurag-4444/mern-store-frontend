import React from 'react'

const Footer = () => {
    return (<>
        {/* <footer id='footer'>
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <img src={playstore} alt="" />
                <img src={appstore} alt="" />
            </div>

            <div className="midFooter">
                <h1>Elite Hub.</h1>
                <p>Customer Satisfaction is our first priority</p>
                <p>Copyrights 2023 &copy; EliteHub.com</p>
            </div>

            <div className="rightFooter">
                <h4>Connect with Us</h4>
                <a href="/">Instagram</a>
                <a href="/">Twitter</a>
                <a href="/">Facebook</a>
            </div>
        </footer> */}
        <div className="footer-area">
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <h4 className="footer-heading">ECommerce</h4>
                    <div className="footer-underline"></div>
                    <p>
                    Shop Smart, Shop Online.
                    </p>
                </div>
                {/* <div className="col-md-3">
                    <h4 className="footer-heading">Quick Links</h4>
                    <div className="footer-underline"></div>
                    <div className="mb-2"><a href="" className="text-white">Home</a></div>
                    <div className="mb-2"><a href="" className="text-white">About Us</a></div>
                    <div className="mb-2"><a href="" className="text-white">Contact Us</a></div>
                    <div className="mb-2"><a href="" className="text-white">Blogs</a></div>
                    <div className="mb-2"><a href="" className="text-white">Sitemaps</a></div>
                </div> */}
                <div className="col-md-3">
                    <h4 className="footer-heading">Shop Now</h4>
                    <div className="footer-underline"></div>
                    <div className="mb-2"><a href="" className="text-white">Collections</a></div>
                    <div className="mb-2"><a href="" className="text-white">Trending Products</a></div>
                    <div className="mb-2"><a href="" className="text-white">New Arrivals Products</a></div>
                    <div className="mb-2"><a href="" className="text-white">Featured Products</a></div>
                    <div className="mb-2"><a href="" className="text-white">Cart</a></div>
                </div>
                <div className="col-md-3">
                    <h4 className="footer-heading">Reach Us</h4>
                    <div className="footer-underline"></div>
                    <div className="mb-2">
                        <p>
                            <i className="fa fa-map-marker"></i> #444, some main road, some area, some street, bangalore, india - 560077
                        </p>
                    </div>
                    <div className="mb-2">
                        <a href="" className="text-white">
                            <i className="fa fa-phone"></i> +91 888-XXX-XXXX
                        </a>
                    </div>
                    <div className="mb-2">
                        <a href="mailto:anuragchauhan7042666582@gmail.com" className="text-white">
                            <i className="fa fa-envelope"></i> anuragchauhan7042666582@gmail.com
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="copyright-area">
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <p className=""> &copy; 2022 - Funda of Web IT - Ecommerce. All rights reserved.</p>
                </div>
                <div className="col-md-4">
                    <div className="social-media">
                        Get Connected:
                        <a href=""><i className="fa fa-facebook"></i></a>
                        <a href=""><i className="fa fa-twitter"></i></a>
                        <a href=""><i className="fa fa-instagram"></i></a>
                        <a href=""><i className="fa fa-youtube"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}

export default Footer