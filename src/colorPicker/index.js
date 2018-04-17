/**
 * <directive>
 * @description 颜色选择器
 * @date 2018-04-16
 * @author 程乐
 * @lastBy
 * @html <div color-picker-directive init-color="initColor"></div>
 */
import 'bootstrap-colorpicker';
import html from './colorPicker.html';

export default (app, elem, attrs, scope) => {
  app.directive('colorPickerDirective', [
    '$http',
    '$timeout',
    function ($http, $timeout) {
      return {
        template: html,
        restrict: 'EA',
        scope: {
            initColor: '=', 
        },
        controller($scope, $element, $attrs) {
            $element.colorpicker({color:$scope.initColor});
        },

        link($scope, $element, $attrs, ngModel) {},
      };
    },
  ]);
};
