import React, { useState } from 'react'
import './payment.css'
import { Toast } from 'react-bootstrap';
import MetaData from '../../MetaData';

const Payment = () => {
    const [accountNumber, setAccountNumber] = useState('');
    const [cvv, setCVV] = useState('');
    const [date, setDate] = useState('')
    const [showToast, setShowToast] = useState({ status: false, msg: '' });
    const [paymentToast, setPaymentToast] = useState({ status: false, msg: '' })

    const handleInputChange = (e) => {
        // Remove non-numeric characters
        const numericValue = e.target.value.replace(/\D/g, '');

        // Restrict the input to exactly three digits
        const formattedValue = numericValue.slice(0, 3);

        // Update the state with the formatted value
        setCVV(formattedValue);
    };

    const formatAccountNumber = (input) => {
        // Remove non-numeric characters
        const numericValue = input.replace(/\D/g, '');

        // Format the input with spaces after every 4 digits
        const formattedValue = numericValue.replace(/(\d{4})(?=\d)/g, '$1 ');

        // Update the state with the formatted value
        setAccountNumber(formattedValue);
    };

    const paymentSubmit = () => {
        if (accountNumber.length !== 14) {
            setShowToast({ status: true, msg: 'Please Enter acount number' })
            return
        }
        if (date.length !== 5) {
            setShowToast({ status: true, msg: 'Please Enter Expire Date' })
            return
        }
        if (cvv.length !== 3) {
            setShowToast({ status: true, msg: 'Please Enter cvv number' })
            return
        }
        setPaymentToast({ status: true, msg: 'Payment Successfully' })
    }


    return (
        <>
        <MetaData title={`Your Payment`} />
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

            {/* <Toast
                show={paymentToast.status}
                onClose={() => setPaymentToast({ status: false, msg: '' })}
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
                <Toast.Header style={{ background: '#28a745', color: '#fff' }}>
                    <strong className="me-auto">Success</strong>
                </Toast.Header>
                <Toast.Body style={{ background: '#d4edda', color: '#155724' }}>
                    {paymentToast.msg}
                </Toast.Body>
            </Toast> */}


            <div className='container' style={{
                height: '90vh',
                width: '74%'
            }}>
                <h1 className='my-3'>Card Info.</h1>
                <div class="mb-3 d-flex gap-2">
                    <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-credit-card"></i></span>
                    <input
                        type="text"
                        className="form-control account-input"
                        placeholder="Account number"
                        pattern="\d{4}\s?\d{4}\s?\d{4}"
                        title="Enter a 12-digit account number with spaces after every 4 digits"
                        maxLength="14"
                        value={accountNumber}
                        onChange={(e) => formatAccountNumber(e.target.value)}
                    />
                </div>
                <div class="mb-3 d-flex gap-2">
                    <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-calendar"></i></span>
                    <input type="text" class="form-control" value={date} onChange={(e) => setDate(e.target.value)} placeholder="expire date" aria-label="Username" aria-describedby="basic-addon1" />
                </div>
                <div class="mb-3 d-flex gap-2">
                    <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-key"></i></span>
                    <input
                        type="text"
                        className="form-control cvv-input"
                        placeholder="cvv"
                        pattern="\d{3}"
                        title="Enter a 3-digit CVV"
                        maxLength="3"
                        value={cvv}
                        onChange={handleInputChange}
                    />
                </div>

                <div class="mb-3">
                    <button type="button" id='payment-btn' onClick={paymentSubmit} class="btn btn-primary" style={{ backgroundColor: '#f4a617fa' }}>Proceed Payment</button>
                </div>
            </div>
        </>
    )
}

export default Payment