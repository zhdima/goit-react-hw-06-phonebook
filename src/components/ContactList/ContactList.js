import { ContactItem } from '../ContactItem/ContactItem';
import { ListItem } from './ContactList.styled';
import { useMemo } from 'react';
import { useSelector } from "react-redux";
import { getContacts, getNameFilter } from "../../redux/selectors";

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const nameFilter = useSelector(getNameFilter);

  const getVisibleContacts = () => {
    if (!nameFilter) {
      return contacts;
    }
    const normNameFilter = nameFilter.toLowerCase();
    return contacts.filter(({ name }) => name.toLowerCase().includes(normNameFilter));
  };

  const visibleContacts = useMemo(getVisibleContacts, [contacts, nameFilter]);

  return (
    <ul>
      {visibleContacts.map(contact => (
        <ListItem key={contact.id}>
          <ContactItem contact={contact} />
        </ListItem>
      ))}
    </ul>
  );
};
