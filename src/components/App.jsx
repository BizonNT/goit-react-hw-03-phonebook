import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './ContactList/Filter';
import ContactList from './ContactList/ContactList';
import Notification from './Notification/Notification';

import css from './app.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = data => {
    const arrayContacts = this.state.contacts;
    this.setState({ contacts: [...arrayContacts, data] });
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  deleteContact = event => {
    const contactId = event.currentTarget.closest('li').id;
    const arrayAfterDelete = this.state.contacts.filter(
      contact => contact.id !== contactId
    );
    this.setState({ contacts: arrayAfterDelete });
  };

  render() {
    const filter = this.state.filter;
    const contacts = this.state.contacts;
    const filterLowerCase = filter.toLowerCase();
    const sortedNames = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterLowerCase)
    );
    const length = contacts.length;

    return (
      <div className={css.container}>
        <h2 className={css.title}>Phonebook</h2>
        <ContactForm
          onSubmit={this.formSubmitHandler}
          contacts={contacts}
        />
        <h2 className={css.title}>Contacts</h2>
        {length > 0 ? (
          <>
            <Filter value={filter} onChange={this.changeFilter} />
            <ContactList
              sortedNames={sortedNames}
              onClick={this.deleteContact}
            />
          </>
        ) : (
          <Notification message="There is no contacts in the Phonebook" />
        )}
      </div>
    );
  }
}

export default App;
