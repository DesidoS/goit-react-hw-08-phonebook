import { useState, useRef } from 'react';
import { Notify } from 'notiflix';
import { Form, Label, Field, Add, OpenForm } from './ContactForm.styled';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { TiDelete } from 'react-icons/ti';
import { addContacts } from 'redux/contact/operations';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setContactName] = useState('');
  const [number, setNumber] = useState('');
  const ref = useRef();

  const toggleState = () => {
    if (isOpen) return;
    setIsOpen(!isOpen);
    ref.current.blur();
  };

  const onInputChange = e => {
    const fieldName = e.currentTarget.name;
    const fieldValue = e.currentTarget.value;

    if (fieldName === 'name') {
      setContactName(fieldValue);
    }
    if (fieldName === 'number') {
      setNumber(fieldValue);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    const form = e.target;
    if (contacts.items.length > 0) {
      const contactsInPhonebook = [];
      contacts.items.forEach(({ name }) =>
        contactsInPhonebook.push(name.toLowerCase())
      );
      if (contactsInPhonebook.includes(name.toLowerCase())) {
        Notify.warning(`${name}is already in contacts.`);
        form.reset();
        return;
      }
    }
    dispatch(addContacts({ name, number }));
    form.reset();
    setIsOpen(false);
  };

  return (
    <>
      <Flipper flipKey={isOpen} spring="stiff" stagger>
        {isOpen ? (
          <Flipped flipId="wrapper">
            <div ref={ref}>
              <Form onSubmit={onSubmit}>
                <Label>
                  Name
                  <Field
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    onChange={onInputChange}
                  />
                </Label>
                <Label>
                  Number
                  <Field
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    onChange={onInputChange}
                  />
                </Label>
                <Add type="submit">Add contact</Add>
                <OpenForm type="button" onClick={() => setIsOpen(false)}>
                  <TiDelete
                    style={{
                      color: 'tomato',
                      fontSize: '36px',
                      marginBottom: '-4px',
                    }}
                  />
                </OpenForm>
              </Form>
            </div>
          </Flipped>
        ) : (
          <Flipped flipId="wrapper">
            <div ref={ref} onClick={toggleState}>
              <Flipped flipId="action">
                <OpenForm>+</OpenForm>
              </Flipped>
            </div>
          </Flipped>
        )}
      </Flipper>
    </>
  );
};

export default ContactForm;
