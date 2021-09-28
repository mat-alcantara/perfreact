import { memo, useState } from "react";
import dynamic from "next/dynamic";

import { IAddProductsToWishListProps } from "./AddProductToWhishlist";

const AddProductToWishlist = dynamic<IAddProductsToWishListProps>(
  async () => {
    const mod = await import("./AddProductToWhishlist");

    return mod.AddProductToWishlist;
  },
  {
    // eslint-disable-next-line react/display-name
    loading: () => <span>Carregando...</span>,
  }
);

interface IProductItemProps {
  product: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  };
}

function ProductItemComponent({ product }: IProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  function onAdddToWishList(id: number) {
    console.log(id);
  }

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingToWishlist && (
        <AddProductToWishlist
          onAddToWishList={() => onAdddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product);
  }
);
