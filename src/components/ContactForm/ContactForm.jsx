import { Field, Form, Formik, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import css from "./ContactForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contactsSlice";

const ContactForm = () => {
  const id = useId(); // Унікальний ID для атрибутів форми
  const dispatch = useDispatch(); // Диспатч для Redux
  const contacts = useSelector((state) => state.contacts.items); // Отримуємо всі контакти з Redux

  const initialValues = {
    name: "",
    number: "",
  };

  const handleSubmit = (values, actions) => {
    const { name, number } = values;

    // Перевіряємо, чи контакт уже існує
    const duplicate = contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (duplicate) {
      alert(`${name} is already in contacts.`);
      actions.setSubmitting(false);
      return;
    }

    // Відправляємо новий контакт у Redux
    dispatch(
      addContact({
        id: crypto.randomUUID(), // Унікальний ID контакту
        name,
        number,
      })
    );

    actions.resetForm(); // Скидаємо форму після успішного додавання
  };

  const phoneRegex = /^\d{3}-\d{2}-\d{2}$/; // Регулярний вираз для номера телефону
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be 50 characters or less")
      .required("Name is required"),
    number: Yup.string()
      .matches(phoneRegex, "Invalid phone number (format: 123-45-67)")
      .required("Phone number is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <label htmlFor={`${id}-name`}>Name</label>
          <Field type="text" name="name" id={`${id}-name`} />
          <ErrorMessage name="name" component="span" className={css.error} />

          <label htmlFor={`${id}-number`}>Number</label>
          <Field type="tel" name="number" id={`${id}-number`} />
          <ErrorMessage name="number" component="span" className={css.error} />

          <button
            type="submit"
            className={css.button}
            disabled={isSubmitting} // Деактивація кнопки під час відправки
          >
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
