"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import styles from "./Signup.module.css"

export default function SignUp() {
    const [name , setName]= useState('');
    const [password, setPassword] =useState('');
    const router = useRouter();

    
    function handleClick(){
        const  usersString =localStorage.getItem("users");
        const usersObject = JSON.parse(usersString);
        if(name ===""){return;}
        localStorage.setItem("users",JSON.stringify({
            ...usersObject,
            [name]:password,
        }))
        router.push('/');
    }
  return (
    <div className={styles.container}>
        <h2>Sign Up</h2>
        <label>Kullanıcı Adı:<br />
            <input 
                type="text"
                placeholder="isim"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                />     
        </label>
        <label>Password:<br />
            <input 
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />     
        </label>
        <button onClick={handleClick}>Kaydol</button>
    </div>
  );
}
