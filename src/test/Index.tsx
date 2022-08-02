import { Component } from 'react';
import {EmployeeComponent} from './Employee';
import {Clock} from './Clock';
import {Toggle} from './Toggle';

export class TestIndex extends Component {
    render() {
        return (
            <div>
                <Toggle />
                <Clock />
                <EmployeeComponent />
            </div>
        )
    }
}