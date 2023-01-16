import styles from "./styles/vacancy.module.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import DataService from "./ds";
import { useState, useEffect } from "react";

function Vacancy() {
  const [vacancy, setVacancy] = useState({});
  const [coverLetter, setCoverLetter] = useState('');
  const [cv, setCV] = useState('')

  const { vacancyId } = useParams();

  async function getVacancy() {
    const { data } = await DataService.vacancy.getById(vacancyId);
    setVacancy(data);
  }

  async function apply(){
    const formData = new FormData();
    formData.append("coverLetter", coverLetter);
    formData.append("CV", cv[0]);

    await DataService.vacancy.apply(vacancyId, formData)
    setCV('') 
    setCoverLetter('')
  }

  function uploadImages(file) {
    if (file) {
      setCV(file);
    } else {
      console.log("file error");
    }
  }

  useEffect(() => {
    getVacancy();
  }, [vacancyId]);

  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <div className={styles.page_title_div}>
          <h1 className={styles.page_title}>{vacancy?.name}</h1>
        </div>
        <div className={styles.company_info_div}>
          <img className={styles.company_logo} src={`http://localhost:5000${vacancy?.company?.avatar}`}></img>

          <div className={styles.company_info}>
            <h4 className={styles.company_name}>{vacancy?.company?.name}</h4>
            <div className={styles.location_div}>
              {/* <MdLocationOn size={16} className={styles.location_logo} /> */}
              <p className={styles.location}>{vacancy?.creator?.username}</p>
            </div>
          </div>
        </div>
        <div className={styles.vacancy_info_div}>
          <div className={styles.descriptions}>
            <div className={styles.short_description}>
              {vacancy.shortDescription}
            </div>
            <div className={styles.detailed_description}>
              {vacancy.detailedDescription}
            </div>
          </div>
          <div className={styles.vacancy_info}>
            <p className={styles.info}>•ㅤКатегорія: {vacancy.specialty}</p>
            <p className={styles.info}>•ㅤ{vacancy.experience} роки досвіду</p>
          </div>
        </div>
        <div className={styles.aplication_div}>
            <textarea value={coverLetter} placeholder="Cover letter" className={styles.cover_letter}
            onChange={(event)=> setCoverLetter(event.target.value)}
            
            ></textarea>
            <div className={styles.upload_image_div}>
                <label
                  htmlFor="file-upload"
                  className={styles.custom_file_upload}
                >
                  Завантажити CV
                </label>
              </div> 
              <input
                id="file-upload"
                type="file"
                multiple
                onChange={(e) => uploadImages(e.target.files)}
              />
        </div>
        <button onClick={apply}
          className={vacancy.isAlreadyApplied ? styles.main_button_disabled : styles.main_button}
          disabled={vacancy.isAlreadyApplied}
        >
          {vacancy.isAlreadyApplied ? "Вже відгукнулися" : "Відгукнутися"}
        </button>
      </div>
    </div>
  );
}

export default Vacancy;
