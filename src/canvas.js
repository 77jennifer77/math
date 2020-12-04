
    window.addEventListener("load", () => {
    var canvas = document.querySelector("#canvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //Drawing variables
    var lastPosition = null;
    var drawing = false;
    //Drawing functionality
    function startDraw(e) {
      drawing = true;
      mouseMove(e);
    }
    canvas.onmousedown = startDraw;

    function stopDraw() {
      drawing = false;
    }
    canvas.onmouseup = stopDraw;
    canvas.onmouseleave = stopDraw;

    function mouseMove(evt) {
      var pos = {
        x: evt.offsetX,
        y: evt.offsetY
      };
    if (lastPosition !== null && drawing === true) {
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(lastPosition.x, lastPosition.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.closePath();
      ctx.stroke();
    }
    lastPosition = pos;
  }
  canvas.onmousemove = mouseMove;
  });
  function clearCanvas(){
    console.log("clear clicked");
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
