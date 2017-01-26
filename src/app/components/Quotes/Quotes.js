import React from 'react';
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import myStore from '../../AppStore'

const chooseQuote = function (quoteId) {
    myStore.dispatch({
        'type': 'QUOTES-SELECT'
        , 'selected': quoteId
    });
    browserHistory.push('/information')
}

const Quotes = ({quotes}) => {

    let quotesJsx = [];
    if (quotes.fetched) {
        quotesJsx = quotes.fetched.map(
            (quote) => {

                const coveragesJsx = quote.coverages.map((coverage) => <li key={quote.id + '-' + coverage}>coverage</li>);

                return (
                    <div className="panel panel-primary" key={quote.id}>
                        <div className="panel-heading">{quote.title}</div>
                        <div className="panel-body">
                            <ul>
                                {coveragesJsx}
                            </ul>
                        </div>
                        <div className="panel-footer">
                            <button className="btn btn-primary col-xs-12"
                                    onClick={() => chooseQuote(quote.id)}>
                                Choose this quote
                            </button>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                );
            }
        )
    }

    return (
        <div>
            <div className="row">
                <div className="col-xs-12">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title">Quotes</h3>
                        </div>
                        <div className="panel-body">
                            {quotesJsx}
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