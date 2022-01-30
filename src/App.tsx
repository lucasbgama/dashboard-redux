import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from './state';
import { Route as ReactRoute, Routes } from 'react-router-dom';
import { Route } from './routes';
import Table from './components/Table';
import Form from './components/Form';
import { Backdrop, CircularProgress, Typography } from '@mui/material';

function App() {
  const dispatch = useDispatch();
  const { getList } = bindActionCreators(actionCreators, dispatch);
  const usersStore = useSelector((state: State) => state.users);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if(isFirstRender.current) {
      getList();
    }
    isFirstRender.current = false;
  }, [getList])

  return (
    <div>
      <Typography variant="h2" sx={{ marginLeft: "200px" }}>Dashboard</Typography>
      <Routes>
        <ReactRoute path={Route.HOME} element={<Table />} />
        <ReactRoute path={Route.ADD_USER} element={<Form />} />
        <ReactRoute path={Route.EDIT_USER_FULL} element={<Form />} />
      </Routes>
      <Backdrop open={usersStore.isFetching} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default App;
