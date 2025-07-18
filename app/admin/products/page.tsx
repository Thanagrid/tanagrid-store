import ProductList from "@/features/products/component/product-list"
import { getProduct } from "@/features/products/db/products"

const ProductAdminPage = async () => {

  const product = await getProduct();

   return (
      <div className='p-4 sm:p-6'>
            {/* Product Header */}
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b'>
               <div className='flex flex-col gap-1'>
                  <h1 className='text-2xl sm:text-3xl font-bold'>Product Management</h1>
                  <p className='text-muted-foreground text-sm'>Manage your product inventory and details</p>
               </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'>
               {/* product list */}
               <div className='lg:col-span-3'>
                  <ProductList product={product}></ProductList>
               </div>
            </div>
      </div>
   )
}

export default ProductAdminPage
