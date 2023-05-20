import React, { useState } from 'react';
import axios from 'axios';

function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function login() {
    const user = {
      email,
      password,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', user);
      const result = response.data;
      // Działania po udanym logowaniu (np. przekierowanie do ekranu głównego)
    } catch (error) {
      setError('Login failed. Please try again.'); // Ustawienie komunikatu błędu
      console.log(error);
    }
    console.log(user);
  }

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          <div className='bs'>
            <h2>Login</h2>
            <input
              type='text'
              className='form-control'
              placeholder='Email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(''); // Resetowanie komunikatu błędu po zmianie wartości pola email
              }}
            />
            <input
              type='password'
              className='form-control'
              placeholder='Password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(''); // Resetowanie komunikatu błędu po zmianie wartości pola hasła
              }}
            />
            {error && <div className="text-danger">{error}</div>} {/* Wyświetlanie komunikatu błędu */}
            <button className='btn btn-primary mt-3' onClick={login}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginView;
