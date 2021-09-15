
// возвращает куки с указанным name,
// или undefined, если ничего не найдено
// https://learn.javascript.ru/cookie
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

const XCSRFHeaders = () => ({
  'X-CSRFToken': getCookie('csrftoken'),
});

export default XCSRFHeaders
