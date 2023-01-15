import * as React from "react";
import styles from './styles/companyInfo.module.css';
import { useState } from 'react'
import DataService from './ds'


function CompanyInfo() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [avatar, setAvatar] = useState('')
    const [siteLink, setSiteLink] = useState('')
    const [douLink, setDouLink] = useState('')

    const companyId = localStorage.getItem('companyId')

    async function updateCompany() {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("siteLink", siteLink);
        formData.append("douLink", douLink);
        formData.append("avatar", avatar[0]);
        console.log(avatar[0])
        await DataService.company.update(companyId, formData)
    }

    function uploadImages(file) {
        if (file != undefined) {
            setAvatar(file);
        } else {
            console.log("file error");
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.inner_container}>
                <div className={styles.page_content}>
                    <h1 className={styles.page_title}>Заповніть профіль, щоб публікувати вакансії.</h1>
                    <div className={styles.company_info}>
                        <div className={styles.inputs}>

                            <input placeholder='Назва компанії' className={styles.input}
                                onChange={event => setName(event.target.value)}
                            ></input>
                            <input placeholder='Короткий опис' className={styles.input}
                                onChange={event => setDescription(event.target.value)}
                            ></input>
                            <input placeholder='Посилання на сайт компанії' className={styles.input}
                                onChange={event => setSiteLink(event.target.value)}
                            ></input>
                            <input placeholder='Посилання на Dou' className={styles.input}
                                onChange={event => setDouLink(event.target.value)}
                            ></input>
                        </div>
                        <div className={styles.preview_images_div}>
                            <div className={styles.preview_images}>

                            </div>
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

                    <button className={styles.main_button}
                        onClick={() => updateCompany()}
                    >Продовжити</button>

                </div>
            </div>
        </div>
    )
}

export default CompanyInfo;
