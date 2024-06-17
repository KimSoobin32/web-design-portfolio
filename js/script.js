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

  //img-box
  // 대상을 변수에 저장
  const title = document.querySelector('.content-wrap h1');
  const picList = document.querySelector('.index-list');
  const listEl = picList.querySelectorAll('li');
  const imgBox = document.querySelector('.img-box');
  const img = imgBox.querySelector('img');

  const tl = gsap.timeline();

  tl.from(title, { x: -100, autoAlpha: 0, duration: 0.5 });
  tl.from(
    listEl,
    {
      autoAlpha: 0,
      y: 50,
      rotation: 10,
      transformOrigin: '0 0',
      stagger: 0.3,
      duration: 1,
      ease: 'bounce.out',
    },
    '<'
  );

  showImage();

  function showImage() {
    gsap.set(imgBox, { scale: 0.8, autoAlpha: 0 });

    listEl.forEach((item, index) => {
      item.addEventListener('mouseenter', () => {
        img.src = `img/index-pic${index + 1}.png`;
        gsap.to(imgBox, { scale: 1, autoAlpha: 1 });
      });
    });

    picList.addEventListener('mouseleave', () => {
      gsap.to(imgBox, { scale: 0.2, autoAlpha: 0 });
    });

    // .pic-list 영역에서 마우스가 움직이면 할 동작
    let x = 0;
    let y = 0;
    let mx = 0;
    let my = 0;
    const speed = 0.09;

    picList.addEventListener('mousemove', (e) => {
      // console.log(e);

      x = e.pageX;
      y = e.pageY;
    });

    moving();
    function moving() {
      mx += (x - mx) * speed;
      my += (y - my) * speed;

      gsap.to(imgBox, {
        left: mx + 70 + 'px',
        top: my + 'px',
        transform: `rotate(-${mx * 0.02}deg)`,
      });

      requestAnimationFrame(moving);
    }
  }

  //indicator index
  // 모든 li 요소를 가져옵니다.
  const indicators = document.querySelectorAll('.indicator li');

  indicators.forEach(function (indicator) {
    // 각 li 요소에 tooltip 요소를 추가합니다.
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = indicator.textContent.trim(); // 각 li의 텍스트를 tooltip의 내용으로 사용

    // li 요소에 tooltip을 자식으로 추가합니다.
    indicator.appendChild(tooltip);

    // 호버 이벤트를 설정합니다.
    indicator.addEventListener('mouseenter', function () {
      tooltip.style.display = 'block';
    });

    indicator.addEventListener('mouseleave', function () {
      tooltip.style.display = 'none';
    });
  });
});
