import "./index.css";
import React, { Component } from 'react';
import * as tf from '@tensorflow/tfjs';
import { valueAndGrads } from "@tensorflow/tfjs";


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
    for(var i = 0; i < n; i++){
      var img = new Image(600/n,400);
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

    const resizedCanvas = document.createElement("canvas");
    const resizedContext = resizedCanvas.getContext("2d");
    resizedCanvas.height = 32;
    resizedCanvas.width = 32;

    for(let i = 0; i < arr.length; i++){
      var img = new Image(32,32);
      resizedContext.drawImage(await arr[i],0,0,32,32);
      img.src = resizedCanvas.toDataURL();
      let downloadLink = document.createElement('a');
      downloadLink.setAttribute('download', 'CanvasAsImage.png');
      resizedCanvas.toBlob((blob) => {
        let url = URL.createObjectURL(blob);
        downloadLink.setAttribute('href', url);
        downloadLink.click();
      });
      resizedContext.clearRect(0,0,32,32);
      rescaled.push(img);
    }
    console.log(rescaled);
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
    var counter_arr = [];


    
    for(let i = 1; i < split_count+1; i++){
      split_images = await this.split(i);
      resized_images = await this.rescaled(split_images);
      console.log(resized_images);
      console.log("above you");
        for (let j = 0; j < resized_images.length; j++){
          resized_grayscale_Tensor = tf.browser.fromPixels(resized_images[j]).mean(2).toFloat().expandDims(0).expandDims(-1);
          prediction = model.predict(resized_grayscale_Tensor);
          value = prediction.dataSync();
          for (let k = 0; k < value.length; k++){
            switch (i){
              case 1: 
                if (value[k] > threshold){
                  //console.log(value);
                  //console.log("in 1")
                  counter_1++;
                  console.log(counter_1);
                }
                counter_arr.push(parseInt(counter_1));
                break;
              case 2: 
                if (value[k] > threshold){
                  //console.log(value);
                  //console.log("in 2")
                  counter_2++;
                  console.log(counter_2);
                }
                counter_arr.push(parseInt(counter_2));
                break;
              case 3: 
                if (value[k] > threshold){
                  //console.log(value);
                  //console.log("in 3")
                  counter_3++;
                  console.log(counter_3);
                }
                counter_arr.push(parseInt(counter_3));
                break;
              case 4: 
                if (value[k] > threshold){
                  //console.log(value);
                  //console.log("in 4")
                  counter_4++;
                  console.log(counter_4);
                }
                counter_arr.push(parseInt(counter_4));
                break;
            }      
          }
        }
      }
      
      max_counter_index = counter_arr.findIndex(Math.max(counter_arr));

      switch(max_counter_index){
        case(0): 
          var split_images_1 = this.split(max_counter_index);
          var resized_images_1 = await this.rescaled(split_images_1);
          
        case(1):
          var split_images_2 = this.split(max_counter_index);
          var resized_images_2 = await this.rescaled(split_images_2);

        case(2):
          var split_images_3 = this.split(max_counter_index);
          var resized_images_3 = await this.rescaled(split_images_3);

        case(3):
          var split_images_4 = this.split(max_counter_index);
          var resized_images_4 = await this.rescaled(split_images_4);

        }
      
/*       if(counter_arr)
      this.split(n);
      value;
      for(i < images length n){
        predictions
        valueAndGrads;
        for(values){
          store[] =  index > theshold
        }
      }
      ch['1','2'......')'];

      for(store.length)
        char[store]
      } */
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
