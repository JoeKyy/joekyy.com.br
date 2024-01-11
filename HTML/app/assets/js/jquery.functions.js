$(function () {
  // Função para verificar se o usuário está em um dispositivo móvel
  function isMobileDevice() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  if (!isMobileDevice()) {
      const sections = document.querySelectorAll('section');
      let currentSectionIndex = 0;
      let isScrolling = false;

      const onWheelEvent = (event) => {
          if (isScrolling) {
              return;
          }

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
          }
      };

      document.addEventListener('wheel', onWheelEvent, { passive: false });
  }
});
