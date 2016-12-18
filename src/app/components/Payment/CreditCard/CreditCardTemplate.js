import React from 'react'
import ErrorMessages from '../../ErrorMessages'
import { Field } from 'redux-form'

export default function (component, formatted, formattedSecurityCode, cardType, errors) {

    let errorCardNumber = <ErrorMessages items={errors.cardNumber}/>;
    let errorSecurity = <ErrorMessages items={errors.securityCode}/>;

    return (
        <div className="col-xs-12">
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">Credit card</h3>
                </div>
                <div className="panel-body">
                    <form name="creditCardForm">
                        <div className="form-group col-xs-12" >
                            <input type="text" name="name" placeholder="Name" className="form-control"/>
                        </div>
                        <div className="form-group col-xs-12">
                            <div className="input-group">
                                <input className="form-control" type="text"
                                       placeholder="Card number" onChange={component.handleCardNumberChange}
                                       value={formatted}
                                />
                                <span className="input-group-addon">{cardType}</span>
                            </div>
                        </div>

                        <div className="form-group col-xs-12 col-md-5">
                            <select className="form-control">
                                <option>(MM)</option>
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="6">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                        </div>
                        <div className="form-group col-xs-12 col-md-5">
                            <select className="form-control">
                                <option>(YYYY)</option>
                                <option value="2017">2017</option>
                                <option value="2018">2018</option>
                            </select>
                        </div>
                        <div className="form-group col-xs-12 col-md-2">
                            <input className="form-control" type="text" placeholder="CVC"
                                   onChange={component.handleSecurityCodeChange}
                                   value={formattedSecurityCode}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}