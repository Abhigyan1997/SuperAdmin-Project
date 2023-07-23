// Feedbox.js

document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedbackForm');
    feedbackForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const name = document.getElementById('name').value;
      const url = document.getElementById('url').value;
      const description = document.getElementById('description').value;
  
      const feedboxData = {
        name,
        url,
        description,
      };
  
      try {
        // Send the feedboxData to the backend using Axios POST request
        const response = await axios.post('http://localhost:3000/feeds', feedboxData);
        console.log('Feedbox created successfully:', response.data);
        // Display a success message or update the UI accordingly here
        alert('Feedbox created successfully!');
        feedbackForm.reset();
      } catch (error) {
        console.error('Error creating feedbox:', error);
        // Display an error message or handle the error accordingly here
        alert('Error creating feedbox. Please try again later.');
      }
    });
  });
  