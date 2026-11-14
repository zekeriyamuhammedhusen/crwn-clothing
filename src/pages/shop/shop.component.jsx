import React from "react";
import { useParams } from "react-router-dom";

import SHOP_DATA from "./shop.data";
import CollectionPreview from "../../components/preview-collection/preview-collection.componenet";

class ShopPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collections: SHOP_DATA,
    };
  }

  render() {
    const { collections } = this.state;
    const { category } = this.props;

    // If category exists, find the selected collection.
    // Otherwise, display all collections.
    const filteredCollections = category
      ? collections.filter((collection) => collection.routeName === category)
      : collections;

    return (
      <div className="shop-page">
        {filteredCollections.length > 0 ? (
          filteredCollections.map(({ id, ...otherCollectionProps }) => (
            <CollectionPreview key={id} {...otherCollectionProps} />
          ))
        ) : (
          <h2>Category not found</h2>
        )}
      </div>
    );
  }
}

const ShopPageWithParams = () => {
  const { category } = useParams();

  return <ShopPage category={category} />;
};

export default ShopPageWithParams;
