export const NO_HISTORY = "NO_HISTORY";

export enum COLORS {
  red = "red",
  green = "green",
  orange = "orange",
}

export const BACKGROUND_MAP = {
  [COLORS.red]:
    "linear-gradient(90deg,#f5222d -.01%,#fff1f0 1.99%,#ffccc7 3%,#ff4d4f 5%,transparent 6%,#ffccc7 7%,#ffa39e 100.01%)",
  [COLORS.orange]:
    "linear-gradient(90deg,#fa8c16 -.01%,#fff7e6 1.99%,#ffe7ba 3%,#ffa940 5%,transparent 6%,#ffe7ba 7%,#ffd591 100.01%)",
  [COLORS.green]:
    "linear-gradient(90deg,#13c2c2 -.01%,#e6fffb 1.99%,#b5f5ec 3%,#36cfc9 5%,transparent 6%,#b5f5ec 7%,#87e8de 100.01%)",
};

export const BAGES_COLOR_MAP = {
  [COLORS.red]: "#ff7875",
  [COLORS.orange]: "#ff9c6e",
  [COLORS.green]: "#36cfc9",
};

export const USER_PARAM = "user";

export const BACKEND_URL = "http://localhost:5000";
