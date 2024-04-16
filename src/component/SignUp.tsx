import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {getUserList, login, saveUserDetails, SignUpDTO} from '../Store/ApiStore'
import Dashboard from './Dashboard';

interface SignUpProps {
  onSignInClick: () => void;
}

const SignUpContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
`;

const SignUp: React.FC<SignUpProps> = ({onSignInClick}) => {

  const [formData, setFormData] = useState<SignUpDTO>({
    email: '',
    firstName: '',
    lastName: '',
    password: ''
    });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const handleChange  = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.id)
    const { id, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    saveApiFn();
    // Proceed with sign-up logic if password is valid
    console.log('Signing up with:', formData.firstName, formData.lastName, formData.email, formData.password);
  };

  const handleSignUpClick = () => {
    saveApiFn();
    // Proceed with sign-up logic if password is valid
    // console.log('Signing up with:', firstName, lastName, email, password);
  };

  const saveApiFn = async () => {
    if (!validatePassword(formData.password)) {
        setPasswordError('Password must contain at least 1 uppercase letter, 1 numeric value, 1 special character, and have a minimum length of 6 characters.');
        return;
      }
      try {
          await saveUserDetails(formData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
  }
  return (
    <SignUpContainer>
      <Title>Sign Up</Title>
      <Form onSubmit={handleSignUp}>
        <FormGroup>
          <Label htmlFor="firstName">First Name:</Label>
          <Input type="text" id="firstName" value={formData.firstName} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lastName">Last Name:</Label>
          <Input type="text" id="lastName" value={formData.lastName} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password:</Label>
          <Input type="password" id="password" value={formData.password} onChange={handleChange} required />
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        </FormGroup>
        <Button type="submit" onClick={handleSignUpClick}>Sign Up</Button>
      </Form>
      <p>Already have an account? <Button onClick={onSignInClick}>Sign In</Button></p>
    </SignUpContainer>
  );
};

export default SignUp;