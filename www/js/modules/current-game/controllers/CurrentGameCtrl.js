angular.module('app')
.controller('CurrentGameCtrl', ['$scope', '$state', 'GameSvc', '$timeout', 'NotificationSvc', function CurrentGameCtrl($scope, $state, GameSvc, $timeout, NotificationSvc) {

  const vm = this;
  vm.grid = new Array(3);
  vm.grid_size = 3;
  vm.invalidMove = false;

  vm.initializeGame = function() {
    vm.marks = {
      X: 'x',
      O: 'o',
      count: 0
    };

    vm.currentTurn = 1;
    vm.data = {};
  };

  vm.empty = function() {
    vm.data = {};
    vm.marks.count = 0;
    vm.currentTurn = 1;
  };

  vm.gameOver = function(hasWinner, isDraw, currentMark) {
    if (isDraw) {
      NotificationSvc.add('It\'s a draw!');
      return isDraw;
    }
    NotificationSvc.add('Winner!', currentMark);
    return hasWinner;
  };

  vm.markPosition = function(rowIndex, colIndex) {
    vm.invalidMove = false;
    if (vm.data[rowIndex + '' + colIndex]) {
      vm.invalidMove = true;
      return;
    }

    vm.marks.count++;

    let currentMark = vm.marks.count % 2 === 1 ? vm.marks.X : vm.marks.O;
    this.currentTurn = this.currentTurn === 1 ? 2 : 1;
    vm.data[rowIndex + '' + colIndex] = currentMark;

    // Placing timeout here to display the
    // final mark
    $timeout(function() {
      const isWinner = GameSvc.didWin(currentMark, vm.data);
      const isDraw = vm.marks.count === 3 * 3;
      if (isWinner || isDraw) {
        vm.gameOver(isWinner, isDraw, currentMark);
        vm.empty();
      }
    });
  };

  vm.initializeGame();
}]);
