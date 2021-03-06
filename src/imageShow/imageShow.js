/**
 * <directive>
 * @description 图片展示
 * @date 2017-08-03
 * @author 程乐
 * @lastBy
 * @html <img image-show img-url="item.imageurl" alt-text="'卸货凭证'" text-only="显示文字" bg-click="false" mini-img="false">
 */
import html from './imageShow.html';
import './imageShow.css';

export default (app, elem, attrs, scope) => {
  app.directive('imageShow', ['$timeout', '$document', '$compile',
    function ($timeout, $document, $compile) {
      return {
        template: html,
        restrict: 'EA',
        replace: true,
        scope: {
          imgUrl: '=',
          altText: '=',
          textOnly: '=',
          bgClick: '=',
          customCss: '=',
          clickFun: '=',
          miniImg: '=',
          showClick: '='
        },
        link: function postLink() {

        },
        controller($scope, $element, $attrs, $transclude, $log, $http, G) {
          let current = 0;
          let rotateW,
            rotateH;
          if ($scope.miniImg) {
            if ($scope.imgUrl.substr(-4, 4) == '.png') {
              $scope.miniImgUrl = $scope.imgUrl.replace('.png', '_100x100.png');
            } else if ($scope.imgUrl.substr(-4, 4) == '.jpg') {
              $scope.miniImgUrl = $scope.imgUrl.replace('.jpg', '_100x100.jpg');
            } else if ($scope.imgUrl.substr(-4, 4) == '.gif') {
              $scope.miniImgUrl = $scope.imgUrl.replace('.gif', '_100x100.gif');
            }
          }
          // $scope.customCss = $scope.customCss || false;
          const html = $compile(`
                            <a href="javascript:;" class="imgShowClosBtn"></a>
                            <div class="imgUrlBox">
                                <img>
                            </div>
                            <div class="imgUrlControl">
                                    <span class="mr50 anticlockwise">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" xmlns:xlink="http://www.w3.org/1999/xlink">
                                            <defs>
                                                <polygon id="a" points=".002 .019 .002 27.965 27.971 27.965 27.971 .019"/>
                                            </defs>
                                            <g fill="none" fill-rule="evenodd">
                                                <g transform="matrix(-1 0 0 1 28 0)">
                                                <mask id="b" fill="white">
                                                    <use xlink:href="#a"/>
                                                </mask>
                                                <path fill="#FFFFFF" d="M13.9352609,0.0913757803 C17.148794,0.0913757803 20.1906916,1.17750312 22.6575581,3.16602747 L25.7991161,0.0192958801 L27.971196,10.8872809 L17.11604,8.71411735 L20.6127541,5.21411735 C18.6950512,3.74923845 16.3483645,2.95684894 13.9352609,2.95929588 C7.83035206,2.95929588 2.86369039,7.93144569 2.86369039,14.0425069 C2.86369039,15.0734382 3.0056829,16.0948265 3.28466916,17.0790562 C3.43952559,17.6221024 3.63465169,18.1534032 3.86798502,18.6604095 L1.26429963,19.8589213 C0.969617978,19.2134532 0.723560549,18.5469413 0.528154806,17.8649089 L0.528154806,17.8639301 C0.180234707,16.6251835 0,15.3386167 0,14.0425069 C0,6.34897378 6.25116604,0.0913757803 13.9352609,0.0913757803 Z M7.64053933,23.1626767 L6.00933833,25.5203396 C4.984,24.8101323 4.0580774,23.9662871 3.25600499,23.0109663 L5.45154057,21.1666367 C6.08896879,21.9259576 6.82493883,22.5973633 7.64053933,23.1636554 L7.64053933,23.1626767 Z M20.2118402,26.5025069 C19.0983071,27.0645343 17.913603,27.4761099 16.6906916,27.7232509 L16.1253783,24.9115755 C17.0980025,24.7164494 18.0366492,24.3918801 18.9190162,23.9442996 L20.2129238,26.5025069 L20.2118402,26.5025069 Z M24.8891685,15.6652484 L27.72402,16.0788514 C27.6214931,16.7798652 27.4655531,17.472035 27.2574582,18.1491735 L24.5200649,17.3049089 C24.6846042,16.7685393 24.8080699,16.2204594 24.8891685,15.6652484 Z M25.6845643,21.5484295 C25.0130187,22.5991461 24.2043745,23.5557953 23.2801998,24.3929988 L21.3583021,22.266397 C22.0937478,21.6012484 22.7366292,20.8404245 23.269573,20.0041998 L25.6845643,21.5484295 Z M10.2740075,24.5075506 L9.32690137,27.215161 C10.5045094,27.6284844 11.7324894,27.8806941 12.9775281,27.9650787 L13.1737378,25.1024719 C12.1848589,25.0354257 11.2096479,24.8356854 10.2740075,24.5084944 L10.2740075,24.5075506 Z" mask="url(#b)"/>
                                                </g>
                                                <path fill="#FFFFFF" d="M8.84517047,13.3124165 C8.50586745,13.6898823 8.34322633,14.1708011 8.34322633,14.76961 C8.34322633,15.3682739 8.50586745,15.8371135 8.84517047,16.18712 C9.1588505,16.5514184 9.59808666,16.7340573 10.1638604,16.7340573 C10.7168753,16.7340573 11.1677837,16.5514184 11.4943278,16.18712 C11.8208719,15.8239461 11.9835481,15.3285903 11.9835481,14.7299264 C11.9835481,14.1190746 11.8080079,13.6370313 11.481604,13.2860454 C11.1433876,12.9227626 10.7030648,12.7400875 10.1765843,12.7400875 C9.62356944,12.7400875 9.17157436,12.921747 8.84517047,13.3124165 L8.84517047,13.3124165 Z M12.6248939,12.8049814 C13.1779087,13.5984721 13.4650544,14.704571 13.4650544,16.1353935 C13.4650544,17.6443136 13.1640983,18.8669966 12.5738232,19.8035878 C11.9590468,20.7413396 11.1433876,21.2222222 10.1127897,21.2222222 C8.36867406,21.2222222 7.38928712,20.3770412 7.16267617,18.6986497 L8.49314359,18.6986497 C8.66963023,19.5955934 9.22155846,20.0522451 10.1256538,20.0522451 C10.7414116,20.0522451 11.2317185,19.7265058 11.6070199,19.1014709 C11.9590468,18.5026983 12.1473109,17.7477304 12.1473109,16.8508229 C12.1473109,16.7990963 12.134587,16.7472247 12.134587,16.6812063 L12.0846029,16.6812063 C11.847862,17.0650563 11.5192498,17.3790428 11.1306637,17.5925871 C10.7657728,17.7741015 10.3521245,17.878679 9.88740558,17.878679 C9.00893324,17.878679 8.29215562,17.5792746 7.76567511,16.9937782 C7.25097207,16.4214854 7,15.679685 7,14.76961 C7,13.8329827 7.2882323,13.078051 7.89123125,12.4803666 C8.49314359,11.8683903 9.23442253,11.5691309 10.1256538,11.5691309 C11.217873,11.5691309 12.0473427,11.9718434 12.6248939,12.8049814 L12.6248939,12.8049814 Z M19.3813003,9.52306749 C19.3907293,9.28333354 19.2725691,9.0574562 19.0733688,8.93459663 C18.8741334,8.81188215 18.6260356,8.81188215 18.4268002,8.93459663 C18.2275999,9.0574562 18.1094397,9.28333354 18.1188687,9.52306749 C18.1328545,9.87347299 18.4112021,10.1500612 18.7500845,10.1500612 C19.0888267,10.1500612 19.3673145,9.87347299 19.3813003,9.52306749 Z M20.2245804,9.52306749 C20.2252815,10.3653103 19.5659891,11.0484197 18.7521526,11.0491089 C17.9384212,11.0496892 17.2783226,10.3674142 17.2776216,9.52531647 C17.2770958,8.68350896 17.9360727,8.00054469 18.7495237,8.00000058 C19.5629746,7.9992751 20.2229681,8.68125998 20.2234938,9.52306749 L20.2245804,9.52306749 Z M16.2025077,14.0278096 C15.9770184,14.6001386 15.8770502,15.3936293 15.8770502,16.3951143 C15.8770502,17.3845565 15.9770184,18.1780472 16.2034892,18.7635436 C16.5044453,19.5955934 17.0192535,20.0247858 17.7605675,20.0247858 C18.4878958,20.0247858 19.0154279,19.5955934 19.316384,18.7635436 C19.5301309,18.1780472 19.6429632,17.3845565 19.6429632,16.3951143 C19.6429632,15.3936293 19.5301309,14.601118 19.316384,14.0278096 C19.0154279,13.1824835 18.4878958,12.7654792 17.7605675,12.7654792 C17.0192535,12.7654792 16.5044453,13.1824835 16.2034892,14.0278096 L16.2025077,14.0278096 Z M20.2087019,12.9481181 C20.7361288,13.8065027 21,14.9511244 21,16.3951143 C21,17.825828 20.7361288,18.9847416 20.2087019,19.8432714 C19.6311857,20.7533826 18.8155265,21.2222222 17.7605675,21.2222222 C16.7054333,21.2222222 15.8886875,20.7533826 15.3113115,19.8432714 C14.7837444,18.9847416 14.5200134,17.8401199 14.5200134,16.3951143 C14.5200134,14.9379208 14.7837444,13.7933353 15.3113115,12.9481181 C15.8886875,12.0235336 16.7044869,11.5691309 17.7605675,11.5691309 C18.8144399,11.5691309 19.6311857,12.0246944 20.2087019,12.9481181 L20.2087019,12.9481181 Z"/>
                                            </g>
                                        </svg>
                                    </span>
                                    <span class="clockwise">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" xmlns:xlink="http://www.w3.org/1999/xlink">
                                            <defs>
                                                <polygon id="a" points=".002 .019 .002 27.965 27.971 27.965 27.971 .019"/>
                                            </defs>
                                            <g fill="none" fill-rule="evenodd">
                                                <mask id="b" fill="white">
                                                <use xlink:href="#a"/>
                                                </mask>
                                                <path fill="#FFFFFF" d="M13.9352609,0.0913757803 C17.148794,0.0913757803 20.1906916,1.17750312 22.6575581,3.16602747 L25.7991161,0.0192958801 L27.971196,10.8872809 L17.11604,8.71411735 L20.6127541,5.21411735 C18.6950512,3.74923845 16.3483645,2.95684894 13.9352609,2.95929588 C7.83035206,2.95929588 2.86369039,7.93144569 2.86369039,14.0425069 C2.86369039,15.0734382 3.0056829,16.0948265 3.28466916,17.0790562 C3.43952559,17.6221024 3.63465169,18.1534032 3.86798502,18.6604095 L1.26429963,19.8589213 C0.969617978,19.2134532 0.723560549,18.5469413 0.528154806,17.8649089 L0.528154806,17.8639301 C0.180234707,16.6251835 0,15.3386167 0,14.0425069 C0,6.34897378 6.25116604,0.0913757803 13.9352609,0.0913757803 Z M7.64053933,23.1626767 L6.00933833,25.5203396 C4.984,24.8101323 4.0580774,23.9662871 3.25600499,23.0109663 L5.45154057,21.1666367 C6.08896879,21.9259576 6.82493883,22.5973633 7.64053933,23.1636554 L7.64053933,23.1626767 Z M20.2118402,26.5025069 C19.0983071,27.0645343 17.913603,27.4761099 16.6906916,27.7232509 L16.1253783,24.9115755 C17.0980025,24.7164494 18.0366492,24.3918801 18.9190162,23.9442996 L20.2129238,26.5025069 L20.2118402,26.5025069 Z M24.8891685,15.6652484 L27.72402,16.0788514 C27.6214931,16.7798652 27.4655531,17.472035 27.2574582,18.1491735 L24.5200649,17.3049089 C24.6846042,16.7685393 24.8080699,16.2204594 24.8891685,15.6652484 Z M25.6845643,21.5484295 C25.0130187,22.5991461 24.2043745,23.5557953 23.2801998,24.3929988 L21.3583021,22.266397 C22.0937478,21.6012484 22.7366292,20.8404245 23.269573,20.0041998 L25.6845643,21.5484295 Z M10.2740075,24.5075506 L9.32690137,27.215161 C10.5045094,27.6284844 11.7324894,27.8806941 12.9775281,27.9650787 L13.1737378,25.1024719 C12.1848589,25.0354257 11.2096479,24.8356854 10.2740075,24.5084944 L10.2740075,24.5075506 Z" mask="url(#b)"/>
                                                <path fill="#FFFFFF" d="M8.84517047,13.0901942 C8.50586745,13.46766 8.34322633,13.9485789 8.34322633,14.5473878 C8.34322633,15.1460516 8.50586745,15.6148913 8.84517047,15.9648978 C9.1588505,16.3291962 9.59808666,16.5118351 10.1638604,16.5118351 C10.7168753,16.5118351 11.1677837,16.3291962 11.4943278,15.9648978 C11.8208719,15.6017239 11.9835481,15.106368 11.9835481,14.5077042 C11.9835481,13.8968524 11.8080079,13.414809 11.481604,13.0638231 C11.1433876,12.7005404 10.7030648,12.5178652 10.1765843,12.5178652 C9.62356944,12.5178652 9.17157436,12.6995247 8.84517047,13.0901942 L8.84517047,13.0901942 Z M12.6248939,12.5827592 C13.1779087,13.3762499 13.4650544,14.4823488 13.4650544,15.9131713 C13.4650544,17.4220914 13.1640983,18.6447744 12.5738232,19.5813655 C11.9590468,20.5191174 11.1433876,21 10.1127897,21 C8.36867406,21 7.38928712,20.154819 7.16267617,18.4764274 L8.49314359,18.4764274 C8.66963023,19.3733712 9.22155846,19.8300229 10.1256538,19.8300229 C10.7414116,19.8300229 11.2317185,19.5042836 11.6070199,18.8792487 C11.9590468,18.280476 12.1473109,17.5255081 12.1473109,16.6286006 C12.1473109,16.5768741 12.134587,16.5250025 12.134587,16.4589841 L12.0846029,16.4589841 C11.847862,16.8428341 11.5192498,17.1568206 11.1306637,17.3703648 C10.7657728,17.5518792 10.3521245,17.6564568 9.88740558,17.6564568 C9.00893324,17.6564568 8.29215562,17.3570523 7.76567511,16.7715559 C7.25097207,16.1992632 7,15.4574627 7,14.5473878 C7,13.6107604 7.2882323,12.8558288 7.89123125,12.2581444 C8.49314359,11.6461681 9.23442253,11.3469087 10.1256538,11.3469087 C11.217873,11.3469087 12.0473427,11.7496211 12.6248939,12.5827592 L12.6248939,12.5827592 Z M19.3813003,9.30084527 C19.3907293,9.06111131 19.2725691,8.83523398 19.0733688,8.71237441 C18.8741334,8.58965993 18.6260356,8.58965993 18.4268002,8.71237441 C18.2275999,8.83523398 18.1094397,9.06111131 18.1188687,9.30084527 C18.1328545,9.65125077 18.4112021,9.92783897 18.7500845,9.92783897 C19.0888267,9.92783897 19.3673145,9.65125077 19.3813003,9.30084527 Z M20.2245804,9.30084527 C20.2252815,10.1430881 19.5659891,10.8261974 18.7521526,10.8268866 C17.9384212,10.827467 17.2783226,10.1451919 17.2776216,9.30309425 C17.2770958,8.46128673 17.9360727,7.77832246 18.7495237,7.77777836 C19.5629746,7.77705288 20.2229681,8.45903775 20.2234938,9.30084527 L20.2245804,9.30084527 Z M16.2025077,13.8055873 C15.9770184,14.3779163 15.8770502,15.1714071 15.8770502,16.1728921 C15.8770502,17.1623342 15.9770184,17.955825 16.2034892,18.5413214 C16.5044453,19.3733712 17.0192535,19.8025635 17.7605675,19.8025635 C18.4878958,19.8025635 19.0154279,19.3733712 19.316384,18.5413214 C19.5301309,17.955825 19.6429632,17.1623342 19.6429632,16.1728921 C19.6429632,15.1714071 19.5301309,14.3788957 19.316384,13.8055873 C19.0154279,12.9602613 18.4878958,12.543257 17.7605675,12.543257 C17.0192535,12.543257 16.5044453,12.9602613 16.2034892,13.8055873 L16.2025077,13.8055873 Z M20.2087019,12.7258958 C20.7361288,13.5842805 21,14.7289022 21,16.1728921 C21,17.6036058 20.7361288,18.7625194 20.2087019,19.6210491 C19.6311857,20.5311603 18.8155265,21 17.7605675,21 C16.7054333,21 15.8886875,20.5311603 15.3113115,19.6210491 C14.7837444,18.7625194 14.5200134,17.6178977 14.5200134,16.1728921 C14.5200134,14.7156985 14.7837444,13.5711131 15.3113115,12.7258958 C15.8886875,11.8013114 16.7044869,11.3469087 17.7605675,11.3469087 C18.8144399,11.3469087 19.6311857,11.8024721 20.2087019,12.7258958 L20.2087019,12.7258958 Z"/>
                                            </g>
                                        </svg>
                                    </span>
                                </div>`)($scope);

          if ($('.imgUrlBox').length <= 0) {
            $document.find('body').append(html);
            $document.find('body').append('<div class="modal-backdrop fade in" style="z-index: 9999;opacity: 0; display:none;" id="imgUrlBoxBG"></div>');
          }
          if($('#imgUrlBoxBG').length <= 0){
            $document.find('body').append('<div class="modal-backdrop fade in" style="z-index: 9999;opacity: 0; display:none;" id="imgUrlBoxBG"></div>');
          }
          // $scope.altText = $scope.altText || '';
          $scope.imgClick = function ($event, url) {
            if ($event) {
              var x = $event.pageX || $event.clientX + $(window).scrollLeft();
              var y = $event.pageY || $event.clientY + $(window).scrollTop();
            }

            $('.imgUrlBox').css({
              position: 'absolute', top: y, left: x, width: '1px', height: '1px', overflow: 'hidden',
            });
            $('.imgUrlBox img').remove();
            $('.imgUrlBox').append(`<img src=${url}>`);// 添加大图
            $('.imgUrlBox').show();

            const img = new Image();
            img.src = $('.imgUrlBox img').attr('src');
            img.onload = function () {
              const data = imgData(true, {
                width: img.width,
                height: img.height,
              });

              $('.imgUrlBox img').css({ width: '100%' });
              if (data.imgHeight === 'auto') {
                $('.imgUrlBox').css({
                  left: data.w, top: data.h, width: data.imgWidth, height: '100%', transition: 0.2,
                });
                $('#imgUrlBoxBG').show().css({ opacity: 0.8, transition: 0.2 });
                $timeout(() => {
                  $('.imgShowClosBtn,.imgUrlControl').show();
                }, 150);
              } else if (data.imgWidth === 'auto') {
                $('.imgUrlBox').css({
                  left: data.w, top: data.h, width: '100%', height: data.imgHeight, transition: 0.2,
                });
                $('#imgUrlBoxBG').show().css({ opacity: 0.8, transition: 0.2 });
                $timeout(() => {
                  $('.imgShowClosBtn,.imgUrlControl').show();
                }, 150);
              } else {
                $('.imgUrlBox').css({
                  left: data.w, top: data.h, width: data.imgWidth, height: data.imgHeight, transition: 0.2,
                });
                $('#imgUrlBoxBG').show().css({ opacity: 0.8, transition: 0.2 });
                $timeout(() => {
                  $('.imgShowClosBtn,.imgUrlControl').show();
                }, 150);
              }
            };
          };
          
          function imgData(type, obj) {
            const data = {};
            const windowW = $(window).width();
            const windowH = $(window).height();

            if (type) {
              var realWidth = obj.width;
              var realHeight = obj.height;
            }
            let imgWidth,
              imgHeight;
            const scale = 0.9;
            if (type) {
              if (realHeight > windowH * scale) {
                imgHeight = windowH * scale - 80;
                imgWidth = imgHeight / realHeight * realWidth;
                if (imgWidth > windowW * scale) {
                  imgWidth = windowW * scale;
                }
              } else if (realWidth > windowW * scale) {
                imgWidth = windowW * scale;
                imgHeight = imgWidth / realWidth * realHeight;
              } else {
                if(windowH-(92+80) > realHeight){
                  imgHeight = realHeight;
                  imgWidth = realWidth;
                }else{
                  imgHeight = realHeight - 80;
                  imgWidth = realWidth - 80;
                }
              }
              rotateW = imgWidth;
              rotateH = imgHeight;

              data.x2 = windowW / 2 - realWidth / 2 + $(window).scrollLeft();// 在屏幕居中的坐标
              data.y2 = windowH / 2 - realHeight / 2 + $(window).scrollTop();
              current = 0;

              // 图片旋转
              $('.imgUrlControl .anticlockwise').off().on('click', () => {
                rotate('left');
                return false;
              });
              $('.imgUrlControl .clockwise').off().on('click', () => {
                rotate('right');
                return false;
              });
            } else if (!((current / 90) % 2) || rotateW <= rotateH) {
              imgWidth = rotateW;
              imgHeight = rotateH;
            } else if (rotateW > windowH * scale) {
              imgWidth = windowH * scale - 80;
              imgHeight = imgWidth / rotateW * rotateH;
              if (imgHeight > windowW * scale) {
                imgHeight = windowW * scale;
              }
            } else if (rotateH > windowW * scale) {
              imgHeight = windowW * scale;
              imgWidth = imgHeight / rotateH * rotateW;
            } else {
              imgHeight = rotateH;
              imgWidth = rotateW;
            }

            data.w = (windowW - imgWidth) / 2;
            data.h = (windowH - imgHeight) / 2 - 50;
            if (imgWidth <= 1) {
              data.imgWidth = 'auto';
            } else {
              data.imgWidth = imgWidth;
            }
            if (imgHeight <= 1) {
              data.imgHeight = 'auto';
            } else {
              data.imgHeight = imgHeight;
            }
            return data;
          }


          $scope.clickFun = $scope.clickFun;
          if ($scope.clickFun) {
            $scope.clickFun.imgClick = $scope.imgClick;
          }
          
          if($scope.showClick){
            $scope.showClick = $scope.imgClick;
          }


          // 关闭图片
          $('.imgShowClosBtn').off().on('click', () => {
            clos();
            $('.imgUrlControl .clockwise,.imgUrlControl .anticlockwise').off();
            return false;
          });
          if ($scope.bgClick) {
            $('body').off().on('click', '#imgUrlBoxBG', () => {
              clos();
              return false;
            });
          }
          function clos() {
            current = 0;
            $('#imgUrlBoxBG').css({ opacity: 0 }).hide();
            $('.imgUrlBox,.imgShowClosBtn,.imgUrlControl').hide();
            $('.imgUrlBox').css('transform', `rotate(${current}deg)`);
            $('.imgUrlBox img').css('width', '');
          }
          function rotate(type) {
            if (type == 'left') {
              current -= 90;
            } else {
              current += 90;
            }
            const data = imgData();
            $('.imgUrlBox').css({
              left: data.w, top: data.h, height: data.imgHeight, width: data.imgWidth, transform: `rotate(${current}deg)`,
            });
          }

          // $scope.$on('$destroy', () => {
            // $document.find('.imgUrlBox,.imgUrlControl,.imgShowClosBtn').remove();
          // });
        },
      };
    }]);
};
