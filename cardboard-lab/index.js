const medias = {audio : false, video : {
        facingMode : {
          exact : "environment"
        }
      }},
      video  = document.getElementById("video"),
      canvas = document.getElementById("canvas"),
      ctx    = canvas.getContext("2d");

let imgData, data, ave;
navigator.getUserMedia(medias, successCallback, errorCallback);

function successCallback(stream) {
  video.srcObject = stream;
};

function errorCallback(err) {
  alert(err);
};

requestAnimationFrame(draw);

// -------------------------------------------------------------

// 描画処理
function draw() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.drawImage(video, 0, 0);
  img = ctx.getImageData(0, 0, canvas.width, canvas.height );
  count = countBrightArea(img.data);

  ctx.textAlign = "center";
  ctx.font = "bold 150px Arial";
  
  // 画像中の明るい画素が1000以上あればON、そうでなければOFFを表示。
  // 閾値（1000）は適当に調整してください。
  if ( count < 1000 ) {
    ctx.fillStyle = "#2ecc71";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000000";
    ctx.fillText("ON", canvas.width*0.5, canvas.height*0.62);

  } else {
    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(0, 0, canvas.width, canvas.height );
    ctx.fillStyle = "#ffffff";
    ctx.fillText("OFF", canvas.width*0.5, canvas.height*0.62);
  }

  requestAnimationFrame(draw);
}

// 明るい画素をカウントする関数
function countBrightArea(data) {

  // 画像中の各画素をグレイスケールに変換し、200以上であればカウントする。
  var count = 0;
  for (let i = 0; i < data.length; i += 4) {
    gray = 0.299 * data[i] + 0.587 * data[i+1] + 0.114 * data[i+2];
    if ( gray > 200 ) {
      count++;
    }
  }
  return count;
}