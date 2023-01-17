import styles from '../styles/auth.module.css';
import { Link } from "react-router-dom";
import { useState } from 'react'
import DataService from '../ds'
import { getUser } from '../utils';

function Authorization() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function authorization() {
        try {
            const { data } = await DataService.auth.authorization( email, password)
            localStorage.setItem('token', data)
            localStorage.setItem('userData', JSON.stringify(getUser()))
            
            window.location.href = '/'
        } catch (e) {
            alert(e)
        }

    }

    return (
        <div className={styles.container}>
            <div className={styles.inner_container}>
                <div className={styles.page_content}>
                    <h1 className={styles.page_title}>Увійти на <strong>proFound</strong></h1>
                    <div className={styles.inputs}>
                    
                        <input placeholder='Email' className={styles.input}
                            onChange={event => setEmail(event.target.value)}
                        ></input>
                        <input placeholder='Пароль' type="password" className={styles.input}
                            onChange={event => setPassword(event.target.value)}
                        ></input>
                    </div>
                    <button className={styles.main_button}
                        onClick={() => authorization()}
                    >Продовжити</button>
                    <Link to='/signup' className={styles.link}>
                        <p className={styles.have_account}>Зареєструватись</p>
                    </Link>



                </div>
            </div>
        </div>
    );
}

export default Authorization;
