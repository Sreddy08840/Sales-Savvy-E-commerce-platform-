import { Link } from "react-router-dom";
import { Product } from "@/lib/types";
import { formatINR } from "@/lib/currency";

const ProductCard = ({ product }: { product: Product }) => (
  <Link to={`/product/${product.id}`} className="group block">
    <div className="aspect-[4/5] bg-bone overflow-hidden mb-4">
      {product.image_url && (
        <img
          src={product.image_url}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      )}
    </div>
    <div className="flex justify-between items-baseline">
      <h3 className="font-display text-xl">{product.name}</h3>
      <span className="text-sm tabular-nums">{formatINR(Number(product.price), 0)}</span>
    </div>
  </Link>
);

export default ProductCard;
