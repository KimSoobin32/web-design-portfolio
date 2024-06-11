window.addEventListener('load', () => {
  // script.js
  document.addEventListener('mousemove', function (e) {
    let rippleContainer = document.getElementById('ripple-container');
    let ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = `${e.clientX - 5}px`; // Adjust for the center of the ripple
    ripple.style.top = `${e.clientY - 5}px`; // Adjust for the center of the ripple
    rippleContainer.appendChild(ripple);

    // Remove the ripple after the animation duration
    setTimeout(() => {
      ripple.remove();
    }, 500); // Match the duration of the CSS animation
  });
});
