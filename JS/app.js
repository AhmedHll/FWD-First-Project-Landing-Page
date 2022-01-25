/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const navBarList = document.getElementById("navbar__list");
const topButton = document.getElementById('goTop');
// a variable used to disappear the navigation bar after a specified time
var disappear;
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// this function return the visible height of the section in the viewport
function getVisible(e) {
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const box = e.getBoundingClientRect();
    const top = Math.min(Math.max(box.top, 0), windowHeight);
    const bottom = Math.min(Math.max(box.bottom, 0), windowHeight);
    return bottom - top;
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav(){
    const fr = document.createDocumentFragment();
    for (let sec of sections) {
        const li = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.href = '#' + sec.id;
        anchor.className = "menu__link";
        anchor.setAttribute('data-id', sec.id);
        anchor.textContent = sec.getAttribute('data-nav');
        li.appendChild(anchor);
        fr.appendChild(li);
    }
    navBarList.appendChild(fr);
}

buildNav();

function scrollHandler() {
    // make the navbar Disappears.
    navBarList.classList.remove('disappear');

    // Add class 'active' to section when near top of viewport.
    // loop over sections and get the section that has the max visible height.
    let hi = 0;
    let active = sections[0];
    for (let sec of sections) {
        let height = getVisible(sec);
        if (height > hi) {
            hi = height;
            active = sec;
        } else if (height < hi) {
            // all of the next sections will be less in height, so break
            break;
        }
    }
    for (const sec of sections) {
        if (getVisible(sec) < hi && sec.classList.contains('your-active-class')) {
            sec.classList.remove('your-active-class');
            let link = document.querySelector('a[data-id='+sec.id+']');
            link.classList.remove('selected');
        } else if (getVisible(sec) == hi && !sec.classList.contains('your-active-class')) {
            sec.classList.add('your-active-class');
            let link = document.querySelector('a[data-id='+sec.id+']');
            link.classList.add('selected');
        }
    }

    // disappear navigation bar when not scrolling
    window.clearTimeout(disappear);
    disappear = setTimeout(() => {
        navBarList.classList.add("disappear");
    }, 5000);

    // add top button when the window is not at the top
    if (document.body.scrollTop >= 0 && document.documentElement.scrollTop > 1500) {
        topButton.classList.add('show');
    } else {
        topButton.classList.remove('show');
    }
}

// Scroll to anchor ID using scrollTO event

function scroll(evt) {
    const link = evt.target;
    if (link.nodeName == 'A') {
        evt.preventDefault();
        const e = document.getElementById(link.getAttribute('data-id'));
        e.scrollIntoView({behavior:"smooth"});
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

navBarList.addEventListener('click', scroll);

// Set sections as active

window.addEventListener("scroll", scrollHandler);


// scroll to top when top button is clicked
topButton.addEventListener('click', function(){
    document.querySelector('main').scrollIntoView({behavior:"smooth"});
});