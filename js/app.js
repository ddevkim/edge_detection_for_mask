/*
* 코드 변경 적용을 하려면
* npm ci 로 모듈 패키지 설치 후,
*
* browserify app.js -p esmify > bundle.js
* 터미널 창에 실행한 후 html 리로딩 하면 됨.
* */

import {convertURLtoImgObj, showCanvasToScreen} from "./image_utils.js";
import {detectEdgeMask} from "./edge_detection.js";
import {convertURLtoCanvas} from "./image_utils";
  const mask_url1 = "./images/mask_images/rounded_square.png";
  const mask_url2 = "./images/mask_images/rounded_square2.png";
  const mask_url3 = "./images/mask_images/square.png";
  const mask_url4 = "./images/mask_images/circle.png";
  const mask_url5 = "./images/mask_images/heart_cushion.png";
  const mask_url6 = "./images/mask_images/heart_mask.png";
  const mask_url7 = "./images/mask_images/long_cushion.png";

( () => {
  // showCanvasToScreen(alpha_grid_canvas, "alpha_grid", "alpha_grid");
})();

//
(async () => {
  const mask_canvas1 = await convertURLtoCanvas(mask_url1);
  const mask_canvas2 = await convertURLtoCanvas(mask_url2);
  const mask_canvas3 = await convertURLtoCanvas(mask_url3);
  const mask_canvas4 = await convertURLtoCanvas(mask_url4);
  const mask_canvas5 = await convertURLtoCanvas(mask_url5);
  const mask_canvas6 = await convertURLtoCanvas(mask_url6);
  const mask_canvas7 = await convertURLtoCanvas(mask_url7);

  const edge_canvas1 = detectEdgeMask(await convertURLtoImgObj(mask_url1), 0.7, 2, true, 33, 5);
  const edge_canvas2 = detectEdgeMask(await convertURLtoImgObj(mask_url2), 0.7, 2, true, 33, 5);
  const edge_canvas3 = detectEdgeMask(await convertURLtoImgObj(mask_url3), 0.7, 2, true, 33, 5);
  const edge_canvas4 = detectEdgeMask(await convertURLtoImgObj(mask_url4), 0.7, 2, true, 33, 5);
  const edge_canvas5 = detectEdgeMask(await convertURLtoImgObj(mask_url5), 0.7, 2, true, 33, 5);
  const edge_canvas6 = detectEdgeMask(await convertURLtoImgObj(mask_url6), 0.7, 2, true, 33, 5);
  const edge_canvas7 = detectEdgeMask(await convertURLtoImgObj(mask_url7), 0.7, 2, true, 33, 5);

  showCanvasToScreen(mask_canvas1, "mask1", "mask")
  showCanvasToScreen(edge_canvas1, "edge1", "edge");
  showCanvasToScreen(mask_canvas2, "mask2", "mask");
  showCanvasToScreen(edge_canvas2, "edge2", "edge");
  showCanvasToScreen(mask_canvas3, "mask3", "mask");
  showCanvasToScreen(edge_canvas3, "edge3", "edge");
  showCanvasToScreen(mask_canvas4, "mask4", "mask");
  showCanvasToScreen(edge_canvas4, "edge4", "edge");
  showCanvasToScreen(mask_canvas5, "mask5", "mask");
  showCanvasToScreen(edge_canvas5, "edge5", "edge");
  showCanvasToScreen(mask_canvas6, "mask6", "mask");
  showCanvasToScreen(edge_canvas6, "edge6", "edge");
  showCanvasToScreen(mask_canvas7, "mask7", "mask");
  showCanvasToScreen(edge_canvas7, "edge7", "edge");
})();
