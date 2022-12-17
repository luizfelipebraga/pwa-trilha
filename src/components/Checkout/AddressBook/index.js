import React, { Fragment, useEffect, useMemo, Suspense } from 'react';
import { FormattedMessage } from 'react-intl';
import { shape, string, func } from 'prop-types';
import { PlusSquare, AlertCircle as AlertCircleIcon } from 'react-feather';
import { useToasts } from '@magento/peregrine';
import { useAddressBook } from '@magento/peregrine/lib/talons/CheckoutPage/AddressBook/useAddressBook';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Button from '@magento/venia-ui/lib/components/Button/index';
import defaultClasses from '@magento/venia-ui/lib/components/CheckoutPage/AddressBook/addressBook.module.css';
import AddressCard from '@magento/venia-ui/lib/components/CheckoutPage/AddressBook/addressCard';
import Icon from '@magento/venia-ui/lib/components/Icon/index';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton/index';

const EditModal = React.lazy(() => import('@magento/venia-ui/lib/components/CheckoutPage/ShippingInformation/editModal'));

const errorIcon = (
    <Icon
        src={AlertCircleIcon}
        attrs={{
            width: 18
        }}
    />
);

const AddressBook = props => {
    const {
        activeContent,
        classes: propClasses,
        toggleActiveContent,
        onSuccess
    } = props;

    const talonProps = useAddressBook({
        toggleActiveContent,
        onSuccess
    });

    const {
        activeAddress,
        customerAddresses,
        errorMessage,
        handleAddAddress,
        handleApplyAddress,
        handleCancel,
        handleEditAddress,
        handleSelectAddress,
        isLoading,
        selectedAddress
    } = talonProps;

    const classes = useStyle(defaultClasses, propClasses);

    const [, { addToast }] = useToasts();

    useEffect(() => {
        if (errorMessage) {
            addToast({
                type: 'error',
                icon: errorIcon,
                message: errorMessage,
                dismissable: true,
                timeout: 10000
            });
        }
    }, [addToast, errorMessage]);

    const rootClass =
        activeContent === 'addressBook' ? classes.root_active : classes.root;

    const addAddressButton = useMemo(
        () => (
            <LinkButton
                className={classes.addButton}
                key="addAddressButton"
                onClick={handleAddAddress}
            >
                <Icon
                    size={24}
                    src={PlusSquare}
                    classes={{
                        icon: classes.addIcon
                    }}
                />
                <span className={classes.addText}>
                    <FormattedMessage
                        id={'addressBook.addNewAddresstext'}
                        defaultMessage={'Adicionar um novo Endereço'}
                    />
                </span>
            </LinkButton>
        ),
        [classes.addButton, classes.addIcon, classes.addText, handleAddAddress]
    );

    const handleDoubleClick = (event) => {
        event.preventDefault();
        if (event.detail === 2) {
            handleApplyAddress();
        }
    }

    const addressElements = useMemo(() => {
        let defaultIndex;
        const addresses = customerAddresses.map((address, index) => {
            const isSelected = selectedAddress === address.id;

            if (address.default_shipping) {
                defaultIndex = index;
            }

            return (
                <AddressCard
                    handleDoubleClick={handleDoubleClick}
                    address={address}
                    isSelected={isSelected}
                    key={address.id}
                    onSelection={handleSelectAddress}
                    onEdit={handleEditAddress}
                />
            );
        });

        // Position the default address first in the elements list
        if (defaultIndex) {
            [addresses[0], addresses[defaultIndex]] = [
                addresses[defaultIndex],
                addresses[0]
            ];
        }

        return [...addresses, addAddressButton];
    }, [
        addAddressButton,
        customerAddresses,
        handleEditAddress,
        handleSelectAddress,
        selectedAddress
    ]);


    return (
        <Fragment>
            <div className={rootClass}>
                <h1 aria-live="polite" className={classes.headerText}>
                    <FormattedMessage
                        id={'addressBook.headerText'}
                        defaultMessage={'Alterar Endereço de Entrega'}
                    />
                </h1>
                <div className={classes.content}>{addressElements}</div>
            </div>
            <Suspense fallback={null}>
                <EditModal onSuccess={onSuccess} shippingData={activeAddress} />
            </Suspense>
        </Fragment>
    );
};

export default AddressBook;

AddressBook.propTypes = {
    activeContent: string.isRequired,
    classes: shape({
        root: string,
        root_active: string,
        headerText: string,
        buttonContainer: string,
        content: string,
        addButton: string,
        addIcon: string,
        addText: string
    }),
    onSuccess: func.isRequired,
    toggleActiveContent: func.isRequired
};
