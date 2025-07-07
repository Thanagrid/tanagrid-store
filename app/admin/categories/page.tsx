import { Badge } from "@/components/ui/badge"
import { getCategories } from "@/features/categories/db/categories"
import CategoriesForm from '@/features/categories/component/categories-form'
import CategoryList from "@/features/categories/component/category-list"

const CategorieAdminPage = async () => {

  const categories = await getCategories()

  const activeCategoriesCount = categories?.filter((c)=> c.status === 'Active' ).length
  const inactiveCategoriesCount = categories?.filter((c)=> c.status === 'Inactive' ).length



  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Categorie Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center items-start gap-4 pb-6 border-b">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold">Categories Management</h1>
          <p className="text-muted-foreground">Organize your product categories</p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Badge variant="outline" className="px-2 sm:px-3 py-1 text-xs sm:text-sm">
            <span className="font-semibold text-green-600">{activeCategoriesCount}</span>
            Active
          </Badge>
          <Badge variant="outline" className="px-2 sm:px-3 py-1 text-xs sm:text-sm">
            <span className="font-semibold text-grey-500">{inactiveCategoriesCount}</span>
            Inactive
          </Badge>
          <Badge variant="outline" className="px-2 sm:px-3 py-1 text-xs sm:text-sm">
            <span className="font-semibold text-blue-600">{categories.length}</span>
            Total
          </Badge>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="lg:col-span-1">
            <CategoriesForm></CategoriesForm>
          </div>
          <div className="lg:col-span-2">
            <CategoryList categories={categories}></CategoryList>
          </div>
      </div>

      

    </div>
  )
}

export default CategorieAdminPage