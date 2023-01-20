import { useState } from "react";

export function useInput(initialInputValues) {
  const [inputValues, setInputValues] = useState(initialInputValues);

  function onInputChange(event) {
    console.log(event.target.name)
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
  }

  function setDefaultValues(values) {
    setInputValues(values);
  }

  return { inputValues, onInputChange, setDefaultValues };
}
