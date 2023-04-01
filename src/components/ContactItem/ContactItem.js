import PropTypes from 'prop-types';
import { BsFillPersonFill } from 'react-icons/bs';
import { DelButton } from './ContactItem.styled';
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";

export const ContactItem = ({ contact: { id, name, number } }) => {
  const dispatch = useDispatch();

  return (
    <>
      <BsFillPersonFill size="16" />
      <span>{name}:</span>
      <span>{number}</span>
      <DelButton type="button" onClick={() => dispatch(deleteContact(id))}>Delete</DelButton>
    </>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired,
};
