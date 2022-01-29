import { useEffect } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './state';
import Table from './components/Table';

function App() {
  const dispatch = useDispatch();
  const { getList } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    getList();
  }, [getList])

  return (
    <div className="App">
      <Table />
    </div>
  );
}

export default App;
