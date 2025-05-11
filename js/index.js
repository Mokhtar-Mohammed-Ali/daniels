// navbar-bgc for other sections

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const vh = window.innerHeight;

    function updateNavbar() {
        if (window.scrollY >= vh) {
            navbar.classList.remove('transparent');
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.add('transparent');
            navbar.classList.remove('scrolled');
        }
    }

    // تحديث النافبار عند التمرير
    window.addEventListener('scroll', updateNavbar);
    // تحديث النافبار عند تحميل الصفحة
    updateNavbar();
});
// start navbar transition
      document.addEventListener('DOMContentLoaded', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        let currentSection = 0;
        let isScrolling = false;
        const vh = window.innerHeight;

        // دالة للتمرير إلى القسم التالي أو السابق
        function scrollToNextSection(direction) {
          if (isScrolling) return;
          
          isScrolling = true;
          const currentScroll = window.scrollY;
          const targetScroll = direction === 'down' 
            ? currentScroll + vh 
            : currentScroll - vh;

          // تحديد القسم الجديد
          let newSection = currentSection;
          if (direction === 'down' && currentSection < sections.length - 1) {
            newSection = currentSection + 1;
          } else if (direction === 'up' && currentSection > 0) {
            newSection = currentSection - 1;
          }

          // تحديث الخط التحتي
          navLinks.forEach(link => link.classList.remove('active'));
          if (navLinks[newSection]) {
            navLinks[newSection].classList.add('active');
            currentSection = newSection;
          }

          // التمرير السلس
          window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
          });

          // إعادة تفعيل التمرير بعد انتهاء الحركة
          setTimeout(() => {
            isScrolling = false;
          }, 1000);
        }

        // معالجة النقر على روابط القائمة
        navLinks.forEach((link, index) => {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            if (isScrolling) return;
            
            isScrolling = true;
            currentSection = index;
            
            // تحديث الخط التحتي
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // التمرير إلى القسم المطلوب
            const targetSection = sections[index];
            const targetPosition = targetSection.offsetTop;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });

            setTimeout(() => {
              isScrolling = false;
            }, 1000);
          });
        });

        // معالجة عجلة الماوس
        let wheelTimeout;
        window.addEventListener('wheel', (e) => {
          e.preventDefault();
          
          if (isScrolling) return;
          
          clearTimeout(wheelTimeout);
          wheelTimeout = setTimeout(() => {
            if (e.deltaY > 0) {
              scrollToNextSection('down');
            } else {
              scrollToNextSection('up');
            }
          }, 50);
        }, { passive: false });

        // معالجة مفاتيح الأسهم - تم تحسينها
        document.addEventListener('keydown', function(e) {
          if (isScrolling) return;

          switch(e.key) {
            case 'ArrowDown':
            case 'PageDown':
              e.preventDefault(); // منع السلوك الافتراضي
              if (currentSection < sections.length - 1) {
                scrollToNextSection('down');
              }
              break;
            
            case 'ArrowUp':
            case 'PageUp':
              e.preventDefault(); // منع السلوك الافتراضي
              if (currentSection > 0) {
                scrollToNextSection('up');
              }
              break;
          }
        });

        // تحديث القسم النشط عند التمرير اليدوي
        window.addEventListener('scroll', function() {
          if (isScrolling) return;
          
          const scrollPosition = window.scrollY;
          const currentVh = Math.round(scrollPosition / vh);
          
          if (currentVh !== currentSection && currentVh >= 0 && currentVh < sections.length) {
            currentSection = currentVh;
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLinks[currentSection]) {
              navLinks[currentSection].classList.add('active');
            }
          }
        });

        // تعيين القسم النشط الأولي
        const initialSection = Math.round(window.scrollY / vh);
        if (navLinks[initialSection]) {
          navLinks[initialSection].classList.add('active');
          currentSection = initialSection;
        }
      });
  
   
   
 

   
 


      // دالة للتحقق من ظهور العنصر في نافذة العرض
      function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
      }

      // دالة العد
      function startCounting(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // مدة العد بالمللي ثانية
        const step = target / (duration / 16); // تحديث كل 16 مللي ثانية
        let current = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
          } else {
            element.textContent = Math.floor(current);
          }
        }, 16);
      }

      // مراقبة ظهور العناصر وبدء العد
      function handleScroll() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
          if (isElementInViewport(counter) && counter.textContent === '0') {
            startCounting(counter);
          }
        });
      }

      // إضافة مستمع لحدث التمرير
      window.addEventListener('scroll', handleScroll);
      // تشغيل الدالة مرة واحدة عند تحميل الصفحة
      window.addEventListener('load', handleScroll);
    