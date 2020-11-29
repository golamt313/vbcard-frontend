import React from 'react';

function Header(props) {
    const images = require.context('../Images', true,);

    return (
        <header>
            <div id="bg1"></div>
            <div id="bg2"></div>
            <img src={images(`./${props.img}.jpg`)} alt="" id="headerImage" />
            <div id="nameTitle">
                <h1 id="name">{props.name}</h1>
                <h2 id="title">{props.title}</h2>
            </div>
	    </header>
    )
}

export default Header;