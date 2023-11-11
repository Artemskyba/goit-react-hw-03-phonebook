import { Component } from "react";
import { ContactForm } from "./phonebook/phonebook-form/phonebook-form";
import { nanoid } from "nanoid";
import { ContactList } from "./phonebook/contacts/contacts";
import { Filter } from "./phonebook/contacts/contacts-filter";

export class App extends Component {

  state = {
    contacts: [],
    filter:'',
  };

  
  
  addContact = (contactName, contactNumber) => {
    const { contacts } = this.state;
    const exsistContact = contacts.find(contact => contact.name.toLowerCase() === contactName.toLowerCase());

    exsistContact ? alert(`${contactName} is already in contacts`)
      : this.setState(prevState => {
      const newContacts = [...prevState.contacts, { id: nanoid(), name: contactName, number: contactNumber }];
      return { contacts: newContacts }
    })
  }

  updateFilter = (filterName) => {
    this.setState({ filter: filterName });
  }

  deleteContact = (id) => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id)
      }
    })

  }

  render() {
    const { contacts, filter } = this.state;

    const filtredContacts = contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(filter.toLowerCase())
    })
    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} updateFilter={this.updateFilter}/>
        <ContactList contacts={filtredContacts} onDelete={this.deleteContact}/>

      </>);
  }
};
