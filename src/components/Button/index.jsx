import { Component } from 'react';
import './styles.css';

export class Button extends Component {
    render(){
        const {text, onClick, disabled = false} = this.props;
        console.log(disabled)
       
        return (
            <button className='button' onClick={onClick} disabled={disabled}>
                {text}
            </button>
        )

    }
   
}