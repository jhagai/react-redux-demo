import React from 'react';
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'

const Quotes = () => {
    return (
        <div>
            <div className="row">
                <div className="col-xs-12">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title">Quotes</h3>
                        </div>
                        <div className="panel-body">
                            <div className="panel panel-primary">
                                <div className="panel-heading">Product 1</div>
                                <div className="panel-body">
                                    <ul>
                                        <li>Cover 1</li>
                                        <li>Cover 2</li>
                                    </ul>
                                </div>
                                <div className="panel-footer">
                                    <button className="btn btn-primary col-xs-12"
                                            onClick={() => browserHistory.push('/payment')}>
                                        Choose this quote
                                    </button>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                            <div className="panel panel-primary">
                                <div className="panel-heading">Product 2</div>
                                <div className="panel-body">
                                    <ul>
                                        <li>Cover 1</li>
                                        <li>Cover 2</li>
                                        <li>Cover 3</li>
                                    </ul>
                                </div>
                                <div className="panel-footer">
                                    <button className="btn btn-primary col-xs-12"
                                            onClick={() => browserHistory.push('/payment')}>
                                        Choose this quote
                                    </button>
                                    <div className="clearfix"></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default connect(
    state => {
        return {quotes: state.quotes}
    }
)(Quotes)