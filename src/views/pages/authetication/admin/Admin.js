import React from 'react'
import './Admin.css'
import NavBar from '../../../components/navbar/Navbar';
import Footer from '../../../components/footer/Footer';
import axios from 'axios';
import { Component } from 'react';


export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        };
    }

    componentDidMount() {

        axios.get("http://localhost:8081/api/admin/list/", { headers: { "Authorization": 'Bearer ' + localStorage.getItem("accesstoken") } })
            .then(response => {
                const users = JSON.stringify(response.data)
                this.setState({users: JSON.stringify    (response.data)})

                console.log("data99: " + users)

            })
}
    renderRow = () => {
        return this.state.users.map(user => {
            console.log("data10: " + user.userName)
            
        })
    }
    render() {
        const { users } = this.state;
        return users.length > 0 ? (

            <>
                <NavBar />
                <table id="basic-data-table" className="table nowrap" >
                    <thead>
                        <tr>
                            <th></th>
                            <th>Last name</th>
                            <th>Position</th>

                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            {this.renderRow()}
                        </tr>
                    </tbody>
                </table>
                <Footer />
            </>)
            : (<h1>No content</h1>)
    }
}
