angular.module('app')
.factory('GameSvc', gameSvc);

  function gameSvc() {
    const service = {
      didWin
    };

    function didWin(mark, gameData) {
      let vertical_count = 0,
          horizontal_count = 0,
          right_to_left_count = 0,
          left_to_right_count = 0;

      for (let i = 0; i < 3; i++) {
        vertical_count = 0;
        horizontal_count = 0;

        for (let j = 0; j < 3; j++) {
          if (gameData[i + '' + j] === mark) {
            horizontal_count++;
          }

          if (gameData[j + '' + i] === mark) {
            vertical_count++;
          }
        }

        if (gameData[i + '' + i] == mark) {
            left_to_right_count++;
        }

        if (gameData[(3 - 1 - i) + '' + i] == mark) {
            right_to_left_count++;
        }

        if (horizontal_count == 3 || vertical_count == 3) {
            return true;
        }
      }

      if(left_to_right_count == 3 || right_to_left_count == 3) {
        return true;
      }

      return false;
    }
    
    return service;
  }
