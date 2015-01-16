angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('WinesCtrl', function($scope, $state, $ionicModal , $window, Wine) {
    $scope.wines = Wine.query();

	//add-change-dialog.html  BEGIN
	// Load the add / change dialog from the given template URL
	$ionicModal.fromTemplateUrl('templates/add-change-dialog.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
	});
	$scope.showAddChangeDialog = function(action) {
		$scope.action = action;
		if(action=='add'){
			console.log('Creating new wine, action:', $scope.action);
			$scope.wine = new Wine();
		}
		$scope.modal.show();
	};
	
	$scope.closeAddChangeDialog = function() {
		$scope.wines = Wine.query();
		$scope.modal.hide();
	};
	//Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
	$scope.modal.remove();
	});
	// Execute action on hide modal
	$scope.$on('modal.hidden', function() {
	// Execute action
	});
	// Execute action on remove modal
	$scope.$on('modal.removed', function() {
	// Execute action
	});
	//add-change-dialog.html  END
	
	
	$scope.showEditWine = function(item) {
        // Remember edit item to change it later
        $scope.wine = item;
        // Open dialog
        $scope.showAddChangeDialog('change');
      };
	  
	$scope.editWine = function() { //create a new wine. Issues a PUT to /api/movies/:id
		$scope.wine.$update(function() {
			$scope.closeAddChangeDialog();
			//$scope.wines = Wine.query();
			//$scope.modal.hide(); // on success go back 
		});
	};  
	
	$scope.addWine = function() { //create a new wine. Issues a POST to /api/wines
		$scope.wine.$save(function() {
			$scope.closeAddChangeDialog();
			//$scope.wines = Wine.query();
		});
	};
	
	$scope.deleteWine = function(wine) { // Delete a wine. Issues a DELETE to /api/wines/:id
		wine.$delete(function() {
			$scope.wines = Wine.query();
		  });
	};	
})

.controller('WineCtrl', function($scope, $stateParams, Wine) {
    $scope.wine = Wine.get({wineId: $stateParams.wineId});
});
