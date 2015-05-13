// modeled after the PeoplesSvc 

angular.module("myWorld").factory("ThingsSvc", function($q, $http, AuthSvc ){
  return {
    user: AuthSvc.user,
    deleteThing: function(thing){
      var dfd = $q.defer();
      $http.delete("/api/things/" + thing._id +"/" + AuthSvc.getToken()).then(
        function(result){
          dfd.resolve(result.data); 
        },
        function(result){
          dfd.reject(result.data); 
        }
      );
      return dfd.promise;
    },
    getThings: function(){
      var dfd = $q.defer();
      $http.get("/api/things").then(function(result){
        dfd.resolve(result.data);
      });
      return dfd.promise;
    },
    getThing: function(id){
      var dfd = $q.defer();
      $http.get("/api/things/" + id).then(function(result){
        dfd.resolve(result.data);
      });
      return dfd.promise;
    },
    insertThing: function(thing){
      var dfd = $q.defer();  
      $http.post("/api/things/" + AuthSvc.getToken(), thing).then(
        function(result){
          console.log(result);
          dfd.resolve(result.data);
        },
        function(result){
          dfd.reject(result.data);
        }
      );
      return dfd.promise;
    },
    updateThing: function(thing){
      var dfd = $q.defer();
      $http.post("/api/things/" + thing._id + "/" + AuthSvc.getToken(), thing).then(
        function(result){
          dfd.resolve(result.data);
        },
        function(result){
          dfd.reject(result.data);
        }
      );
      return dfd.promise;
    }
  };
})