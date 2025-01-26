import { FaUser, FaPhone } from "react-icons/fa";
import css from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";

const Contact = ({ contact: { id, name, number } }) => {
	const dispatch = useDispatch();

	const handleDelete = () => {
		dispatch(deleteContact(id));
	};

	return (
		<>
			<p className={css.contactInfo}>
				<FaUser style={{ marginRight: "0.5rem" }} />
				{name}
				<span>
					<FaPhone
						style={{
							marginRight: "0.5rem",
							transform: "rotate(90deg)",
						}}
					/>
					{number}
				</span>
			</p>
			<button
				className={css.delete}
				type="button"
				onClick={() => handleDelete()}
			>
				Delete
			</button>
		</>
	);
};

export default Contact;

