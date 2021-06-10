import React from 'react';
/* eslint react/prop-types: 0 */
import './StepperNav.css';

const Nav = (props) => {

    const dots = [];
    for (let i = 1; i <= props.totalSteps; i += 1) {
        const isActive = props.currentStep === i;

        dots.push((
            <span
                key={`step-${i}`}
                className={isActive ? "dot active" : "dot"}
                onClick={() => props.goToStep(i)}
            >&bull;</span>
        ));
    }

    return (
            <div className='row d-flex justify-content-center'>
                <div className="nav">{dots}</div>
            </div>
    );
};

export default Nav;