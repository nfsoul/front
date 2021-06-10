import React from 'react';

export const Avatar = ({ soul, emited }) => {
    let svgUrl = "https://avatars.dicebear.com/v2/human/" + soul + ".svg";
    return (
        <div>
            <img src={svgUrl} alt="" />
        </div>
    )
};

export const AvatarScr = ({ soul }) => {
    return "https://avatars.dicebear.com/v2/human/" + soul + ".svg";
};