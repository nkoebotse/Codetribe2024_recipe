import { useState } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';


function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (username && password) {
      try {
        // Fetch users from the JSON server
        const { data } = await axios.get(`http://localhost:5000/users`, {
          params: { username, password }
        });

        if (data.length > 0) {
          // Successful login, navigate to the menu page
          navigate('/menu');
        } else {
          alert('Invalid username or password');
        }
      } catch (error) {
        alert('Error during login. Please try again.');
      }
    } else {
      alert('Please enter both username and password.');
    }
  };

  return (
    <div className="container-a">
      <h2 className="container-b">Login</h2>
      <form onSubmit={handleLogin}>
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
          className="container-a"
        />
        <button type="submit" className="container-b">Login</button>
      
      </form>
      <div>
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;
