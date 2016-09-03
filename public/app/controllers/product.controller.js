"use strict";
angular.module("physiocraft")
  .controller("productCtrl", ["$scope", "$mdDialog", "$state", "$location", "$mdToast", "$stateParams", "UserService", "ProductService", function($scope, $mdDialog, $state, $location, $mdToast, $stateParams, UserService, ProductService) {
    if (!localStorage.getItem('userToken')) {
      $state.go('landingpage.login');
    } else {
      ProductService.getAllProducts().success(function(res) {
        $scope.products = res;
      });
    }
    $scope.getAllProducts = function(){
      ProductService.getAllProducts().success(function(res) {
        $scope.products = res;
      });
    };

    $scope.getProduct = function() {
      ProductService.getProduct($stateParams.product_id).success(function(res) {
        $scope.product = res;
      });
    }

    $scope.createProduct = function(newProduct){
      ProductService.createProduct(newProduct).success(function(data){
        $state.go('nav.products');
      });
    };

    $scope.deleteProduct = function(id){
      ProductService.deleteProduct(id).success(function(data){
        $scope.getAllProducts();
      });
    };

    $scope.openProductDetailsView = function(productId){
      $state.go('nav.productDetails', {
        product_id: productId
      });
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    };

    $scope.updateProductDetails = function(id, updatedProduct){
      ProductService.updateProduct(id, updatedProduct);
    };

    $scope.showConfirm = function(ev, id) {
      var confirm = $mdDialog.confirm()
        .title("Delete Product")
        .content("Are you sure you want to delete this product?.")
        .ariaLabel("Lucky day")
        .targetEvent(ev)
        .ok("Yes!")
        .cancel("No");
      $mdDialog.show(confirm).then(function() {
        $scope.deleteProduct(id);
      });
    };

  }]);
