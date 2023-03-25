import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { Product } from '../../interfaces/products/ProductType'
import ProductItem from './Product'
import RecommendedProducts from './RecommendedProducts'
import './ProductById.scss'

const ProductById = () => {
  const [recommended, setRecommended] = React.useState<Product[]>([])
  const params = useParams()
  const { id } = params
  const { products } = useSelector((state: RootState) => state.products)
  const product = products.find((product) => {
    return product.id.toString() === id
  })

  const recommendedProducts = products.filter(
    (p) => p.variant === product?.variant && p.id !== product?.id
  )

  React.useEffect(() => {
    setRecommended(recommendedProducts)
  }, [])
  return (
    <div className="productId">
      {product && (
        <div className="productId__item">
          <ProductItem product={product} />
          <div className="productId__item__info">
            <h3 className="productId__item__info__name">{product.name}</h3>
            <p className="productId__item__info__description">{product.description}</p>
            <p>{product.sizes}</p>
            <p className="productId__item__info__price">£ {product.price}</p>
            <p>{product.categories}</p>
            <p>{product.variant}</p>
          </div>
        </div>
      )}

      <div className="productId__recommended">
        <h3>Recommended</h3>
        <div className="productId__recommended__items">
          {recommended.map((product) => (
            <RecommendedProducts key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductById