import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ChangeEvent, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Route } from '../../routes';
import { actionCreators, State } from '../../state';
import checkInputValidity from '../../utils/inputValidate';

type formInputField = {
    value: string;
    errorMessage?: string;
}

export type formInput = {
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
    const validity = checkInputValidity({ name, email });
    if (validity.email.errorMessage || validity.name.errorMessage) {
      setFormData(validity);
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
    <Paper elevation={2} sx={{ width: '80%', margin: '20px auto' }}>
      <Typography variant="h4" paddingLeft="20px" paddingTop="30px" >Form</Typography>
      <Box sx={{ boderTop: '1px solid gray', marginTop: '80px', paddingLeft: '20%' }}>
        <form onSubmit={onSubmit}>
            <Grid container direction="column" spacing={5}>
              <Grid item marginRight="20px">
                <TextField name="name" autoFocus value={name.value} onChange={handleInput} fullWidth error={!!name.errorMessage} label="Name" helperText={name.errorMessage} />
              </Grid>
              <Grid item marginRight="20px">
                <TextField name="email" value={email.value} onChange={handleInput} fullWidth error={!!email.errorMessage} label="Email" helperText={email.errorMessage} />
              </Grid>
              <Grid item marginRight="20px" marginBottom="40px">
                <Grid container justifyContent="flex-end">
                  <Button type="button" color="error" variant="outlined" component={Link} to={Route.HOME}>Cancel</Button>
                  <Button type="submit" color="success" sx={{ color: 'white', margin: '0 20px' }} variant="contained">Submit</Button>
                </Grid>
              </Grid>
            </Grid>
        </form>
      </Box>
    </Paper>
  );
}
