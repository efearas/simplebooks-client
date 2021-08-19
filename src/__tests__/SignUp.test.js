import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import SignUp from '../Login/SignUp'
import { ContactsOutlined } from '@material-ui/icons'

test('aggrement checkbox validation', async () => {
    
    const component = render(<SignUp/>)
    
    screen.getByText('Sign up to Simple Books') 
    
    const inputEmail = component.getByLabelText('e-mail')
    fireEvent.change(inputEmail, {target: {value: 'anemail@myemail.com'}})
    
    const inputCompanyName = component.getByLabelText('Company name')
    fireEvent.change(inputCompanyName, {target: {value: 'compoant'}})
    
    
    const inputPassword = component.getByLabelText('Password')
    fireEvent.change(inputPassword, {target: {value: 'pass1'}})

    const inputPasswordAgain = component.getByLabelText('Password again')
    fireEvent.change(inputPasswordAgain, {target: {value: 'pass1'}})
    
    
    fireEvent.click(screen.getByText('Sign up'))
    
   
    expect(screen.getByTestId('aggrement-line')).toHaveStyle(`color: red`)
    
  })

  