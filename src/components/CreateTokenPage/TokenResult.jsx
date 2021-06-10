import React, { Component } from 'react';
import './wizard.css';

export default class TokenResult extends Component {
    state = {
        isActiveClass: '',
        timeout: null,
    }
    componentDidUpdate() {
        const { timeout } = this.state;
        if (this.props.isActive && !timeout) {
            this.setState({
                isActiveClass: "loaded",
                timeout: setTimeout(() => {
                    this.props.nextStep();
                }, 3000),
            });
        } else if (!this.props.isActive && timeout) {
            clearTimeout(timeout);
            this.setState({
                isActiveClass: '',
                timeout: null,
            });
        }
    }
    render() {
        return (
            <div className='progress-wrapper'>
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted text-center">Your Token</span>
                </h4>
                <ul className="list-group mb-3">
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 className="my-0">Avatar</h6>
                            <small className="text-muted">Brief description</small>
                        </div>
                    </li>
                    
                    <li className="list-group-item d-flex justify-content-between">
                        <span>Recommend price</span>
                        <strong>ETH 20</strong>
                    </li>
                </ul>

                {/* <form className="card p-2">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Promo code" />
                        <div className="input-group-append">
                            <button type="submit" className="btn btn-secondary">Redeem</button>
                        </div>
                    </div>
                </form> */}
            </div>
        );
    }
}