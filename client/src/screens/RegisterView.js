import React, { useState } from 'react';

function RegisterView() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function register() {
        if (password === confirmPassword) {
            const user = {
                name,
                email,
                password,
                confirmPassword
            };
            console.log(user);
        } else {
            alert('Passwords do not match');
        }
    }

    return (
        <div>
            <div className="row justify-content-center mt-5">
                <div className="col-md-5">
                    <div className='bs'>
                        <h2>Register</h2>
                        <input type='text' className='form-control' placeholder='Name'
                            value={name} onChange={(e) => { setName(e.target.value) }} />
                        <input type='text' className='form-control' placeholder='Email'
                            value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        <input type='password' className='form-control' placeholder='Password'
                            value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        <input type='password' className='form-control' placeholder='Confirm password'
                            value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />

                        <button className='btn btn-primary mt-3' onClick={register}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterView;