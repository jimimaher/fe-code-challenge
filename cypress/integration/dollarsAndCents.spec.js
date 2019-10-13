import { dollarsAndCents } from 'common/dollarsAndCents';

describe('dollarsAndCents', () => {
    it('should properly format cents to dollars and cents', () => {
        expect(dollarsAndCents(1250)).to.eq('12.50');
    });
    it('should not try to format input other than numbers', () => {
        expect(dollarsAndCents('1250')).to.eq(false);
    });
});
