export {getCookie, setCookie};
function getCookie(name: string): string {
  const nameLenPlus = (name.length + 1);
  let cookie = document.cookie
    .split(';')
    .map(c => c.trim())
    .filter(cookie => {
      return cookie.substring(0, nameLenPlus) === `${name}=`;
    })
    .map(cookie => {
      return decodeURIComponent(cookie.substring(nameLenPlus));
    })[0] || "";

  console.log(cookie);
  return cookie;

}

function setCookie(name: string, value: string){
  document.cookie = `${name}=${value}`;
  return;
}
