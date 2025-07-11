'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from "./page.module.css"

export default function SignInPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser = localStorage.getItem('users');

    if (!storedUser) {
      alert('Kayıtlı kullanıcı bulunamadı!');
      return;
    }

    const user = JSON.parse(storedUser);

    if ( user[name] === password) {
      localStorage.setItem('loggedIn', 'true');
      alert('Giriş başarılı!');
      router.push('/game');
    } else {
      alert('Hatalı kullanıcı adı veya şifre!');
    }
  };

  const handleSignUpClick = () => {
    router.push('/signup'); // Assuming your signup page is at /signup
  };
  return (
      <div className={styles.container}>
        <h2 >Çiftliğe hoş geldiniz!</h2>
        <form onSubmit={handleSubmit} >
          <label >
            Name:
            <input
              type="name"
              placeholder="Kullanıcı Adı"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.inputField}
            />
          </label><br />
          <label className={styles.label}>
            Password:
            <input
              type="password"
              placeholder="Your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label><br /><br />
          <button type="submit" >
            Sign In
          </button>
          <button type="button" onClick={handleSignUpClick} ><br ></br><br></br>
          Hesabın yok mu? Kaydol!
        </button>
        </form>
      </div>
  );
}

