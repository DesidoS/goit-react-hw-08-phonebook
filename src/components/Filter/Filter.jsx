import { Label, Field } from './Filter.styled';
import { useDispatch } from 'react-redux';
import { setStatusFilter } from '../../redux/contact/filtersSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const handleFilterChange = e => {
    dispatch(setStatusFilter(e.currentTarget.value));
  };

  return (
    <Label>
      Find contact by name
      <Field type="name" required onChange={handleFilterChange} />
    </Label>
  );
};

export default Filter;
