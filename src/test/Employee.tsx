import {Component} from 'react';
import {mjPost, mjGet} from '../toolkit/mjFetch';

interface EmployeeType {
    firstName: String;
    lastName: String;
    description: String;
    _links:any;
}
function Employee(props:{employee:EmployeeType}) {
    return (
        <tr>
            <td>{props.employee.firstName}</td>
            <td>{props.employee.lastName}</td>
            <td>{props.employee.description}</td>
        </tr>
    );
} 

function EmployeeList(props:{employees:Array<EmployeeType>}) {
    const employees = props.employees.map((employee:EmployeeType) =>
        <Employee key={employee._links.self.href} employee={employee} />
    );
    return (
        <table>
            <tbody>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Description</th>
                </tr>
                {employees}
            </tbody>
        </table>
    );
}

export class EmployeeComponent extends Component<any, any> {
    constructor(props:any) {
        super(props);
        this.state = {
            employees: new Array<EmployeeType>(),
        };
    }
    componentDidMount() {
        mjGet('/api/employees').then((res) => {
            console.log(res);
            this.setState({
                employees: res._embedded.employees,
            });
        });
    }
    render() {
        return (
            <div>
                <h4>employee data:</h4>
                <div>
                    <EmployeeList employees={this.state.employees} />
                </div>
            </div>
        )
    }
}