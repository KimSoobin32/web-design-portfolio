$(function () {
  // AOS.init();

  const $header = $('#header');
  const $btnTop = $('.btn-top');

  //각 영역별 aos.js를 적용할 대상
  const $aniEl = $('[data-aos]'); /* 속성선택자 */

  //탑버튼이 처음에는 안 보이게
  $btnTop.hide();

  //탑버튼 클릭하면 화면 상단으로(첫번째 섹션으로 이동)
  $btnTop.on('click', function () {
    $.fn.fullpage.moveTo('section1');
    /* 즉시 이동 */
    // $.fn.fullpage.silentMoveTo('section1');
  });

  $('#fullpage').fullpage({
    //* 인디케이터 커스텀
    //1.사용할 요소의 이름을 지정 (해당 요소.indicator에만 active 들어감)
    menu: '.indicator',
    //2.앵커(영역)의 이름 설정
    anchors: [
      'section1',
      'section2',
      'section3',
      'section4',
      'section5',
      'section6',
    ],
    //3.실제 링크에 data-menuanchor="영역이름" 적용 (인디케이터에..)

    //* 속도 조절
    scrollingSpeed: 1000,
    //* 섹션 영역의 콘텐츠 세로 정렬(기본값은 true, false면 세로 정렬 풀림)
    verticalCentered: false,

    //* 슬라이더 관련
    slidesNavigation: true,
    slidesNavPosition: 'bottom',

    //영역에 진입한 후
    afterLoad: function (anchorLink, index) {
      var slideNumber = index - 1;
      //This will change the input of NUM to current section number
      $('.num-indicator .current-page').html(slideNumber);

      console.log('영역에 진입한 후');
      console.log(anchorLink, index);
      // index 1부터 시작

      //section4영역에 진입하면 탑버튼이 보이게
      if (anchorLink === 'section5') {
        $btnTop.fadeIn();
      }
      AOS.init(); /* aos-init클래스 생김 */
      $aniEl.addClass('aos-animate'); /* aos-animate 클래스 생김  */

      //  bd

      if (index === 1) {
        $('.indicator li').addClass('show');
      }
    },

    //영역을 떠나갈 때
    onLeave: function (index, nextIndex, direction) {
      $('.indicator li').removeClass('show');
      console.log('영역을 떠나갈 때');
      console.log(index, nextIndex, direction);

      //밑에 영역으로 이동하면 헤더에 hide클래스 부여
      if (direction === 'down') {
        $header.addClass('hide');
      } else {
        $header.removeClass('hide');
      }

      //4번 영역을 떠나가거나 마우스 휠을 올렸을 때
      if (index === 4 || direction === 'up') {
        //사라짐
        $btnTop.fadeOut();
      }

      $aniEl.removeClass('aos-animate');
    },
  });
});
