import { FilterWrap } from './Filter.styled';
import { useSelector, useDispatch } from "react-redux";
import { getNameFilter } from "../../redux/selectors";
import { setNameFilter } from "../../redux/filtersSlice";

export const Filter = () => {
  const nameFilter = useSelector(getNameFilter);
  const dispatch = useDispatch();

  const onFilterChange = evt => dispatch(setNameFilter(evt.currentTarget.value)); 

  return (
    <FilterWrap>
      <label>
        <p>Find contacts by name</p>
        <input type="text" value={nameFilter} onChange={onFilterChange} />
      </label>
    </FilterWrap>
  );
};
