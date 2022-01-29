import { Button, TextField } from '@mui/material';
import { ChangeEvent, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Route } from '../../routes';
import { actionCreators, State } from '../../state';

type formInputField = {
    value: string;
    errorMessage?: string;
}

type formInput = {
    name: formInputField;
    email: formInputField;
}

export default function Form() {
  const [{ name, email }, setFormData] = useState<formInput>({name: { value: '' }, email: { value: '' } });
  const dispatch = useDispatch();
  const { addToList, editUser } = bindActionCreators(actionCreators, dispatch);
  const usersList = useSelector((state: State) => state.users);
  const navigate = useNavigate();
  const params = useParams();

  const handleInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      setFormData((prevValue) => ({
          ...prevValue,
          [e.target.name]: { value: e.target.value },
      }));
  }, []);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (!name.value || !email.value) {
      setFormData((prevState) => ({
          ...prevState,
          name: { value: prevState.name.value, errorMessage: prevState.name.value === "" ? "Name is required." : "" },
          email: { value: prevState.email.value, errorMessage: prevState.email.value === "" ? "Email is required." : "" }
      }));
    } else {
      if(!params.userId) {
        const id = usersList.list.length ? Math.max(...usersList.list.map((storedUser) => storedUser.id)) + 1 : 1;
        addToList({
          id,
          name: name.value,
          email: email.value,
          username: "",
          address: {
            city: ""
          }
        })
      } else {
        editUser(Number(params.userId), { name: name.value, email: email.value })
      }
      navigate(Route.HOME)
    }
  }, [addToList, email, name, usersList, navigate, editUser, params]);


  return (
    <form onSubmit={onSubmit}>
        <TextField name="name" autoFocus value={name.value} onChange={handleInput} fullWidth error={!!name.errorMessage} label="Name" helperText={name.errorMessage} />
        <TextField name="email" value={email.value} onChange={handleInput} fullWidth error={!!email.errorMessage} label="Email" helperText={email.errorMessage} />
        <Button type="button" variant="outlined" component={Link} to={Route.HOME}>Cancel</Button>
        <Button type="submit" variant="contained">Submit</Button>
    </form>
  );
}
