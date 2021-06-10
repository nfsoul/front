import React, { Component } from 'react';
import './wizard.css';

export default class Progress extends Component {
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
                <p className='text-center'>Automated Progress...</p>
                {/* <div className={`${styles.progress} ${this.state.isActiveClass}`}> */}
                <div className={this.state.isActiveClass !== '' ? "progress loaded " : "progress"}>

                    <div className="progress-bar progress-bar-striped" />
                </div>
            </div>
        );
    }
}