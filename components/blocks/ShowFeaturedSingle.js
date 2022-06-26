import Container from "../Container"
import FeaturedSingleProduct from "../products/FeaturedSingleProduct"

export default function ShowFeaturedSingle({ showProduct, featuredProduct }) {
  if (!showProduct) {
    return null
  }

  return (
    <Container>
      <FeaturedSingleProduct product={featuredProduct} />
    </Container>
  )
}
