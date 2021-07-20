import { useState } from "react";

type UseForm = <T>(values: T) => {
  formValues: T;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  reset: (newFormState?: T) => void;
};

const useForm: UseForm = (values) => {
  const [formValues, setFormValues] = useState(values);

  const reset = (newFormState = values) => {
    setFormValues(() => newFormState);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  return { formValues, handleInputChange, reset };
};

export default useForm;
