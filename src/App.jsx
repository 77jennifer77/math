import "./index.css";
import React, { Component } from 'react';
import * as tf from '@tensorflow/tfjs';


class App extends Component {

  constructor(props){
    super(props);
    this.state= {
      lastPosition:null,
      drawing:false,
      prediction:null,
    };
    this.canvasRef = React.createRef();
    this.clear = this.clear.bind(this);
    this.predict = this.predict.bind(this);
    this.moving = this.moving.bind(this);
    this.split = this.split.bind(this);
    this.rescaled = this.rescaled.bind(this);
  }

  handleEvent = (event) => {
    if (event.type === "mousedown")
      this.setState({ drawing: true});
    else
      this.setState({ drawing: false});
   }

  clear() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  async split(n){
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizedCanvas = document.createElement("canvas");
    const resizedContext = resizedCanvas.getContext("2d");
    resizedCanvas.width = await canvas.width/n;
    resizedCanvas.height = 400;

    const splits = [];
    const img = new Image(600/n,400);
    for(var i = 0; i < n; i++){
      const Image_data = await ctx.getImageData(i*canvas.width/n, 0, 600/n, 400);
      resizedContext.putImageData(Image_data,0,0);
      img.src = resizedCanvas.toDataURL();
      splits.push(img);
    }
    console.log(splits);

    return splits; //returns an array of Elemets <img>
  }

  async rescaled(arr){
    const rescaled = [];
    var img = new Image(32,32);
    const resizedCanvas = document.createElement("canvas");
    const resizedContext = resizedCanvas.getContext("2d");
    resizedCanvas.height = 32;
    resizedCanvas.width = 32;

    for(let i = 0; i < arr.length; i++){
      resizedContext.drawImage(await arr[i], 0, 0, 32, 32);
      img.src = await resizedCanvas.toDataURL();

/*       let downloadLink = document.createElement('a');
      downloadLink.setAttribute('download', 'CanvasAsImage.png');
      resizedCanvas.toBlob((blob) => {
        let url = URL.createObjectURL(blob);
        downloadLink.setAttribute('href', url);
        downloadLink.click();
      }); */
      rescaled.push(img);
    }
    console.log(rescaled)
    return rescaled;
  }

  async predict(){ 
    const model = await tf.loadLayersModel('https://storage.googleapis.com/mathsolvermodel/model.json');
    
    var split_count = 4;
    var counter_1 = 0;
    var counter_2 = 0;
    var counter_3 = 0;
    var counter_4 = 0;
    var threshold = 0.9;
    
    
    var split_images = [];
    var resized_images = [];

    var resized_grayscale_Tensor = null;
    var prediction = null;
    var value = [];

    
    for(let i = 1; i < split_count+1; i++){
      split_images = await this.split(i);
      resized_images = await this.rescaled(split_images);
        for (let j = 0; j < resized_images.length; j++){
          resized_grayscale_Tensor = tf.browser.fromPixels(resized_images[j]).mean(2).toFloat().expandDims(0).expandDims(-1);
          prediction = model.predict(resized_grayscale_Tensor);
          value = prediction.dataSync()
          //console.log(value);
          for (let k = 0; k < value.length; k++){

            switch (i){
              case 1: 
                if (value[k] > threshold){
                  console.log(value);
                  counter_1++;
                  console.log(counter_1);
                }
                break;
              case 2: 
                if (value[k] > threshold){
                  //console.log(value);
                  counter_2++;
                  console.log(counter_2);
                }
                break;
              case 3: 
                if (value[k] > threshold){
                  //console.log(value);
                  counter_3++;
                  console.log(counter_3);
                }
                break;
              case 4: 
                if (value[k] > threshold){
                  //console.log(value);
                  counter_4++;
                  console.log(counter_4);
                }
                break;
                
            }      
          }
        }
      }
    

    
  }

  moving(e) {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
      var pos = {
        x: e.clientX - canvas.getBoundingClientRect().left,
        y: e.clientY - canvas.getBoundingClientRect().top
      };
    if (this.state.lastPosition !== null && this.state.drawing) {
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.fillStyle = "#000000";
      ctx.moveTo(this.state.lastPosition.x, this.state.lastPosition.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.closePath();
      ctx.stroke();
    }
    this.setState({lastPosition: pos});
  }

  render(){
    return (
      <div>
        <h1>My Math Solver</h1>
        <canvas ref={this.canvasRef} width={600} height={400} onMouseMove={e => this.moving(e)} onMouseUp={this.handleEvent} onMouseDown={this.handleEvent}> </canvas>
        <div className="stuffs">
          <button onClick={this.clear}>Clear</button>
          <button onClick={this.predict}>Predict</button>
          <img className="t"></img>
        </div>
        <h2>{this.state.prediction}</h2>
      </div>
    );
  }
}

export default App;
