import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import MyNavbar from './components/MyNavbar';
import Task from './components/Tasks';

function App() {
  return (
    <Router>
      <MyNavbar />;
      <AppRouter />;
      <Task />
    </Router>
  );
}

export default App;
