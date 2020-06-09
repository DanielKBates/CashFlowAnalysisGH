import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CashFlowAnalysis from './component/CashFlowAnalysis';
import Nav from "./component/Navbar";
import Footer from "./component/Footer";


const App = () =>
    <div >
        <Router>
            <Nav />
            <Switch>
                <Route exact path="/" component={CashFlowAnalysis} />
            </Switch>
        </Router>
        <Footer />
    </div>
export default App;
