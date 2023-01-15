import styles from './styles/recrutiersJobList.module.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import DataService from './ds'

function RecrutiersJobList() {
    const [vacancies, setVacancies] = useState([])

    async function getAllVacancies() {
        const { data } = await DataService.vacancy.getByUser()
        setVacancies(data)
    }

    useEffect(() => {
        getAllVacancies()
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.inner_container}>
                <div className={styles.page_title_div}>
                    <h1 className={styles.page_title}>Мої вакансії</h1>
                    <h1 className={styles.vacancy_count}>6890</h1>
                </div>
                <button onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/createVacancy';
                }} className={styles.main_button}>Створити нову вакансію</button>

                {vacancies.map((vacancy) => {
                    return (
                        <div className={styles.vacancy}>
                            <Link to={`/vacancy/${vacancy._id}`}>
                                <h3 className={styles.vacancy_title}>{vacancy.name}</h3>
                            </Link>
                            <p className={styles.vacancy_info}>{vacancy.shortDescription}</p>

                            <div className={styles.company_info_div}>
                                <img className={styles.company_logo} src={`http://localhost:5000${vacancy.company.avatar}`}></img>

                                <div className={styles.company_info}>
                                    <h4 className={styles.company_name}>{vacancy.company.name}</h4>
                                    <div className={styles.location_div}>
                                    <p className={styles.location}> {vacancy.creator.username}</p> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}




            </div>
        </div>
    );
}

export default RecrutiersJobList;
