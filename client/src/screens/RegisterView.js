import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Error from '../components/Error';
import Success from '../components/Success';

function RegisterView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function register() {
    if (password === confirmPassword) {
      const user = {
        name,
        email,
        password,
        confirmPassword
      };
      try {
        const response = await axios.post('http://localhost:5000/api/users/register', user);
        const result = response.data;
        setSuccess(true);

        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        // Działania po udanej rejestracji (np. przekierowanie do strony logowania)
      } catch (error) {
        setError('Registration failed. Please try again.'); // Ustawienie komunikatu błędu
        console.log(error);
      }
    } else {
      setError('Passwords do not match'); // Ustawienie komunikatu błędu
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // W tym miejscu możesz wykonywać inne żądania do serwera, jeśli jest to potrzebne
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error && <Error />} {/* Wyświetlanie komponentu Error */}
      {success && <Success message='Registration successful!' />} {/* Wyświetlanie komponentu Success */}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          <div className='bs'>
            <h2>Register</h2>
            <input
              type='text'
              className='form-control'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type='text'
              className='form-control'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              className='form-control'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type='password'
              className='form-control'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {error && <div className="text-danger">{error}</div>} {/* Wyświetlanie komunikatu błędu */}

            <button className='btn btn-primary mt-3' onClick={register}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterView;
