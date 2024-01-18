function getUrlParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

document.addEventListener('DOMContentLoaded', function() {
  const paramValue = getUrlParam('q');
  console.log(paramValue);

  // search in firestore database
});
