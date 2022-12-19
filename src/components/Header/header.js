import React, { Fragment, Suspense } from 'react';
import { shape, string } from 'prop-types';
import { Link, Route } from 'react-router-dom';

import TruckLogo from '@magento/venia-ui/lib/components/Logo/logo.svg';

import WhiteCheck from './images/check.svg';
import ScaniaLogo from './images/scania.png';

import Logo from '@magento/venia-ui/lib/components/Logo/index';
import AccountTrigger from '@magento/venia-ui/lib/components/Header/accountTrigger';
import CartTrigger from '@magento/venia-ui/lib/components/Header/cartTrigger';
import NavTrigger from '@magento/venia-ui/lib/components/Header/navTrigger';
import SearchTrigger from '@magento/venia-ui/lib/components/Header/searchTrigger';
import OnlineIndicator from '@magento/venia-ui/lib/components/Header/onlineIndicator';
import { useHeader } from '@magento/peregrine/lib/talons/Header/useHeader';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from '@magento/venia-ui/lib/components/Header/header.module.css';
import styles from './style.scss';
import StoreSwitcher from '@magento/venia-ui/lib/components/Header/storeSwitcher';
import CurrencySwitcher from '@magento/venia-ui/lib/components/Header/currencySwitcher';
import MegaMenu from '@magento/venia-ui/lib/components/MegaMenu/index';
import PageLoadingIndicator from '@magento/venia-ui/lib/components/PageLoadingIndicator/index';
import { useIntl } from 'react-intl';

const SearchBar = React.lazy(() => import('@magento/venia-ui/lib/components/SearchBar/index'));

const Header = props => {
    const {
        handleSearchTriggerClick,
        hasBeenOffline,
        isOnline,
        isSearchOpen,
        searchRef,
        searchTriggerRef
    } = useHeader();

    const classes = useStyle(defaultClasses, props.classes);
    const rootClass = isSearchOpen ? classes.open : classes.closed;

    const searchBarFallback = (
        <div className={classes.searchFallback} ref={searchRef}>
            <div className={classes.input}>
                <div className={classes.loader}>
                    <div className={classes.loaderBefore} />
                    <div className={classes.loaderAfter} />
                </div>
            </div>
        </div>
    );
    const searchBar = isSearchOpen ? (
        <Suspense fallback={searchBarFallback}>
            <Route>
                <SearchBar isOpen={isSearchOpen} ref={searchRef} />
            </Route>
        </Suspense>
    ) : null;

    const { formatMessage } = useIntl();
    const title = formatMessage({ id: 'logo.title', defaultMessage: 'Venia' });

    const isAddressOrPaymentCheckout = () => {
        if (window.location.pathname === '/checkout-address') {
            return (
                <div className={styles.container}>
                    <header className={styles.root} data-cy="Header-root">
                        <Link
                            aria-label={title}
                            to={resourceUrl('/')}
                            className={classes.logoContainer}
                            data-cy="Header-logoContainer"
                        >
                            <Logo src={TruckLogo} classes={{ logo: styles.logo }} />
                        </Link>

                        <div className={styles.containerRadio}>
                            <div className={styles.boxRadio}>
                                <input type="radio" id="entrega" name="entrega" checked={true} styles={styles.radioChecked} />
                                <label htmlFor="entrega" id='entrega'>Entrega</label>
                            </div>

                            <div className={styles.line} />

                            <div className={styles.boxRadioNotChecked}>
                                <input type="radio" id="pagamento" name="pagamento" checked={false} />
                                <label htmlFor="pagamento" id='pagamento'>Pagamento</label>
                            </div>
                        </div>
                    </header>
                </div>
            )
        }

        else if (window.location.pathname === '/checkout-payment') {
            return (
                <div className={styles.container}>
                    <header className={styles.root} data-cy="Header-root">
                        <Link
                            aria-label={title}
                            to={resourceUrl('/')}
                            className={classes.logoContainer}
                            data-cy="Header-logoContainer"
                        >
                            <Logo src={ScaniaLogo} classes={{ logo: styles.logo }} />
                        </Link>

                        <div className={styles.containerRadio}>
                            <div className={styles.boxRadio}>
                                <div className={styles.checkedAddress}>
                                    <img src={WhiteCheck} alt="white check icon"/>
                                </div>
                                <label htmlFor="entrega" id='entrega'>Entrega</label>
                            </div>

                            <div className={styles.line} />

                            <div className={styles.boxRadio}>
                                <input type="radio" id="pagamento" name="pagamento" checked={true} />
                                <label htmlFor="pagamento" id='entrega'>Pagamento</label>
                            </div>
                        </div>
                    </header>
                </div>
            )
        }

        else {
            return (
                <header className={rootClass} data-cy="Header-root">
                    <div className={classes.toolbar}>
                        <div className={classes.primaryActions}>
                            <NavTrigger />
                        </div>
                        <OnlineIndicator
                            hasBeenOffline={hasBeenOffline}
                            isOnline={isOnline}
                        />
                        <Link
                            aria-label={title}
                            to={resourceUrl('/')}
                            className={classes.logoContainer}
                            data-cy="Header-logoContainer"
                        >
                            <Logo src={TruckLogo} classes={{ logo: styles.logo }} />
                        </Link>
                        <MegaMenu />
                        <div className={classes.secondaryActions}>
                            <SearchTrigger
                                onClick={handleSearchTriggerClick}
                                ref={searchTriggerRef}
                            />
                            <AccountTrigger />
                            <CartTrigger />
                        </div>
                    </div>
                    {searchBar}
                    <PageLoadingIndicator absolute />
                </header>
            )
        }
    }



    return (
        <Fragment>
            <div className={classes.switchersContainer}>
                <div className={classes.switchers} data-cy="Header-switchers">
                    <StoreSwitcher />
                    <CurrencySwitcher />
                </div>
            </div>
            {isAddressOrPaymentCheckout()}
            {/* <header className={rootClass} data-cy="Header-root">
                <div className={classes.toolbar}>
                    <div className={classes.primaryActions}>
                        <NavTrigger />
                    </div>
                    <OnlineIndicator
                        hasBeenOffline={hasBeenOffline}
                        isOnline={isOnline}
                    />
                    <Link
                        aria-label={title}
                        to={resourceUrl('/')}
                        className={classes.logoContainer}
                        data-cy="Header-logoContainer"
                    >
                        <Logo src={TruckLogo} classes={{ logo: styledClasses.logo }} />
                    </Link>
                    <MegaMenu />
                    <div className={classes.secondaryActions}>
                        <SearchTrigger
                            onClick={handleSearchTriggerClick}
                            ref={searchTriggerRef}
                        />
                        <AccountTrigger />
                        <CartTrigger />
                    </div>
                </div>
                {searchBar}
                <PageLoadingIndicator absolute />
            </header> */}
        </Fragment>
    );
};

Header.propTypes = {
    classes: shape({
        closed: string,
        logo: string,
        open: string,
        primaryActions: string,
        secondaryActions: string,
        toolbar: string,
        switchers: string,
        switchersContainer: string
    })
};

export default Header;
