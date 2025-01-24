import { changeFilter } from "../../redux/filtersSlice";
import css from "./SearchBox.module.css";
import { useDispatch } from "react-redux";

const SearchBox = () => {
	const dispatch = useDispatch();
	const handleFilterChange = (filter) => dispatch(changeFilter(filter));

	return (
		<div className={css.searchBox}>
			<p>Find contacts by names</p>
			<input type="text" onChange={(e) => handleFilterChange(e.target.value)} />
		</div>
	);
};

export default SearchBox;