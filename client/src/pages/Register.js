import React from 'react';
import Form from '../components/Form';

function Register() {
  return (
    <div>
      <Form
        title="Create Account"
        inputs={['Full Name', 'Email', 'Password', 'Confirm Password']}
        buttonText="Create Account"
      />
    </div>
  );
}

export default Register;
