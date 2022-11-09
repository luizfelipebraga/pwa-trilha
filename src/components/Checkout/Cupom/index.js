import React, { Suspense } from 'react';
import { func } from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';
import CouponCode from '@magento/venia-ui/lib/components/CartPage/PriceAdjustments/CouponCode/index';

import defaultClasses from '@magento/venia-ui/lib/components/CheckoutPage/PriceAdjustments/priceAdjustments.module.css';

/**
 * PriceAdjustments component for the Checkout page.

 * @param {Function} props.setPageIsUpdating callback that sets checkout page updating state
 */
const PriceAdjustments = props => {
    const classes = useStyle(defaultClasses, props.classes);

    const { setPageIsUpdating } = props;

    return (
        <div className={classes.root}>
            <div data-cy="PriceAdjustments-couponCodeSection">
                <CouponCode setIsCartUpdating={setPageIsUpdating} />
            </div>
        </div>
    );
};

export default PriceAdjustments;

PriceAdjustments.propTypes = {
    setPageIsUpdating: func
};
