import styles from './styles/auth.module.css';
import { Link } from "react-router-dom";
import { useState } from 'react';
import DataService from './ds';
import { getUser } from './utils';



function Registration() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [name, setName] = useState('')

    async function registration() {
        const { data } = await DataService.auth.registration(name, email, password, role)
        if (role === 'Recruter') {
            localStorage.setItem('companyId', data.companyId)
            localStorage.setItem('token', data.token)
            localStorage.setItem('userData', JSON.stringify(getUser()))
            window.location.href = '/companyInfo'
        } else {
            window.location.href = '/login'
        }

        setName('')
        setEmail('')
        setPassword('')
        setRole('')

    }

    return (
        <div className={styles.container}>
            <div className={styles.inner_container}>
                <div className={styles.page_content}>
                    <h1 className={styles.page_title}>Зареєструватись на  <strong>proFound</strong></h1>
                    <div className={styles.inputs}>
                        <input placeholder='Імя' className={styles.input}
                            onChange={event => setName(event.target.value)}
                        ></input>
                        <input value={email} placeholder='Email' className={styles.input}
                            onChange={(event) => setEmail(event.target.value)}
                        ></input>
                        <input value={password} type="password" placeholder='Пароль' className={styles.input}
                            onChange={(event) => setPassword(event.target.value)}
                        ></input>
                        <div className={styles.options_div}>
                            <div className={styles.option}>
                                <input type="radio" id="role1" name="role" value="Recruter"
                                    onChange={(event) => setRole(event.target.value)}
                                />
                                <label className={styles.role} htmlFor="role1">Я роботодавець - шукаю розробників</label>
                            </div>

                            <div className={styles.option}>
                                <input type="radio" id="role2" name="role" value="Candidate"
                                    onChange={(event) => setRole(event.target.value)}
                                />
                                <label className={styles.role} htmlFor="role2">Я кандидат - шукаю пропозиції</label>
                            </div>

                        </div>
                    </div>
                    <button className={styles.main_button} onClick={() => registration()}>Продовжити</button>
                    <Link to='/login' className={styles.link}>
                        <p className={styles.have_account}> Я вже маю акаунт</p>
                    </Link>



                </div>
            </div>
        </div>
    );
}

export default Registration;
