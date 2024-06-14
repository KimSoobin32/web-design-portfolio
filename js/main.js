// window.addEventListener('load', () => {
document.addEventListener('DOMContentLoaded', (event) => {
  // event : mouse move
  //대상을 변수에 저장
  const $window = $(window);
  const $cursor = $('.cursor');

  const $gnb = $('.gnb');
  const $dive = $('.dive');
  const $menuLinks = $('.menu-list > li > a');

  let rippleEnabled = true;

  //브라우저 창에서 마우스가 움직일 때
  $window.on('mousemove', function (e) {
    // console.log(e);
    //마우스의 x, y 좌표값을 받아서
    const mouseX = e.pageX;
    const mouseY = e.pageY;
    //가짜 마우스의 left, top값으로 적용
    $cursor.css({
      left: mouseX,
      top: mouseY,
    });
    $dive.css({
      left: mouseX,
      top: mouseY,
    });
  });

  //dive
  // console.log($menuLinks);

  // 메뉴 항목에 마우스가 들어갈 때

  $menuLinks.on('mouseenter', function () {
    // console.log('mouseenter');
    // 애니메이션 타임라인 생성
    const tl = gsap.timeline();

    // cursor 작아지고 사라짐
    tl.to($cursor, { width: 0, height: 0, opacity: 0, duration: 0.4 })
      // dive 커지고 나타남
      .to(
        $dive,
        { width: 300, height: 300, opacity: 1, duration: 0.3 },
        '-=0.3'
      );
  });

  // 메뉴 항목에서 마우스가 나갈 때
  $menuLinks.on('mouseleave', function () {
    // console.log('mouseleave');
    // 애니메이션 타임라인 생성
    const tl = gsap.timeline();

    // dive 작아지고 사라짐
    tl.to($dive, { width: 0, height: 0, opacity: 0, duration: 0.3 })
      // cursor 커지고 나타남
      .to(
        $cursor,
        { width: 128, height: 128, opacity: 1, duration: 0.3 },
        '-=0.3'
      );
  });

  // gnb 영역에 마우스가 들어갈 때
  $gnb.on('mouseenter', function () {
    $cursor.css('display', 'none'); // 커서 이미지를 숨김
    document.body.style.cursor = 'default'; // 기본 커서 모양으로 변경
    rippleEnabled = false; // ripple 비활성화
  });

  // gnb 영역에서 마우스가 나갈 때
  $gnb.on('mouseleave', function () {
    $cursor.css('display', 'block'); // 커서 이미지를 다시 보임
    document.body.style.cursor = 'none'; // 커서 이미지를 사용
    rippleEnabled = true; // ripple 활성화
  });

  // script.js
  document.addEventListener('mousemove', function (e) {
    if (rippleEnabled) {
      let rippleContainer = document.getElementById('ripple-container');
      let ripple = document.createElement('div');
      ripple.className = 'ripple';
      ripple.style.left = `${e.clientX - 5}px`; // Adjust for the center of the ripple
      ripple.style.top = `${e.clientY - 5}px`; // Adjust for the center of the ripple
      rippleContainer.appendChild(ripple);

      // Remove the ripple after the animation duration
      setTimeout(() => {
        ripple.remove();
      }, 500); // Match the duration of the CSS animation
    }
  });
});
