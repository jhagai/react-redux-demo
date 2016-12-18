import React from 'react'
import { Field } from 'redux-form'

export default function() {
    return (
        <div className="col-xs-12">
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">Paypal</h3>
                </div>
                <div className="panel-body">
                    <form name="paypalForm">
                        <Field name="firstName" component="input"/>
                    </form>
                </div>
            </div>
        </div>
    );
}