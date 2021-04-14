import React from 'react';
import "./facerecognition.css"

const FaceRecognition = ({imageUrl, box}) =>{
  return(
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' alt='' src={imageUrl} width={'300px'} height={'auto'} />
        <div className='bounding-box' style={{left: box.leftCol, top: box.topRow, right: box.rightCol, bottom: box.bottomRow }}></div>
      </div>
    </div>
  );
}

export default FaceRecognition;
