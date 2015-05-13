// Thing controller based off of Person Controller

angular.module("myWorld")
.controller("ThingCtrl", function($scope, $location, $routeParams, NavSvc, ThingsSvc){
  NavSvc.setTab("Things");
  $scope.save = function(){
    ThingsSvc.updateThing($scope.thing).then(
      function(){
        $location.path("/things");
      },
      function(error){
        $scope.error = error; 
      }
    );
  };
  function activate(){
    ThingsSvc.getThing($routeParams.id).then(function(thing){
      $scope.thing = thing;
    });
  }
  activate();
});
