import './App.css';
import Header from './common/Header';
import Footer from './common/Footer';
import MainContainer from './MainContainer';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { RecoilRoot } from 'recoil';
const config = require("./firebase.config");

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <Router>
          <Route>
            <Header></Header>
            <MainContainer></MainContainer>
            <Footer></Footer>
          </Route>
        </Router>
      </RecoilRoot>
    </div>
  );
}
export default App;
