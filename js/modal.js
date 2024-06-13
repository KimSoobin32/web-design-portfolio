$(function () {
  // 모달 열기
  function openModal(imageSrc) {
    console.log(imageSrc);
    $('#modal-img').attr('src', imageSrc);
    $('#modal').css('display', 'block');
    $('.modal-dim').css('display', 'block');
  }

  function openContact() {
    $('.contact-modal').css('display', 'block');
    $('.dim').css('display', 'block');
  }

  // 모달 닫기
  function closeModal(modalName) {
    $(modalName).css('display', 'none');
    $('.dim').css('display', 'none');
    $('.modal-dim').css('display', 'none');
  }

  // 모달 닫기 버튼 클릭 이벤트 처리
  $('#close').on('click', function () {
    closeModal('#modal');
  });

  $('#contact-close').on('click', function () {
    closeModal('.contact-modal');
  });

  // 각 버블 요소에 클릭 이벤트 추가
  $('.bubble').on('click', function () {
    var activeIndex = $('.fp-slidesNav.bottom ul li a.active').parent().index();
    // 활성화된 슬라이드의 이미지 src를 가져와서 출력
    var src = $('.main-slider .slide')
      .eq(activeIndex)
      .find('.project-img img')
      .attr('src');
    // console.log(src);
    openModal(src);
  });

  $('.contact-btn').on('click', function () {
    openContact();
  });
  //gnb 효과
  const gnb = document.querySelector('.gnb');
  const indicator = document.createElement('span');
  indicator.classList.add('indicator-line');
  gnb.appendChild(indicator);

  // 초기에 indicator 숨기기
  indicator.style.width = `0px`;
  indicator.style.borderColor = 'transparent';
  indicator.style.height = '48px'; // 높이 설정

  gnb.addEventListener('mousemove', (e) => {
    const link = e.target.closest('a'); // 이벤트가 발생한 요소의 가장 가까운 <a> 태그 찾기
    if (link && !link.classList.contains('contact-btn')) {
      const rect = link.getBoundingClientRect();
      const gnbRect = gnb.getBoundingClientRect();

      // indicator.style.borderColor 설정
      if (link.classList.contains('active')) {
        indicator.style.borderColor = 'transparent'; // active 클래스일 경우 투명하게 설정
      } else if (window.location.pathname.includes('index.html')) {
        indicator.style.backgroundColor = '#154787';
      } else {
        indicator.style.backgroundColor = '#E3F9FF';
      }

      indicator.style.color = '#55f';
      indicator.style.width = `${rect.width}px`;
      indicator.style.left = `${rect.left - gnbRect.left}px`;
    }
  });

  gnb.addEventListener('mouseleave', () => {
    indicator.style.width = `0px`;
    indicator.style.borderColor = 'transparent';
    indicator.style.backgroundColor = 'transparent';
  });
});
