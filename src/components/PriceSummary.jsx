import React from 'react';
import {Button} from 'react-bootstrap';

const PriceSummary = ({summary, showButton, buttonText, onButtonClick, buttonType = "button"}) => {
    const {subtotal, savings, shippingFee, total, isFreeShipping} = summary;

    return (<div className="price-summary-container">
            <div className="d-flex justify-content-between small mb-2">
                <span>Subtotal</span><span>${subtotal}</span>
            </div>

            {parseFloat(savings) > 0 && (<div className="d-flex justify-content-between small mb-2 text-danger">
                    <span>2+1 Savings</span><span>-${savings}</span>
                </div>)}

            <div className="d-flex justify-content-between small mb-2">
                <span>Shipping</span>
                <span>{isFreeShipping || parseFloat(shippingFee) === 0 ? 'FREE' : `$${shippingFee}`}</span>
            </div>

            <hr/>

            <div className="d-flex justify-content-between fw-bold fs-4 mb-3">
                <span>Total</span><span>${total}</span>
            </div>

            {!isFreeShipping && parseFloat(total) > 0 && (<small className="text-muted text-center d-block mb-3">
                    Add ${(35 - parseFloat(total) + parseFloat(shippingFee)).toFixed(2)} more for FREE shipping!
                </small>)}

            {showButton && (<Button
                    type={buttonType}
                    variant="danger"
                    className="w-100 fw-bold py-3"
                    onClick={onButtonClick}
                >
                    {buttonText}
                </Button>)}
        </div>);
};

export default PriceSummary;