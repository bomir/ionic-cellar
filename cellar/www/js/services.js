angular.module('starter.services', ['ngResource'])


.factory('Wine', function ($resource) {
	//nodejs
	//return $resource('http://localhost:3000/wines/:wineId', { wineId: '@_id' }, {
	//grails
	return $resource('http://localhost:8080/cellar-server/wines/:wineId', { wineId: '@_id' }, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
})