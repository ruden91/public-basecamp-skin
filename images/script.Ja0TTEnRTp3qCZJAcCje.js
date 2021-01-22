(function() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // 초기렌더링 퍼프먼스 향상을 위해
    // 모바일에서 사이드바 제거          
    if (document.querySelector('.sidebar-holder')) {
      document.querySelector('.sidebar-holder').remove();
    }
  }
})();
(function() {
  var el = document.querySelector('.bc-markdown .bc-markdown__inner-content');
  if (!el) return;

  var scrollEventHandler = function scrollEventHandler() {
    if (window.innerHeight + window.scrollY >= el.offsetHeight) {
      try {
        window.removeEventListener('scroll', scrollEventHandler);
        var elms = Array.from(document.querySelectorAll('.prev-next-article'));

        elms.map(function(el) {
          return el.classList.add('visible');
        });

        // 공감했으면 문구 필요없음
        var likeEl = document.querySelector(".postbtn_like .btn_post");

        // 공감하지 않았다면 유도문구 추가
        if (!likeEl.querySelector('.like_on')) {
          __BASECAMP__.toast.send('유익하셨다면 공감 하나 부탁드릴게요! ✨');
          // 모바일에서 visible 공감영역 visible 시킨다.
          var sideMenuEl = document.querySelector('.bc-markdown .bc-markdown__left-side-menu');

          sideMenuEl.style.opacity = 1;
        }
        setTimeout(function() {
          elms.map(function(el) {
            return el.classList.remove('visible');
          });
        }, 8000);
      } catch (err) {
        console.error(err);
      }
    }
  };
  window.addEventListener('scroll', scrollEventHandler);
})();
(function() {
  if (!document.querySelector('.bc-markdown')) return;
  var el = document.createElement('div');
  var title = document.querySelector('.bc-markdown .bc-markdown__header .heading').textContent;
  var imageEl = document.querySelector('.bc-markdown .thumbnail').innerHTML;
  var shares = ['kakao', 'facebook', 'naver', 'twitter', 'band', 'kakaostory'].reduce(function(acc, v) {
    return acc + ('<li class="bc-share__item" data-share-item="' + v + '"><span class="bc-share__item-icon bc-share__item-icon--' + v + '"></span></li>');
  }, '');
  el.classList.add('bc-share');
  el.innerHTML = '\n      ' + imageEl + '\n      <div class="content">\n        <p class="title">' + title + '</p>\n        <ul>\n          ' + shares + '\n        </ul>\n        <div class="url-copy-holder">\n          <input id="copy" value="' + location.href + '" readonly="readonly">\n          <button data-clipboard-target="#copy" class="copy-btn">\uC8FC\uC18C\uBCF5\uC0AC</button>\n        </div>        \n      </div>\n    ';

  document.querySelector('#share-reaction').addEventListener('click', function() {
    __BASECAMP__.popup.show(el);
  });

  el.querySelector('ul').addEventListener('click', function(e) {
    var target = e.target.getAttribute('data-share-item') || e.target.closest('.bc-share__item').getAttribute('data-share-item');
    __BASECAMP__.share.push(target);
  });
  el.querySelector('.copy-btn').addEventListener('click', function() {
    __BASECAMP__.share.copy();
    __BASECAMP__.popup.hide();

    __BASECAMP__.toast.send('포스팅 주소를 복사했습니다 📄');
  });
})();
(function() {
  window.addEventListener('load', function() {
    var date = new Date();
    document.querySelector('.bc-footer .copyright time').textContent = date.getFullYear();
  });
})();
