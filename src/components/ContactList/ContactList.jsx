import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { useSelector } from "react-redux";
import { selectContacts } from "../../redux/contactsSlice";
import { selectFilter } from "../../redux/filtersSlice";

const getVisibleContacts = (contacts, nameFilter) => {
	return contacts.filter((contact) =>
		contact.name.toLowerCase().includes(nameFilter.toLowerCase())
	);
};

const ContactList = () => {
	const contacts = useSelector(selectContacts);
	const statusFilter = useSelector(selectFilter);
	const visibleContacts = getVisibleContacts(contacts, statusFilter);

	return (
		<ul className={css.contacList}>
			{visibleContacts.map((contact) => (
				<li key={contact.id}>
					<Contact contact={contact}></Contact>
				</li>
			))}
		</ul>
	);
};

export default ContactList;