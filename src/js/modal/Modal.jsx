import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import { push } from 'connected-react-router';

import Button from 'common/Button';
import { updateSelected } from 'spot/spot-actions';

const DURATION = 250;
const VARIANTS = {
    hidden: { opacity: [1, 1, 0], scale: [1, 1.1, 0] },
    visible: { opacity: 1, scale: [0, 0.55, 0.825, 1.1, 1] },
};

const Modal = ({ selectedSpot, setSpot: removeSpot, pushTo }) => {
    const [showModal, setShowModal] = useState(false);
    useEffect(() => setShowModal(Boolean(selectedSpot)), [selectedSpot]);

    function onClickClose() {
        setShowModal(false);
        setTimeout(removeSpot, DURATION);
    }

    function stopCloseBubbling(e) {
        e.stopPropagation();
    }

    if (!selectedSpot) { return null; }

    const { title, price, description } = selectedSpot;

    return (
        <div
            className="Modal"
            onClick={onClickClose}
        >
            <motion.div
                initial="hidden"
                animate={(showModal) ? 'visible' : 'hidden'}
                transition={{ duration: DURATION / 1000 }}
                variants={VARIANTS}
                className="Container"
                onClick={stopCloseBubbling}
            >
                <h2>Spot Details</h2>
                <div className="Inner">
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>

                <Button
                    color="primary"
                    onClick={pushTo('/Checkout')}
                >
                    ${(price / 100).toFixed(2)} | Book it!
                </Button>
                <div
                    className="Closer"
                    onClick={onClickClose}
                >
                    x
                </div>
            </motion.div>
        </div>
    );
};

Modal.propTypes = {
    selectedSpot: PropTypes.object,
    setSpot: PropTypes.func.isRequired,
    pushTo: PropTypes.func.isRequired
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
    setSpot: updateSelected,
    pushTo: push,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
