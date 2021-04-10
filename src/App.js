import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLingForm/imagelinkform';
import Rank from './components/Rank/rank';
import Particles from 'react-particles-js';

const particle_options = {
  "particles": {
    "links": {
      "color": {
        "value": "#ffffff"
      },
      "distance": 100,
      "opacity": 0.4,
      "width": 1
    },
    "fullScreen": {
      zIndex:2
    },
    "move": {
      "attract": {
        "rotate": {
          "x": 600,
          "y": 100
        }
      },
      "direction": "bottom",
      "enable": true,
      "outModes": {
        "bottom": "out",
        "left": "out",
        "right": "out",
        "top": "out"
      }
    },
    "opacity": {
      "random": {
        "enable": true
      },
      "value": {
        "min": 0.1,
        "max": 0.2
      },
      "animation": {
        "speed": 0.5,
        "minimumValue": 0.1
      }
    },
    "size": {
      "random": {
        "enable": true
      },
      "value": {
        "min": 1,
        "max": 10
      },
      "animation": {
        "speed": 20,
        "minimumValue": 0.1
      }
    }
  }
}

function App() {
  return (
    <div className="App">
      <Particles className='particles' params={particle_options} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/* <FaceRecognition/> */}
    </div>
  );
}

export default App;
