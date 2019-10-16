import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Button from 'common/Button';
import Image from 'common/Image';
import { updateSelected } from 'spot/spot-actions';
import { dollarsAndCents } from 'common/dollarsAndCents';

class Confirmation extends PureComponent {
    static propTypes = {
        email: PropTypes.string.isRequired,
        selectedSpot: PropTypes.object,
        pushTo: PropTypes.func.isRequired,
        setSpot: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        const {
            selectedSpot,
            pushTo
        } = props;

        // if you refresh on conirmation and there isn't a selectedSpot, make sure to go back to search and render nothing here
        if (!selectedSpot) {
            pushTo('/');
        }
    }

    _onPurchaseAnotherClick = evt => {
        const {
            pushTo,
            setSpot,
        } = this.props;

        pushTo('/');
        setSpot(null);
    }

    render() {
        const {
            email,
            selectedSpot
        } = this.props;

        if (!selectedSpot) {
            return null;
        }

        return (
            <div className="Confirmation">
                <h1>Park it like its hot!</h1>
                <p>You successfully purchased parking at <strong>{selectedSpot.title}</strong> for <strong>${dollarsAndCents(selectedSpot.price)}</strong>.</p>
                <Image src={selectedSpot.image} />
                <p>We emailed a receipt to <a href={`mailto:${email}`}>{email}</a>.</p>
                <Button
                    color="primary"
                    onClick={this._onPurchaseAnotherClick}
                >
                    Purchase Another Spot!
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {
        checkout: {
            email
        },
        spot: {
            selected: selectedSpot
        }
    } = state;

    return {
        email,
        selectedSpot
    };
};

const mapDispatchToProps = {
    pushTo: push,
    setSpot: updateSelected,
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
