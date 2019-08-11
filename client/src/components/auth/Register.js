import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
// import axios from 'axios';

// line 8 allows us to destructure 'setAlert' from 'props'
const Register = ({ setAlert, register, isAuthenticated }) => {
    /* 
        A React Hook that lets you set your own custom states
        'formData' would be your state === 'this.state' in 'Class extends' component
        'setFormDate' would be what you call to set the state === 'this.setState();' in 'Class extends' component
        'useState()' set your default values for the hook
    */
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });

    const { name, email, password, password2 } = formData;

    const onInputChange = (event) => {
        // '...formData' gets a copy of the state object so we can change any value we might need to 
        // both 'event.target' grab the value from what ever is inputed inside the '<input/>' tag
        setFormData({...formData, [event.target.name]: event.target.value});
    }

    const onRegister = async (event) => {
        event.preventDefault();
        if (password !== password2) {

            // This is how you need to use Redux within react through props object 
            setAlert("Password don't match", "danger");
        } else {
            register({ name, email, password})
            /*
            //============= The code below is how we would do an api call with 'axios' without using redux =========================//
                const newUser = {
                    name: name,
                    email: email,
                    password: password,
                };
                
                try {
                    // const config = {
                        //     headers: {
                            //         'Content-Type' : 'application/json'
                            //     }
                            // }
                            
                            // const body = JSON.stringify(newUser);
                            
                            const res = await axios.post('/api/users', newUser);
                            console.log(res.data);
                        } catch(err) {
                            console.error(err.response.data);
                        }
            */
        }
    } 

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }
    
    return (
        <div>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={(event) => onRegister(event)}>
                <div className="form-group">
                <input 
                    type="text" 
                    placeholder="Name" 
                    name="name" 
                    value={name} 
                     
                    onChange={(event) => onInputChange(event)}
                />
                </div>
                <div className="form-group">
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    name="email"
                    value={email}
                    
                    onChange={(event) => onInputChange(event)} 
                    />
                <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small
                >
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(event) => onInputChange(event)}
                />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={(event) => onInputChange(event)}
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </div>
    )
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool

};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});


// Connect and Initialize the reducers here 
export default connect(
    mapStateToProps,
    { setAlert, register }
)(Register);
