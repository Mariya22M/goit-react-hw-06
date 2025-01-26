import { Field, Form, Formik, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import css from "./ContactForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contactsSlice";

const ContactForm = () => {
  const id = useId(); // Унікальний ідентифікатор для атрибутів id
  const dispatch = useDispatch(); // Диспатч для Redux
  const contacts = useSelector((state) => state.contacts); // Доступ до контактів у Redux-стані

  const initialValues = {
    name: "",
    number: "",
  };

  const handleSubmit = (values, actions) => {
    // Перевірка на дублювання контактів
    const isDuplicate = contacts.some(
      (contact) =>
        contact.name.toLowerCase() === values.name.toLowerCase() ||
        contact.number === values.number
    );

    if (isDuplicate) {
      alert("This contact already exists!"); // Виведення попередження
      return;
    }

    // Додавання контакту до Redux-стану
    dispatch(
      addContact({
        id: crypto.randomUUID(), // Генерація унікального id
        name: values.name,
        number: values.number,
      })
    );
    actions.resetForm(); // Скидання форми після додавання контакту
  };

  const phoneRegex = /^\d{3}-\d{2}-\d{2}$/; // Регулярний вираз для перевірки номера телефону
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters") // Мінімальна довжина
      .max(50, "Name must be 50 characters or less") // Максимальна довжина
      .required("Name is required"), // Поле обов'язкове
    number: Yup.string()
      .matches(phoneRegex, "Invalid phone number (format: 123-45-67)") // Валідація за форматом
      .required("Phone number is required"), // Поле обов'язкове
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {() => (
        <Form className={css.form}>
          {/* Поле для введення імені */}
          <label htmlFor={`${id}-name`}>Name</label>
          <Field type="text" name="name" id={`${id}-name`} />
          <ErrorMessage name="name" component="span" className={css.error} />

          {/* Поле для введення номера телефону */}
          <label htmlFor={`${id}-number`}>Number</label>
          <Field type="tel" name="number" id={`${id}-number`} />
          <ErrorMessage name="number" component="span" className={css.error} />

          {/* Кнопка для додавання контакту */}
          <button type="submit" className={css.button}>
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
