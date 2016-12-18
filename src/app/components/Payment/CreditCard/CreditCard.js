import React from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm, formValueSelector} from 'redux-form'
import CARD_TYPE_ENUM from '../../../common/CreditCardTypeEnum'

const validate = values => {
    console.log('validate');

    const errors = {};

    errors.name = required(values.name);

    errors.cardNumber = required(values.cardNumber) || validateCreditCard(values.cardNumber);

    errors.month = required(values.month);

    errors.year = required(values.year);

    errors.cvc = required(values.cvc) || validateCvc(values.cvc, values.cardNumber);

    return errors;
}

const normalizeCreditCard = value => {
    console.log('normalize');
    let normalized = value.replace(/[^0-9]/g, '');
    let cardType = getCreditCardType(normalized);

    if (cardType) {
        if (normalized.length > cardType.maxLength) {
            normalized = normalized.substring(0, cardType.maxLength);
        }
    }
    //props.change('cvc', '');
    return normalized;
}


const formatCreditCard = value => {
    console.log('format');
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

    return formatted;
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
    if(value) {
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
        return value.length === cardType.maxLength ? undefined : 'Must be ' + cardType.maxLength + ' for credit card type ' + cardType.label + ' and is actually of length ' + value.length;
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

const renderField = ({input, label, type, meta: {touched, error, warning}}) => {
    return (
        <div className={'form-group ' + (touched && error ? 'has-error' : '')}>
            <input {...input} placeholder={label} type={type} className="form-control"/>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    );
}

const renderCreditCardField = ({input, label, type, cardTypeLabel, meta: {touched, error, warning}}) => {
    return (
        <div className={'form-group ' + (touched && error ? 'has-error' : '')}>
            <div className="input-group">
                <input {...input} placeholder={label} type={type} className="form-control"/>
                <span className="input-group-addon">{cardTypeLabel}</span>
            </div>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    );
}

const showResults = values => {
    alert(JSON.stringify(values, null, 4));
}

let CreditCardComponent = (props) => {
    const {
        cardType
        , handleSubmit
        , submitting
    } = props

    console.log('render');
    return (
        <div className="col-xs-12">
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">Credit card</h3>
                </div>
                <div className="panel-body">
                    <form name="creditCardForm" onSubmit={handleSubmit(showResults)}>
                        <div className="col-xs-12">
                            <Field component={renderField} name="name" label="Name" type="text"/>
                        </div>
                        <div className="col-xs-12">
                            <Field component={renderCreditCardField} name="cardNumber" label="Card number" type="text"
                                   cardTypeLabel={cardType ? cardType.label : ''}
                                   className="form-control"
                                   normalize={normalizeCreditCard}
                                   format={formatCreditCard}
                            />
                        </div>
                        <div className="form-group col-xs-12 col-md-4">
                            <Field name="month" className="form-control" component="select">
                                <option>(MM)</option>
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </Field>
                        </div>
                        <div className="form-group col-xs-12 col-md-4">
                            <Field name="year" className="form-control" component="select">
                                <option>(YYYY)</option>
                                <option value="2017">2017</option>
                                <option value="2018">2018</option>
                            </Field>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <Field component={renderField} name="cvc" label="CVC" type="text"
                                   normalize={normalizeCvc('cardNumber')}
                                   className="form-control"
                            />
                        </div>
                        <div className="col-xs-4 col-xs-offset-8">
                            <button type="submit" className="btn btn-primary col-xs-12" disabled={submitting}>Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

CreditCardComponent = reduxForm({
    form: 'creditCard'  // a unique identifier for this form
    , validate
})(CreditCardComponent)

// Decorate with connect to read form values
const selector = formValueSelector('creditCard') // <-- same as form name
export default connect(
    state => {
        // can select values individually
        const cardNumber = selector(state, 'cardNumber');
        let cardType = getCreditCardType(cardNumber);

        return {
            cardType
        }
    }
)(CreditCardComponent)