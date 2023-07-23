document.addEventListener('DOMContentLoaded', () => {
    function createUserHandler() {
      return new Promise(async (resolve, reject) => {
        const createUserForm = document.getElementById('createUserForm');
        const formData = new FormData(createUserForm);
        const userData = {
          name: formData.get('name'),
          role: formData.get('role'),
          email: formData.get('email'),
          password: formData.get('password'),
        };
    
        try {
          // Call the createUser route using Axios
          const response = await axios.post(`http://localhost:3000/createUser`, userData);
          resolve(response.data);
          alert('User created successfully!');
        } catch (error) {
          reject(error);
        }
      });
    }
    
    function getLogsHandler() {
      return new Promise(async (resolve, reject) => {
        try {
          // Call the getLogs route using Axios
          const response = await axios.get(`http://localhost:3000/getLogs`);
          resolve(response.data.logs);
        } catch (error) {
          reject(error);
        }
      });
    }
    
    const getLogsBtn = document.getElementById('getLogsBtn');
    const logsContainer = document.getElementById('logsContainer');
  
    // Submit event binding for the form
    const createUserForm = document.getElementById('createUserForm');
    createUserForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      try {
        const userData = await createUserHandler();
        console.log('User created successfully:', userData);
        // You can display a success message or update the UI accordingly here
      } catch (error) {
        console.error('Error creating user:', error);
        // You can display an error message or handle the error accordingly here
      }
    });
  
    getLogsBtn.addEventListener('click', async () => {
        try {
          const logs = await getLogsHandler();
          console.log('Logs fetched successfully:', logs);
    
          // Clear the logsContainer before displaying new logs
          logsContainer.innerHTML = '';
    
          // Display logs in the logsContainer
          logs.forEach((log) => {
            const logElement = document.createElement('div');
            logElement.innerHTML = `
              <p><strong>Name:</strong> ${log.name}</p>
              <p><strong>Description:</strong> ${log.description}</p>
              <p><strong>Time:</strong> ${log.createdAt}</p>
              <button class="editBtn" data-id="${log.id}">Edit</button>
              <button class="deleteBtn" data-id="${log.id}">Delete</button>
            `;
            logsContainer.appendChild(logElement);
          });
    
          // Add event listeners for edit and delete buttons
          const editButtons = document.querySelectorAll('.editBtn');
          const deleteButtons = document.querySelectorAll('.deleteBtn');
    
          editButtons.forEach((editBtn) => {
            editBtn.addEventListener('click', handleEdit);
          });
    
          deleteButtons.forEach((deleteBtn) => {
            deleteBtn.addEventListener('click', handleDelete);
          });
        } catch (error) {
          console.error('Error fetching logs:', error);
          // You can display an error message or handle the error accordingly here
        }
      });
});
async function handleEdit(event) {
    const logId = event.target.user.id;
  
    // Assuming you have an updatedLogData object with the new log details
    const updatedLogData = {
      name: 'Updated Log Name',
      description: 'Updated Log Description',
      // Add other properties as needed
    };
  
    try {
      // Send a PUT request to the edit API endpoint
      await axios.put(`http://localhost:3000/getLogs/${logId}`, updatedLogData);
      console.log(`Log with ID ${logId} updated successfully`);
      // You can display a success message or perform any other action after the edit is successful
    } catch (error) {
      console.error(`Error updating log with ID ${logId}:`, error);
      // You can display an error message or handle the error accordingly here
    }
  }
  
  async function handleDelete(event) {
    const logId = event.target.user.id;
  
    // Show a confirmation dialog
    const confirmDelete = confirm('Are you sure you want to delete this log?');
    if (confirmDelete) {
      try {
        // Send a DELETE request to the delete API endpoint
        await axios.delete(`http://localhost:3000/getLogs/${logId}`);
        console.log(`Log with ID ${logId} deleted successfully`);
        // You can display a success message or perform any other action after the delete is successful
      } catch (error) {
        console.error(`Error deleting log with ID ${logId}:`, error);
        // You can display an error message or handle the error accordingly here
      }
    }
  }
  