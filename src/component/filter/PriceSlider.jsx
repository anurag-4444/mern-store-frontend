import React from 'react';
import { Range } from 'react-range';

const PriceSlider = ({ minPrice = 0, maxPrice = 10000, currentValues, onPriceChange }) => {
   
    return (
        <div style={{ width: '80%', margin: 'auto', color: 'black' }}>
            <Range
                step={1}
                min={minPrice}
                max={maxPrice}
                values={[currentValues.min, currentValues.max]}
                onChange={(values) => {
                    onPriceChange(values[0], values[1]);
                }}
                renderTrack={({ props, children }) => (
                    <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                            ...props.style,
                            height: '36px',
                            display: 'flex',
                            width: '100%',
                        }}
                    >
                        <div
                            ref={props.ref}
                            style={{
                                height: '5px',
                                width: '100%',
                                borderRadius: '4px',
                                background: 'linear-gradient(to right, #546C91 , #DAC3A7)',
                                alignSelf: 'center',
                            }}
                        >
                            {children}
                        </div>
                    </div>
                )}
                renderThumb={({ props }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: '20px',
                            width: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#FFF',
                            border: '1px solid #546C91',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    ></div>
                )}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>₹{currentValues.min}</span>
                <span>₹{currentValues.max}</span>
            </div>
        </div>
    );
};

export default PriceSlider;
