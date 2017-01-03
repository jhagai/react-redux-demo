import React from 'react';
import SimpleField from '../common/SimpleField'
import {connect} from 'react-redux'
import {Field, FieldArray, reduxForm, formValueSelector} from 'redux-form'
import Multiselect from 'react-widgets/lib/Multiselect'
import SimpleDateTimePicker from '../common/SimpleDateTimePicker'
import SimpleDropDownList from '../common/SimpleDropDownList'
import Moment from 'moment'
import {browserHistory} from 'react-router'
import myStore from '../../AppStore'

const validate = values => {
    const errors = {};

    errors.typeOfCover = required(values.typeOfCover);

    if (values.typeOfCover) {
        if (values.typeOfCover.id === 1) {
            errors.singleDestination = required(values.singleDestination);
        } else if (values.typeOfCover.id === 2) {
            errors.multiDestination = required(values.multiDestination);
        }
    }

    errors.startDate = required(values.startDate);
    errors.endDate = required(values.endDate);

    if (!values.persons || !values.persons.length) {
        errors.persons = {_error: 'At least one member must be entered'}
    } else {
        let personsArrayErrors = [];

        values.persons.forEach((person, personIndex) => {
            const personErrors = {}
            if (!person || !person.dateOfBirth) {
                personErrors.dateOfBirth = 'Required'
                personsArrayErrors[personIndex] = personErrors;
            }
            if (!person || !person.price) {
                personErrors.price = 'Required'
                personsArrayErrors[personIndex] = personErrors;
            }
        });

        if (personsArrayErrors.length) {
            errors.persons = personsArrayErrors;
        }
    }


    return errors;
}

const required = value => {
    return value ? undefined : 'Required';
}

const submitNeeds = (values) => {
    myStore.dispatch({
        'type': 'NEEDS-SUBMIT'
        , 'needs': values
    });
    browserHistory.push('/payment');
}

const renderMultiList = (props) => {
    let {input, meta, ...rest} = props;

    return (
        <div className='form-group'>
            <Multiselect {...input} onBlur={() => input.onBlur()} value={input.value || []} {...rest}/>
        </div>
    );
}

const renderPerson = (person, index) => {
    return (
        <div className="col-xs-12" key={index}>
            <fieldset className='form-group'>
                <legend>Person {index + 1}</legend>

                <Field component={SimpleDateTimePicker} name={person + '.dateOfBirth'}
                       placeholder="Date of birth"
                       time={false}
                       format={value => value ? value : null}
                       dateFormat="DD/MM/YYYY"/>
                <Field component={SimpleField} name={person + '.price'}
                       label="Travel price"/>
            </fieldset>
        </div>
    );
}

const renderPersons = ({fields, meta: {touched, error}}) => {
    return (
        <div className="col-xs-12">
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">Persons</h3>
                </div>
                <div className="panel-body">
                    <div className='form-group col-xs-12 col-md-5'>
                        <div className="input-group">
                            <div className="input-group-btn">
                                <button type="button" onClick={() => fields.pop()}
                                        disabled={fields.length > 1 ? false : true}
                                        className="btn btn-primary glyphicon glyphicon-minus"
                                        aria-label="true"></button>
                            </div>
                            <input type="text" className="form-control" value={fields.length}
                                   style={{'textAlign' : 'center'}} readOnly={true}/>
                            <div className="input-group-btn">
                                <button type="button" onClick={() => fields.push({})}
                                        disabled={fields.length < 10 ? false : true}
                                        className="btn btn-primary glyphicon glyphicon-plus" aria-label="true"></button>
                            </div>
                        </div>
                    </div>
                    {
                        fields.map(
                            (person, index) => renderPerson(person, index)
                        )
                    }
                </div>
            </div>
        </div>
    );
}

const typeOfCoverData = [
    {
        id: 1
        , name: 'Single trip'
    }, {
        id: 2
        , name: 'Multi trip'
    }
];

const singleDestinationData = [
    {
        id: 1
        , name: 'France'
    }
    , {
        id: 2
        , name: 'Germany'
    }
    , {
        id: 3
        , name: 'Italy'
    }
];
const multiDestinationData = [
    {
        id: 1
        , name: 'France'
    }
    , {
        id: 2
        , name: 'Germany'
    }
    , {
        id: 3
        , name: 'Italy'
    }
];


const Needs = (props) => {
    const {handleSubmit, typeOfCover, startDate, endDate, submitting} = props;

    let defaultStartMinDate = Moment().startOf('day').toDate();
    let defaultStartMaxDate = Moment().startOf('day').add(2, 'weeks').toDate();

    let defaultEndMinDate = Moment(defaultStartMinDate).add(1, 'day').toDate();
    let defaultEndMaxDate = Moment(defaultStartMaxDate).add(1, 'day').add(1, 'month').toDate();

    let startDateMin = defaultStartMinDate;
    let startDateMax = defaultStartMaxDate;

    let endDateMin = defaultEndMinDate;
    let endDateMax = defaultEndMaxDate;

    if (startDate) {
        endDateMin = Moment(startDate).startOf('day').add(1, 'day').toDate();
        endDateMax = Moment(endDateMin).startOf('day').add(1, 'month').toDate();
    }

    if (endDate) {
        startDateMax = Moment(endDate).startOf('day').subtract(1, 'days').toDate();
        startDateMin = Moment(startDateMax).startOf('day').subtract(1, 'months').toDate();
        if (startDateMin < defaultStartMinDate) {
            startDateMin = defaultStartMinDate;
        }
    }

    const singleTripForm = (
        <div className="col-xs-12">
            <Field component={SimpleDropDownList} name="singleDestination"
                   valueField="id"
                   textField="name"
                   data={singleDestinationData}
                   placeholder="Choose a destination"/>
        </div>
    );
    const multiTripForm = (
        <div className="col-xs-12">
            <Field component={renderMultiList} name="multiDestination" valueField="id"
                   textField="name"
                   data={multiDestinationData}
                   placeholder="Choose your destinations"/>
        </div>
    );

    let tripForm = null;
    if (typeOfCover) {
        if (typeOfCover.id === 1) {
            tripForm = singleTripForm;
        } else if (typeOfCover.id === 2) {
            tripForm = multiTripForm;
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col-xs-12">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title">Needs</h3>
                        </div>
                        <div className="panel-body">
                            <form name="needs" onSubmit={handleSubmit(submitNeeds)}>
                                <div className="col-xs-12">
                                    <Field component={SimpleDropDownList} name="typeOfCover" valueField="id"
                                           textField="name"
                                           data={typeOfCoverData}
                                           placeholder="Choose a type of cover"/>
                                </div>
                                {tripForm}
                                <div className="col-xs-6">
                                    <Field component={SimpleDateTimePicker} name="startDate"
                                           placeholder="Start date"
                                           time={false}
                                           format={value => value ? value : null}
                                           min={startDateMin} max={startDateMax}
                                           dateFormat="DD/MM/YYYY"
                                    />

                                </div>
                                <div className="col-xs-6">
                                    <Field component={SimpleDateTimePicker} name="endDate"
                                           placeholder="End date"
                                           time={false}
                                           format={value => value ? value : null}
                                           min={endDateMin} max={endDateMax}
                                           dateFormat="DD/MM/YYYY"
                                    />
                                </div>
                                <FieldArray name="persons" component={renderPersons}/>
                                <div className="col-xs-12 col-md-4 col-md-offset-8">
                                    <button type="submit" className="btn btn-primary col-xs-12" disabled={submitting}>
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const selector = formValueSelector('needs');
export default connect(
    state => {
        const typeOfCover = selector(state, 'typeOfCover');
        const startDate = selector(state, 'startDate');
        const endDate = selector(state, 'endDate');
        return {
            typeOfCover
            , startDate
            , endDate
            , initialValues: {persons: [{}]}
        }
    }
)(reduxForm(
    {
        form: 'needs'  // a unique identifier for this form
        , destroyOnUnmount: false
        , validate
    }
)(Needs))