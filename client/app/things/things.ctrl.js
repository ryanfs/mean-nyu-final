// Took people.ctrl.js and made it for Things

angular.module("myWorld").controller("ThingsCtrl", function($scope, $location, NavSvc, ThingsSvc){
  NavSvc.setTab("Things");
  $scope.message = "I am the things control";
  $scope.user = ThingsSvc.user;
  // ability to delete a thing
  $scope.delete = function(thing){
    ThingsSvc.deleteThing(thing).then(
      function(){
        $scope.error = null;
        $scope.success = "Thing has been deleted";
        activate();
      },
      function(error){
        $scope.error = error;
      }
    );
  };
  // edit a thing
  $scope.edit = function(thing){
    $location.path("/things/" + thing._id);
  };

  // insert a thing
  $scope.insert = function(){
    ThingsSvc.insertThing($scope.inserting).then(
      function(thing){
        $scope.success = "Insert successful for " + thing.name;
        $scope.error = null;
        activate();
      },
      function(error){
        $scope.error = error;
        $scope.success = null;
      }
    );
  };
  function activate(){
    ThingsSvc.getThings().then(function(things){
      $scope.things = things;
    });
  }
  activate();
});