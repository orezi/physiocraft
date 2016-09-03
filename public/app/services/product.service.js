"use strict";
angular.module("physiocraft")
  .factory("ProductService", ["$http", "$rootScope", function($http, $rootScope) {

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

      getAllProducts: function() {
        var token = localStorage.getItem('userToken');
        return $http.get("/api/products?token=" + token);
      },
      getProduct: function(id) {
        var token = localStorage.getItem('userToken');
        return $http.get("/api/product/" + id + "?token=" + token);
      },
      createProduct: function(newProduct) {
        var token = localStorage.getItem('userToken');
        return $http.post("/api/products?token=" + token, newProduct);
      },

      deleteProduct: function(id) {
        var token = localStorage.getItem("userToken");
        return $http.delete("/api/product/" + id + "?token=" + token);
      },

      updateProduct: function(id, productObj) {
        var token = localStorage.getItem("userToken");
        return $http.put("/api/product/" + id + "?token=" + token, productObj);
      }
    };

  }]);
