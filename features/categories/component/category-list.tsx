'use client'

import { Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Pencil, Trash2, MoreVertical, RefreshCcw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { CategoryType } from '@/types/categories'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu'
import { ScrollArea } from "@/components/ui/scroll-area"
import EditCategoryModal from './editCategoryModal'
import { useEffect, useState } from 'react'
import DeleteCategoryMadal from './delete-category-madal'
import RestoreCategoryMadal from './restore-category-madal'


interface CategoryListProps {
  categories: CategoryType[]
}

const CategoryList = ({categories}: CategoryListProps) => {

  // madal state
  const [isEditModal, setIsEditModal] = useState(false)
  const [isDeleteModal, setIsDeleteModal] = useState(false)
  const [isRestoreModal, setIsRestoreModal] = useState(false)
  const [selectedCate, setSelectedCate] = useState<CategoryType | null>(null)
   // tab state
  const [activeTab, setActiveTab] = useState('all')
  const [filterCategory, setFilterCategory] = useState<CategoryType[]>(categories)
  // search state
  const [searchTerm, setSearchTerm] = useState("")
  

  const handleEditClick = (category: CategoryType) => {
    setSelectedCate(category)
    setIsEditModal(true);
  }

  const handleDeleteClick = (category: CategoryType) => {
    setSelectedCate(category)
    setIsDeleteModal(true)
  }

  const handleRestoreClick = (category: CategoryType) => {
    setSelectedCate(category)
    setIsRestoreModal(true)
  }

  const handleTabActive = (value: string) => {
    setActiveTab(value)
  }

  useEffect(()=>{
    let result = [...categories]
    if(activeTab === 'active'){
      result = result.filter((c)=>c.status === 'Active')
    } else if (activeTab === 'inactive'){
      result = result.filter((c)=>c.status === 'Inactive')
    }

    if(searchTerm){
      result = result.filter((c)=>{
        return c.name.toLowerCase().includes(searchTerm.toLowerCase())
      })
    }
    setFilterCategory(result)
  }, [categories, activeTab, searchTerm])

  const handleSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <>
    <Card>
        <CardHeader className='pb-4'>
          <CardTitle className='mb-2 text-lg sm:text-xl'>
            Category List
          </CardTitle>
          <Tabs value={activeTab} onValueChange={handleTabActive}>
            <TabsList className='grid grid-cols-3 mb-4'>
              <TabsTrigger value='all'>All category</TabsTrigger>
              <TabsTrigger value='active'>Active</TabsTrigger>
              <TabsTrigger value='inactive'>Inactive</TabsTrigger>
            </TabsList>
            {/* Search */}
            <div className='relative'>
              <Search size={16} className='absolute left-2 top-2.5'></Search>
              <Input placeholder="Search category..." className='pl-8' value={searchTerm} onChange={handleSearchTerm}></Input>
            </div>
          </Tabs>
        </CardHeader>
        {/* Table */}
        <CardContent>
          <div className='border rounded-md overflow-hidden'>
            <div className='grid grid-cols-12 bg-muted py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium'>
              <div className='col-span-1 hidden sm:block'>No.</div>
              <div className='col-span-6 sm:col-span-5'>Category name</div>
              <div className='col-span-2 text-center hidden sm:block'>Product</div>
              <div className='col-span-3 sm:col-span-2 text-center'>Status</div>
              <div className='col-span-3 sm:col-span-2 text-center'>Action</div>
            </div>
          </div>
          <ScrollArea className='h-[350px] sm:h-[420px]'>
            {filterCategory.length > 0 ? (filterCategory.map((c, index)=>{
            return (<div key={index} className='grid grid-cols-12 py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium border-b items-center hover:bg-gray-50 transition duration-100'>
              <div className='col-span-1 hidden sm:block'>{index + 1}</div>
              <div className='col-span-6 sm:col-span-5 truncate'>{c.name}</div>
              <div className='col-span-2 text-center hidden sm:block'>0</div>
              <div className='col-span-3 sm:col-span-2 text-center'>
                <Badge className={cn(c.status === 'Active' ? "bg-green-600" : 'bg-gray-400')}>{c.status}</Badge>
              </div>
              <div className='col-span-3 sm:col-span-2 text-right lg:text-center'>
                {/* Mobile Action btn */}
                <div className='flex justify-end gap-1 md:hidden'>
                  <Button variant='ghost' size='icon' className='size-7'
                  onClick={() => handleEditClick(c)}>
                    <Pencil size={15}></Pencil>
                  </Button>
                  {c.status === 'Active' ? (
                    <Button variant='ghost' size='icon' className='size-7'
                      onClick={() => handleDeleteClick(c)}
                    >
                      <Trash2 size={15}></Trash2>
                    </Button>
                  ) : (
                    <Button variant='ghost' size='icon' className='size-7'
                      onClick={()=>{handleRestoreClick(c)}}
                    >
                        <RefreshCcw size={15}></RefreshCcw>
                    </Button>
                  )}

                </div>
                {/* Desktop Action btn */}
                <div className='hidden md:block'>
                  <DropdownMenu>

                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' size="icon" className='size-8'>
                        <MoreVertical size={16}></MoreVertical>
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align='end'>

                      <DropdownMenuItem onClick={() => {handleEditClick(c)}}>
                        <Pencil size={15}></Pencil>
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator></DropdownMenuSeparator>

                      {c.status === 'Active' ? (
                        <DropdownMenuItem onClick={() => {handleDeleteClick(c)}}>
                        <Trash2 size={15} className='text-destructive'></Trash2>
                        <span className='text-destructive'>Delete</span>
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => {handleRestoreClick(c)}}>
                        <RefreshCcw size={15} className='text-green-600'></RefreshCcw>
                        <span className='text-green-600'>Restore</span>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>

                  </DropdownMenu>
                </div>
              </div>
            </div>)
          })) : (
            <div className='py-8 text-center text-muted-foreground'>No category found matching your search</div>
          )}
          </ScrollArea>
        </CardContent>
    </Card>

    <EditCategoryModal 
      open={isEditModal} 
      onOpenChange={setIsEditModal} 
      category={selectedCate}>
    </EditCategoryModal>
    <DeleteCategoryMadal
      open={isDeleteModal}
      onOpenChange={setIsDeleteModal}
      category={selectedCate}>
    </DeleteCategoryMadal>
    <RestoreCategoryMadal
      open={isRestoreModal}
      onOpenChange={setIsRestoreModal}
      category={selectedCate}>
    </RestoreCategoryMadal>
    </>
  )
}

export default CategoryList