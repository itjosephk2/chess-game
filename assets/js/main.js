// Main entry point

import { chessController } from "./controllers/chessController.js";
import { boardUtils } from "./utils/boardUtils.js"; // Optional if you need helpers here

document.addEventListener("DOMContentLoaded", () => {
  chessController.init();
});
