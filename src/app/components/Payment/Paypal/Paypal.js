import React from 'react'
import {reduxForm} from 'redux-form';

let Paypal = () => {
    return (
        <div className="col-xs-12">
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">Paypal</h3>
                </div>
                <div className="panel-body">
                    <form name="paypalForm">
                    </form>
                </div>
            </div>
        </div>
    );
}

//export default Paypal;

export default reduxForm(
     {
         form: 'paypalForm' // a unique name for this form
     }
 )(Paypal);