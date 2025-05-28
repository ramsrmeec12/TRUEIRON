import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import auth from "../config"
function Login() {

    

    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        auth.onAuthStateChanged(function(user){
            if(user){
                navigate('/')
                
            }
        })
    },[])

    function handlelogin(){
        signInWithEmailAndPassword(auth,email,password)
        .then((auth)=>{
            console.log('Login succesful')
            console.log(auth)
            navigate('/home')
        }).catch((err)=>console.log(err))
    }

    return (<div className="">
        <h1 className="text-3xl ">Login Page</h1>
        <br />
        <input type="email" onChange={(e) => setemail(e.target.value)} value={email} className="mt-1 p-2 w border-black border rounded" placeholder="Enter e-mail" />
        <input onChange={(e) => setpassword(e.target.value)} value={password} className="mt-1 p-2 w border-black border rounded" placeholder="Enter password" />
        <button onClick={handlelogin} className="bg-black text-white p-3 rounded-md ml-3">Login</button>
    </div>)
}

export default Login