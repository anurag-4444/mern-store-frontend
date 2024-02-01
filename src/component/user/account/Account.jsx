import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './account.css'
import { fetchProfileDetails } from '../../../store/slices/user'
import { changeIsUpdated, updateUserAvatar, updateUserName } from '../../../store/slices/userAccount'
import { toast, ToastContainer } from 'react-toastify'
import { Toast } from 'react-bootstrap';
import MetaData from '../../MetaData'

const Account = () => {
    const { user, status, error } = useSelector((state) => state.User)
    const { isUpdated, error: errorAfterUpdation } = useSelector((state) => state.UserAccount)
    const dispatch = useDispatch()

    const [userName, setUserName] = useState('')
    const [selectedFile, setSelectedFile] = useState(null);
    const [showToast, setShowToast] = useState({ status: false, error: false, msg: '' });

    useEffect(() => {
        // console.log('fetch profile details');
        dispatch(fetchProfileDetails()).finally(() => {
            dispatch(changeIsUpdated())
        })
    }, [isUpdated])

    // const handleFileChange = (event) => {
    //     setSelectedFile(event.target.files[0]);
    // };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                setSelectedFile(imageUrl); // Update state with URL
            };
            reader.readAsDataURL(file);
        }
    };


    const handleUpload = () => {
        if (selectedFile) {


            const formData = new FormData();

            const blob = dataURItoBlob(selectedFile);
            formData.append(`image`, blob);

            dispatch(updateUserAvatar({ avatar: formData })).finally(() => {
                if (errorAfterUpdation) {
                    setShowToast({ status: true, msg: errorAfterUpdation, error: true });
                } else {
                    setShowToast({ status: true, msg: 'Successfully Updated Avatar', error: false });
                }
            })
        }
    };

    // Function to convert base64 to Blob
    function dataURItoBlob(dataURI) {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ab], { type: mimeString });
    }

    const updateName = () => {
        if (userName.length > 4) {
            dispatch(updateUserName({ userName })).finally(() => {
                if (errorAfterUpdation) {
                    setShowToast({ status: true, msg: errorAfterUpdation, error: true });
                } else {
                    setShowToast({ status: true, msg: 'Successfully Updated Name', error: false });
                }
            })
        } else {
            setShowToast({ status: true, msg: 'Name should have more than 4 characters', error: true });
        }
    }

    if (error) {
        toast.error(`${error} !`, {
            position: toast.POSITION.BOTTOM_CENTER
        });
        return <ToastContainer />
    }

    return (
        <>

            <MetaData title={`Your Account`} />
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

            {status === 'loading' ? (<div className="d-flex justify-content-center">
                <div className="spinner-grow text-primary" role="status">
                    <span className="visually-hidden"></span>
                </div></div>) : <section id='account-page' className='d-flex justify-content-center flex-column align-items-center gap-2'>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header" style={{ background: '#3982DC' }}>
                                <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ color: ' rgba(0, 0, 0, 0.67)' }}>Edit Avatar</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body" style={{ background: '#75AAE7' }}>
                                <div className="input-group mb-3">
                                    <input type="file" className="form-control profile-img-upload" id="inputGroupFile02" onChange={handleFileChange} name='avatar' style={{ background: '#B9D4F3' }} />
                                    <label className="input-group-text" htmlFor="inputGroupFile02" style={{ background: '#DBE9F9' }}>Upload</label>
                                </div>
                            </div>
                            <div className="modal-footer" style={{ background: '#3982DC' }}>
                                <button type="button" className="btn" style={{ background: '#1F5CAB' }} onClick={handleUpload} data-bs-dismiss="modal">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="exampleModalName" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header" style={{ background: '#3982DC' }}>
                                <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ color: ' rgba(0, 0, 0, 0.67)' }}>Edit Name</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body" style={{ background: '#75AAE7' }}>
                                <div className="input-group flex-nowrap">
                                    <span className="input-group-text" style={{ background: '#B9D4F3' }} id="addon-wrapping">@</span>
                                    <input type="text" className="form-control" value={userName} onChange={(e) => (setUserName(e.target.value))} style={{ background: '#DBE9F9' }} placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" autoFocus />
                                </div>
                            </div>
                            <div className="modal-footer" style={{ background: '#3982DC' }}>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" style={{ background: '#1F5CAB' }} onClick={() => (updateName())} >Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card" style={{ width: '18rem' }}>
                    <div className='border-bottom position-relative'>
                        <img src={user.avatar} className="card-img-top" alt="..." />
                        <span className='position-absolute bottom-0 end-0 me-2 mb-2'>
                            <button type="button" className="btn profile-img-update p-0" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <i className="fa-solid fa-pen" style={{ fontSize: '15px', color: '#0000ffab', cursor: 'pointer' }}></i>
                            </button>
                        </span>
                    </div>

                    <div className="card-body p-0">
                        <h5 className="card-title border-bottom p-3 m-0" style={{ color: ' rgba(0, 0, 0, 0.67)' }}>Mr. {user.name}<span className='ms-2'>
                            <button type="button" className="btn profile-img-update p-0" data-bs-toggle="modal" data-bs-target="#exampleModalName">
                                <i className="fa-solid fa-pen" style={{ fontSize: '14px', color: '#0000ffab', cursor: 'pointer' }}></i>
                            </button>
                        </span></h5>
                        <p className="card-text p-3" style={{ color: '#00000075' }}>Email: {user.email}</p>
                    </div>
                </div>

                <div className="card" style={{ width: '18rem' }}>
                    <div className="card-body p-0">
                        <a href="#" className="btn w-100 border-bottom p-3 d-flex justify-content-between">My Orders <i className="fa-solid fa-angle-right"></i></a>
                        <a href="#" className="btn w-100 border-bottom p-3 d-flex justify-content-between">My Wishlist <i className="fa-solid fa-angle-right"></i></a>
                        <a href="#" className="btn w-100 p-3 d-flex justify-content-between">My Cart <i className="fa-solid fa-angle-right"></i></a>
                    </div>
                </div>
            </section>}

        </>

    )
}

export default Account