var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
var refresn = function () {

    $http.get('/contactlist').success(function (response) {
        $scope.contactlist = response;
        $scope.contact = "";
    });
};
refresn();

$scope.addContact = function () {         //click ทำฟังชันนี้
    console.log($scope.contact);
    $http.post('/contactlist', $scope.contact).success(function (response) {
        console.log(response);
        refresn();
        $.smkAlert({ text: "success insert", type:'success', position:'bottom-right'});
    });
};

$scope.remove =  function(id) {
    $.smkConfirm({
        text:'want delete?',
        accept:'yes',
        cancel:'no'
    },function(res) {
        if(res) {
            console.log(id);
            $http.delete('/contactlist/' + id).success(function (response) {
                refresn();
            });
        }
    });
};

$scope.edit = function (id) {
    console.log(id);
    $http.get('/contactlist/' + id).success(function (response) {
        $scope.contact = response;    //คือค่า form ที่จะอัพเด
    });
};

$scope.update = function () {
    console.log($scope.contact._id);
    $http.put('/contactlist/'+ $scope.contact._id, $scope.contact).success(function (response) {
       refresn();
        $.smkAlert({ text: "success Update", type:'warning', position:'bottom-right'});
    });
};

$scope.deselect = function () {
    $scope.contact = "";
};


}]);
