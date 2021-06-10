import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Avatar as Avataar} from "avataaars";

import {
    accessoriesStyles,
    avatarStyles,
    clothesColorStyles,
    clothesStyles,
    eyebrowStyles,
    eyesStyles,
    facialHairColorStyles,
    facialHairStyles,
    mouthStyles,
    skinStyles,
    topStyles,
    hairColorStyles
} from './AvatarConst'

class Avatar extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    getStyle = (stylesArr) => {
        const hexHashNum = parseInt(('0x' + this.props.hexHash).substring(0, 7))
        return stylesArr[hexHashNum % stylesArr.length]
    }

    //todo play with cirlce colors??
    render() {
        return (
            <div className={this.props.className}>
                <Avatar
                    avatarStyle={this.getStyle(avatarStyles)}
                    topType={this.props.top ? this.props.top : topStyles[0]}
                    accessoriesType={this.getStyle(accessoriesStyles)}
                    hairColor={this.props.hairColor ? this.props.hairColor : hairColorStyles[0]}
                    facialHairType={this.props.facialHair ? this.props.facialHair : facialHairStyles[0]}
                    facialHairColor={this.getStyle(facialHairColorStyles)}
                    clotheType={this.getStyle(clothesStyles)}
                    clotheColor={this.getStyle(clothesColorStyles)}
                    eyeType={this.props.eyeType ? this.props.eyeType : eyesStyles[0]}
                    eyebrowType={this.getStyle(eyebrowStyles)}
                    mouthType={this.getStyle(mouthStyles)}
                    skinColor={this.props.skinColor ? this.props.skinColor : skinStyles[0]}
                />
            </div>
        );
    }
}

export default Avatar;


Avatar.propTypes = {
    hexHash: PropTypes.string.isRequired,
    className: PropTypes.string,
    top: PropTypes.string,
    facialHair: PropTypes.string,
    skinColor: PropTypes.string,
    hairColor: PropTypes.string,
    eyeType: PropTypes.string,
};
