import PropTypes from 'prop-types';
import './ContactList.module.css';

export const ContactList = ({ contacts, deleteContact }) => (
  <ul>
    {contacts.map(({ id, name, number }) => {
      return (
        <li key={id}>
          <p>
            {name}: {number}
          </p>
          <button type="button" onClick={() => deleteContact(id)}>
            Delete
          </button>
        </li>
      );
    })}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  })).isRequired,
  deleteContact: PropTypes.func.isRequired,
};
