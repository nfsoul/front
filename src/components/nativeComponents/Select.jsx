import {FormFeedback, FormGroup, Input, Label,} from 'reactstrap';
import PropTypes from "prop-types";
import React, {Component} from 'react';

class Select extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {

    }


    render() {
        return (
            <FormGroup className={this.props.className} autoComplete={"off"}>
                <Label for={this.props.id}>{this.props.label}</Label>
                <Input type="select" name={this.props.id} id={this.props.id} onChange={this.props.onChange} invalid={!this.props.options || this.props.options.length ===0}>
                    <option></option>
                    {this.props.options.map(option => {
                        return (<option key={option.key} value={option.value}>{option.value}</option>)
                    })}
                </Input>
                {this.props.noOptionsLabel ?
                    <FormFeedback invalid>
                        {this.props.noOptionsLabel}
                    </FormFeedback> : null
                }
            </FormGroup>
        );
    }

}

export default Select;

Select.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    noOptionsLabel: PropTypes.string,
}