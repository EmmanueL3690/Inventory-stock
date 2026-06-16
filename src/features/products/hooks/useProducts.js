import { useState } from "react"
import { mockProducts } from "../data/mockProducts"

export const useProducts = () => {

  /* ================================
      MAIN PRODUCT STATE
  ================================= */

  const [products, setProducts] = useState(mockProducts)

  /* ================================
      SEARCH
  ================================= */

  const [search, setSearch] = useState("")

  /* ================================
      TABS
  ================================= */

  const [activeTab, setActiveTab] =
    useState("All Products")

  /* ================================
      FILTERS
  ================================= */

  const [selectedCategory,setSelectedCategory] =
    useState("All")

  const [selectedStatus,setSelectedStatus] =
    useState("All")

  const [stockFilter,setStockFilter] =
    useState("All")

  const [priceFilter,setPriceFilter] =
    useState("All")

  /* ================================
      PRODUCT DETAILS ONLY
  ================================= */

  const [selectedProduct,setSelectedProduct] =
    useState(null)

  const [isDrawerOpen,setIsDrawerOpen] =
    useState(false)

  /* ================================
      FILTER PRODUCTS
  ================================= */

  const filteredProducts =
    products.filter((product)=>{

      const matchesSearch=

        product.name
        ?.toLowerCase()
        .includes(search.toLowerCase())

        ||

        product.sku
        ?.toLowerCase()
        .includes(search.toLowerCase())


      let matchesTab=true

      if(activeTab==="In Stock"){

        matchesTab=product.stock>5

      }

      else if(activeTab==="Low Stock"){

        matchesTab=
        product.stock>0 &&
        product.stock<=5

      }

      else if(activeTab==="Out of Stock"){

        matchesTab=
        product.stock===0

      }

      else if(activeTab==="Archived"){

        matchesTab=
        product.status==="Archived"

      }

      const matchesCategory=

      selectedCategory==="All"

      ||

      product.category===selectedCategory


      const matchesStatus=

      selectedStatus==="All"

      ||

      product.status===selectedStatus


      return(

      matchesSearch &&
      matchesTab &&
      matchesCategory &&
      matchesStatus

      )

    })



  /* ================================
      DELETE
  ================================= */

  const handleDeleteProduct=(id)=>{

    setProducts((prev)=>

    prev.filter(

    (product)=>

    product.id!==id

    )

    )

  }



  /* ================================
      ARCHIVE
  ================================= */

  const handleArchiveProduct=(id)=>{

    setProducts((prev)=>

    prev.map((product)=>

    product.id===id

    ?{

      ...product,
      status:"Archived"

    }

    :product

    )

    )

  }



  /* ================================
      PRODUCT DETAILS
  ================================= */

  const handleOpenDetails=(product)=>{

    setSelectedProduct(product)

    setIsDrawerOpen(true)

  }



  const handleCloseDetails=()=>{

    setSelectedProduct(null)

    setIsDrawerOpen(false)

  }



  /* ================================
      RETURN
  ================================= */

  return{

    products,
    setProducts,

    filteredProducts,

    search,
    setSearch,

    activeTab,
    setActiveTab,

    selectedCategory,
    setSelectedCategory,

    selectedStatus,
    setSelectedStatus,

    stockFilter,
    setStockFilter,

    priceFilter,
    setPriceFilter,

    selectedProduct,
    setSelectedProduct,

    isDrawerOpen,
    setIsDrawerOpen,

    handleDeleteProduct,
    handleArchiveProduct,

    handleOpenDetails,
    handleCloseDetails

  }

}