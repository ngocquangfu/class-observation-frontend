import React from 'react'
import './Index.css'
import NavBar from '../../../components/navbar/Navbar';

function Index() {
    return (
        <>
        <NavBar/>
            <table id="basic-data-table" className="table nowrap" >
                <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Position</th>
                       
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Tiger</td>
                        <td>Nixon</td>
                        <td>Nixon</td>

                       
                    </tr>

                    

                    <tr>
                        <td>Lael</td>
                        <td>Greer</td>
                        <td>Systems Administrator</td>
                       
                    </tr>

                    <tr>
                        <td>Jonas</td>
                        <td>Alexander</td>
                        <td>Nixon</td>

                       
                    </tr>

                    <tr>
                        <td>Shad</td>
                        <td>Decker</td>
                        <td>Regional Director</td>
                     
                    </tr>

                    <tr>
                        <td>Michael</td>
                        <td>Bruce</td>
                        <td>Nixon</td>

                     
                    </tr>

                    <tr>
                        <td>Donna</td>
                        <td>Snider</td>
                        <td>Customer Support</td>
                        
                    </tr>
                    
                </tbody>
            </table>
        </>
    )
}

export default Index