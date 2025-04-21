document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const status = document.getElementById('form-status');
  
    if (name === '' || email === '' || message === '') {
      status.textContent = 'Please fill all fields.';
      return;
    }
  
    // Save to Firebase Firestore
    const db = firebase.firestore();
    db.collection("messages").add({
      name,
      email,
      message,
      timestamp: new Date()
    }).then(() => {
      status.textContent = 'Message sent!';
      document.getElementById('contactForm').reset();
    }).catch((error) => {
      status.textContent = 'Error sending message.';
      console.error("Error adding document: ", error);
    });
  });
  
  // Dark Mode Toggle
  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelectorAll('section').forEach(section => {
      section.classList.toggle('dark-mode');
    });
  }
  
  // Check system preference and set mode accordingly
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (systemPrefersDark) {
    document.body.classList.add('dark-mode');
  }
  
  // Add event listener for dark mode toggle button
  const darkModeButton = document.getElementById('dark-mode-toggle');
  if (darkModeButton) {
    darkModeButton.addEventListener('click', toggleDarkMode);
  }