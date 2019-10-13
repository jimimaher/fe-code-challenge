/* eslint react/jsx-no-bind: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';

import SpotItem from 'spot/SpotItem';
import Button from 'common/Button';
import { dollarsAndCents } from 'common/dollarsAndCents';
import { Form } from 'react-final-form';
import { FormField } from './FormField';
import { checkoutSuccess } from 'checkout/checkout-actions';

const validators = {
    required: value => (!value && 'Required'),
    name: value => (/^[a-zA-Z- ']*$/.test(value)) === false && 'Please enter a valid name.',
    email: value => (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value) === false && 'Please enter a valid email.',
    phone: value => (/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/).test(value) === false && 'Please enter a valid phone number.',
};

const normalizers = {
    phoneNumberUS: value => {
        if (!value) { return value; }
        const onlyNums = value.replace(/[^\d]/g, '');
        if (onlyNums.length <= 3) { return onlyNums; }
        if (onlyNums.length <= 7) { return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 7)}`; }

        return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`;
    }
};

const Checkout = ({ selectedSpot, pushTo, success }) => {
    if (!selectedSpot) { pushTo('/'); }

    const { price } = selectedSpot;
    const { required, name, email, phone } = validators;
    const { phoneNumberUS } = normalizers;

    function onSubmit(values) {
        fetch('http://localhost:8000/reservations', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(() => {
            success(values);
            pushTo('/confirmation');
        });
    }

    function onClickBack() {
        pushTo('/');
    }

    return (
        <div className="Checkout">
            <div className="Button_Container">
                <Button
                    color="primary"
                    onClick={onClickBack}
                >
                    &lt; Back to Search
                </Button>
            </div>
            <SpotItem
                data={selectedSpot}
                showDetails={false}
            />

            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, form, submitting, values }) => (
                    <form onSubmit={handleSubmit}>
                        <FormField
                            validators={[name]}
                            name="firstName"
                            label="First Name"
                        />
                        <FormField
                            validators={[name]}
                            name="lastName"
                            label="Last Name"
                        />
                        <FormField
                            required
                            validators={[required, email]}
                            name="email"
                            label="Email"
                            placeholder="email@example.com"
                        />
                        <FormField
                            required
                            validators={[required, phone]}
                            parse={phoneNumberUS}
                            name="phone"
                            label="Phone Number"
                            placeholder="(555) 555-1234"
                        />
                        <Button
                            disabled={submitting || form.getState().invalid}
                            type="submit"
                            color="go"
                        >
                            Purchase for $ {dollarsAndCents(price)}
                        </Button>
                        <small>* = required field</small>
                    </form>
                )}
            />
        </div>
    );
};

Checkout.propTypes = {
    selectedSpot: PropTypes.object,
    pushTo: PropTypes.func.isRequired,
    success: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    const {
        spot: {
            selected: selectedSpot
        }
    } = state;

    return {
        selectedSpot
    };
};

const mapDispatchToProps = {
    pushTo: push,
    success: checkoutSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
