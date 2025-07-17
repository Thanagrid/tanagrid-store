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

const ProducList = () => {
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
              <span className="font-semibold text-blue-600">0</span>Total
            </Badge>
            <Badge variant='outline' className="sm:px-3 py-1">
              <span className="font-semibold text-green-600">0</span>Active
            </Badge>
            <Badge variant='outline' className="sm:px-3 py-1">
              <span className="font-semibold text-gray-600">0</span>Inactive
            </Badge>
            <Badge variant='outline' className="sm:px-3 py-1">
              <span className="font-semibold text-amber-600">0</span>Low Stock
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
            <TableRow>

              <TableCell>
                <Image alt="main product image" src='/images/no-product-image.webp' width={40} height={40} className="object-cover rounded-md"></Image>
              </TableCell>

              <TableCell>
                <div className="font-medium">P1</div>
                <div className="text-xs text-muted-foreground">No SKU</div>
              </TableCell>

              <TableCell>
                <div className="text-sm">C1</div>
              </TableCell>

              <TableCell>
                <div className="text-sm font-medium">100</div>
                <div className="text-xs line-through text-muted-foreground">200</div>
              </TableCell>

              <TableCell>
                <div className={cn('text-sm', {
                  "text-amber-500 font-medium": true,
                })
                }>50</div>
              </TableCell>

              <TableCell>
                <Badge>Active</Badge>
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

                    {true ? (
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
          </TableBody>

        </Table>
      </CardContent>
    </Card>
  )
}

export default ProducList
