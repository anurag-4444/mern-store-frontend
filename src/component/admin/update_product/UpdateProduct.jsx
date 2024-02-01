import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './updateProduct.css'
import { adminUpdateProduct, setProductLoading } from '../../../store/slices/adminStore'
import { useParams } from 'react-router-dom'
import { fetchProductDetail } from '../../../store/slices/productDetail'
import { toast, ToastContainer } from 'react-toastify'
import { Toast } from 'react-bootstrap';
import MetaData from '../../MetaData'

const UpdateProduct = () => {
    const { id } = useParams()
    const { product, status, error } = useSelector((state) => (state.Product))
    const { loading, error: errorAfterUpdation } = useSelector((state) => (state.AdminStore))
    // console.log(product);
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("Laptop")
    const [stock, setStock] = useState("")
    const [oldImages, setOldImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [removeImages, setRemoveImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])
    const [showToast, setShowToast] = useState({ status: false, error: false, msg: '' });
    const categories = ["Laptop", "Footwear", "Bottom", "Tops", "Attire", "Camera", "Smartphones"]
    const dispatch = useDispatch()
    // console.log(oldImages);
    useEffect(() => {
        if (product && product._id !== id) {
            dispatch(fetchProductDetail(id))
        } else {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.Stock);
            setOldImages(product.images);
        }
    }, [status]);

    const handleFileChange = (e) => {
        const files = e.target.files;
        const imagesArray = Array.from(files);

        const imageUrls = [];
        for (const file of imagesArray) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imageUrls.push(e.target.result);
                setImagesPreview((prevUrls) => [...prevUrls, ...imageUrls]); // Update state with URLs
            };
            reader.readAsDataURL(file);
        }

        setNewImages((prevImages) => [...prevImages, ...imagesArray]);
        // console.log(images);
    };

    // console.log(oldImages);
    const handleRemoveImage = (index) => {
        const newImage = newImages.filter((image, i) => i !== index);
        const newImageUrls = imagesPreview.filter((url, i) => i !== index);
        setNewImages(newImage);
        setImagesPreview(newImageUrls);
    };

    const handleRemoveOldImage = (index) => {
        setRemoveImages([...removeImages, index])
        const newImage = oldImages.filter((image, i) => image !== index);
        setOldImages(newImage);
    };

    const createProductSubmit = async () => {
        const formData = new FormData();

        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('stock', stock);

        // Append new base64 image strings to the FormData
        imagesPreview.forEach((base64String, index) => {
            const blob = dataURItoBlob(base64String);
            formData.append(`newImages[${index}]`, blob);
        });

        // Append removed image URLs to the FormData
        removeImages.forEach((removedImage, index) => {
            formData.append(`removeImages[${index}]`, removedImage.url);
        });

        // Dispatch the action with FormData
        if (!name || !price || !description || !stock) {
            setShowToast({ status: true, msg: 'Please Fill in Required Fields', error: true });
        } else {
            dispatch(setProductLoading(true));
            dispatch(adminUpdateProduct({ formData, id })).finally(() => {
                if (errorAfterUpdation) {
                    setShowToast({ status: true, msg: errorAfterUpdation, error: true });
                } else {
                    setShowToast({ status: true, msg: 'Successfully Updated Product', error: false });
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

    if (error) {
        toast.error(`${error} !`, {
            position: toast.POSITION.BOTTOM_CENTER
        });
        return <ToastContainer />
    }

    return (
        <>
        <MetaData title={`Update Product`} />
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

            <div className="col-md-9 col-sm-12 px-lg-5 pt-sm-3 pt-md-0 pt-3">
                <div className="mb-3">
                    <input type="text" className="form-control" id="exampleFormControlInput1" value={name} onChange={(e) => setName(e.target.value)} style={{ borderRadius: '20px' }} placeholder="Product Name" />
                </div>
                <div className="mb-3">
                    <input className="form-control" id="exampleFormControlTextarea1" value={price} onChange={(e) => setPrice(e.target.value)} style={{ borderRadius: '20px' }} placeholder='$ Price' rows="3" />
                </div>
                <div className="mb-3">
                    <textarea className="form-control" id="exampleFormControlTextarea1" value={description} onChange={(e) => setDescription(e.target.value)} style={{ borderRadius: '23px' }} placeholder='$ Product Description' rows="3"></textarea>
                </div>
                <div className="input-group mb-3">
                    <select className="form-select" style={{ borderRadius: '20px' }} value={category} onChange={(e) => setCategory(e.target.value)} id="inputGroupSelect01">
                        {/* <option>Choose...</option> */}
                        {categories.map((value, index) => (<option key={index} value={value}>{value}</option>))}

                    </select>
                </div>
                <div className="mb-3">
                    <input className="form-control" id="exampleFormControlTextarea1" value={stock} onChange={(e) => setStock(e.target.value)} style={{ borderRadius: '20px' }} placeholder='$ Stock' rows="3" />
                </div>
                <div className="input-group mb-3">
                    <input
                        type="file"
                        className="form-control"
                        style={{ borderRadius: '20px' }}
                        id="inputGroupFile01"
                        multiple
                        accept='image/*'
                        onChange={handleFileChange}
                    />
                </div>
                {oldImages.length > 0 && (
                    <div className="mb-3 w-100 overflow-auto">
                        <div className="row flex-nowrap">
                            {oldImages.map((file, index) => (
                                <div className="col-3 col-md-3 col-lg-3 col-sm-3 position-relative" key={index}>
                                    <img className='w-100 object-fit-contain border rounded' style={{ height: '100px' }} src={file.url} alt="image file" />
                                    <div className='close position-absolute' style={{ top: '3px', right: '15px', cursor: 'pointer' }} onClick={() => handleRemoveOldImage(file)}>
                                        <i className="fa-solid fa-circle-xmark"></i>
                                    </div>
                                </div>
                            ))}
                            {imagesPreview.map((file, index) => (
                                <div className="col-3 col-md-3 col-lg-3 col-sm-3 position-relative" key={index}>
                                    <img className='w-100 object-fit-contain border rounded' style={{ height: '100px' }} src={file} alt="image file" />
                                    <div className='close position-absolute' style={{ top: '3px', right: '15px', cursor: 'pointer' }} onClick={() => handleRemoveImage(index)}>
                                        <i className="fa-solid fa-circle-xmark"></i>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <button type="button" className="btn btn-success" onClick={createProductSubmit} style={{ borderRadius: '20px' }} disabled={loading}>Create</button>
            </div>
        </>
    )
}

export default UpdateProduct