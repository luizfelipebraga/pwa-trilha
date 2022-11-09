import React, { Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import { useScrollTopOnChange } from '@magento/peregrine/lib/hooks/useScrollTopOnChange';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator/index';
import HomePage from '@magento/venia-ui/lib/components/HomePage/index.js';
import MagentoRoute from '@magento/venia-ui/lib/components/MagentoRoute/index.js';
import { CheckoutAddressPage } from 'src/pages/Checkout/Address/index.js';
import { CheckoutPaymentPage } from 'src/pages/Checkout/Payment/index.js';

const Routes = () => {
    const { pathname } = useLocation();
    useScrollTopOnChange(pathname);

    return (
        <Suspense fallback={fullPageLoadingIndicator}>
            <Switch>
                {/*
                 * Client-side routes are injected by BabelRouteInjectionPlugin here.
                 * Venia's are defined in packages/venia-ui/lib/targets/venia-ui-intercept.js
                 */}
                <Route>
                    <MagentoRoute />
                    {/*
                     * The Route below is purposefully nested with the MagentoRoute above.
                     * MagentoRoute renders the CMS page, and HomePage adds a stylesheet.
                     * HomePage would be obsolete if the CMS could deliver a stylesheet.
                     */}
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route exact path='/checkout-address'>
                        <CheckoutAddressPage />
                    </Route>
                    <Route exact path='/checkout-payment'>
                        <CheckoutPaymentPage />
                    </Route>
                </Route>
            </Switch>
        </Suspense>
    );
};

export default Routes;
const availableRoutes = [];
export { availableRoutes };
