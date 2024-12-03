
$(document).ready(function(){
	$(".nav-link").on('click', function(event) {

    	if (this.hash !== "") {

			event.preventDefault();

			var hash = this.hash;

			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 700, function(){
				window.location.hash = hash;
			});
      	} 
    });
});

const designations = [" Web Developer", " Teacher Mentor", " Software Developer"];
const elementId = "designation";
const typingSpeed = 100; // Speed for typing each character
const erasingSpeed = 50; // Speed for erasing each character
const pauseDuration = 1000; // Pause duration after typing or erasing

function typeAndEraseCycle(designations, elementId, typingSpeed, erasingSpeed, pauseDuration) {
  const element = document.getElementById(elementId);
  let index = 0;

  function typeText(text, callback) {
    let charIndex = 0;
    function typeCharacter() { 
      if (charIndex < text.length) {
        element.textContent += text[charIndex];
        charIndex++;
        setTimeout(typeCharacter, typingSpeed);
      } else {
        setTimeout(callback, pauseDuration); // Wait before erasing
      }
    }
    typeCharacter();
  }

  function eraseText(callback) {
    let text = element.textContent;
    function eraseCharacter() {
      if (text.length > 2  ) {

        text = text.slice(0, -1);
        element.textContent = text;
        setTimeout(eraseCharacter, erasingSpeed);
      } else {
        setTimeout(callback, pauseDuration); // Wait before typing the next
      }
    }
    eraseCharacter();
  }

  function cycle() {
    typeText(designations[index], () => {
      eraseText(() => {
        index = (index +1 ) % designations.length; // Loop to the first item
        cycle();
      });
    });
  }

  cycle();
}

typeAndEraseCycle(designations, elementId, typingSpeed, erasingSpeed, pauseDuration);

const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Form submitted successfully";
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        ;
});