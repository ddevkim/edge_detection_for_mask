import {makeImageBlur} from "./image_utils";

export function detectEdgeMask(mask_image, line_color_black_amount, blur_strength, is_dashed = false, number_of_dashed_lines = 0, dashed_line_cut_width = 0) {
  console.time('edge_detection: ');
  const { width, height } = mask_image;
  const mask_canvas = makeImageBlur(mask_image, blur_strength);
  const mask_ctx = mask_canvas.getContext("2d");
  const mask_pixel_arr = mask_ctx.getImageData(0, 0, width, height).data;
  const edge_pixel_arr = new Uint8ClampedArray(width * height * 4);
  const convertPixelPointToArrIndex = (x, y, width) => (x + y * width) * 4;
  const square_length = Math.max(width, height);
  const margin_length = (square_length - dashed_line_cut_width * number_of_dashed_lines) / (number_of_dashed_lines + 1)
  for (let src_y = 0; src_y < height; src_y++) {
    const r_y = is_dashed && src_y % (margin_length + dashed_line_cut_width);
    for (let src_x = 0; src_x < width; src_x++) {
      const r_x = is_dashed && src_x % (margin_length + dashed_line_cut_width);
      if (is_dashed && ((r_x >= margin_length && r_x < margin_length + dashed_line_cut_width) || r_y >= margin_length && r_y < margin_length + dashed_line_cut_width)) {
        continue;
      }
      const src_x1 = src_x;
      const src_x0 = src_x - 1 < 0 ? 0 : src_x - 1;
      const src_x2 = src_x + 1 > width - 1 ? width - 1 : src_x + 1;
      const src_y1 = src_y;
      const src_y0 = src_y - 1 < 0 ? 0 : src_y - 1;
      const src_y2 = src_y + 1 > height - 1 ? height - 1 : src_y + 1;
      const src_idx_tl = convertPixelPointToArrIndex(src_x0, src_y0, width);
      const src_idx_tr = convertPixelPointToArrIndex(src_x2, src_y0, width);
      const src_idx_cc = convertPixelPointToArrIndex(src_x1, src_y1, width);
      const src_idx_bl = convertPixelPointToArrIndex(src_x0, src_y2, width);
      const src_idx_br = convertPixelPointToArrIndex(src_x2, src_y2, width);
      const edge_idx = src_idx_cc;
      const src_around_alpha_arr = [
        mask_pixel_arr[src_idx_tl + 3],
        mask_pixel_arr[src_idx_tr + 3],
        mask_pixel_arr[src_idx_bl + 3],
        mask_pixel_arr[src_idx_br + 3],
      ];
      const alpha_zero_count = src_around_alpha_arr.filter(
        (alpha) => alpha === 0
      ).length;
      if (alpha_zero_count < 4) {
        const alpha_substract_arr = src_around_alpha_arr.map((alpha) =>
          Math.abs(mask_pixel_arr[src_idx_cc + 3] - alpha)
        );
        let len = alpha_substract_arr.filter(
          (substract_value) => substract_value !== 0
        ).length;
        if (len === 0) len = 1;
        const substract_avg = alpha_substract_arr.reduce((a, b) => a + b) / len;
        for (let k = 0; k < 3; k++) {
          edge_pixel_arr[edge_idx + k] = substract_avg / line_color_black_amount;
        }
        edge_pixel_arr[edge_idx + 3] = substract_avg;
      }
    }
  }
  const edge_canvas = document.createElement("canvas");
  edge_canvas.width = width;
  edge_canvas.height = height;
  const edge_ctx = edge_canvas.getContext("2d");
  edge_ctx.putImageData(new ImageData(edge_pixel_arr, width, height), 0, 0);
  console.timeEnd('edge_detection: ');
  return edge_canvas;
}