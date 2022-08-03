import { Component } from 'react';
import {EmployeeComponent} from './Employee';
import {Clock} from './Clock';
import {Toggle} from './Toggle';
import {fingerOfCanvas} from '../toolkit/fingerprint';

export class TestIndex extends Component {
    render() {
        return (
            <div>
                <h1>{fingerOfCanvas('https://www.baidu.com')}</h1>
                <Toggle />
                <Clock />
                <EmployeeComponent />
            </div>
        )
    }
}