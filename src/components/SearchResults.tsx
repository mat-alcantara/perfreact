import React from "react";

import { List } from "react-virtualized";

import { ProductItem } from "./ProductItem";

interface ISearchResultsProps {
  totalPrice: number;
  results: Array<{
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }>;
}

export function SearchResult({ totalPrice, results }: ISearchResultsProps) {
  function rowRenderer({
    index,
    key,
    style,
  }: {
    index: number;
    key: string;
    style: any;
  }) {
    const product = results[index];

    return (
      <div key={key} style={style}>
        <ProductItem product={product} />
      </div>
    );
  }

  return (
    <div>
      <h2>Total Price: {totalPrice}</h2>

      <List
        height={300}
        rowHeight={25}
        width={900}
        overscanColumnCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />

      {/* {results.map((product) => (
        <ProductItem key={product.id} product={product}  />
      ))} */}
    </div>
  );
}
