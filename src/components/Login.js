import React, { useEffect, useState } from 'react';
export default function Login(props) {
  const isLoggedIn = props.isLoggedIn;
  const setIsLoggedIn = props.setIsLoggedIn;
  const logUsername = props.logUsername;
  const setLogUsername = props.setLogUsername;
  const [toggleLogin, setToggleLogin] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState();
  const users = props.users;

  const signUpUser = () => {
    var error = false;
    users.forEach(function (item) {
      if (item.username.toLowerCase() == username.toLowerCase()) {
        alert('Username is already taken');
        error = true;
      }
    });

    if (password != confirmPassword) {
      alert('Passwords do not match');
      error = true;
    }

    if (!error) {
      props.setUsers((prev) => {
        return [...prev, { username: username, password: password }];
      });
      setLogUsername(username);
      setIsLoggedIn(true);
    }
  };

  const loginHandle = () => {
    var loggedIn = false;
    users.forEach(function (item) {
      if (
        item.username.toLowerCase() == username.toLowerCase() &&
        password == item.password
      ) {
        setLogUsername(username);
        setIsLoggedIn(true);
        loggedIn = true;
        return;
      }
    });

    if (!loggedIn) {
      alert('Username or password is incorrect');
    }
  };
  const toggleLoginHandle = () => {
    setToggleLogin(!toggleLogin);
  };

  if (!isLoggedIn) {
    if (toggleLogin) {
      return (
        <>
          <div>
            <h1>Login</h1>
            <label>Username</label>
            <br />
            <input
              type='text'
              onChange={({ target }) => {
                setUsername(target.value);
              }}
            />
            <br />
            <label>Password</label>
            <br />
            <input
              type='password'
              onChange={({ target }) => {
                setPassword(target.value);
              }}
            />
            <br />
            <button onClick={loginHandle}>Login</button>
            <br />
            <small>
              <a href='#' onClick={toggleLoginHandle}>
                Sign up instead
              </a>
            </small>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div>
            <h1>Sign Up</h1>
            <label>Username</label>
            <br />
            <input
              type='text'
              onChange={({ target }) => {
                setUsername(target.value);
              }}
            />
            <br />
            <label>Password</label>
            <br />
            <input
              type='password'
              onChange={({ target }) => {
                setPassword(target.value);
              }}
            />
            <br />
            <label>Confirm Password</label>
            <br />
            <input
              type='password'
              onChange={({ target }) => {
                setConfirmPassword(target.value);
              }}
            />
            <br />
            <button onClick={signUpUser}>Sign up</button>
            <br />
            <small>
              <a href='#' onClick={toggleLoginHandle}>
                Log in instead
              </a>
            </small>
          </div>
        </>
      );
    }
  }
}
