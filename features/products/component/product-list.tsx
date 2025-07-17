import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, MoreVertical, Eye, Pencil, Trash2, RefreshCcw } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ProductType } from "@/types/product"

interface ProductListProps {
  product: ProductType[];
}

const ProductList = async ({product}: ProductListProps) => {

  return (
    <Card>
      <CardHeader>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-lg sm:text-xl">Products</CardTitle>
          <Button asChild className="mb-4">
            <Link href='/admin/products/new'><Plus size={16}></Plus><span>Add Product</span></Link>
          </Button>
        </div>

        <Tabs>
          <TabsList className="grid grid-cols-4 mb-4 gap-4 justify-between items-center">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
          </TabsList>

          <div className="flex flex-col sm:flex-row">
          <div className="flex gap-2">
            <Badge variant='outline' className="sm:px-3 py-1">
              <span className="font-semibold text-blue-600">{product.length}</span>Total
            </Badge>
            <Badge variant='outline' className="sm:px-3 py-1">
              <span className="font-semibold text-green-600">{product.filter((p) => p.status === 'Active').length}</span>Active
            </Badge>
            <Badge variant='outline' className="sm:px-3 py-1">
              <span className="font-semibold text-gray-600">{product.filter((p) => p.status === 'Inactive').length}</span>Inactive
            </Badge>
            <Badge variant='outline' className="sm:px-3 py-1">
              <span className="font-semibold text-amber-600">{product.filter((p) => (p.stock <= p.lowStock) && (p.status === 'Active')).length}</span>Low Stock
            </Badge>
          </div>

          <div className="relative w-full sm:w-64 text-muted-foreground">
            <Search size={16} className="absolute left-2 top-2.5"></Search>
            <Input placeholder="Search products..." className="pl-8"></Input>
          </div>
        </div>
        </Tabs>
      </CardHeader>

      <CardContent>
        <Table>

          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Product name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {product.length > 0 ? 
              (
                product.map((product, index) => {
                  return (
                    <TableRow key={index}>

                      <TableCell>
                        <Image alt={product.title} src='/images/no-product-image.webp' width={40} height={40} className="object-cover rounded-md"></Image>
                      </TableCell>

                      <TableCell>
                        <div className="font-medium">{product.title}</div>
                        <div className="text-xs text-muted-foreground">{product.sku}</div>
                      </TableCell>

                      <TableCell>
                        <div className="text-sm">{product.category.name}</div>
                      </TableCell>

                      <TableCell>
                        <div className="text-sm font-medium">{product.price.toLocaleString()}</div>
                        {product.basePrice === product.price && <div className="text-xs line-through text-muted-foreground">{product.basePrice}</div>}
                      </TableCell>

                      <TableCell>
                        <div className={cn('text-sm', {
                          "text-amber-500 font-medium": product.stock <= product.lowStock,
                        })
                        }>{product.stock}</div>
                      </TableCell>

                      <TableCell>
                        <Badge variant={product.status === 'Active' ? "default" : 'destructive'}>{product.status}</Badge>
                      </TableCell>

                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant='ghost' size='icon' className="size-8">
                              <MoreVertical size={16}></MoreVertical>
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye size={15}></Eye><span>View</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                              <Pencil size={15}></Pencil><span>Edit</span>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator></DropdownMenuSeparator>

                            {product.status === 'Active' ? (
                              <DropdownMenuItem>
                                <Trash2 size={15}  className="text-destructive"></Trash2><span  className="text-destructive">Delete</span>
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>
                                <RefreshCcw size={15} className="text-green-600"></RefreshCcw><span className="text-green-600">Restore</span>
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>

                        </DropdownMenu>
                      </TableCell>

                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-40 text-muted-foreground">
                    Not found product
                  </TableCell>
                </TableRow>
              )}
                

          </TableBody>

        </Table>
      </CardContent>
    </Card>
  )
}

export default ProductList
