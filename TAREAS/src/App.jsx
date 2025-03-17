import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import MyNavbar from './components/MyNavbar';
import Task from './components/Tasks';

function App() {
  return (
    <Router>
      <AppRouter />;
      <MyNavbar />;
      <Task />
    </Router>
  );
}

export default App;
