import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';

export class Employee extends Component{

    constructor(props){
        super(props);
        this.state = { emps: [] }
    }

    refreshList(){
        fetch(process.env.REACT_APP_API + 'employees')
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteEmp(empid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API + 'employee/' + empid, {
                method: 'DELETE',
                header: {'Accept': 'applicationjson', 'Content-Type': 'application/json'}
            })
        }
    }

    render(){
        const {emps, empid, empname, depmt, photofilename, doj} = this.state;
        // let addModalClose=()=>this.setState({addModalShow: false});
        // let editModalClose=()=>this.setState({editModalShow: false});

        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>EmployeeId</th>
                            <th>EmployeeName</th>
                            <th>Department</th>
                            <th>DateOfJoining</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp=>
                            <tr key={emp.EmployeeId}>
                                <td>{emp.EmployeeId}</td>
                                <td>{emp.EmployeeName}</td>
                                <td>{emp.Department}</td>
                                <td>{emp.DateOfJoining}</td>
                                <td>Edit | Delete</td>
                            </tr>)}
                    </tbody>
                </Table>
                
            </div>
        )
    }
}