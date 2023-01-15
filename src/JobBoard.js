import logo from './logo.svg';
import styles from './styles/jobBoard.module.css';
import { MdLocationOn } from 'react-icons/md';
import speciaties from './speciaties.json'
import DataService from './ds'
import { useState, useEffect } from 'react'



function JobBoard() {
  const [vacancies, setVacancies] = useState([])
  const [experience, setExperience] = useState('')
  const [specialty, setSpecialty] = useState('')


  async function getAllVacancies() {
    const { data } = await DataService.vacancy.getAllVacancies()
    setVacancies(data)
    console.log(data)
  }

  useEffect(() => {
    getAllVacancies()
  }, [])



  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <div className={styles.page_title_div}>
          <h1 className={styles.page_title}>Вакансії на Джині</h1>
          <h1 className={styles.vacancy_count}>6890</h1>
        </div>

        <div className={styles.page_content}>
          <div className={styles.vacancy_div}>

            {vacancies.map(vacancy => {
              return (
                <div className={styles.vacancy}>
                  <h3 className={styles.vacancy_title}>{vacancy.name}</h3>
                  <p className={styles.vacancy_info}>Solidgate створює надсучасний
                    фінтех продукт, який допомагає компаніям з США, ЄС, Латинської
                    Америки приймати платежі.</p>

                  <div className={styles.company_info_div}>
                    <img className={styles.company_logo} src='/images/logo-social.png'></img>

                    <div className={styles.company_info}>
                      <h4 className={styles.company_name}>Solidgate </h4>
                      <div className={styles.location_div}>
                        {/* <MdLocationOn size={16} className={styles.location_logo} />
                    <p className={styles.location}> Україна</p> */}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}




          </div>
          <div className={styles.filter_div}>
            {/* <p className={styles.filter_title}>Шукати за посадою</p>
            <div className={styles.search_div}>
              <input placeholder='Наприклад: Front-end engineer' className={styles.search_input}></input>
              <button className={styles.search_button}>→</button>
            </div> */}

            <p className={styles.filter_title}>Спеціалізація</p>
            <p className={styles.speciaties_type}>Технічні</p>
            <div className={styles.specialization_div}>
              {speciaties.technical.map((speciaty) => {
                return (
                  <button className={styles.specialization}>{speciaty}</button>
                )
              }
              )}
            </div>

            <p className={styles.speciaties_type}>Не технічні</p>
            <div className={styles.specialization_div}>
              {speciaties.nonTechnical.map((speciaty) => {
                return (
                  <button className={styles.specialization}>{speciaty}</button>
                )
              }
              )}
            </div>


            <p className={styles.filter_title}>Досвід роботи</p>
            <div className={styles.specialization_div}>
              <button className={styles.specialization}>Без досвіду</button>
              <button className={styles.specialization}>1 рік</button>
              <button className={styles.specialization}>2 роки</button>
              <button className={styles.specialization}>3 роки</button>
              <button className={styles.specialization}>5 років</button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default JobBoard;
