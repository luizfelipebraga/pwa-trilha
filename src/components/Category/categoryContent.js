import React, { Fragment, Suspense, useMemo, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { array, number, shape, string } from 'prop-types';

import { useIsInViewport } from '@magento/peregrine/lib/hooks/useIsInViewport';
import { useCategoryContent } from '@magento/peregrine/lib/talons/RootComponents/Category';

import { useStyle } from '@magento/venia-ui/lib/classify.js';
import Breadcrumbs from '@magento/venia-ui/lib/components/Breadcrumbs/index';
import FilterModalOpenButton, {
  FilterModalOpenButtonShimmer
} from '@magento/venia-ui/lib/components/FilterModalOpenButton/index';
import { FilterSidebarShimmer } from '@magento/venia-ui/lib/components/FilterSidebar/index';
import Gallery, { GalleryShimmer } from '@magento/venia-ui/lib/components/Gallery/index';
import { StoreTitle } from '@magento/venia-ui/lib/components/Head/index';
import Pagination from '@magento/venia-ui/lib/components/Pagination/index';
import ProductSort, { ProductSortShimmer } from '@magento/venia-ui/lib/components/ProductSort/index';
import RichContent from '@magento/venia-ui/lib/components/RichContent/index';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer/index';
import SortedByContainer, {
  SortedByContainerShimmer
} from '@magento/venia-ui/lib/components/SortedByContainer/index';
import defaultClasses from '@magento/venia-ui/lib/RootComponents/Category/category.module.css';
import styles from './styles.scss';
import NoProductsFound from '@magento/venia-ui/lib/RootComponents/Category/NoProductsFound/index';

const FilterModal = React.lazy(() => import('@magento/venia-ui/lib/components/FilterModal/index'));
const FilterSidebar = React.lazy(() =>
  import('@magento/venia-ui/lib/components/FilterSidebar/index')
);

// import styles from './styles.scss';

const CategoryContent = props => {
  const {
    categoryId,
    data,
    isLoading,
    pageControl,
    sortProps,
    pageSize
  } = props;
  const [currentSort] = sortProps;

  const talonProps = useCategoryContent({
    categoryId,
    data,
    pageSize
  });

  const {
    availableSortMethods,
    categoryName,
    categoryDescription,
    filters,
    items,
    totalCount,
    totalPagesFromData
  } = talonProps;

  const sidebarRef = useRef(null);
  const classes = useStyle(defaultClasses, props.classes);
  const shouldRenderSidebarContent = useIsInViewport({
    elementRef: sidebarRef
  });

  const shouldShowFilterButtons = filters && filters.length;
  const shouldShowFilterShimmer = filters === null;

  // If there are no products we can hide the sort button.
  const shouldShowSortButtons = totalPagesFromData && availableSortMethods;
  const shouldShowSortShimmer = !totalPagesFromData && isLoading;

  const maybeFilterButtons = shouldShowFilterButtons ? (
    <FilterModalOpenButton filters={filters} />
  ) : shouldShowFilterShimmer ? (
    <FilterModalOpenButtonShimmer />
  ) : null;

  const filtersModal = shouldShowFilterButtons ? (
    <FilterModal filters={filters} />
  ) : null;

  const sidebar = shouldShowFilterButtons ? (
    <FilterSidebar filters={filters} />
  ) : shouldShowFilterShimmer ? (
    <FilterSidebarShimmer />
  ) : null;

  const maybeSortButton = shouldShowSortButtons ? (
    <ProductSort
      sortProps={sortProps}
      availableSortMethods={availableSortMethods}
    />
  ) : shouldShowSortShimmer ? (
    <ProductSortShimmer />
  ) : null;

  const maybeSortContainer = shouldShowSortButtons ? (
    <SortedByContainer currentSort={currentSort} />
  ) : shouldShowSortShimmer ? (
    <SortedByContainerShimmer />
  ) : null;

  const categoryResultsHeading =
    totalCount > 0 ? (
      <FormattedMessage
        id={'categoryContent.resultCount'}
        values={{
          count: totalCount
        }}
        defaultMessage={'{count} Results'}
      />
    ) : isLoading ? (
      <Shimmer width={5} />
    ) : null;

  const categoryDescriptionElement = categoryDescription ? (
    <RichContent html={categoryDescription} />
  ) : null;

  const content = useMemo(() => {
    if (!totalPagesFromData && !isLoading) {
      return <NoProductsFound categoryId={categoryId} />;
    }

    const gallery = totalPagesFromData ? (
      <Gallery items={items} />
    ) : (
      <GalleryShimmer items={items} />
    );

    const pagination = totalPagesFromData ? (
      <Pagination pageControl={pageControl} />
    ) : null;

    return (
      <Fragment>
        <section className={classes.gallery}>{gallery}</section>
        <div className={classes.pagination}>{pagination}</div>
      </Fragment>
    );
  }, [
    categoryId,
    classes.gallery,
    classes.pagination,
    isLoading,
    items,
    pageControl,
    totalPagesFromData
  ]);

  const categoryTitle = categoryName ? categoryName : <Shimmer width={5} />;

  return (
    <Fragment>
      <StoreTitle>{categoryName}</StoreTitle>
      <article className={classes.root} data-cy="CategoryContent-root">
        <div className={classes.categoryHeader}>
          {categoryDescriptionElement}
        </div>
        <Breadcrumbs categoryId={categoryId} />

        <h1 aria-live="polite" className={classes.title}>
          <div
            className={styles.CategoryTitle}
            data-cy="CategoryContent-categoryTitle"
          >
            {categoryTitle}
          </div>
        </h1>

        <div className={classes.contentWrapper}>
          <div ref={sidebarRef} className={classes.sidebar}>
            <Suspense fallback={<FilterSidebarShimmer />}>
              {shouldRenderSidebarContent ? sidebar : null}
            </Suspense>
          </div>
          <div className={classes.categoryContent}>
            <div className={classes.heading}>
              {/* <div
                data-cy="CategoryContent-categoryInfo"
                className={classes.categoryInfo}
              >
                {categoryResultsHeading}
              </div> */}
              <div className={classes.headerButtons} style={{padding: '1rem 0', borderTop: '#d7d7d7 2px solid', borderBottom: '#d7d7d7 2px solid'}}>
                {maybeFilterButtons}
                {maybeSortButton}
              </div>
              {maybeSortContainer}
            </div>
            {content}
            <Suspense fallback={null}>{filtersModal}</Suspense>
          </div>
        </div>
      </article>
    </Fragment>
  );
};

export default CategoryContent;

CategoryContent.propTypes = {
  classes: shape({
    gallery: string,
    pagination: string,
    root: string,
    categoryHeader: string,
    title: string,
    categoryTitle: string,
    sidebar: string,
    categoryContent: string,
    heading: string,
    categoryInfo: string,
    headerButtons: string
  }),
  // sortProps contains the following structure:
  // [{sortDirection: string, sortAttribute: string, sortText: string},
  // React.Dispatch<React.SetStateAction<{sortDirection: string, sortAttribute: string, sortText: string}]
  sortProps: array,
  pageSize: number
};
