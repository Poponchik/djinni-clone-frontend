import * as React from "react";
import styles from "../styles/companyInfo.module.css";
import { useState, useEffect } from "react";
import DataService from "../ds";
import UploadFile from "./UploadFile";
import { createFormDataFromObject, getUser } from "../utils";
import { useInput } from "../customHooks/useInput";

const initialInputValues = {
  name: "",
  description: "",
  douLink: "",
  siteLink: "",
};

function CompanyInfo() {
  const [avatar, setAvatar] = useState("");
  const {inputValues, setInputValues, setDefaultValues} = useInput(initialInputValues);

  async function updateCompany() {
    const formData = createFormDataFromObject({...inputValues, avatar: avatar[0]})

    const companyId = getUser().companyId;

    await DataService.company.update(companyId, formData);

    setDefaultValues(initialInputValues);
    window.location.href = '/myVacancies'
  }

  async function fetchData() {
    const { companyId } = getUser();
    const { data } = await DataService.company.getById(companyId);
    setDefaultValues(data);

  }

  useEffect(() => {
    fetchData();
  }, []);

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
                onChange={setInputValues}
              ></input>
              <textarea
                name="description"
                placeholder="Короткий опис"
                className={styles.input}
                value={inputValues.description}
                onChange={setInputValues}
              ></textarea>
              <input
                name="siteLink"
                placeholder="Посилання на сайт компанії"
                className={styles.input}
                value={inputValues.siteLink}
                onChange={setInputValues}
              ></input>
              <input
                name="douLink"
                placeholder="Посилання на Dou"
                className={styles.input}
                value={inputValues.douLink}
                onChange={setInputValues}
              ></input>
            </div>
            <UploadFile value={avatar} onChange={setAvatar} />
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
