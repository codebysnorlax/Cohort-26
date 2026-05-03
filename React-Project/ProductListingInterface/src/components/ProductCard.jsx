export default function ProductCard({ product, onClick }) {
  const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
  const fallback = `https://placehold.co/400x300/e5e5e5/888?text=${encodeURIComponent(product.title)}`

  return (
    <div className="card" onClick={() => onClick(product)}>
      <img
        className="card-img"
        src={product.thumbnail}
        alt={product.title}
        loading="lazy"
        onError={e => { e.target.onerror = null; e.target.src = fallback }}
      />
      <div className="card-body">
        <div className="card-category">{product.category}</div>
        <div className="card-title">{product.title}</div>
        <div className="card-brand">{product.brand}</div>
        <div className="card-footer">
          <div>
            <div className="card-price">${discountedPrice}</div>
            <div className="card-rating">{'★'.repeat(Math.round(product.rating))} {product.rating}</div>
          </div>
          <span className="card-discount">-{product.discountPercentage}%</span>
        </div>
      </div>
    </div>
  )
}
