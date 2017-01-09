import React from 'react';
import {connect} from 'react-redux'

const Main = ({children, pathname}) => {
    return (
        <div>
            <div id="myNav" className="overlay">
                <div className="overlay-content">
                    hello
                </div>
            </div>

            <div className="page-header">
                <ol className="breadcrumb">
                    <li className={'breadcrumb-item' + (pathname === '/' ? ' active' : '') }>Needs</li>
                    <li className={'breadcrumb-item' + (pathname === '/quotes' ? ' active' : '')}>Quotes</li>
                    <li className="breadcrumb-item">Information</li>
                    <li className={'breadcrumb-item' + (pathname === '/payment' ? ' active' : '') }>Payment</li>
                    <li className={'breadcrumb-item' + (pathname === '/confirmation' ? ' active' : '') }>Confirmation</li>
                </ol>
            </div>
            {children}
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        pathname: ownProps.location.pathname
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)