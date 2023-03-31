import { useState, useEffect, useMemo } from 'react';
import { Layout } from './Layout';
import { ContactList } from "./ContactList/ContactList";
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import initContacts from '../contacts.json';

const LS_CONTACTS_KEY = 'PhoneBook_Contacts';

const getInitialContacts = () => {
  const jsonContacts = localStorage.getItem(LS_CONTACTS_KEY);
  if (jsonContacts !== null) {
    try {
      return JSON.parse(jsonContacts);
    } catch (err) {
      console.error(`Error: invalid saved contacts in LocalStorage: ${LS_CONTACTS_KEY} - ${err}`);
    }
  }
  return [...initContacts];
}

export const App = () => {

  const [contacts, setContacts] = useState(getInitialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(LS_CONTACTS_KEY, JSON.stringify(contacts));
    } catch (err) {
      console.error(`Error: failure saving contacts in LocalStorage: ${LS_CONTACTS_KEY} - ${err}`);
    }
  }, [contacts]);

  const handleAddContact = newContact => {
    const normName = newContact.name.toLowerCase();
    if (contacts.find(({ name }) => name.toLowerCase() === normName)) {
      alert(`${newContact.name} is already in contacts!`);
      return false;
    }
    setContacts(prevContacts => ([...prevContacts, newContact]));
    return true;
  }

  const handleDeleteContact = idToDel =>
    setContacts(prevContacts => prevContacts.filter(({ id }) => (id !== idToDel)));

  const onFilterChange = evt => setFilter(evt.currentTarget.value); 

  const getVisibleContacts = () => {
    if (!filter) {
      return contacts;
    }
    const normFilter = filter.toLowerCase();
    return contacts.filter(({ name }) => name.toLowerCase().includes(normFilter));
  };

  const visibleContacts = useMemo(getVisibleContacts, [contacts, filter]);

  return (
    <Layout>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact}/>
      <h2>Contacts</h2>
      <Filter filter={filter} onChange={onFilterChange} />
      <ContactList contacts={visibleContacts} onDeleteContact={handleDeleteContact} />
    </Layout>
  );
};
