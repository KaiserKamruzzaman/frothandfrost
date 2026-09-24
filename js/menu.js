(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var links = Array.prototype.slice.call(document.querySelectorAll('.menu-subnav a'));
        var sections = links.map(function (link) {
            return document.querySelector(link.getAttribute('href'));
        });

        function setActive() {
            var scrollPos = window.scrollY + 130;
            var activeIndex = 0;
            sections.forEach(function (section, i) {
                if (section && section.offsetTop <= scrollPos) {
                    activeIndex = i;
                }
            });
            links.forEach(function (link, i) {
                link.classList.toggle('active', i === activeIndex);
            });
        }

        var navBar = document.querySelector('.nav-bar');

        function getOffset() {
            // The navbar becomes fixed once scrollY > 50 (see main.js), and every
            // subnav target sits well past that, so the navbar will always be
            // fixed by the time the animation lands, even if it isn't yet at
            // click time. Its height is the same fixed or not, only its
            // position changes, so this is safe to read up front.
            var gap = 20;
            if (navBar && window.innerWidth > 991) {
                return navBar.getBoundingClientRect().height + gap;
            }
            return gap;
        }

        links.forEach(function (link, i) {
            link.addEventListener('click', function (e) {
                var section = sections[i];
                if (!section || typeof jQuery === 'undefined') {
                    return;
                }
                e.preventDefault();
                // section.offsetTop (not jQuery's offset()/getBoundingClientRect) because
                // AOS applies a translateY transform to unrevealed sections, which would
                // otherwise pollute the target with a transient, purely-cosmetic offset.
                var target = section.offsetTop - getOffset();
                jQuery('html, body').animate({ scrollTop: target }, 800, 'easeInOutExpo');
                if (history.pushState) {
                    history.pushState(null, '', link.getAttribute('href'));
                }
            });
        });

        window.addEventListener('scroll', setActive);
        setActive();
    });
})();
