import React, { useMemo, Fragment, Suspense, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { arrayOf, bool, number, shape, string } from 'prop-types';
import { Form } from 'informed';
import { Info } from 'react-feather';

import Price from '@magento/venia-ui/lib/components/Price';
import { useProductFullDetail } from '@magento/peregrine/lib/talons/ProductFullDetail/useProductFullDetail';
import { isProductConfigurable } from '@magento/peregrine/lib/util/isProductConfigurable';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Breadcrumbs from '@magento/venia-ui/lib/components/Breadcrumbs/index';
import Button from '@magento/venia-ui/lib/components/Button/index';
import Carousel from '@magento/venia-ui/lib/components/ProductImageCarousel/index.js';
import FormError from '@magento/venia-ui/lib/components/FormError/index.js';
import QuantityStepper from '@magento/venia-ui/lib/components/QuantityStepper/index.js';
import RichContent from '@magento/venia-ui/lib/components/RichContent/richContent';
import { ProductOptionsShimmer } from '@magento/venia-ui/lib/components/ProductOptions/index';
import CustomAttributes from '@magento/venia-ui/lib/components/ProductFullDetail/CustomAttributes/index.js';
import defaultClasses from '@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.module.css';

const WishlistButton = React.lazy(() => import('@magento/venia-ui/lib/components/Wishlist/AddToListButton/index'));
const Options = React.lazy(() => import('@magento/venia-ui/lib/components/ProductOptions/index'));

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import styles from './styles.scss';
import { TabComponent } from '../../tabs';

// Correlate a GQL error message to a field. GQL could return a longer error
// string but it may contain contextual info such as product id. We can use
// parts of the string to check for which field to apply the error.
const ERROR_MESSAGE_TO_FIELD_MAPPING = {
    'The requested qty is not available': 'quantity',
    'Product that you are trying to add is not available.': 'quantity',
    "The product that was requested doesn't exist.": 'quantity'
};

const loremIpsum = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';

// Field level error messages for rendering.
const ERROR_FIELD_TO_MESSAGE_MAPPING = {
    quantity: 'The requested quantity is not available.'
};

const ProductFullDetail = props => {
    const { product } = props;

    const talonProps = useProductFullDetail({ product });

    const handleDescription = () => {

    }

    const DescMap = ['Sobre o Produto', 'Informações Técnicas', 'Reviews']

    const [counter, setCounter] = useState("1");

    console.log(counter)

    const handleClick = (event) => {
        event.preventDefault();
        setCounter(event.target.id);
    };

    const {
        breadcrumbCategoryId,
        errorMessage,
        handleAddToCart,
        handleSelectionChange,
        isOutOfStock,
        isAddToCartDisabled,
        isSupportedProductType,
        mediaGalleryEntries,
        productDetails,
        customAttributes,
        wishlistButtonProps
    } = talonProps;

    const { formatMessage } = useIntl();

    const classes = useStyle(defaultClasses, props.classes);

    const [tabIndex, setTabIndex] = useState(0);

    const options = isProductConfigurable(product) ? (
        <Suspense fallback={<ProductOptionsShimmer />}>
            <Options
                onSelectionChange={handleSelectionChange}
                options={product.configurable_options}
            />
        </Suspense>
    ) : null;

    const breadcrumbs = breadcrumbCategoryId ? (
        <Breadcrumbs
            categoryId={breadcrumbCategoryId}
            currentProduct={productDetails.name}
        />
    ) : null;

    // Fill a map with field/section -> error.
    const errors = new Map();
    if (errorMessage) {
        Object.keys(ERROR_MESSAGE_TO_FIELD_MAPPING).forEach(key => {
            if (errorMessage.includes(key)) {
                const target = ERROR_MESSAGE_TO_FIELD_MAPPING[key];
                const message = ERROR_FIELD_TO_MESSAGE_MAPPING[target];
                errors.set(target, message);
            }
        });

        // Handle cases where a user token is invalid or expired. Preferably
        // this would be handled elsewhere with an error code and not a string.
        if (errorMessage.includes('The current user cannot')) {
            errors.set('form', [
                new Error(
                    formatMessage({
                        id: 'productFullDetail.errorToken',
                        defaultMessage:
                            'There was a problem with your cart. Please sign in again and try adding the item once more.'
                    })
                )
            ]);
        }

        // Handle cases where a cart wasn't created properly.
        if (
            errorMessage.includes('Variable "$cartId" got invalid value null')
        ) {
            errors.set('form', [
                new Error(
                    formatMessage({
                        id: 'productFullDetail.errorCart',
                        defaultMessage:
                            'There was a problem with your cart. Please refresh the page and try adding the item once more.'
                    })
                )
            ]);
        }

        // An unknown error should still present a readable message.
        if (!errors.size) {
            errors.set('form', [
                new Error(
                    formatMessage({
                        id: 'productFullDetail.errorUnknown',
                        defaultMessage:
                            'Could not add item to cart. Please check required options and try again.'
                    })
                )
            ]);
        }
    }

    const customAttributesDetails = useMemo(() => {
        const list = [];
        const pagebuilder = [];
        const skuAttribute = {
            attribute_metadata: {
                uid: 'attribute_sku',
                used_in_components: ['PRODUCT_DETAILS_PAGE'],
                ui_input: {
                    ui_input_type: 'TEXT'
                },
                label: formatMessage({
                    id: 'global.sku',
                    defaultMessage: 'SKU'
                })
            },
            entered_attribute_value: {
                value: productDetails.sku
            }
        };
        if (Array.isArray(customAttributes)) {
            customAttributes.forEach(customAttribute => {
                if (
                    customAttribute.attribute_metadata.ui_input
                        .ui_input_type === 'PAGEBUILDER'
                ) {
                    pagebuilder.push(customAttribute);
                } else {
                    list.push(customAttribute);
                }
            });
        }
        list.unshift(skuAttribute);
        return {
            list: list,
            pagebuilder: pagebuilder
        };
    }, [customAttributes, productDetails.sku, formatMessage]);

    const cartCallToActionText = !isOutOfStock ? (
        <FormattedMessage
            id="productFullDetail.addItemToCart"
            defaultMessage="Adicionar ao carrinho"
            style={{ textTransform: 'capitalize', fontWeight: 'bold' }}
        />
    ) : (
        <FormattedMessage
            id="productFullDetail.itemOutOfStock"
            defaultMessage="Sem Estoque"
        />
    );

    const cartActionContent = isSupportedProductType ? (
        <Button
            data-cy="ProductFullDetail-addToCartButton"
            disabled={isAddToCartDisabled}
            priority="high"
            type="submit"
            style={{ backgroundColor: 'var(--cyan)', borderRadius: '5px', borderColor: 'var(--cyan)', textTransform: 'none', fontWeight: '700', fontSize: '1.4rem', padding: '1.5rem 1.7rem' }}
        >
            {cartCallToActionText}
        </Button>
    ) : (
        <div className={classes.unavailableContainer}>
            <Info />
            <p>
                <FormattedMessage
                    id={'productFullDetail.unavailableProduct'}
                    defaultMessage={
                        'This product is currently unavailable for purchase.'
                    }
                />
            </p>
        </div>
    );

    const shortDescription = productDetails.shortDescription ? (
        <RichContent html={productDetails.shortDescription.html} />
    ) : null;

    const pageBuilderAttributes = customAttributesDetails.pagebuilder.length ? (
        <section className={classes.detailsPageBuilder}>
            <CustomAttributes
                classes={{ list: classes.detailsPageBuilderList }}
                customAttributes={customAttributesDetails.pagebuilder}
                showLabels={false}
            />
        </section>
    ) : null;

    return (
        <Fragment>
            {breadcrumbs}
            <Form
                className={classes.root}
                data-cy="ProductFullDetail-root"
                onSubmit={handleAddToCart}
            >
                <section className={classes.imageCarousel}>
                    <Carousel images={mediaGalleryEntries} />
                </section>
                <section className={styles.title}>
                    <h1
                        aria-live="polite"
                        className={classes.productName}
                        style={{ fontWeight: '700', color: 'var(--blue)', fontSize: '2rem' }}
                        data-cy="ProductFullDetail-productName"
                    >
                        {productDetails.name}
                    </h1>
                    <p
                        data-cy="ProductFullDetail-productPrice"
                        className={styles.productPrice}
                    >
                        <Price
                            currencyCode={productDetails.price.currency}
                            value={productDetails.price.value}
                        />
                    </p>
                    {shortDescription}
                </section>
                <FormError
                    classes={{
                        root: classes.formErrors
                    }}
                    errors={errors.get('form') || []}
                />
                <section className={classes.options}>{options}</section>
                <section className={classes.quantity}>
                    <span
                        data-cy="ProductFullDetail-quantityTitle"
                        className={styles.quantityTitle}
                    >
                        <FormattedMessage
                            id={'global.quantity'}
                            defaultMessage={'Quantidade'}
                        />
                    </span>
                    <div className={styles.addProductBox}>
                        <QuantityStepper
                            classes={{ root: classes.quantityRoot }}
                            min={1}
                            message={errors.get('quantity')}
                        />
                        {cartActionContent}
                    </div>

                    <p className={styles.description}>
                        {loremIpsum}
                    </p>

                </section>
                {/* <section className={classes.actions}>
                    <Suspense fallback={null}>
                        <WishlistButton {...wishlistButtonProps} />
                    </Suspense>
                </section> */}

                {/* <TabComponent/> */}



                <section className={classes.description}>

                    {DescMap.map((value, index) => {
                        return <button
                            key={index}
                            id={index}
                            className={counter === index.toString() ? styles.active : styles.footerButtons}
                            onClick={handleClick}>{value}</button>
                    })}

                    {counter === '0' ?
                        (<span className={styles.optionsProduct}><RichContent style={{marginTop: '2rem'}} html={loremIpsum} /></span>)
                        :
                        (<span className={styles.optionsProduct}><CustomAttributes style={{marginTop: '2rem'}} customAttributes={customAttributesDetails.list} /></span>)
                    }

                </section>
                {pageBuilderAttributes}
            </Form>
        </Fragment>
    );
};

ProductFullDetail.propTypes = {
    classes: shape({
        cartActions: string,
        description: string,
        descriptionTitle: string,
        details: string,
        detailsPageBuilder: string,
        detailsPageBuilderList: string,
        detailsTitle: string,
        imageCarousel: string,
        options: string,
        productName: string,
        productPrice: string,
        quantity: string,
        quantityTitle: string,
        quantityRoot: string,
        root: string,
        title: string,
        unavailableContainer: string
    }),
    product: shape({
        __typename: string,
        id: number,
        stock_status: string,
        sku: string.isRequired,
        price: shape({
            regularPrice: shape({
                amount: shape({
                    currency: string.isRequired,
                    value: number.isRequired
                })
            }).isRequired
        }).isRequired,
        media_gallery_entries: arrayOf(
            shape({
                uid: string,
                label: string,
                position: number,
                disabled: bool,
                file: string.isRequired
            })
        ),
        description: string,
        short_description: shape({
            html: string,
            __typename: string
        })
    }).isRequired
};

export default ProductFullDetail;
