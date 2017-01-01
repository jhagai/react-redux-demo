// @flow

import React from 'react'
import myStore from '../../../AppStore'
import {connect} from 'react-redux'
import {Field, reduxForm, formValueSelector} from 'redux-form'
import CARD_TYPE_ENUM from '../../../common/CreditCardTypeEnum'
import {browserHistory} from 'react-router'
import SimpleField from '../../common/SimpleField'
import SimpleDropDownList from '../../common/SimpleDropDownList'

const validate = values => {

    const errors = {};

    errors.name = required(values.name);

    errors.cardNumber = required(values.cardNumber) || validateCreditCard(values.cardNumber);

    errors.month = required(values.month);

    errors.year = required(values.year);

    errors.cvc = required(values.cvc) || validateCvc(values.cvc, values.cardNumber);

    return errors;
}

const normalizeCreditCard = props => {
    return (value, previousValue) => {
        let normalized = value.replace(/[^0-9]/g, '');
        let cardType = getCreditCardType(normalized);
        let previousCardType = getCreditCardType(previousValue);

        if (cardType) {
            if (normalized.length > cardType.maxLength) {
                normalized = normalized.substring(0, cardType.maxLength);
            }
        }

        if (cardType !== previousCardType) {
            props.change('cvc', '');
        }
        return normalized;
    }
}


const formatCreditCard = value => {
    let cardType = getCreditCardType(value);

    let formatted = value;
    if (cardType) {
        formatted = formatted.replace(/.{4}/g, function (match) {
            return match + ' ';
        });
        if (formatted.endsWith(' ')) {
            formatted = formatted.substring(0, formatted.length - 1);
        }
    }

    return formatted || '';
}

const normalizeCvc = cardNumberField => {
    return (value, previousValue, allValues, allPreviousValues) => {

        let sanitized = value.replace(/[^0-9]/g, '');
        let cardType = getCreditCardType(allValues[cardNumberField]);
        if (cardType) {
            if (sanitized.length > cardType.securityCodeLength) {
                sanitized = sanitized.substring(0, cardType.securityCodeLength);
            }
        }
        return sanitized;
    }
}

function getCreditCardType(value) {
    var cardTypeEnum = null;
    if (value) {
        if ((CARD_TYPE_ENUM.amex.regex).test(value)) {
            cardTypeEnum = CARD_TYPE_ENUM.amex;
        } else if ((CARD_TYPE_ENUM.visa.regex).test(value)) {
            cardTypeEnum = CARD_TYPE_ENUM.visa;
        } else if ((CARD_TYPE_ENUM.mastercard.regex).test(value)) {
            cardTypeEnum = CARD_TYPE_ENUM.mastercard;
        }
    }
    return cardTypeEnum;
}

const required = value => {
    return value ? undefined : 'Required';
}

const validateCreditCard = (value) => {
    let cardType = getCreditCardType(value);
    if (cardType === null) {
        return 'Unknown card Type.';
    } else {
        return value.length === cardType.maxLength ? undefined : 'Must be ' + cardType.maxLength + ' for credit card type ' + cardType.label + ' and is currently of length ' + value.length;
    }
}

const validateCvc = (value, cardNumber) => {
    let cardType = getCreditCardType(cardNumber);
    if (cardType === null) {
        return undefined;
    } else {
        return value.length === cardType.securityCodeLength ? undefined : 'Must be ' + cardType.securityCodeLength + ' for credit card type ' + cardType.label;
    }
}

const renderCreditCardField = (props) => {
    const {input, label, type, cardTypeLabel, meta: {touched, error, warning}} = props;
    return (
        <div className={'form-group ' + (touched && error ? 'has-error' : '')}>
            <div className="input-group">
                <input {...input} placeholder={label} type={type} className="form-control"/>
                <span className="input-group-addon">{cardTypeLabel}</span>
            </div>
            <div className="control-label">
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    );
}

const monthList = [
    'January'
    , 'February'
    , 'March'
    , 'April'
    , 'May'
    , 'June'
    , 'July'
    , 'August'
    , 'September'
    , 'October'
    , 'November'
    , 'December'
]

const submitCreditCard = values => {
    //debugger;
    myStore.dispatch({
        'type': 'PAYMENT-CREDIT_CARD-SUBMIT'
        , 'creditCard': values
    })
    //alert(JSON.stringify(values, null, 4));
    browserHistory.push('/confirmation');
    //myStore.dispatch(push('/confirmation'));
}

const MonthField = (props) => {
    const {year} = props;
    let now = new Date();

    // Calculate available months
    const availableMonths = [];

    let initialMonth = 0;
    if (year && parseInt(year) === now.getFullYear()) {
        initialMonth = now.getMonth();
    }
    for (let i = initialMonth; i < 12; i++) {
        availableMonths.push({id: i, name: monthList[i]});
    }

    return (
        <Field component={SimpleDropDownList} name="month" valueField="id"
               textField="name"
               data={availableMonths}
               placeholder="(MM)"/>
    );

}

const YearField = (props) => {
    const {month} = props;
    let now = new Date();
    let nowYear = now.getFullYear();
    let nowStartOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Calculate available years
    const availableYears = [];

    let startYear = nowYear;
    if (month) {
        let date = new Date(nowYear, month - 1, 1);
        if (date < nowStartOfMonth) {
            startYear++;
        }
    }
    for (let i = startYear; i < nowYear + 10; i++) {
        availableYears.push({id: i, name: i});
    }

    return (
        <Field component={SimpleDropDownList} name="year" valueField="id"
               textField="name"
               data={availableYears}
               placeholder="(YYYY)"/>
    );
}

let CreditCardComponent = (props) => {
    const {
        cardType
        , month
        , year
        , handleSubmit
        , submitting
    } = props

    return (
        <div className="col-xs-12">
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">Credit card</h3>
                </div>
                <div className="panel-body">
                    <form name="creditCard" onSubmit={handleSubmit(submitCreditCard)}>
                        <div className="col-xs-12">
                            <Field component={SimpleField} name="name" label="Name" type="text"/>
                        </div>
                        <div className="col-xs-12">
                            <Field component={renderCreditCardField} name="cardNumber" label="Card number" type="text"
                                   cardTypeLabel={cardType ? cardType.label : ''}
                                   className="form-control"
                                   normalize={normalizeCreditCard(props)}
                                   format={formatCreditCard}
                            />
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <MonthField year={year}/>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <YearField month={month}/>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <Field component={SimpleField} name="cvc" label="CVC" type="text"
                                   normalize={normalizeCvc('cardNumber')}
                                   className="form-control"
                            />
                        </div>
                        <div className="col-xs-12 col-md-4 col-md-offset-8">
                            <button type="submit" className="btn btn-primary col-xs-12" disabled={submitting}>Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

CreditCardComponent = reduxForm(
    {
        form: 'creditCard'  // a unique identifier for this form
        , destroyOnUnmount: false
        , validate
    }
)(CreditCardComponent)

// Decorate with connect to read form values
const selector = formValueSelector('creditCard') // <-- same as form name
export default connect(
    state => {
        // can select values individually
        const cardNumber = selector(state, 'cardNumber');
        const month = selector(state, 'month');
        const year = selector(state, 'year');
        let cardType = getCreditCardType(cardNumber);

        return {
            cardType
            , month
            , year
        }
    }
)(CreditCardComponent)