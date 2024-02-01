import React, { useEffect } from 'react'
import './loginSignup.css'
import { fetchUserProfile } from '../../../store/slices/user';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MetaData from '../../MetaData';

const LoginSignup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleCallBackResponse(response) {
        const googleResponse = response;
        dispatch(fetchUserProfile({ googleResponse })).finally(() => navigate('/'))
    }

    useEffect(() => {
        const handleGoogleScriptLoad = () => {
            if (window.google && window.google.accounts) {
                window.google.accounts.id.initialize({
                    client_id: "925614397797-26b4kar6gtbjt8lcoi0oj6bjqfo7jmej.apps.googleusercontent.com",
                    callback: handleCallBackResponse
                });

                window.google.accounts.id.renderButton(
                    document.getElementById('loginDiv'),
                    { theme: "outline", size: "large" }
                );

                window.google.accounts.id.prompt()
            }
        };

        // If Google's library is already loaded, initialize immediately
        if (window.google && window.google.accounts) {
            handleGoogleScriptLoad();
        } else {
            window.addEventListener('load', handleGoogleScriptLoad);
        }

        return () => {
            window.removeEventListener('load', handleGoogleScriptLoad);
        };
    }, []);


    return (<>
    <MetaData title={`Ecommerce SignIn`} />
        <section className="" style={{ backgroundColor: '#9A616D', height: 'fit-content' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: '1rem' }}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src={"https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"}
                                        alt="login form" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem' }} />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">

                                        <form>

                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                                                <span className="h1 fw-bold mb-0">Logo</span>
                                            </div>

                                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Log into your account</h5>



                                            <div className="pt-1 mb-4" id='loginDiv'>
                                            </div>

                                            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <a href="#!"
                                                style={{ color: '#393f81' }}>Register here</a></p>
                                            <a href="#!" className="small text-muted">Terms of use.</a>
                                            <a href="#!" className="small text-muted">Privacy policy</a>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
    )
}

export default LoginSignup