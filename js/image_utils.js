import { fx } from './glfx.js';

export const convertURLtoCanvas = async (url) => {
  const canvas = document.createElement("canvas");
  const img = new Image();
  img.src = url;
  return new Promise((resolve, reject) => {
    img.addEventListener("load", function () {
      const {width, height} = img;
      const ctx = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas);
    });
    img.addEventListener("error", function (event) {
      reject(event);
    });
  });
}

export const makeImageBlur = (image, blurPixelLength) => {
  const { width: w, height: h } = image;
  const glfx_canvas = fx.canvas();
  const texture = glfx_canvas.texture(image);
  glfx_canvas.draw(texture).triangleBlur(blurPixelLength).update();
  const output_canvas = document.createElement("canvas");
  output_canvas.width = w;
  output_canvas.height = h;
  const output_ctx = output_canvas.getContext("2d");
  output_ctx.drawImage(glfx_canvas, 0, 0);
  return output_canvas;
};

export const showCanvasToScreen = (canvas, label, class_name) => {
  const divEl = document.createElement("div");
  const labelEl = document.createElement("p");
  labelEl.innerText = label;
  divEl.appendChild(labelEl);
  divEl.className = "imgBox";
  divEl.className += " " + class_name;
  divEl.appendChild(canvas);
  document.body.appendChild(divEl);
};

export const convertURLtoImgObj = async (url) => {
  const img = new Image();
  img.src = url;
  return new Promise((resolve, reject) => {
    img.addEventListener("load", function () {
      resolve(img);
    });
    img.addEventListener("error", function (event) {
      reject(event);
    });
  });
};
