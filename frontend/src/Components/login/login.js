import React, { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { gapi } from 'gapi-script';

const clientId = "487895901510-ik308kf6434tkp9vn2v5674l94mlm5i8.apps.googleusercontent.com";

function Login() {

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            });
        }
        gapi.load('client:auth2', start);
    }, []);

    const onSuccess = (response) => {
        console.log("Login Success:", response);
        // Handle the login success, e.g., save user information, authenticate user, etc.
    };

    const onError = () => {
        console.log("Login Failed");
        // Handle the login failure, e.g., show error message to user.
    };

    return (
        <div id="signInButton">
            <GoogleLogin
                clientId={clientId}
                onSuccess={onSuccess}
                onError={onError}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    );
}

export default Login;
