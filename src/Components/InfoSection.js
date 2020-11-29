import React from 'react';

function InfoSection(props) {
    const images = require.context('../Images', true);

    function clickFunction() {
        if(props.functionType !== '' && props.functionType !== 'download') {
        window.open(props.functionType + ':' + props.functionParams);
        } 
        else if (props.functionType === ''){
            window.open(props.functionParams);
        }
        else if (props.functionType === 'download') {
            const url = 'https://api.golam.dev/' + props.functionType;
            window.open(url)
        }
        else {
            console.log('Invalid functionType')
        }
    }

    return (
        <div className="contactDetails" onClick={clickFunction}>
				<div className="contactIconContainer">
					<img src={images(`./${props.img}.png`)} alt="" className="contactIcon" />
				</div>
				<div className="contactText" id="cellLink">
                    <h4 className="topText">{props.info}</h4> 
                    <h4 className="bottomText">{props.desc}</h4>
				</div>
			</div>
    )
}

export default InfoSection;