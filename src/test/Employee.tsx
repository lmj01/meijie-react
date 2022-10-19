import {Component} from 'react';
import {findDOMNode} from 'react-dom';
import {mjPost, mjGet} from '../toolkit/mjFetch';

/**
 * https://datatracker.ietf.org/doc/html/rfc6570
 * URI Template
 */
/**
 * https://github.com/mikekelly/hal_specification
 * HAL - Hypertext Application Language
 */

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

class CreateDialog extends Component<any,any> {
	constructor(props:any) {
		super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e:any) {
		e.preventDefault();
		const newEmployee:any = {};
		this.props.attributes.forEach((attribute:any) => {
            const target = findDOMNode(this.refs[attribute]) as HTMLInputElement;
            newEmployee[attribute] = target.value.trim();
		});
		this.props.onCreate(newEmployee);

		// clear out the dialog's inputs
		this.props.attributes.forEach((attribute:any) => {
            const target = findDOMNode(this.refs[attribute]) as HTMLInputElement;
            target.value = '';
		});
    }
	render() {
		const inputs = this.props.attributes.map((attribute:any) =>
			<p key={attribute}>
				<input type="text" placeholder={attribute} ref={attribute} className="field"/>
			</p>
		);

		return (
			<div>
				<a href="#createEmployee">Create</a>

				<div id="createEmployee" className="modalDialog">
					<div>
						<a href="#" title="Close" className="close">X</a>

						<h2>Create new employee</h2>

						<form>
							{inputs}
							<button onClick={this.handleSubmit}>Create</button>
						</form>
					</div>
				</div>
			</div>
		)
	}

}

export class EmployeeComponent extends Component<any, any> {
    constructor(props:any) {
        super(props);
        this.state = {
            employees: new Array<EmployeeType>(),
            attributes: new Array<any>(),
        };
        this.onCreate = this.onCreate.bind(this);
    }
    componentDidMount() {
        mjGet('/api/employees').then((res) => {
            // console.log(res);
            this.setState({
                employees: res._embedded.employees,
            });
        });
        // http://alps.io/
        // Application-Level Profile Semantics (ALPS)
        mjGet('/api/profile/employees', {contentType:'application/schema+json'}).then((res) => {
            // console.log(res)
            this.setState({
                attributes: res.alps.descriptor[0].descriptor.map((e:any)=>e.name),
            });
        })
        // mjClient.activate();
        // mjSubscrible('/payroll');
    }
    componentWillUnmount() {
        // mjClient.deactivate();
    }
    onCreate(newEmployee:any) {
        // console.log('--', newEmployee)
        mjPost('/api/empoyess', newEmployee).then((res) => {
            // console.log(res);
        });
        // follow(client, root, ['employees']).then(employeeCollection => {
        //     return client({
        //         method: 'POST',
        //         path: employeeCollection.entity._links.self.href,
        //         entity: newEmployee,
        //         headers: {'Content-Type': 'application/json'}
        //     })
        // }).then(response => {
        //     return follow(client, root, [
        //         {rel: 'employees', params: {'size': this.state.pageSize}}]);
        // }).done(response => {
        //     if (typeof response.entity._links.last !== "undefined") {
        //         this.onNavigate(response.entity._links.last.href);
        //     } else {
        //         this.onNavigate(response.entity._links.self.href);
        //     }
        // });
    }
    render() {
        return (
            <div>
                <h4>employee data:</h4>
                <div>
                    <EmployeeList employees={this.state.employees} />
                </div>
                <div>
                    <CreateDialog attributes={this.state.attributes} onCreate={this.onCreate} />
                </div>
            </div>
        )
    }
}