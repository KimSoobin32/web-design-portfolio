$(function () {
  const $gnb = $('.gnb');
  const $cursor = $('.cursor');
  let isContactOpen = false;
  // 모달 열기
  function openModal(imageSrc) {
    $('#modal-img').attr('src', imageSrc);
    $('#modal').css('display', 'block');
    $('.modal-dim').css('display', 'block');
  }

  function openContact() {
    $('.contact-modal').css('display', 'block');
    $('.dim').css('display', 'block');
    isContactOpen = true;
  }

  // 모달 닫기
  function closeModal(modalName) {
    $(modalName).css('display', 'none');
    $('.dim').css('display', 'none');
    $('.modal-dim').css('display', 'none');
    isContactOpen = false;
  }

  // 모달 닫기 버튼 클릭 이벤트 처리
  $('#close').on('click', function () {
    closeModal('#modal');
  });

  $('#contact-close').on('click', function () {
    $cursor.css('display', 'block');
    $('body').css('cursor', 'none');
    $('#ripple-container').show();
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

  console.log($('.menu-list li:last, .gnb li:last'));

  $('.contact-btn').each((index, btn) => {
    $(btn).on('click', function () {
      $cursor.css('display', 'none');
      $('body').css('cursor', 'default');
      $('#ripple-container').hide();
      openContact();
    });
  });

  // gnb 영역에 마우스가 들어갈 때
  $gnb.on('mouseenter', function () {
    $cursor.css('display', 'none'); // 커서 이미지를 숨김
    document.body.style.cursor = 'default'; // 기본 커서 모양으로 변경
    rippleEnabled = false; // ripple 비활성화
  });

  // gnb 영역에서 마우스가 나갈 때
  $gnb.on('mouseleave', function () {
    if (!isContactOpen) {
      $cursor.css('display', 'block'); // 커서 이미지를 다시 보임
      document.body.style.cursor = 'none'; // 커서 이미지를 사용
      rippleEnabled = true; // ripple 비활성화
    } else {
      $cursor.css('display', 'none'); // 커서 이미지를 숨김
      document.body.style.cursor = 'default'; // 기본 커서 모양으로 변경
      rippleEnabled = false; // ripple 비활성화
    }
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

  //copy btn
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const textToCopy = this.getAttribute('data-copy-text');

      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            // Change button appearance to indicate success
            this.classList.add('copied');

            // Revert back to original appearance after 2 seconds
            setTimeout(() => {
              this.classList.remove('copied');
            }, 2000);
          })
          .catch((err) => {
            console.error('Failed to copy text: ', err);
          });
      } else {
        // Fallback for browsers that do not support navigator.clipboard
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          this.classList.add('copied');

          // Revert back to original appearance after 2 seconds
          setTimeout(() => {
            this.classList.remove('copied');
          }, 2000);
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }
        document.body.removeChild(textArea);
      }
    });
  });

  //top 버튼 클릭하면 이동
  // 탑 버튼 요소를 jQuery 객체로 선택
  const $topBtn = $('.top-btn');

  $(window).scroll(function () {
    // 현재 스크롤 위치와 비교
    // 스크롤 위치가 200px 이상인 경우 탑 버튼을 보이게 하고, 그렇지 않으면 숨김
    if ($(this).scrollTop() > 200) {
      $topBtn.addClass('show');
    } else {
      $topBtn.removeClass('show');
    }
  });

  $topBtn.on('click', function () {
    $('html, body').stop().animate(
      {
        scrollTop: 0,
      },
      500 // 스크롤 속도 조정
    );
  });
});
