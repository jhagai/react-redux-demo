import React from 'react';
import SimpleField from '../common/SimpleField'
import SimpleSelectField from '../common/SimpleSelectField'
import {connect} from 'react-redux'
import {Field, FieldArray, reduxForm, formValueSelector} from 'redux-form'
import DropdownList from 'react-widgets/lib/DropdownList'
import Multiselect from 'react-widgets/lib/Multiselect'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import Moment from 'moment'

const validate = () => {

    const errors = {};
    return errors;
}

const submitNeeds = () => {
}

const renderDropdownList = (props) => {
    let {input, meta, ...rest} = props;

    return (
        <div className='form-group'>
            <DropdownList {...input} {...rest}/>
        </div>
    );
}

const renderMultiList = (props) => {
    let {input, meta, ...rest} = props;

    return (
        <div className='form-group'>
            <Multiselect {...input} onBlur={() => input.onBlur()} value={input.value || []} {...rest}/>
        </div>
    );
}

const renderDatepicker = (props) => {
    let {input, meta, dateFormat, ...rest} = props;

    return (
        <div className='form-group'>
            <DateTimePicker {...input} {...rest} format={dateFormat} onBlur={() => input.onBlur(input.value)}/>
        </div>
    );
}

const renderPersons = ({fields, meta: {touched, error}}) => {
    return (
        <div>
            <div className='form-group'>
                <button type="button" onClick={() => fields.push({})}>Add Person</button>
            </div>
            {
                fields.map(
                    (person, index) =>
                        <Field component={renderDatepicker} name={`${person}.dateOfBirth`}
                               placeholder="End date"
                               time={false}
                               format={value => value ? value : null}
                               dateFormat="DD/MM/YYYY"
                               key={index}/>
                )
            }
        </div >
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
    const {handleSubmit, typeOfCover, startDate, endDate} = props;

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
        <div>
            <div className="col-xs-12">
                <Field component={renderDropdownList} name="singleDestination"
                       valueField="id"
                       textField="name"
                       data={singleDestinationData}
                       placeholder="Choose a destination"/>
            </div>
        </div>
    );
    const multiTripForm = (
        <div>
            <div className="col-xs-12">
                <Field component={renderMultiList} name="multiDestination" valueField="id"
                       textField="name"
                       data={multiDestinationData}
                       placeholder="Choose your destinations"/>
            </div>
            <div className="col-xs-6">
                <Field component={renderDatepicker} name="startDate"
                       placeholder="Start date"
                       time={false}
                       format={value => value ? value : null}
                       min={startDateMin} max={startDateMax}
                       dateFormat="DD/MM/YYYY"
                />

            </div>
            <div className="col-xs-6">
                <Field component={renderDatepicker} name="endDate"
                       placeholder="End date"
                       time={false}
                       format={value => value ? value : null}
                       min={endDateMin} max={endDateMax}
                       dateFormat="DD/MM/YYYY"
                />
            </div>
            <FieldArray name="persons" component={renderPersons}/>
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
                                    <Field component={renderDropdownList} name="typeOfCover" valueField="id"
                                           textField="name"
                                           data={typeOfCoverData}
                                           placeholder="Choose a type of cover"/>
                                </div>
                                {tripForm}
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
        }
    }
)(reduxForm(
    {
        form: 'needs'  // a unique identifier for this form
        , destroyOnUnmount: false
        , validate
    }
)(Needs))