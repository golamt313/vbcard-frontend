import React, {useState, useEffect} from 'react';
import './App.css';
import InfoSection from './Components/InfoSection'
import Header from './Components/Header'
import axios from 'axios'
import ContactForm from './Components/ContactForm';

function App() {	

	const url = 'https://api.golam.dev/testAPI';
	const [state, setState] = useState(null)
	
    useEffect(() => {
		axios.get(url)
		.then(res => {setState(res.data)})
	}, [url])
	
	if(state) {
		return (
			<div id="infoWrapper">
				<div>
					<Header img={state.header[0].img} name={state.header[0].name} title={state.header[0].title} />
					{state.sections.map((section, index) => (
					<InfoSection key={index} img={section.img} info={section.info} desc={section.desc} functionType={section.functionType} functionParams={section.functionParams} />
					))}
					<ContactForm />
				</div>
			</div>
		)
	}
		return (
			<div>
				<div className="loader"></div>
			</div>
		)
}

export default App;