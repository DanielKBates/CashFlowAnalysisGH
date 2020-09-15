import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import CashFlowAnalysis from './component/CashFlowAnalysis';
import MainChartHooks from "./component/MainChartHooks";
import Nav from "./component/Navbar";
import Footer from "./component/Footer";


const App = () =>
    <div >
        <Router>
            <Nav />
            <Switch>
                <Route exact path="/" component={MainChartHooks} />
            </Switch>
        </Router>
        <Footer />
    </div>
export default App;
