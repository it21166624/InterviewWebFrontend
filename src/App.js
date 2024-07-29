import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import ListEmployee from './components/ListEmployee';
import AddEmployee from './components/AddEmployee';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <div className='container'>
          <Switch>
          <Route path="/login" component={LoginForm}></Route>
            <Route exact path="/" component={ListEmployee}></Route>
            <Route path="/employees" Component={ListEmployee}></Route>
            <Route path="/add-employee" component={AddEmployee}></Route>
            <Route path="/edit-employee/:id" component={AddEmployee}></Route>
            {/* <Route path="/login" component={LoginForm}></Route> */}
          </Switch>
          {/* <ListWorkout /> */}
        </div>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
