const sections = document.querySelectorAll('.section-main'); // Get all section elements
const links = document.querySelectorAll('nav a'); // Get all navbar links
function showSection(id) {
  sections.forEach(section => {
    if (section.id === id) { // If section ID matches the given ID, show it
      section.classList.add('active');
      section.style.display = 'block';
      document.body.classList.add('active-section-' + id);
    } else { // Otherwise, hide it
      section.classList.remove('active');
      section.style.display = 'none';
      document.body.classList.remove('active-section-' + section.id);
    }
  });
}
links.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault(); // Prevent the default link behavior
    const id = link.getAttribute('href').slice(1); // Get the ID of the clicked link
    showSection(id); // Show the section with the given ID
  });
});

showSection('s1'); // Initially show the first section

const contactForm = document.getElementById('contact-form');
const submitButton = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  // Check if all form fields have user inputs
  if (!name || !email || !message) {
    alert('Please fill in all fields');
    return;
  }
  
  // Disable the submit button and show a "Loading..." message
  submitButton.disabled = true;
  submitButton.textContent = 'Loading...';

  fetch('https://backend-profile-emailer.herokuapp.com/sendMail', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert('Message sent!');
      // Re-enable the submit button and restore the original text
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    })
    .catch(error => {
      console.error(error);
      alert('Error sending message!');
      // Re-enable the submit button and restore the original text
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    });
});

const workSamples = document.querySelectorAll('.work-sample');
const nextButton = document.querySelector('.next-work-sample');
let currentIndex = 0;

nextButton.addEventListener('click', () => {
  workSamples[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % workSamples.length;
  workSamples[currentIndex].classList.add('active');
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
function openModal(img) {
  modal.style.display = "block";
  modalImg.src = img.src;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
}