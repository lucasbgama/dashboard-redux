import { useEffect } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './state';
import { Route as ReactRoute, Routes } from 'react-router-dom';
import { Route } from './routes';
import Table from './components/Table';
import Form from './components/Form';

function App() {
  const dispatch = useDispatch();
  const { getList } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    getList();
  }, [getList])

  return (
    <div className="App">
      <h1>Dashboard</h1>
      <Routes>
        <ReactRoute path={Route.HOME} element={<Table />} />
        <ReactRoute path={Route.ADD_USER} element={<Form />} />
        <ReactRoute path={Route.EDIT_USER_FULL} element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
