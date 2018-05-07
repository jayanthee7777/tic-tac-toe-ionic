angular.module('app')
.factory('NotificationSvc', notificationSvc);

  notificationSvc.$inject = ['$timeout', '$ionicPopup'];

  function notificationSvc($timeout, $ionicPopup) {
    const service = {
      add
    };

    function add(title, winningMark, callback) {
      let winnerTemplate = '<span class="mark-icon-large" ng-include="\'../../../../img/x-icon.svg\'"></span>';
      if (!winningMark) {
        winnerTemplate = '';
      }

      if (winningMark === 'o') {
        winnerTemplate = '<span class="mark-icon-large" ng-include="\'../../../../img/o-icon.svg\'"></span>';
      }

      const notification = $ionicPopup.show({
        title,
        template: winnerTemplate,
        cssClass: !winningMark ? 'alert-as-notification is-draw' : 'alert-as-notification',
        buttons: [
          {
            text: 'REMATCH',
            type: 'button-light',
            onTap: (e) => {
              e.preventDefault();
              notification.close();
            }
          }
        ]
      });
      notification.then(res => {});
    }

    return service;
  }
