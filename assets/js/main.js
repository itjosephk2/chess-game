// Main entry point

import { chessController } from "./controllers/chessController.js";
import { boardUtils } from "./utils/boardUtils.js";

document.addEventListener("DOMContentLoaded", () => {
  chessController.init();
});
