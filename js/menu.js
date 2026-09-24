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

        links.forEach(function (link) {
            link.addEventListener('click', function () {
                setTimeout(setActive, 50);
            });
        });

        window.addEventListener('scroll', setActive);
        setActive();
    });
})();
