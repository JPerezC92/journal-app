import { useState } from "react";

type UseForm = <T>(values: T) => {
  formValues: T;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const useForm: UseForm = (values) => {
  const [formValues, setFormValues] = useState(values);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  return { formValues, handleInputChange };
};

export default useForm;
