// Code goes here

angular.module('ui.bootstrap.demo', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angular.module('ui.bootstrap.demo').controller('ModalDemoCtrl', function ($uibModal, $log) {
  var pc = this;
  pc.data = "Lorem Name Test";

  pc.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: './myModalContent.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: 'pc',
      size: size,
      resolve: {
        data: function () {
          return pc.data;
        }
      }
    });

    modalInstance.result.then(function () {
      alert("now I'll close the modal");
    });
  };
});

angular.module('ui.bootstrap.demo').controller('ModalInstanceCtrl', function ($uibModalInstance, data) {
  var pc = this;
  pc.data = data;

  pc.ok = function () {
    //{...}
    alert("You clicked the ok button.");
    $uibModalInstance.close();
  };

  pc.cancel = function () {
    //{...}
    alert("You clicked the cancel button.");
    $uibModalInstance.dismiss('cancel');
  };
});
