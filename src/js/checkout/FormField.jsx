/* eslint react/no-unknown-property: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Field } from 'react-final-form';

const composeValidators = (..._validators) => value => _validators.reduce((error, validator) => error || validator(value), null);

export const FormField = ({ required, validators, name, label, maxLength, placeholder, parse, type = 'text' }) => (
    <Field
        name={name}
        validate={composeValidators(...validators)}
        parse={parse}
    >
        {({ input, meta }) => {
            const classes = classNames(
                { InputError: meta.error && meta.touched },
            );

            return (
                <div className={classes}>
                    <label>{label}{required && '*'}</label>
                    <input
                        {...input}
                        type={type}
                        maxLength={maxLength}
                        placeholder={placeholder}
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
            );
        }}
    </Field>
);

FormField.propTypes = {
    required: PropTypes.bool,
    validators: PropTypes.array.isRequired,
    parse: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    maxLength: PropTypes.number,
    placeholder: PropTypes.string,
};
