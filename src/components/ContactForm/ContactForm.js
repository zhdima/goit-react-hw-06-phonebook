import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { Form, FormField, ErrorMessage, AddButton } from './ContactForm.styled';
import { useSelector, useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsSlice";
import { getContacts } from "../../redux/selectors";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'the name is too short')
    .max(100, 'the name is too long')
    .required('the name is required'),
  number: Yup.string()
    .min(3, 'the number is too short')
    .max(50, 'the number is too long')
    .required('the number is required'),
});

export const ContactForm = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const onSubmit = (values, actions) => {
    
    const normName = values.name.toLowerCase();
    if (contacts.find(({ name }) => name.toLowerCase() === normName)) {
      alert(`${values.name} is already in contacts!`);
      return;
    }
  
    dispatch(addContact(values));
    actions.resetForm();
  }

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={ContactSchema}
      onSubmit={onSubmit}
    >
      <Form autoComplete="off">
        <FormField>
          Name
          <Field name="name" type="text"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          />
          <ErrorMessage name="name" component="span" />
        </FormField>
        <FormField>
          Number
          <Field name="number" type="tel"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          />
          <ErrorMessage name="number" component="span" />
        </FormField>
        <AddButton type="submit">Add contact</AddButton>
      </Form>
    </Formik>
  );
};
