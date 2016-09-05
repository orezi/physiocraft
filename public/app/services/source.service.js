"use strict";
angular.module("physiocraft")
  .factory("SourceService", ["$http", "$rootScope", function($http, $rootScope) {

    function urlBase64Decode(str) {
      var output = str.replace('-', '+').replace('_', '/');
      switch (output.length % 4) {
        case 0:
          break;
        case 2:
          output += '==';
          break;
        case 3:
          output += '=';
          break;
        default:
          throw 'Illegal base64url string!';
      }
      return window.atob(output);
    }

    return {

      getAllSources: function() {
        var token = localStorage.getItem('userToken');
        return $http.get("/api/sources?token=" + token);
      },
      getSource: function(id) {
        var token = localStorage.getItem('userToken');
        return $http.get("/api/source/" + id + "?token=" + token);
      },
      createSource: function(newSource) {
        var token = localStorage.getItem('userToken');
        return $http.post("/api/sources?token=" + token, newSource);
      },
      deleteSource: function(id) {
        var token = localStorage.getItem("userToken");
        return $http.delete("/api/source/" + id + "?token=" + token);
      },
      updateSource: function(id, sourceObj) {
        var token = localStorage.getItem("userToken");
        return $http.put("/api/source/" + id + "?token=" + token, sourceObj);
      }
    };

  }]);
