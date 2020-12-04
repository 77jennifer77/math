import "./canvas.js";
import "./index.css";
import React from 'react';

function App() {
  return (
    <div>
    <script src="canvas.js"></script>
    	<h1>My Math Solver</h1>
      <canvas id="canvas" width="600" height="400"></canvas>
    	<div>
    		<button id="clear" onClick={window.clearCanvas}>Clear</button>
    		<button id="save">Save</button>
    	</div>
    </div>
  );
}

export default App;
