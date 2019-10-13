export const dollarsAndCents = price => {
    if (typeof price !== 'number') { return false; }

    return (price / 100).toFixed(2);
};
