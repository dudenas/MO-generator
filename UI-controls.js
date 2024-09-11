// NAVIGATION

document.getElementById('btnPattern').addEventListener('click', function () {
    document.getElementById('controlsPattern').classList.add('active');
    document.getElementById('controlsColors').classList.remove('active');
});

document.getElementById('btnColors').addEventListener('click', function () {
    document.getElementById('controlsPattern').classList.remove('active');
    document.getElementById('controlsColors').classList.add('active');
});

// SECTIONS

document.addEventListener('DOMContentLoaded', function () {
    // info icon
    fetch('icons/info-icon.svg')
        .then(response => response.text())
        .then(svg => {
            // Insert the SVG into each element with the class 'info-icon'
            document.querySelectorAll('.info-icon').forEach(icon => {
                icon.innerHTML = svg;
            });
        });

    // collapsables
    const collapsibles = document.querySelectorAll('.collapsible');
    collapsibles.forEach(collapsible => {
        collapsible.addEventListener('click', function () {
            const content = this.nextElementSibling;
            content.classList.toggle('active');

            const firstChild = this.firstElementChild;
            if (firstChild.classList.contains('toggle-wrap')) {
                const checkbox = firstChild.querySelector('input[type="checkbox"]');
                if (checkbox) {
                    // Toggle the checkbox state
                    checkbox.checked = !checkbox.checked;
                    // Call the animateWithin function if it exists
                    animateGraphics(checkbox);
                }
                // Add your custom logic here
            } else {
                const icon = this.querySelector('.icon');
                icon.classList.toggle('fa-chevron-down');
                icon.classList.toggle('fa-chevron-up');
            }


        });
    });
});