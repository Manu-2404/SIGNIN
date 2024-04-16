import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignUp from './SignUp';
import { saveUserDetails } from '../Store/ApiStore';

jest.mock('../Store/ApiStore', () => ({
  saveUserDetails: jest.fn(),
}));

describe('SignUp component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render sign-up form correctly', () => {
    const { getByLabelText, getByText } = render(<SignUp onSignInClick={function (): void {
        throw new Error('Function not implemented.');
    } } />);
    expect(getByLabelText('First Name:')).toBeInTheDocument();
    expect(getByLabelText('Last Name:')).toBeInTheDocument();
    expect(getByLabelText('Email:')).toBeInTheDocument();
    expect(getByLabelText('Password:')).toBeInTheDocument();
    expect(getByText('Sign Up')).toBeInTheDocument();
  });

  it('should call saveUserDetails function when sign-up form is submitted with valid data', async () => {
    const { getByLabelText, getByText } = render(<SignUp onSignInClick={function (): void {
        throw new Error('Function not implemented.');
    } } />);
    fireEvent.change(getByLabelText('First Name:'), { target: { value: 'John' } });
    fireEvent.change(getByLabelText('Last Name:'), { target: { value: 'Doe' } });
    fireEvent.change(getByLabelText('Email:'), { target: { value: 'john@example.com' } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'Test123@' } });
    fireEvent.click(getByText('Sign Up'));

    await waitFor(() => {
      expect(saveUserDetails).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'Test123@',
      });
    });
  });

  it('should display password error message when password is invalid', async () => {
    const { getByLabelText, getByText } = render(<SignUp onSignInClick={function (): void {
        throw new Error('Function not implemented.');
    } } />);
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'invalidpassword' } });
    fireEvent.click(getByText('Sign Up'));

    expect(getByText('Password must contain at least 1 uppercase letter, 1 numeric value, 1 special character, and have a minimum length of 6 characters.')).toBeInTheDocument();
    expect(saveUserDetails).not.toHaveBeenCalled();
  });
});