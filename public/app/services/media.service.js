"use strict";
angular.module("physiocraft")
  .factory("MediaService", ["$http", "$rootScope", function($http, $rootScope) {

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

      getAllMedia: function() {
        var token = localStorage.getItem('userToken');
        return $http.get("/api/media?token=" + token);
      },
      getMedia: function(id) {
        var token = localStorage.getItem('userToken');
        return $http.get("/api/media/" + id + "?token=" + token);
      },
      createMedia: function(newMedia) {
        var token = localStorage.getItem('userToken');
        return $http.post("/api/media?token=" + token, newMedia);
      },

      deleteMedia: function(id) {
        var token = localStorage.getItem("userToken");
        return $http.delete("/api/media/" + id + "?token=" + token);
      },

      updateMedia: function(id, mediaObj) {
        var token = localStorage.getItem("userToken");
        return $http.put("/api/media/" + id + "?token=" + token, mediaObj);
      }
    };

  }]);
