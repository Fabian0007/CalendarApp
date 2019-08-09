import React from "react";
import ReactDOM from "react-dom";
import Header from './components/Header';
import './scss/app.scss'

const Page = (props) => {
        return <div>
            <Header/>
            <div className="container">
                <h1>{props.message}</h1>
            </div>
        </div>
}

let App = document.getElementById("app");

ReactDOM.render(<Page message="Developing Calendar" />, App);