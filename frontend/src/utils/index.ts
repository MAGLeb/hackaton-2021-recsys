import { message } from "antd";

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function errorNotification() {
  message.error("Ой, что-то пошло не так. Пожалуйста, перезагрузите страницу.");
}
