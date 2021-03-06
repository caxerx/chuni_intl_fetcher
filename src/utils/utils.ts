export function getCookie(key: string) {
  const cookieEntry = document.cookie
    .split(";")
    .map((e) => decodeURIComponent(e.trim()))
    .map((e) => e.split("="))
    .find((e) => e[0] === key);
  return cookieEntry ? cookieEntry[1] : "";
}