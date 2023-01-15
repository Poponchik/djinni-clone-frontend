import * as React from "react";
import styles from "./styles/companyInfo.module.css";
import { useState } from "react";
import DataService from "./ds";

const initialInputValues = {
  name: "",
  description: "",
  douLink: "",
  siteLink: "",
};

function CompanyInfo() {
  const [avatar, setAvatar] = useState("");

  const [inputValues, setInputValues] = useState(initialInputValues);

  function onInputChange(event) {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
  }
  const companyId = localStorage.getItem("companyId");

  async function updateCompany() {
    console.log({ inputValues });
    const formData = new FormData();
    formData.append("name", inputValues.name);
    formData.append("description", inputValues.description);
    formData.append("siteLink", inputValues.siteLink);
    formData.append("douLink", inputValues.douLink);
    formData.append("avatar", avatar[0]);

    await DataService.company.update(companyId, formData);

    setInputValues({...initialInputValues});
  }

  function uploadImages(file) {
    if (file) {
      setAvatar(file);
    } else {
      console.log("file error");
    }
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
            <div className={styles.preview_images_div}>
              <div className={styles.preview_images}></div>
              <div className={styles.upload_image_div}>
                <label
                  htmlFor="file-upload"
                  className={styles.custom_file_upload}
                >
                  Завантажити фото
                </label>
              </div>
              <input
                id="file-upload"
                type="file"
                multiple
                onChange={(e) => uploadImages(e.target.files)}
              />
            </div>
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
