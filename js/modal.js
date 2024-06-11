$(function () {
  // 모달 열기
  function openModal(imageSrc) {
    console.log(imageSrc);
    $('#modal-img').attr('src', imageSrc);
    $('#modal').css('display', 'block');
    $('.modal-dim').css('display', 'block');
  }

  function openContact() {
    console.log('aaa');
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
});
