import React from 'react';
import { bool, shape, string } from 'prop-types';
import { useScrollLock } from '@magento/peregrine';
import { useLocation } from 'react-router-dom';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Footer from '@magento/venia-ui/lib/components/Footer/index';
import Header from '@magento/venia-ui/lib/components/Header/index';
import defaultClasses from '@magento/venia-ui/lib/components/Main/main.module.css';
import BannerSlick from '../Banner/banner';
import NewsLetter from '../NewsLetter';


const Main = props => {
    const { children, isMasked } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const rootClass = isMasked ? classes.root_masked : classes.root;
    const pageClass = isMasked ? classes.page_masked : classes.page;

    useScrollLock(isMasked);

    return (
        <main>
            <Header />
            {window.location.pathname !== "/" ? (
                <>
                    <div className={pageClass}>
                        {children}
                    </div>
                    <NewsLetter />
                </>
            ) : (
                <div className={pageClass}>
                    <BannerSlick />
                    {children}
                    <NewsLetter />
                </div>
            )}
            <Footer />
        </main>
    );
};

export default Main;

Main.propTypes = {
    classes: shape({
        page: string,
        page_masked: string,
        root: string,
        root_masked: string
    }),
    isMasked: bool
};
