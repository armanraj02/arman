// Typing Effect
const typed = new Typed('.typewriter', {
    strings: ['Data Enthusiast', 'Developer', 'Editor', 'Designer', 'Content Creator', 'Freelancer'],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});

// Chatbot Logic
const chatboxToggle = document.querySelector('.chatbox-toggle');
const chatboxMessage = document.querySelector('.chatbox-message-wrapper');
const chatboxToggleIcon = chatboxToggle.querySelector('i');

chatboxToggle.addEventListener('click', function () {
    chatboxMessage.classList.toggle('show');
    // Change icon based on state
    if (chatboxMessage.classList.contains('show')) {
        chatboxToggleIcon.classList.replace('bx-message-dots', 'bx-x');
    } else {
        chatboxToggleIcon.classList.replace('bx-x', 'bx-message-dots');
    }
});

// Chatbot Message Handling
const textarea = document.querySelector('.chatbox-message-input');
const chatboxForm = document.querySelector('.chatbox-message-form');
const chatboxContent = document.querySelector('.chatbox-message-content');
const noMessageText = document.querySelector('.chatbox-message-no-message');

chatboxForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (textarea.value.trim() !== '') {
        writeMessage(textarea.value);
        setTimeout(autoReply, 1000);
    }
});

function writeMessage(text) {
    if (noMessageText) noMessageText.style.display = 'none';

    const today = new Date();
    const time = today.getHours() + ":" + String(today.getMinutes()).padStart(2, '0');

    let messageHTML = `
        <div class="chatbox-message-item sent">
            <span class="chatbox-message-item-text">${text}</span>
        </div>
    `;

    chatboxContent.insertAdjacentHTML('beforeend', messageHTML);
    scrollBottom();
    textarea.value = '';
}

function autoReply() {
    const replies = [
        "Thanks for reaching out! I'll get back to you shortly.",
        "That's interesting! Tell me more.",
        "I'm currently available for freelance work.",
        "You can check my works in the timeline section!"
    ];
    const randomReply = replies[Math.floor(Math.random() * replies.length)];

    let messageHTML = `
        <div class="chatbox-message-item received">
            <span class="chatbox-message-item-text">${randomReply}</span>
        </div>
    `;

    chatboxContent.insertAdjacentHTML('beforeend', messageHTML);
    scrollBottom();
}

function scrollBottom() {
    chatboxContent.scrollTo(0, chatboxContent.scrollHeight);
}

// Sidebar Active State on Scroll (Optional Enhancement)
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Image Modal Logic
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.getElementsByClassName("close-modal")[0];

// Add click event to all cert cards
document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', function () {
        const img = this.querySelector('img');
        if (img) {
            modal.style.display = "block";
            modalImg.src = img.src;
        }
    });
});

// Close modal actions
if (closeBtn) {
    closeBtn.addEventListener('click', function () {
        modal.style.display = "none";
    });
}

window.addEventListener('click', function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});
