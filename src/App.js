import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLingForm/imagelinkform';
import Rank from './components/Rank/rank';
import FaceRecognition from './components/FaceRecognition/facerecognition';
import Particles from 'react-particles-js';
import particle_options from "./particle_options.js";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: 'bfca0ae07cc748379cd1676d273e8800'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "http://aienjamir.com/assets/uploads/2016/03/AIFW-AW16-FACES-Photo-By-Rawky-Ksh-D.jpg",
    };
  }

  onInputChange = (event) => {
    // Is important to remember that setState is a asynchronous command. So, caution
    // Maybe other functions will run before the value is properly set.
    this.setState({input: event.target.value})
  };

  onButtonSubmit = () => {

    this.setState({imageUrl: this.state.input})

    app.models.predict(Clarifai.FACE_DETECT_MODEL , this.state.input).then( 
      response => console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
    ).catch(
      err=> console.log(err)
    );
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particle_options} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
