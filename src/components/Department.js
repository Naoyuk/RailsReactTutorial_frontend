import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Form, Button, ButtonToolbar} from 'react-bootstrap';

export class Department extends Component{

    constructor(props){
        super(props);
        this.state = { deps: [], name: '' };
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

    handleChange = (e) => {
        this.setState({ name: e.target.value });
      }
    
    handleSubmit = (e) => {
        e.preventDefault();

        this.axios.post('departments', { name: this.state.name })
            .then(res => {
            console.log(res);
            console.log(res.data);
        })
    }

    deleteDep(depid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API + 'departments/' + depid, {
                method: 'DELETE',
                header: {'Accept': 'applicationjson', 'Content-Type': 'application/json'}
            })
        }
    }

    render(){
        const {deps, name, depid, depname}=this.state;
    
        return (
            <div class="form-group">
                <Form onSubmit={this.handleSubmit}>
                    <label for="newDepartment">
                        Department Name:
                        <input class="form-control" id="newDepartment" type="text" name="name" onChange={this.handleChange} />
                    </label>
                    <button type="submit" className="btn btn-primary">Add</button>
                </Form>

                <Table className="mt-4" striped bordered hover>
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
                                        <Button className="btn btn-sm" variant="info"
                                        onClick={()=>this.setState({editModalShow: true,
                                        depid: dep.id, depname: dep.name})}>
                                            Edit
                                        </Button>

                                        <Button className="btn btn-sm" variant="danger"
                                        onClick={()=>this.deleteDep(dep.id)}>
                                            Delete
                                        </Button>
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
            </div>
        )
    }
}
