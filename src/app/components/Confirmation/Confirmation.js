import React from 'react';
import {connect} from 'react-redux'
import Moment from 'moment'

const renderPersons = (persons) => {

    let personList = persons.map((person, index)=> <li key={index}>Person {index+1}: {Moment(person.dateOfBirth).format('DD/MM/YYYY')}, {person.price}€</li>)

    return (
        <dl className="dl-horizontal">
            <dt>Persons</dt>
            <dd>
                <ul>
                    {personList}
                </ul>
            </dd>
        </dl>
    );
}

const ConfirmationRoot = ({payment, needs}) => {

    let destination = null;
    if (needs.typeOfCover.id === 1) {
        destination = (
            <dl className="dl-horizontal">
                <dt>Single destination</dt>
                <dd>{needs.singleDestination.name}</dd>
            </dl>
        );
    } else if (needs.typeOfCover.id === 2) {

        let countries = needs.multiDestination.map(
            (value) => value.name
        ).join(', ');
        destination = (
            <dl className="dl-horizontal">
                <dt>Multi destination</dt>
                <dd>{countries}</dd>
            </dl>
        );
    }

    return (
        <div>
            <div className="row">
                <div className="col-xs-12">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title">Confirmation</h3>
                        </div>
                        <div className="panel-body">
                            <h3 className="page-header">Needs</h3>
                            <dl className="dl-horizontal">
                                <dt>Type of cover</dt>
                                <dd>{needs.typeOfCover.name}</dd>
                            </dl>
                            {destination}
                            <dl className="dl-horizontal">
                                <dt>Start date</dt>
                                <dd>{Moment(needs.startDate).format('DD/MM/YYYY')}</dd>
                            </dl>
                            <dl className="dl-horizontal">
                                <dt>End date</dt>
                                <dd>{Moment(needs.endDate).format('DD/MM/YYYY')}</dd>
                            </dl>
                            {renderPersons(needs.persons)}

                            <h3 className="page-header">Payment data</h3>
                            <dl className="dl-horizontal">
                                <dt>Name</dt>
                                <dd>{payment.creditCard.name}</dd>
                            </dl>
                            <dl className="dl-horizontal">
                                <dt>Card number</dt>
                                <dd>{payment.creditCard.cardNumber.replace(/^.{12}/, 'XXXXXXXXXXXX')}</dd>
                            </dl>
                            <dl className="dl-horizontal">
                                <dt>Validity</dt>
                                <dd>{payment.creditCard.month.name} {payment.creditCard.year.name}</dd>
                            </dl>
                            <dl className="dl-horizontal">
                                <dt>CVC</dt>
                                <dd>{payment.creditCard.cvc}</dd>
                            </dl>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        payment: state.payment
        , needs: state.needs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmationRoot)
