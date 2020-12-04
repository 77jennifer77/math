export const clear = () => {
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#FFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
