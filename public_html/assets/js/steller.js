/*!
=========================================================
* Steller Landing page
=========================================================

* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// smooth scroll
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
