import React, { useState } from 'react';
import styled from 'styled-components';
import Dashboard from './Dashboard';
import {getUserList, login, LoginCredentials} from '../Store/ApiStore'


interface SignInProps {
  onSignUpClick: () => void;
}

const SignInContainer = styled.div`
  max-width: 500px;
  max-height: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const Title = styled.h2`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
`;

const SignIn: React.FC<SignInProps> = ({ onSignUpClick }) => {
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: ''
  });

  const handleChange  = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.type)
    const { id, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInbtn();
    // If password is valid, proceed with sign in
    console.log('Signing in with:', formData.email, formData.password);
  };
  
 
  const signInbtn = async() => {
    try {
        const userData = await login(formData);
        if (userData) {
            return <Dashboard username="manuj" />;
          }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
  }

  return (
    <SignInContainer>
      <Title>Sign In</Title>
      <Form onSubmit={handleSignIn}>
        <FormGroup>
          <Label>Email:</Label>
          <Input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Password:</Label>
          <Input type="password" id="password" value={formData.password} onChange={handleChange} required />
        </FormGroup>
        <Button type="submit" onClick={signInbtn}>Sign In</Button>
      </Form>
      <p>Don't have an account? <Button onClick={onSignUpClick}>Sign Up</Button></p>
    </SignInContainer>
  );
};

export default SignIn;