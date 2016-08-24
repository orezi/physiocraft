angular.module("physiocraft")
  .factory("PatientService", ["$http", "$rootScope", function($http, $rootScope) {

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

      getAllPatients: function() {
        var token = localStorage.getItem('userToken');
        return $http.get("/api/patients?token=" + token);
      },
      getCurrentPatient: function(patientID) {
        var token = localStorage.getItem('userToken');
        return $http.get("/api/patient/" + patientID + "?token=" + token);
      },
      getPatientTreatments: function(patientID) {
        var token = localStorage.getItem('userToken');
        return $http.get("/api/treatment/patient/" + patientID + "?token=" + token);
      },
      createPatient: function(patientDetails) {
        var token = localStorage.getItem('userToken');
        return $http.post("/api/patients?token=" + token, patientDetails);
      },
      addTreatment: function(treatmentObj, patientId){
        var token = localStorage.getItem('userToken');
        return $http.post("api/treatment/patient/" + patientId + "?token=" + token, treatmentObj);
      },
      deletePatient: function(patientId){
        var token = localStorage.getItem('userToken');
        return $http.delete("api/patient/" + patientId + "?token=" + token);
      },
      deleteTreatment: function(treatmentId){
        var token = localStorage.getItem('userToken');
        return $http.delete("api/treatment/" + treatmentId + "?token=" + token);
      },
      getTreatment: function(treatmentId){
        var token = localStorage.getItem('userToken');
        return $http.get("api/treatment/" + treatmentId + "?token=" + token);
      },
      updatePatient: function(patientId, patientObj){
        var token = localStorage.getItem('userToken');
        return $http.put("api/patient/" + patientId + "?token=" + token, patientObj);
      },
      updateTreatment: function(treatmentId, treatmentObj){
        var token = localStorage.getItem('userToken');
        return $http.put("api/treatment/" + treatmentId + "?token=" + token, treatmentObj);
      }
    };

  }]);
