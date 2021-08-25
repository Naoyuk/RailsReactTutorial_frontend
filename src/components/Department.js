import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';

export class Department extends Component{

    constructor(props){
        super(props);
        this.state = {deps: [], addModalShow: false, editModalShow: false}
    }

    get axios() {
        const axiosBase = require('axios');
        return axiosBase.create({
            baseURL: process.env.REACT_APP_API,
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            responseType: 'json'
        });
    }

    refreshList(){
        this.axios.get('departments')
        .then(results => {
            this.setState({
                deps: results.data
            });
        })
        .catch(data => {
            console.log(data);
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteDep(depid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API + 'department/' + depid, {
                method: 'DELETE',
                header: {'Accept': 'applicationjson', 'Content-Type': 'application/json'}
            })
        }
    }

    render(){
        const {deps, depid, depname}=this.state;
        let addModalClose=()=>this.setState({addModalShow: false});
        let editModalClose=()=>this.setState({editModalShow: false});

        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Department ID</th>
                            <th>Department Name</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep=>
                            <tr key={dep.id}>
                                <td>{dep.id}</td>
                                <td>{dep.name}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editModalShow: true,
                                        depid: dep.id, depname: dep.name})}>
                                            Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger"
                                        onClick={()=>this.deleteDep(dep.id)}>
                                            Delete
                                        </Button>
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
                
                <ButtonToolbar>
                    <Button variant="primary"
                    onClick={()=>this.setState({addModalShow: true})}
                    >
                        Add Department
                   </Button>
                </ButtonToolbar>
            </div>
        )
    }
}