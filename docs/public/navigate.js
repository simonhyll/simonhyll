async function chapterNavigation() {
  let navigating = false;
  document.addEventListener('keydown', function (e) {
    if (navigating) return;
    if (e.altKey || e.ctrlKey || e.metaKey) {
      return;
    }
    if (window.search && document.activeElement === window.search) {
      return;
    }

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        let previousButton = document.querySelector('a[rel="prev"]');
        if (!previousButton && window.location.pathname !== '/') previousButton = { href: '/' };

        if (document.referrer.includes(window.location.host))
          if (previousButton) {
            window.location.href = previousButton.href;
            navigating = true;
          }
        break;
      case 'ArrowRight':
        e.preventDefault();
        let nextButton = document.querySelector('a[rel="next"]');
        if (!nextButton && window.location.pathname === '/')
          nextButton = { href: '/projects/' };

        if (nextButton) {
          window.location.href = nextButton.href;
          navigating = true;
        }
        break;
    }
  });
}

async function interactiveCheckboxes() {
  document.querySelectorAll('.contains-task-list .task-list-item').forEach(function(item) {
    item.addEventListener('click', function(event) {
      event.stopPropagation();
      if (event.target.tagName !== 'INPUT') {
        const checkbox = item.querySelector('input[type="checkbox"]');
        if (checkbox.hasAttribute('checked')) {
          checkbox.removeAttribute('checked');
        } else {
          checkbox.setAttribute('checked', '');
        }
        checkbox.dispatchEvent(new Event('change'));
      }
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  chapterNavigation();
  interactiveCheckboxes();
});

window.onload = function () {
  document.body.setAttribute('tabindex', '-1');
  document.body.focus();
};
