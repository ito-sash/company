window.addEventListener('load', function () {

  // ===== 作業風景ギャラリー =====
  // 📌 写真が増えたらこの配列にファイル名を追加するだけでOK
  var workImages = [
    'wc_01.jpg',
    'wc_02.jpg',
    'wc_03.jpg',
    'wc_04.jpg',
    'wc_05.jpg',
  ];

  var grid = document.getElementById('worksGrid');
  if (grid) {
    workImages.forEach(function (file, i) {
      var item = document.createElement('div');
      item.className = 'works-item';
      var img = document.createElement('img');
      img.src = './image/work_scene/' + file;
      img.alt = '作業風景' + (i + 1);
      img.loading = 'lazy';
      item.appendChild(img);
      grid.appendChild(item);
    });
  }
  // ===== ナビゲーション スムーズスクロール =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = document.getElementById('navbar').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top: top, behavior: 'smooth' });
        // モバイルメニューを閉じる
        document.getElementById('navLinks').classList.remove('open');
      }
    });
  });

  // ===== ハンバーガーメニュー =====
  document.getElementById('navToggle').addEventListener('click', function () {
    document.getElementById('navLinks').classList.toggle('open');
  });

  // ===== スクロール時 ナビ背景 =====
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    } else {
      navbar.style.boxShadow = '0 1px 15px rgba(0,0,0,0.1)';
    }
  });

  // ===== スクロールアニメーション (Intersection Observer) =====
  var fadeEls = document.querySelectorAll(
    '.section-title, .section-sub, .service-card, .feature-item, .timeline-item, .about-dl, .contact-box, .instagram-wrap, .instagram-link-wrap'
  );
  fadeEls.forEach(function (el) {
    el.classList.add('fade-in');
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, 80 * (entry.target.dataset.delay || 0));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach(function (el, i) {
    el.dataset.delay = i % 4;
    observer.observe(el);
  });
});