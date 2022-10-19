import { Component } from 'react';
import {EmployeeComponent} from './Employee';
import {Clock} from './Clock';
import {Toggle} from './Toggle';
import {fingerOfCanvas} from '../toolkit/fingerprint';

export class TestIndex extends Component {
    render() {
        return (
            <div>
                <h5>{fingerOfCanvas('https://www.baidu.com')}</h5>
                <Toggle />
                <Clock />
                <EmployeeComponent />
            </div>
        )
    }
}