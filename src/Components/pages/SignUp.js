import React from 'react';
import bcrypt from 'bcryptjs';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { auth } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  contactNumber: Yup.string().matches(/^\d{10}$/, 'Contact number must be 10 digits').required('Contact number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  country: Yup.string().required('Country is required'),
  language: Yup.string().required('Language is required')
});

const countries = ['India', 'USA', 'Australia', 'UK', 'Canada'];
const languages = [
  'English', 'Hindi', 'Spanish', 'French', 'German',
  'Chinese', 'Japanese', 'Russian', 'Portuguese', 'Italian',
  'Korean', 'Arabic', 'Turkish', 'Dutch', 'Swedish', 'Greek', 'Polish'
];

function SignUp({ toggleForm }) {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      // Hash the password before saving it to Firestore
      const hashedPassword = await bcrypt.hash(values.password, 10);

      // Create a user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, 'Users', user.uid), {
        firstName: values.firstName,
        lastName: values.lastName,
        contactNumber: values.contactNumber,
        email: values.email,
        password: hashedPassword,
        country: values.country,
        language: values.language
      });

      console.log('Sign up successful');
      localStorage.setItem('uid', user.uid);
      navigate('/main'); // Redirect to main page
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
        password: '',
        language: '',
        country: ''
      }}
      validationSchema={SignUpSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors }) => (
        <Form className="p-8 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
          {errors.formError && <p className="text-red-500 mb-4">{errors.formError}</p>}
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <Field
                type="text"
                name="firstName"
                placeholder="First Name"
                className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              />
              <ErrorMessage name="firstName" component="p" className="text-red-500 text-xs md:text-sm mt-1" />
            </div>
            <div className="w-1/2">
              <Field
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              />
              <ErrorMessage name="lastName" component="p" className="text-red-500 text-xs md:text-sm mt-1" />
            </div>
          </div>
          <div className="mb-4">
            <Field
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            />
            <ErrorMessage name="contactNumber" component="p" className="text-red-500 text-xs md:text-sm mt-1" />
          </div>
          <div className="mb-4">
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            />
            <ErrorMessage name="email" component="p" className="text-red-500 text-xs md:text-sm mt-1" />
          </div>
          <div className="mb-4">
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            />
            <ErrorMessage name="password" component="p" className="text-red-500 text-xs md:text-sm mt-1" />
          </div>
          <div className="mb-4">
            <Field
              as="select"
              name="country"
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            >
              <option value="" label="Select Country" />
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </Field>
            <ErrorMessage name="country" component="p" className="text-red-500 text-xs md:text-sm mt-1" />
          </div>
          <div className="mb-4">
            <Field
              as="select"
              name="language"
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            >
              <option value="" label="Select Language" />
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </Field>
            <ErrorMessage name="language" component="p" className="text-red-500 text-xs md:text-sm mt-1" />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition-colors duration-300 text-sm md:text-base" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
          <div className="text-center mt-4">
            <p className="text-gray-600 text-xs md:text-sm">Or</p>
            <button type="button" className="bg-gray-100 text-black py-2 px-4 rounded w-full mt-2 hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center text-sm md:text-base">
              <FaGoogle className="mr-2" /> Sign up with Google
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SignUp;
