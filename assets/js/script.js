/* ========== CUSTOM CURSOR ========== */
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let ringX = 0, ringY = 0, dotX = 0, dotY = 0;

document.addEventListener('mousemove', e => {
    dotX = e.clientX; dotY = e.clientY;
    cursorDot.style.left = dotX + 'px';
    cursorDot.style.top = dotY + 'px';
});

function animateRing() {
    ringX += (dotX - ringX) * 0.12;
    ringY += (dotY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a,button,.bar,.box,.btn').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* ========== JQUERY READY ========== */
$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');
            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });

        triggerSkillRings();
    });

    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 500, 'linear');
    });

    $("#contact-form").submit(function (event) {
        emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");
        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function () {
                document.getElementById("contact-form").reset();
                alert("Message sent successfully!");
            }, function () {
                alert("Failed to send. Try emailing directly!");
            });
        event.preventDefault();
    });
});

/* ========== TAB VISIBILITY ========== */
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Portfolio | Sparsh Kapoor";
        $("#favicon").attr("href", "assets/images/favicon.png");
    } else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href", "assets/images/favhand.png");
    }
});

/* ========== TYPED JS ========== */
var typed = new Typed(".typing-text", {
    strings: ["AI/ML Engineering", "Deep Learning", "Full-Stack Development", "Data Analysis", "Geospatial Analysis"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 600,
});

/* ========== DATA FETCHING ========== */
async function fetchData(type = "skills") {
    let response = type === "skills"
        ? await fetch("skills.json")
        : await fetch("./projects/projects.json");
    return await response.json();
}

/* ========== SKILL RING LOGIC ========== */
const skillLevels = {
    "C/C++": 75, "Python": 95, "Java": 95, "JavaScript": 85,
    "SQL": 78, "React": 80, "PyTorch": 85, "Machine Learning": 90,
    "Deep Learning": 88, "Data Analysis": 85, "DSA": 92, "NumPy": 90,
    "Pandas": 88, "Matplotlib": 82, "Seaborn": 75, "Tableau": 90,
    "Power BI": 70, "Excel": 80, "Git": 88, "GitHub": 88,
    "Flask": 78, "CRUD": 80
};

let ringsAnimated = false;

function triggerSkillRings() {
    if (ringsAnimated) return;
    const skillsSection = document.querySelector('.skills');
    if (!skillsSection) return;
    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
        ringsAnimated = true;
        document.querySelectorAll('.prog-ring').forEach(ring => {
            const pct = parseFloat(ring.dataset.pct) || 75;
            const circ = parseFloat(ring.getAttribute('stroke-dasharray'));
            const offset = circ - (pct / 100) * circ;
            setTimeout(() => { ring.style.strokeDashoffset = offset; }, 300);
        });
    }
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        const pct = skillLevels[skill.name] || 75;
        const r = 22;
        const circ = +(2 * Math.PI * r).toFixed(2);
        skillHTML += `
        <div class="bar">
            <div class="skill-ring-wrap">
                <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <circle class="bg-ring" cx="24" cy="24" r="${r}"/>
                    <circle class="prog-ring" cx="24" cy="24" r="${r}"
                        stroke-dasharray="${circ}"
                        stroke-dashoffset="${circ}"
                        data-pct="${pct}"/>
                </svg>
                <img class="ring-img" src="${skill.icon}" alt="${skill.name}"
                     onerror="this.onerror=null;this.src='https://img.icons8.com/color/48/000000/development.png';" />
            </div>
            <div class="info"><span>${skill.name}</span></div>
        </div>`;
    });
    skillsContainer.innerHTML = skillHTML;
    triggerSkillRings();
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.forEach(project => {
        projectHTML += `
        <div class="box tilt">
            <img draggable="false" src="./assets/images/projects/${project.image}.png" alt="${project.name}" />
            <div class="content">
                <div class="tag"><h3>${project.name}</h3></div>
                <div class="desc">
                    <p>${project.desc}</p>
                    <div class="btns">
                        <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> <span>View</span></a>
                        <a href="${project.links.code}" class="btn" target="_blank"><span>Code</span> <i class="fas fa-code"></i></a>
                    </div>
                </div>
            </div>
        </div>`;
    });
    projectsContainer.innerHTML = projectHTML;
    VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 10, speed: 400, glare: true, "max-glare": 0.06 });
    const sr = ScrollReveal({ origin: 'bottom', distance: '50px', duration: 800, reset: true });
    sr.reveal('.work .box', { interval: 150 });
}

fetchData().then(data => showSkills(data));
fetchData("projects").then(data => showProjects(data));
VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 10 });

/* ========== SCROLL REVEAL ========== */
const srtop = ScrollReveal({ origin: 'top', distance: '50px', duration: 900, reset: true });

srtop.reveal('.home .content .tag-line', { delay: 100 });
srtop.reveal('.home .content h2', { delay: 180 });
srtop.reveal('.home .content p', { delay: 260 });
srtop.reveal('.home .content .btn', { delay: 320 });
srtop.reveal('.home .image', { delay: 220, origin: 'right' });
srtop.reveal('.home .stat-chips .chip', { delay: 380, interval: 110, origin: 'right' });

srtop.reveal('.about .row .image', { delay: 150, origin: 'left' });
srtop.reveal('.about .content h3', { delay: 150 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 250 });
srtop.reveal('.about .content .box-container', { delay: 300 });
srtop.reveal('.about .content .resumebtn', { delay: 350 });

srtop.reveal('.skills .container .bar', { delay: 50, interval: 55 });
srtop.reveal('.education .box', { delay: 100, interval: 180 });
srtop.reveal('.experience .timeline .container', { delay: 100, interval: 220 });
srtop.reveal('.contact .container', { delay: 200 });

/* ========== DEVTOOLS BLOCK ========== */
document.onkeydown = function (e) {
    if (e.keyCode == 123) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false;
};


