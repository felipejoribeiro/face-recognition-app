import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLingForm/imagelinkform';
import Rank from './components/Rank/rank';
import FaceRecognition from './components/FaceRecognition/facerecognition';
import Signin from './components/Signin/signin'
import Register from './components/Register/register'
import Particles from 'react-particles-js';
import particle_options from "./particle_options.js";
import keys from "./api_keys";
import Clarifai from "clarifai";

const app = new Clarifai.App({
	apiKey: keys.MY_API_KEY,
});

const initialState = {
	input: "",
	imageUrl:"", 
	box: {},
	route: 'signin',
	isSignedIn: false,
	user: {
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: ''
	}
}

class App extends Component {
	constructor() {
		super();
		this.state = initialState
	}

	loadUser = (data) => {
		this.setState({user: {
			id: data.id,
			name: data.name,
			email: data.email,
			entries: data.entries,
			joined: data.joined
		}})
	}


	CalculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputimage');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height - (clarifaiFace.bottom_row * height),
		}
	}


	displayFaceBox = (box) => {
		this.setState({box: box})
	}


	onInputChange = (event) => {
		// Is important to remember that setState is a asynchronous command. So, caution
		// Maybe other functions will run before the value is properly set.
		this.setState({input: event.target.value})
	};


	onButtonSubmit = () => {
		this.setState({imageUrl: this.state.input})
		app.models.predict(Clarifai.FACE_DETECT_MODEL , this.state.input).then( 
			response => {
				if (response) {
					fetch('http://localhost:2033/image', {
						method: 'put',
						headers: {'Content-Type':'application/json'},
						body: JSON.stringify({
							id: this.state.user.id
						})
					})
					.then(response => response.json())
					.then(entries => {
						this.setState(Object.assign(this.state.user, {entries: entries}))
					}).catch(err => console.log(err));
				}
				this.displayFaceBox(this.CalculateFaceLocation(response))
			}).catch( err=> console.log(err));
	}

	onRouteChange = (route) => {
		if (route === 'signout'){
			this.setState({isSignedIn : false})
			this.setState({route:'signin'});
			this.setState(initialState);
		} else if (route === 'home') {
			this.setState({isSignedIn : true})
			this.setState({route:route});
		} else if (route === 'register'){
			this.setState({isSignedIn : false})
			this.setState({route:route});
		}
	}

	render() {
		const {isSignedIn, imageUrl, route, box} = this.state;
		return (
			<div className="App">
				<Particles className="particles" params={particle_options} />
				<Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
				{ route === 'home'
					? <div> 
							<Logo />
							<Rank name ={this.state.user.name} entries = {this.state.user.entries} />
							<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
							<FaceRecognition box={box} imageUrl={imageUrl}/>
						</div>
					: ( route ==='signin'
						? <Signin loadUser = {this.loadUser} onRouteChange={this.onRouteChange}/>
						: <Register loadUser = {this.loadUser} onRouteChange={this.onRouteChange}/>
						)
				}
			</div>
		);
	}
}

export default App;
