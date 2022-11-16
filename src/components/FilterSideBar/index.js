import React, { useMemo, useCallback, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { array, arrayOf, shape, string, number } from 'prop-types';
import { useFilterSidebar } from '@magento/peregrine/lib/talons/FilterSidebar';

import { useStyle } from '@magento/venia-ui/lib/classify';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton/index';
import CurrentFilters from '@magento/venia-ui/lib/components/FilterModal/CurrentFilters/index';
import FilterBlock from '@magento/venia-ui/lib/components/FilterModal/filterBlock';
import defaultClasses from '@magento/venia-ui/lib/components/FilterSidebar/filterSidebar.module.css';

import filterIcon from './filterIcon.png';

const SCROLL_OFFSET = 150;

/**
 * A view that displays applicable and applied filters.
 *
 * @param {Object} props.filters - filters to display
 */
const FilterSidebar = props => {
    const { filters, filterCountToOpen } = props;
    const talonProps = useFilterSidebar({ filters });
    const {
        filterApi,
        filterItems,
        filterNames,
        filterFrontendInput,
        filterState,
        handleApply,
        handleReset
    } = talonProps;

    const filterRef = useRef();
    const classes = useStyle(defaultClasses, props.classes);

    const handleApplyFilter = useCallback(
        (...args) => {
            const filterElement = filterRef.current;
            if (
                filterElement &&
                typeof filterElement.getBoundingClientRect === 'function'
            ) {
                const filterTop = filterElement.getBoundingClientRect().top;
                const windowScrollY =
                    window.scrollY + filterTop - SCROLL_OFFSET;
                window.scrollTo(0, windowScrollY);
            }

            handleApply(...args);
        },
        [handleApply, filterRef]
    );

    const filtersList = useMemo(
        () =>
            Array.from(filterItems, ([group, items], iteration) => {
                const blockState = filterState.get(group);
                const groupName = filterNames.get(group);
                const frontendInput = filterFrontendInput.get(group);
                return (
                    <FilterBlock
                        key={group}
                        filterApi={filterApi}
                        filterState={blockState}
                        filterFrontendInput={frontendInput}
                        group={group}
                        items={items}
                        name={groupName}
                        onApply={handleApplyFilter}
                        initialOpen={iteration < filterCountToOpen}
                    />
                );
            }),
        [
            filterApi,
            filterItems,
            filterNames,
            filterFrontendInput,
            filterState,
            filterCountToOpen,
            handleApplyFilter
        ]
    );

    const clearAll = filterState.size ? (
        <div className={classes.action} style={{color: 'var(--red)'}}>
            <LinkButton
                type="button"
                onClick={handleReset}
                data-cy="FilterSidebar-clearButton"
                style={{color: 'var(--red)'}}
            >
                <FormattedMessage
                    id={'filterModal.action'}
                    defaultMessage={'Limpar Filtros'}
                    style={{color: 'var(--red)'}}
                />
            </LinkButton>
        </div>
    ) : null;

    return (
        <aside
            className={classes.root}
            ref={filterRef}
            data-cy="FilterSidebar-root"
            aria-live="polite"
            aria-busy="false"
        >
            <div className={classes.body}>
                <div className={classes.header} style={{justifyContent: 'normal', gap: '1rem', paddingTop: '0'}}>
                    <img src={filterIcon} alt="icon de filtrar produto"/>
                    <h2
                        data-cy="FilterSidebar-headerTitle"
                        className={classes.headerTitle}
                        style={{color: 'var(--blue', fontSize: '1.8rem', fontWeight: '500'}}
                    >
                        <FormattedMessage
                            id={'filterModal.headerTitle'}
                            defaultMessage={'Filtros'}
                        />
                    </h2>
                </div>
                <CurrentFilters
                    filterApi={filterApi}
                    filterNames={filterNames}
                    filterState={filterState}
                    onRemove={handleApplyFilter}
                />
                {clearAll}
                <ul className={classes.blocks}>{filtersList}</ul>
            </div>
        </aside>
    );
};

FilterSidebar.defaultProps = {
    filterCountToOpen: 3
};

FilterSidebar.propTypes = {
    classes: shape({
        action: string,
        blocks: string,
        body: string,
        header: string,
        headerTitle: string,
        root: string,
        root_open: string
    }),
    filters: arrayOf(
        shape({
            attribute_code: string,
            items: array
        })
    ),
    filterCountToOpen: number
};

export default FilterSidebar;
