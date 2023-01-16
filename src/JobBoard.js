import logo from "./logo.svg";
import styles from "./styles/jobBoard.module.css";
import { MdLocationOn } from "react-icons/md";
import filters from "./filters.json";
import DataService from "./ds";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function JobBoard() {
  const [vacancies, setVacancies] = useState([]);

  const [filter, setFilter] = useState({
    specialty: [],
    experience: null,
  });

  async function getByFitler() {
    const objectFilter = {};

    objectFilter.specialty = filter.specialty.length
      ? filter.specialty
      : undefined;
      
    objectFilter.experience = filter.experience ? filter.experience : undefined;

    const { data } = await DataService.vacancy.getByFitler(objectFilter);
    setVacancies(data);
  }

  async function onFilterChange(key, value) {
    const changeExperience = (number) => {
      setFilter((prev) => {
        return {
          ...prev,
          experience: number,
        };
      });
    };

    const changeSpecialties = (specialty) => {
      const result = filter.specialty;
      const exists = filter.specialty.includes(specialty);
      if (exists) {
        result.splice(specialty, 1);
      } else {
        result.push(specialty);
      }
      setFilter((prev) => {
        return {
          ...prev,
          specialty: result,
        };
      });
    };

    const operations = {
      specialties: changeSpecialties,
      experience: changeExperience,
    };

    return operations[key](value);
  }

  console.log({ filter });

  useEffect(() => {
    getByFitler();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <div className={styles.page_title_div}>
          <h1 className={styles.page_title}>Вакансії на Джині</h1>
          <h1 className={styles.vacancy_count}>6890</h1>
        </div>

        <div className={styles.page_content}>
          <div className={styles.vacancy_div}>
            {vacancies?.map((vacancy) => {
              return (
                <div className={styles.vacancy}>
                  <Link to={`/vacancy/${vacancy._id}`}>
                    <h3 className={styles.vacancy_title}>{vacancy.name}</h3>
                  </Link>
                  <p className={styles.vacancy_info}>
                    {vacancy.shortDescription}
                  </p>

                  <div className={styles.company_info_div}>
                    <img
                      className={styles.company_logo}
                      src="/images/logo-social.png"
                    ></img>

                    <div className={styles.company_info}>
                      <h4 className={styles.company_name}>
                        {vacancy.company.name}{" "}
                      </h4>
                      <div className={styles.location_div}>
                        {/* <MdLocationOn size={16} className={styles.location_logo} /> */}
                        <p className={styles.location}>
                          {" "}
                          {vacancy.creator?.username}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
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
              {filters.specialties.technical.map((specialty) => {
                return (
                  <button
                    onClick={() => onFilterChange("specialties", specialty)}
                    className={styles.specialization}
                    style={{
                      color: filter.specialty.includes(specialty)
                        ? "black"
                        : "blue",
                    }}
                  >
                    {specialty}
                  </button>
                );
              })}
            </div>

            <p className={styles.speciaties_type}>Не технічні</p>
            <div className={styles.specialization_div}>
              {filters.specialties.nonTechnical.map((specialty) => {
                return (
                  <button
                    className={styles.specialization}
                    style={{
                      color: filter.specialty.includes(specialty)
                        ? "black"
                        : "blue",
                    }}
                    onClick={() => onFilterChange("specialties", specialty)}
                  >
                    {specialty}
                  </button>
                );
              })}
            </div>

            <p className={styles.filter_title}>Досвід роботи</p>
            <div className={styles.specialization_div}>
              {filters.experiences.map((experience) => {
                return (
                  <button
                    className={styles.specialization}
                    style={{
                      color:
                        filter.experience === experience.value
                          ? "black"
                          : "blue",
                    }}
                    onClick={() =>
                      onFilterChange("experience", experience.value)
                    }
                  >
                    {experience.text}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobBoard;
