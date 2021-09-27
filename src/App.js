import './App.css';
import Users from './Users';
import UsersSecond from './UsersSecond';
import {UsersProvider} from './UsersContext';

function App() {
  return (
    // <Users />,
    <UsersProvider>
      <UsersSecond />
    </UsersProvider>
  );
}

export default App;
