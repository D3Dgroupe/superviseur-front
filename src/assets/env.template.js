(function(window) {
  window.env = window.env || {};

  // Environment variables.
  window["env"]["apiUrl"] = "${API_URL}";
  window["env"]["grafanaUrl"] = "${URL_GRAFANA}";
  window["env"]["debug"] = "${DEBUG}";
})(this);