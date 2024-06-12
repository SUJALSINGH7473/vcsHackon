import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required'),
  lastName: Yup.string()
    .required('Last name is required'),
  contactNumber: Yup.string()
    .matches(/^\d{10}$/, 'Contact number must be 10 digits')
    .required('Contact number is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
});

function SignUp() {
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      // Handle successful signup
      console.log('Sign up successful');
    } catch (error) {
      setErrors({ formError: 'Failed to create account. Please try again.' });
      console.error('Error signing up:', error);
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        contactNumber: '',
        email: '',
        password: ''
      }}
      validationSchema={SignUpSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors }) => (
        <Form className="p-4 max-w-sm mx-auto bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          {errors.formError && <p className="text-red-500 mb-4">{errors.formError}</p>}
          <div className="flex gap-4">
            <div className="w-1/2">
              <Field 
                type="text"
                name="firstName"
                placeholder="First Name"
                className="border p-2 w-full"
              />
              <ErrorMessage name="firstName" component="p" className="text-red-500 text-sm" />
            </div>
            <div className="w-1/2">
              <Field 
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="border p-2 w-full"
              />
              <ErrorMessage name="lastName" component="p" className="text-red-500 text-sm" />
            </div>
          </div>
          <div className="mt-4">
            <Field 
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              className="border p-2 w-full"
            />
            <ErrorMessage name="contactNumber" component="p" className="text-red-500 text-sm" />
          </div>
          <div className="mt-4">
            <Field 
              type="email"
              name="email"
              placeholder="Email"
              className="border p-2 w-full"
            />
            <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
          </div>
          <div className="mt-4">
            <Field 
              type="password"
              name="password"
              placeholder="Password"
              className="border p-2 w-full"
            />
            <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full mt-4" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default SignUp;
