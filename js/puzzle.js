
function CubeCtrl($scope, $locale) {
  $scope.colors = ["red", "red ", "blue", "blue "];
  $scope.height = 4;
  $scope.answer = [];
  $scope.lays = _.range($scope.colors.length);
  $scope.$white = undefined;

  // Domready
  angular.element(document).ready(function () {
    $scope.$white = angular.element(".white");
  });

  // $scope.eatKeydown = function(e){
  //   if(e.keyCode > 36 && e.keyCode < 41){
  //     e.preventDefault();
  //   }
  // }

  $scope.goThroughQueue = function(){
    var pathArray = $scope.queue.replace(/ /gi, "").replace(/L/gi, "37").replace(/U/gi, "38").replace(/R/gi, "39").replace(/D/gi, "40").match(/.{1,2}/g);
    _.each(pathArray, function(dir, i){
      dir = parseInt(dir)
      _.delay($scope.moveQueue, 30*i, dir);
    })
  };

  $scope.moveQueue = function(e){

    // prevent keydown default
    var keyCode;
    if(_.isNumber(e)){
      keyCode = e; 
    } else{
      keyCode = e.keyCode;
      if(e.keyCode > 36 && e.keyCode < 41){
        e.preventDefault();
      } 
    }

    switch (keyCode)
    {
      case 37:
        console.log( "L " );
        $scope.moveLeft()
        break;

      case 38:
        console.log( "U " );
        $scope.moveUp();
        break;

      case 39:
        console.log( "R " );
        $scope.moveRight()
        break;

      case 40:
        console.log( "D " );
        $scope.moveDown();
        break;
    }
    
  }

  $scope.render = function (lay, index, color) {
    if (lay == 0 && index == 0){
      return "white";
    } else {return color;}
  }

  $scope.reset = function () {
    var copy = $scope.colors[2];
    $scope.colors[2] = copy + " ";
  }

  $scope.increase = function () {
    $scope.lays = _.range($scope.colors.length + 1);
    var newColor = _.last($scope.colors) + " ";
    $scope.colors.push(newColor);
  }

  $scope.decrease = function () {
    if($scope.colors.length === 3) return false;
    $scope.lays = _.range($scope.colors.length - 1);
    $scope.colors.pop();
  }
  
  $scope.moveLeft = function(){
    var coordinate = $scope.$white.prevUntil( "ul" ).size();
    if (coordinate == 0) return false;
    var $exchanger = $scope.$white.prev("li");
    $scope.exchangeElements($scope.$white, $exchanger)
    $scope.answer.push("L")
  }

  $scope.moveRight = function(){
    var coordinate = $scope.$white.prevUntil( "ul" ).size();
    if (coordinate + 1 == $scope.colors.length) return false;
    var $exchanger = $scope.$white.next("li");
    $scope.exchangeElements($scope.$white, $exchanger)
    $scope.answer.push("R")
  }

  $scope.moveUp = function (){
    var coordinate = $scope.$white.prevUntil( "ul" ).size();
    var $prevUl = $scope.$white.closest("ul").prev("ul");
    if ($prevUl.size() == 0) return false;
    var $exchanger = $prevUl.find("li").eq(coordinate)
    $scope.exchangeElements($scope.$white, $exchanger)
    $scope.answer.push("U")
  }

  $scope.moveDown = function (){
    var coordinate = $scope.$white.prevUntil( "ul" ).size();
    var $nextUl = $scope.$white.closest("ul").next("ul");
    if ($nextUl.size() == 0) return false;
    var $exchanger = $nextUl.find("li").eq(coordinate)
    $scope.exchangeElements($scope.$white, $exchanger)
    $scope.answer.push("D")
  }

  $scope.exchangeElements = function (a, b){
    var cloneA = a.clone();
    a.before(cloneA)
    b.before(a);
    cloneA.before(b).remove();
  }
}

