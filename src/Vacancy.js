import styles from "./styles/vacancy.module.css";
import { useParams } from "react-router-dom";
import DataService from "./ds";
import { useState, useEffect } from "react";
import { config } from "./config.js";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import moment from "moment";

function Vacancy() {
  const [vacancy, setVacancy] = useState({});
  const [coverLetter, setCoverLetter] = useState("");
  const [cv, setCV] = useState("");

  const userData = JSON.parse(localStorage.getItem("userData"));
  const { vacancyId } = useParams();

  async function getVacancy() {
    const { data } = await DataService.vacancy.getById(vacancyId);
    setVacancy(data);
  }

  async function apply() {
    const formData = new FormData();
    formData.append("coverLetter", coverLetter);
    formData.append("CV", cv[0]);

    await DataService.vacancy.apply(vacancyId, formData);
    setCV("");
    setCoverLetter("");
    getVacancy();
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
          <img
            className={styles.company_logo}
            src={`${config.serverUrl}/${vacancy?.company?.avatar}`}
            alt=""
          ></img>

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
        {vacancy.isAlreadyApplied || userData.role === "Recruter" ? null : (
          <div className={styles.aplication_div}>
            <textarea
              value={coverLetter}
              placeholder="Cover letter"
              className={styles.cover_letter}
              onChange={(event) => setCoverLetter(event.target.value)}
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
        )}

        <div className={styles.site_div}>
          <p className={styles.site_title}>Сторінка на Dou:</p>
          <a className={styles.site_link} href={vacancy?.company?.douLink}>
            {vacancy?.company?.douLink}
          </a>
        </div>

        <div className={styles.site_div}>
          <p className={styles.site_title}>Сторінка на Dou:</p>
          <a className={styles.site_link} href={vacancy?.company?.siteLink}>
            {vacancy?.company?.siteLink}
          </a>
        </div>

        <div className={styles.stats_div}>
          <div className={styles.date_div}>
            <AiOutlineEdit />
            <p className={styles.date}>
              Вакансія опублікована{" "}
              {moment(vacancy.createdAt).format("DD.MM.YYYY")}
            </p>
          </div>

          <div className={styles.stats}>
            <div className={styles.views}>
              <AiOutlineEye />
              <p>{vacancy.viewsCount} переглядів</p>
            </div>
            <div className={styles.aplications}>
              <BsFillPeopleFill />
              <p>{vacancy.applicationsCount} відгуків</p>
            </div>
          </div>
        </div>

        {userData.role === "Candidate" && (
          <button
            onClick={apply}
            className={
              vacancy.isAlreadyApplied
                ? styles.main_button_disabled
                : styles.main_button
            }
            disabled={vacancy.isAlreadyApplied}
          >
            {vacancy.isAlreadyApplied ? "Вже відгукнулися" : "Відгукнутися"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Vacancy;
