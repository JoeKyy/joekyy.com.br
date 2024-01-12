  $(function () {
    $('.nav-button').click(function(){
      if (!$(this).hasClass('is-active')) {
        $(this).addClass('is-active');
        $('body > header nav').addClass('nav-menu--open');
        $('body > header nav').removeClass('nav-menu--close');
      } else {
        $(this).removeClass('is-active');
        $('body > header nav').removeClass('nav-menu--open');
        $('body > header nav').addClass('nav-menu--close');
      }
    });

    $('body > header nav ul li a').click(function(){
      if ($('.nav-button').hasClass('is-active')) {
        $('.nav-button').removeClass('is-active');
        $('body > header nav').removeClass('nav-menu--open');
        $('body > header nav').addClass('nav-menu--close');
      }
    });

    let currentSectionIndex = 0;
    let isScrolling = false;
    let isHorizontalScrollActive = false;
    const sections = document.querySelectorAll('section');

    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      scrollToSection(hash);
    }

    if (!isMobileDevice()) {
      const onWheelEvent = (event) => {
        if (isScrolling) {
          return;
        }

        const targetSectionId = sections[currentSectionIndex].id;

        if (targetSectionId === 'portifolio') {
            isHorizontalScrollActive = true;
            horizontalScroll(event);
            return;
        } else {
            isHorizontalScrollActive = false;
        }

        if (!isHorizontalScrollActive) {
          horizontalScrollPerSection(event)
        }
      };

      document.addEventListener('wheel', onWheelEvent, { passive: false });
    }

    $('nav ul li a').on('click', function(e) {
      e.preventDefault();
      const targetId = $(this).attr('href').replace('#', '');
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start'
        });
        updateMenuLink(targetId);
        updateURL(targetId);

        const sectionIndex = Array.prototype.indexOf.call(sections, targetSection);
        currentSectionIndex = sectionIndex >= 0 ? sectionIndex : currentSectionIndex;
      }
    });

    function scrollToSection(sectionId) {
      const sections = document.querySelectorAll('section');
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start'
        });
        updateMenuLink(sectionId);
        updateURL(sectionId);

        const sectionIndex = Array.prototype.indexOf.call(sections, targetSection);
        currentSectionIndex = sectionIndex >= 0 ? sectionIndex : currentSectionIndex;
      }
    }

    function horizontalScroll(event) {
      const element = document.querySelector("body");
      event.preventDefault();
      element.scrollBy({
          left: event.deltaY < 0 ? -20 : 20
      });
    }

    function horizontalScrollPerSection(event) {
      event.preventDefault();
          isScrolling = true;
          setTimeout(() => isScrolling = false, 1000);

          if (event.deltaY < 0 && currentSectionIndex > 0) {
            currentSectionIndex--;
          } else if (event.deltaY > 0 && currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
          }

          const targetSection = sections[currentSectionIndex];
          if (targetSection) {
            targetSection.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'start'
            });
            updateMenuLink(targetSection.id);
            updateURL(targetSection.id);
          }
    }

    function isMobileDevice() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    function updateMenuLink(sectionId) {
      $('nav ul li').removeClass('selected');
      $('nav ul li').find('a[href="#' + sectionId + '"]').parent().addClass('selected');
    }

    function updateURL(sectionId) {
      if(history.pushState) {
        history.pushState(null, null, '#' + sectionId);
      } else {
        location.hash = '#' + sectionId;
      }
    }

  });
