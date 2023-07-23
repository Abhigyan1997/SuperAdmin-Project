async function login(e) {
    try {
      e.preventDefault();
  
      const loginData = {
        Email: document.getElementById('Email').value, // Corrected ID
        Password: document.getElementById('Password').value, // Corrected ID
      };
      console.log(loginData);
      const response = await axios.post('http://localhost:3000/login', loginData);
      const userRole = response.data.role;

      // Set the token in localStorage
      const token = response.data.token;
      localStorage.setItem('token', token);

      // Redirect users based on their role
      switch (userRole) {
        case 'SUPER ADMIN':
          window.location.href = './superAdmin.html';
          break;
        case 'ADMIN':
          window.location.href = './superAdmin.html';
          break;
        case 'BASIC':
          window.location.href = './FeedBox.html';
          break;
        // default:
        //   // Redirect to a default page or show an error message
        //   window.location.href = './FeedBox.html';
          break;
      }
      console.log(response);
      if (response.status === 200) {
        alert('Login successful');
        localStorage.setItem('token', response.data.token);
        window.location.href = './Feedbox.html';
      }
    } catch (err) {
      console.log(err);
      document.body.innerHTML += `<div style="color:red;" >${err.message}</div>`;
    }
  }
  