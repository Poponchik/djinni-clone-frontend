import * as React from "react";
import styles from "../styles/companyInfo.module.css";
import { useState } from "react";
import DataService from "../ds";
import UploadPhoto from './UploadPhoto'

const initialInputValues = {
  name: "",
  description: "",
  douLink: "",
  siteLink: "",
};

function CompanyInfo() {
  const [avatar, setAvatar] = useState("");
  // const [src, setSrc] = useState("");
  const [inputValues, setInputValues] = useState(initialInputValues);

  function onInputChange(event) {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });

  }
  const companyId = localStorage.getItem("companyId");

  async function updateCompany() {
    const formData = new FormData();
    formData.append("name", inputValues.name);
    formData.append("description", inputValues.description);
    formData.append("siteLink", inputValues.siteLink);
    formData.append("douLink", inputValues.douLink);
    formData.append("avatar", avatar[0]);

    await DataService.company.update(companyId, formData);

    setInputValues({ ...initialInputValues });
  }

 

  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <div className={styles.page_content}>
          <h1 className={styles.page_title}>
            Заповніть профіль, щоб публікувати вакансії.
          </h1>
          <div className={styles.company_info}>
            <div className={styles.inputs}>
              <input
                name="name"
                placeholder="Назва компанії"
                className={styles.input}
                value={inputValues.name}
                onChange={(event) => onInputChange(event)}
              ></input>
              <input
                name="description"
                placeholder="Короткий опис"
                className={styles.input}
                value={inputValues.description}
                onChange={(event) => onInputChange(event)}
              ></input>
              <input
                name="siteLink"
                placeholder="Посилання на сайт компанії"
                className={styles.input}
                value={inputValues.siteLink}
                onChange={(event) => onInputChange(event)}
              ></input>
              <input
                name="douLink"
                placeholder="Посилання на Dou"
                className={styles.input}
                value={inputValues.douLink}
                onChange={(event) => onInputChange(event)}
              ></input>
            </div>
            <UploadPhoto value = {avatar} onChange = {setAvatar}/>
            
          </div>

          <button
            className={styles.main_button}
            onClick={() => updateCompany()}
          >
            Продовжити
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompanyInfo;
