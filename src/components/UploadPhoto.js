import styles from "../styles/uploadPhoto.module.css";

function UploadPhoto({ value, onChange }) {
  function uploadImages(file) {
    if (file) {
      onChange(file);
    } else {
      console.log("file error");
    }
  }

  return (
    <div className={styles.preview_images_div}>
      <div className={styles.preview_images}>
        {value && (
          <img
            src={window.URL.createObjectURL(new Blob(value))}
            className={styles.preview_image}
            alt=""
          ></img>
        )}
      </div>
      <div className={styles.upload_image_div}>
        <label htmlFor="file-upload" className={styles.custom_file_upload}>
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
  );
}

export default UploadPhoto;
