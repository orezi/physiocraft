"use strict";
angular.module("physiocraft")
  .controller("mediaCtrl", ["$scope", "$mdDialog", "$state", "$location", "$mdToast", "$stateParams", "UserService", "MediaService", function($scope, $mdDialog, $state, $location, $mdToast, $stateParams, UserService, MediaService) {
    if (!localStorage.getItem('userToken')) {
      $state.go('landingpage.login');
    } else {
      MediaService.getAllMedia().success(function(res) {
        $scope.medias = res;
      });
    }
    $scope.getAllMedia = function(){
      MediaService.getAllMedia().success(function(res) {
        $scope.medias = res;
      });
    };

    $scope.getMedia = function() {
      MediaService.getMedia($stateParams.media_id).success(function(res) {
        $scope.media = res;
      });
    }

    $scope.createMedia = function(newMedia){
      MediaService.createMedia(newMedia).success(function(data){
        $state.go('nav.media');
      });
    };

    $scope.deleteMedia = function(id){
      MediaService.deleteMedia(id).success(function(data){
        $scope.getAllMedia();
      });
    };

    $scope.openMediaDetailsView = function(mediaId){
      $state.go('nav.mediaDetails', {
        media_id: mediaId
      });
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    };

    $scope.updateMediaDetails = function(id, updatedMedia){
      MediaService.updateMedia(id, updatedMedia);
    };

    $scope.showConfirm = function(ev, id) {
      var confirm = $mdDialog.confirm()
        .title("Delete Media")
        .content("Are you sure you want to delete this Media?.")
        .ariaLabel("Lucky day")
        .targetEvent(ev)
        .ok("Yes!")
        .cancel("No");
      $mdDialog.show(confirm).then(function() {
        $scope.deleteMedia(id);
      });
    };

  }]);
