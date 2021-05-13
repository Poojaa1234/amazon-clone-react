import React , {useState} from 'react';
import './Login.css';
import { Link, useHistory } from 'react-router-dom'
import { auth } from './firebase';


export default function Login() {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn=(e)=>{
        e.preventDefault();
    
        //Firebase
        auth.signInWithEmailAndPassword(email,password)
        .then(auth=>{
            history.push('/')
        })
        .catch(error=> alert(error.message))


    }
    const register=(e)=>{
        e.preventDefault();

        //Firebase

        auth.createUserWithEmailAndPassword(email,password)
        .then((auth)=>{
            console.log(auth)
            if(auth){
                history.push("/")
            }
        })
        .catch((error)=>{
            alert(error.message);
        })

    }
    return (
        <div className="login">
        <Link to="/">
            <img className="login_logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1000px-Amazon_logo.svg.png" alt="logo" />
        </Link>

        <div className="login_container">
            <h1>Sign-in</h1>
            <form>
                <h5>Email</h5>
                <input type="text" value={email} onChange={e=> setEmail(e.target.value)} />

                <h5>Password</h5>
                <input type="password" value={password} onChange={e=> setPassword(e.target.value)} />

                <button className="login-signInButton" onClick={signIn} type="submit">Sign In</button>
            </form>

             <p>By signing -in you agree to the AMAZON CLONE Conditions of Use & Sale.
            Please see out Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.</p>

            <button className="login_registerButton" onClick={register}>Create your Amazon Account</button>

        </div>
        </div>
    )
}
