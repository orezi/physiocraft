"use strict";
angular.module("physiocraft")
  .factory("UserService", ["$http", "$rootScope", function($http, $rootScope) {

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

      getAllUsers: function() {
        return $http.get("/api/users");
      },
      getVerifiedUsers: function(){
        var token = localStorage.getItem('userToken');
        return $http.get("/api/verifiedUsers?token=" + token);
      },

      getCurrentUser: function() {
        var token = localStorage.getItem('userToken');
        return $http.get("/api/user?token=" + token);
      },

      login: function(param) {
        return $http.post("/api/authenticate", param);
      },

      createUser: function(newUser) {
        return $http.post("/api/users", newUser);
      },

      decodeUser: function() {
        if (localStorage.getItem("userToken")) {
          var token = localStorage.getItem("userToken");
          var user = {};
          if (token) {
            var encoded = token.split(".")[1];
            user = JSON.parse(urlBase64Decode(encoded));
            $rootScope.userId = user._id;
          }
        }
      },
      deleteUser: function() {
        var token = localStorage.getItem("userToken");
        return $http.delete("/api/user?token=" + token);
      },

      deletePhysio: function(physioID) {
        var token = localStorage.getItem("userToken");
        return $http.delete("/api/physio/" + physioID + "?token=" + token);
      },
      
      getPhysio: function(physioID) {
        var token = localStorage.getItem("userToken");
        return $http.get("/api/physio/" + physioID + "?token=" + token);
      },

      updateUser: function(userObj) {
        var token = localStorage.getItem("userToken");
        return $http.put("/api/user?token=" + token, userObj);
      },
      getPendingUsers: function(){
        var token = localStorage.getItem('userToken');
        return $http.get("/api/pending?token=" + token);
      },
      verifyPhysio: function(physioID){
        return $http.post("/api/verify/" + physioID);
      },
      makeAssocite: function(physioID){
        var token = localStorage.getItem('userToken');
        return $http.put("/api/user/" + physioID + "/associate?token=" + token);
      },
      makeOperation: function(physioID){
        var token = localStorage.getItem('userToken');
        return $http.put("/api/user/" + physioID + "/operation?token=" + token);
      },
      makeMarketing: function(physioID){
        var token = localStorage.getItem('userToken');
        return $http.put("/api/user/" + physioID + "/marketing?token=" + token);
      },
      makeAdmin: function(physioID){
        var token = localStorage.getItem('userToken');
        return $http.put("/api/user/" + physioID + "/admin?token=" + token);
      },
      makeEMedia: function(physioID){
        var token = localStorage.getItem('userToken');
        return $http.put("/api/user/" + physioID + "/e-media?token=" + token);
      },
      makeFinance: function(physioID){
        var token = localStorage.getItem('userToken');
        return $http.put("/api/user/" + physioID + "/finance?token=" + token);
      }
    };

  }]);
