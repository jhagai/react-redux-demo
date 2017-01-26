import React from 'react';
import SimpleField from '../common/SimpleField'
import {connect} from 'react-redux'
import {Field, FieldArray, reduxForm, formValueSelector, SubmissionError} from 'redux-form'
import SimpleDropDownList from '../common/SimpleDropDownList'
import {browserHistory} from 'react-router'
import myStore from '../../AppStore'

const validate = (values) => {
    const errors = {};

    return errors;
}

const ZipCodeField = ({input, ...rest}) => {
    let oldOnChange = input.onChange;
    let newOnChange = (event) => {
        if (event.target.value) {
            fetch('https://vicopo.selfbuild.fr/code/' + event.target.value + '?format=json').then((response) => {
                return response.json();
            }).then((json) => {
                myStore.dispatch({
                    'type': 'INFORMATION-CITY'
                    , 'cities': json.cities
                });
            });
        }
        oldOnChange(event);
    }
    return SimpleField({input: {...input, onChange: newOnChange}, ...rest});
}

const onSubmit = (values) => {
    browserHistory.push('/payment');
    myStore.dispatch({
        'type': 'INFORMATION-SUBMIT'
        , 'information': values
    });
}

const Information = ({zipCode, cities, error, submitting, handleSubmit}) => {

    return (<div>
        { error && !submitting ? <MyModal errorMessage={error}/> : null}
        <div className="row">
            <div className="col-xs-12">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title">Information</h3>
                    </div>
                    <div className="panel-body">
                        <form name="needs" onSubmit={handleSubmit(onSubmit)}>
                            <div className="col-xs-12 col-md-6">
                                <Field component={SimpleField} name="firstname"
                                       type="text"
                                       label="Enter your firstname"
                                />
                            </div>
                            <div className="col-xs-12 col-md-6">
                                <Field component={SimpleField} name="name"
                                       type="text"
                                       label="Enter your name"/>
                            </div>
                            <div className="col-xs-12">
                                <Field component={SimpleField} name="address"
                                       type="text"
                                       label="Enter your address"/>
                            </div>
                            <div className="col-xs-12 col-md-4">
                                <Field component={ZipCodeField} name="zipCode"
                                       type="text"
                                       label="Zip code"/>
                            </div>
                            <div className="col-xs-12 col-md-8">
                                <Field component={SimpleDropDownList} name="city"
                                       valueField="code"
                                       textField="city"
                                       data={cities}
                                       placeholder="Select a city"/>
                            </div>
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
    </div>)
}


const selector = formValueSelector('information');
export default connect(
    state => {
        const zipCode = selector(state, 'zipCode');
        const cities = state.information.cities;
        return {
            zipCode,
            cities
        }
    }
)(reduxForm(
    {
        form: 'information'  // a unique identifier for this form
        , destroyOnUnmount: false
        , validate
    }
)(Information))