import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignIn from './SignIn';

// Mocking the login function
jest.mock('../Store/ApiStore', () => ({
  login: jest.fn().mockResolvedValue({ username: 'mockUser' })
}));

describe('SignIn component', () => {
  it('renders sign in form', () => {
    const { getByText, getByLabelText } = render(<SignIn onSignUpClick={function (): void {
        throw new Error('Function not implemented.');
    } } />);
    expect(getByText('Sign In')).toBeInTheDocument();
    expect(getByLabelText('Email:')).toBeInTheDocument();
    expect(getByLabelText('Password:')).toBeInTheDocument();
    expect(getByText('Sign In')).toBeInTheDocument();
  });

  it('handles form submission and signs in', async () => {
    const { getByLabelText, getByText } = render(<SignIn onSignUpClick={function (): void {
        throw new Error('Function not implemented.');
    } } />);
    const emailInput = getByLabelText('Email:');
    const passwordInput = getByLabelText('Password:');
    const signInButton = getByText('Sign In');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(signInButton);

    // Wait for the sign-in process to complete
    await waitFor(() => expect(getByText('Signed in successfully')).toBeInTheDocument());
  });

  it('handles sign up click', () => {
    const mockSignUpClick = jest.fn();
    const { getByText } = render(<SignIn onSignUpClick={mockSignUpClick} />);
    const signUpButton = getByText('Sign Up');
    fireEvent.click(signUpButton);
    expect(mockSignUpClick).toHaveBeenCalled();
  });
});