var app=angular.module("myWorld",["ngRoute"]);app.run(["AuthSvc","PeopleSvc",function(e,n){e.setUser()}]),angular.module("myWorld").controller("LoginCtrl",["$scope","$location","AuthSvc",function(e,n,t){t.user.authenticated()&&n.path("/"),e.user={},e.login=function(){t.authenticate(e.user).then(function(){n.path("/")},function(n){e.token=null,e.error=n})}}]).factory("AuthSvc",["$window","$q","$http",function(e,n,t){function o(){return e.sessionStorage.getItem("token")}function r(){delete a.username,e.sessionStorage.removeItem("token")}function l(){if(e.sessionStorage.getItem("token")){var o=n.defer();return t.get("/api/sessions/"+e.sessionStorage.getItem("token")).then(function(e){a.username=e.data.username,o.resolve(e.data)}),o.promise}}function s(o){var r=n.defer();return t.post("/api/sessions",o).then(function(n){e.sessionStorage.setItem("token",n.data),l().then(function(e){r.resolve(a)})},function(e){r.reject(e.data.error)}),r.promise}var a={authenticated:function(){return null!=this.username}};return{authenticate:s,setUser:l,logout:r,user:a,getToken:o}}]),angular.module("myWorld").config(["$routeProvider","$locationProvider",function(e,n){e.when("/",{controller:"HomeCtrl",templateUrl:"/templates/home.html"}).when("/people",{controller:"PeopleCtrl",templateUrl:"/templates/people.html"}).when("/people/:id",{controller:"PersonCtrl",templateUrl:"/templates/person.html"}).when("/things",{controller:"ThingsCtrl",templateUrl:"/templates/things.html"}).when("/things/:id",{controller:"ThingCtrl",templateUrl:"/templates/thing.html"}).when("/login",{controller:"LoginCtrl",templateUrl:"/templates/login.html"}),n.html5Mode(!0)}]),angular.module("myWorld").controller("HomeCtrl",["$scope","NavSvc",function(e,n){console.log("in home control"),n.setTab("Home"),e.message="I am the home control"}]),angular.module("myWorld").controller("NavCtrl",["$scope","NavSvc","AuthSvc",function(e,n,t){e.tabs=n.tabs,e.user=t.user,e.logout=function(){t.logout()}}]).directive("myWorldNav",function(){return{restrict:"E",templateUrl:"/templates/nav.html",controller:"NavCtrl",scope:{showLoginButton:"@",fooBar:"@"}}}).factory("NavSvc",function(){var e=[{title:"Home",path:"/",active:!0},{title:"People",path:"/people"},{title:"Things",path:"/things"}];return{tabs:e,setTab:function(n){e.forEach(function(e){e.active=e.title==n?!0:!1})}}}),angular.module("myWorld").controller("ThingsCtrl",["$scope","NavSvc",function(e,n){n.setTab("Things"),e.message="I am the things control"}]),angular.module("myWorld").controller("PeopleCtrl",["$scope","$location","NavSvc","PeopleSvc",function(e,n,t,o){function r(){o.getPeople().then(function(n){e.people=n})}t.setTab("People"),e.message="I am the people control",e.user=o.user,e["delete"]=function(n){o.deletePerson(n).then(function(){e.error=null,e.success="User has been deleted",r()},function(n){e.error=n})},e.edit=function(e){n.path("/people/"+e._id)},e.insert=function(){o.insertPerson(e.inserting).then(function(n){e.success="Insert successful for "+n.name,e.error=null,r()},function(n){e.error=n,e.success=null}),e.inserting.active=!0},r()}]),angular.module("myWorld").factory("PeopleSvc",["$q","$http","AuthSvc",function(e,n,t){return{user:t.user,deletePerson:function(o){var r=e.defer();return n["delete"]("/api/people/"+o._id+"/"+t.getToken()).then(function(e){r.resolve(e.data)},function(e){r.reject(e.data)}),r.promise},getPeople:function(){var t=e.defer();return n.get("/api/people").then(function(e){t.resolve(e.data)}),t.promise},getPerson:function(t){var o=e.defer();return n.get("/api/people/"+t).then(function(e){o.resolve(e.data)}),o.promise},insertPerson:function(o){var r=e.defer();return n.post("/api/people/"+t.getToken(),o).then(function(e){console.log(e),r.resolve(e.data)},function(e){r.reject(e.data)}),r.promise},updatePerson:function(o){var r=e.defer();return n.post("/api/people/"+o._id+"/"+t.getToken(),o).then(function(e){r.resolve(e.data)},function(e){r.reject(e.data)}),r.promise}}}]),angular.module("myWorld").controller("PersonCtrl",["$scope","$location","$routeParams","NavSvc","PeopleSvc",function(e,n,t,o,r){function l(){r.getPerson(t.id).then(function(n){e.person=n})}o.setTab("People"),e.save=function(){r.updatePerson(e.person).then(function(e){n.path("/people")},function(n){e.error=n})},l()}]),angular.module("myWorld").controller("ThingCtrl",["$scope","$location","$routeParams","NavSvc","ThingsSvc",function(e,n,t,o,r){function l(){r.getThing(t.id).then(function(n){e.thing=n})}o.setTab("Things"),e.save=function(){r.updateThing(e.thing).then(function(){n.path("/things")},function(n){e.error=n})},l()}]),angular.module("myWorld").controller("ThingsCtrl",["$scope","$location","NavSvc","ThingsSvc",function(e,n,t,o){function r(){o.getThings().then(function(n){e.things=n})}t.setTab("Things"),e.message="I am the things control",e.user=o.user,e["delete"]=function(n){o.deleteThing(n).then(function(){e.error=null,e.success="Thing has been deleted",r()},function(n){e.error=n})},e.edit=function(e){n.path("/things/"+e._id)},e.insert=function(){o.insertThing(e.inserting).then(function(n){e.success="Insert successful for "+n.name,e.error=null,r()},function(n){e.error=n,e.success=null})},r()}]),angular.module("myWorld").factory("ThingsSvc",["$q","$http","AuthSvc",function(e,n,t){return{user:t.user,deleteThing:function(o){var r=e.defer();return n["delete"]("/api/things/"+o._id+"/"+t.getToken()).then(function(e){r.resolve(e.data)},function(e){r.reject(e.data)}),r.promise},getThings:function(){var t=e.defer();return n.get("/api/things").then(function(e){t.resolve(e.data)}),t.promise},getThing:function(t){var o=e.defer();return n.get("/api/things/"+t).then(function(e){o.resolve(e.data)}),o.promise},insertThing:function(o){var r=e.defer();return n.post("/api/things/"+t.getToken(),o).then(function(e){console.log(e),r.resolve(e.data)},function(e){r.reject(e.data)}),r.promise},updateThing:function(o){var r=e.defer();return n.post("/api/things/"+o._id+"/"+t.getToken(),o).then(function(e){r.resolve(e.data)},function(e){r.reject(e.data)}),r.promise}}}]),angular.module("myWorld").run(["$templateCache",function(e){e.put("/templates/foo.html",'<div class="alert alert-warning">\n  I am the Foo Directive!!!! {{ message }}\n</div>'),e.put("/templates/home.html",'<div class="well">\n  {{ message }}\n</div>'),e.put("/templates/login.html",'<form>\n    <div class="form-group">\n        <label>Username</label>\n        <input class="form-control" ng-model="user.username"/> \n    </div>\n    <div class="form-group">\n        <label>Password</label>\n        <input class="form-control" type="password" ng-model="user.password" /> \n    </div>\n    <button class="btn btn-default" ng-click="login()">Login</button>\n</form>\n<div class="alert alert-danger" ng-show="error">{{ error }}</div>\n<div class="alert alert-success" ng-show="token">{{ token }}</div>'),e.put("/templates/nav.html",'{{fooBar}}\n<div class="navbar navbar-default">\n  <div class="container-fluid">\n    <ul class="nav navbar-nav">\n      <li ng-repeat="tab in tabs" ng-class="{active: tab.active}">\n          <a href="{{tab.path}}">\n            {{ tab.title }}\n          </a>\n      </li>\n    </ul>\n    <div class="navbar-right navbar-form" ng-show="showLoginButton">\n      <a class="btn btn-default" href="/login" ng-hide="user.authenticated()">Login</a> \n      <button class="btn btn-default" ng-click="logout()" ng-show="user.authenticated()">Logout {{ user.username }}</button> \n    </div>\n  </div>\n</div>'),e.put("/templates/people.html",'<div class="alert alert-danger" ng-show="error">\n  {{ error }}\n</div>\n\n<div class="alert alert-success" ng-show="success">\n  {{ success }}\n</div>\n\n<div class="row">\n  <div class="col-md-6 col-md-offset-3 well">\n    <form style="margin: 10px 0" ng-show="user.authenticated()">\n      <div class="form-group">\n        <label>Name</label>\n        <input type="text" class="form-control" ng-model="inserting.name">\n      </div>\n      <!-- Adding ability to select is person is active/inactive -->\n      <div class="checkbox">\n        <label>\n          <input type="checkbox" ng-model="inserting.active" /> Active\n        </label>\n      </div>\n      <!-- Adding ability to add a color to a person -->\n      <div class="form-group">\n        <label>Person Color</label>\n        <select class="form-control" ng-model="inserting.color">\n          <option value="red">Red</option>\n          <option value="organge">Orange</option>\n          <option value="blue">Blue</option>\n          <option value="purple">Purple</option>\n          <option value="turquoise">Turquoise</option>\n        </select>\n      </div>\n      <button class="btn btn-success" ng-click="insert()">Save</button>\n    </form>\n  </div>\n</div>\n<ul class="list-group">\n  <li class="list-group-item" ng-repeat="person in people">\n    <div class="row">\n      <div class="col-md-9">\n        {{ person.name }}\n        <br />\n        <span class="label" ng-class="{\'label-warning\': !person.active, \'label-success\': person.active}">{{ person.active? "active" : "inactive" }}</span>\n        <br />\n        <div class="label" style="background-color: {{ person.color }}">\n          {{ person.color }}\n        </div>\n      </div>\n      <div class="col-md-3 text-right">\n        <button ng-click="edit(person)" class="btn btn-primary" ng-show="user.authenticated()">Edit</button>\n        <button ng-click="delete(person)" class="btn btn-danger" ng-show="user.authenticated()" ng-disabled="person.active">Delete</button>\n      </div>\n    </div>\n  </li>\n</ul>\n<h6>{{ user }}</h6>'),e.put("/templates/person.html",'<div class="alert alert-danger" ng-show="error">\n  {{ error }}\n</div>\n\n<div class="alert alert-success" ng-show="success">\n  {{ success }}\n</div>\n\n<div class="row">\n  <div class="col-md-6 col-md-offset-3 well">\n    <form style="margin: 10px 0" ng-show="user.authenticated()">\n      <div class="form-group">\n        <label>Name</label>\n        <input type="text" class="form-control" ng-model="inserting.name">\n      </div>\n      <div class="checkbox">\n        <label>\n          <input type="checkbox" checked disabled /> Active\n        </label>\n      </div>\n<!-- Adding option to add a color to a person -->\n      <div class="form-group">\n        <label>Color</label>\n        <select class="form-control" ng-model="inserting.color">\n            <option value="green">Green</option>\n            <option value="orange">Orange</option>\n            <option value="yellow">Yellow</option>\n            <option value="purple">Purple</option>\n            <option value="turquoise">Turquoise</option>\n        </select>\n      </div>\n<!-- Adding ability to say if user is active or not -->\n      <div class="form-group">\n        <label>Is this user Active??</label>\n        <select class="form-control" ng-model="person.active">\n            <option value="true">Yes</option>\n            <option value="false">No</option>\n        </select>\n    </div>\n      <button class="btn btn-success" ng-click="insert()">Save</button>\n    </form>\n  </div>\n</div>\n<ul class="list-group">\n  <li class="list-group-item" ng-repeat="person in people">\n    <div class="row">\n      <div class="col-md-9">\n        {{ person.name }}\n        <br />\n        <span class="label" ng-class="{\'label-warning\': !person.active, \'label-success\': person.active}">{{ person.active? "active" : "inactive" }}</span>\n        <br />\n        <div class="label" style="background-color: {{ person.color }}">\n          {{ person.color }}\n        </div>\n      </div>\n      <div class="col-md-3 text-right">\n        <button ng-click="edit(person)" class="btn btn-primary" ng-show="user.authenticated()">Edit</button>\n        <button ng-click="delete(person)" class="btn btn-danger" ng-show="user.authenticated()" ng-disabled="person.active">Delete</button>\n      </div>\n    </div>\n  </li>\n</ul>\n<h6>{{ user }}</h6>'),e.put("/templates/things.html",'<!-- make new thing based off of person.html -->\n\n<form>\n    <div class="form-group">\n        <label>Thing Name</label>\n        <input class="form-control" ng-model="thing.name" />\n    </div>\n    <div class="form-group">\n        <label>ThingColor</label>\n        <select class="form-control" ng-model="thing.color">\n			<option value="green">Green</option>\n            <option value="orange">Orange</option>\n            <option value="yellow">Yellow</option>\n            <option value="purple">Purple</option>\n            <option value="turquoise">Turquoise</option>\n        </select>\n    </div>\n    <div class="form-group">\n        <label>Thing Description</label>\n        <input class="form-control" ng-model="thing.description" />\n    </div>\n    <button class="btn btn-success" ng-click="save()">Save</button>\n</form>')}]);