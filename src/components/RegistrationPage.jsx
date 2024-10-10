import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (username && password) {
      try {
        // Check if user already exists
        const { data } = await axios.get(`http://localhost:5000/users?username=${username}`);

        if (data.length > 0) {
          alert('User already exists. Please choose a different username.');
        } else {
          // Register the new user
          await axios.post('http://localhost:5000/users', { username, password });
          alert('Registration successful!');
          navigate('/login');  // Redirect to login page after registration
        }
      } catch (error) {
        alert('Error during registration. Please try again.');
      }
    } else {
      alert('Please enter both username and password.');
    }
  };

  return (
    <div className="container-a">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="container-a"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="container-a">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
