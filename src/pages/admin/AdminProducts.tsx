
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Search, Plus, Eye, Edit, Trash2, Upload, Bell } from 'lucide-react';
import { toast } from "sonner";

const mockProducts = [
  {
    id: 1,
    name: "Nike Air Max 270",
    description: "Comfortable running shoes with excellent cushioning",
    price: 500,
    buyingPrice: 300,
    offerPercentage: 5,
    coinValue: 400,
    status: "Active",
    stock: 25,
    category: "Footwear",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Samsung Galaxy Buds",
    description: "Premium wireless earbuds with noise cancellation",
    price: 400,
    buyingPrice: 250,
    offerPercentage: 10,
    coinValue: 300,
    status: "Active", 
    stock: 15,
    category: "Electronics",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Coffee Mug Set",
    description: "Set of 4 ceramic mugs with beautiful designs",
    price: 200,
    buyingPrice: 120,
    offerPercentage: 0,
    coinValue: 150,
    status: "Inactive",
    stock: 0,
    category: "Home & Kitchen",
    image: "/placeholder.svg"
  },
];

export default function AdminProducts() {
  const [activeTab, setActiveTab] = useState("all-products");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    price: '',
    buyingPrice: '',
    offerPercentage: '',
    coinValue: '',
    stock: '',
    description: '',
    status: true
  });

  const calculateOfferPrice = (price: number, offerPercentage: number) => {
    return price - (price * offerPercentage / 100);
  };

  const calculateMargin = (price: number, buyingPrice: number, offerPercentage: number) => {
    const sellingPrice = calculateOfferPrice(price, offerPercentage);
    return ((sellingPrice - buyingPrice) / sellingPrice) * 100;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddProduct = () => {
    const price = parseFloat(formData.price);
    const buyingPrice = parseFloat(formData.buyingPrice);
    const offerPercentage = parseFloat(formData.offerPercentage) || 0;
    
    if (!formData.productName || !formData.category || !price || !buyingPrice) {
      toast.error("Please fill in all required fields");
      return;
    }

    const offerPrice = calculateOfferPrice(price, offerPercentage);
    const margin = calculateMargin(price, buyingPrice, offerPercentage);

    console.log('New Product:', {
      ...formData,
      price,
      buyingPrice,
      offerPercentage,
      offerPrice,
      margin: `${margin.toFixed(2)}%`
    });

    toast.success(`Product "${formData.productName}" added successfully! Margin: ${margin.toFixed(2)}%`);
    
    // Reset form
    setFormData({
      productName: '',
      category: '',
      price: '',
      buyingPrice: '',
      offerPercentage: '',
      coinValue: '',
      stock: '',
      description: '',
      status: true
    });
  };

  const handleNotificationClick = () => {
    toast.info("Notifications opened - showing latest product updates");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Product Management</h1>
            <p className="text-muted-foreground">
              Add, edit, and manage all products in your store
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleNotificationClick}
            className="flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            Notifications
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all-products">All Products</TabsTrigger>
            <TabsTrigger value="add-product">Add Product</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="all-products">
            <Card>
              <CardHeader>
                <CardTitle>All Products</CardTitle>
                <CardDescription>
                  Manage your product catalog
                </CardDescription>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search products..." className="pl-8" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Buying Price</TableHead>
                      <TableHead>Offer</TableHead>
                      <TableHead>Final Price</TableHead>
                      <TableHead>Margin</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockProducts.map((product) => {
                      const finalPrice = calculateOfferPrice(product.price, product.offerPercentage);
                      const margin = calculateMargin(product.price, product.buyingPrice, product.offerPercentage);
                      
                      return (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>₹{product.price}</TableCell>
                          <TableCell className="text-red-600">₹{product.buyingPrice}</TableCell>
                          <TableCell>
                            {product.offerPercentage > 0 ? (
                              <Badge variant="secondary">{product.offerPercentage}% OFF</Badge>
                            ) : (
                              '-'
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              {product.offerPercentage > 0 ? (
                                <>
                                  <span className="line-through text-gray-500 text-sm">₹{product.price}</span>
                                  <span className="font-semibold text-green-600">₹{finalPrice}</span>
                                </>
                              ) : (
                                <span>₹{product.price}</span>
                              )}
                              <span className="text-sm text-muted-foreground">
                                + {product.coinValue} coins
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={margin > 30 ? "default" : margin > 15 ? "secondary" : "destructive"}>
                              {margin.toFixed(1)}%
                            </Badge>
                          </TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={product.status === "Active" ? "default" : "secondary"}
                            >
                              {product.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add-product">
            <Card>
              <CardHeader>
                <CardTitle>Add New Product</CardTitle>
                <CardDescription>
                  Create a new product for your store
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="productName">Product Name *</Label>
                    <Input 
                      id="productName" 
                      placeholder="Enter product name"
                      value={formData.productName}
                      onChange={(e) => handleInputChange('productName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <select 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                    >
                      <option value="">Select category</option>
                      <option value="electronics">Electronics</option>
                      <option value="footwear">Footwear</option>
                      <option value="clothing">Clothing</option>
                      <option value="home">Home & Kitchen</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Market Price (₹) *</Label>
                    <Input 
                      id="price" 
                      type="number" 
                      placeholder="0"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="buyingPrice">Buying Price (₹) * <span className="text-red-500 text-xs">(Admin Only)</span></Label>
                    <Input 
                      id="buyingPrice" 
                      type="number" 
                      placeholder="0"
                      value={formData.buyingPrice}
                      onChange={(e) => handleInputChange('buyingPrice', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="offerPercentage">Offer Percentage (%)</Label>
                    <Input 
                      id="offerPercentage" 
                      type="number" 
                      placeholder="0"
                      min="0"
                      max="100"
                      value={formData.offerPercentage}
                      onChange={(e) => handleInputChange('offerPercentage', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coinValue">Coin Value</Label>
                    <Input 
                      id="coinValue" 
                      type="number" 
                      placeholder="0"
                      value={formData.coinValue}
                      onChange={(e) => handleInputChange('coinValue', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input 
                      id="stock" 
                      type="number" 
                      placeholder="0"
                      value={formData.stock}
                      onChange={(e) => handleInputChange('stock', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="status" 
                        checked={formData.status}
                        onCheckedChange={(checked) => handleInputChange('status', checked.toString())}
                      />
                      <Label htmlFor="status">Active</Label>
                    </div>
                  </div>
                </div>

                {/* Price Calculation Preview */}
                {formData.price && formData.buyingPrice && (
                  <Card className="bg-gray-50">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Price Calculation Preview</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Market Price:</span>
                          <span className="ml-2 font-semibold">₹{formData.price}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Buying Price:</span>
                          <span className="ml-2 font-semibold text-red-600">₹{formData.buyingPrice}</span>
                        </div>
                        {formData.offerPercentage && parseFloat(formData.offerPercentage) > 0 && (
                          <>
                            <div>
                              <span className="text-gray-600">Offer:</span>
                              <span className="ml-2 font-semibold text-green-600">{formData.offerPercentage}% OFF</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Final Price:</span>
                              <span className="ml-2 font-semibold text-green-600">
                                ₹{calculateOfferPrice(parseFloat(formData.price), parseFloat(formData.offerPercentage) || 0)}
                              </span>
                            </div>
                          </>
                        )}
                        <div className="col-span-2">
                          <span className="text-gray-600">Profit Margin:</span>
                          <span className={`ml-2 font-semibold ${
                            calculateMargin(parseFloat(formData.price), parseFloat(formData.buyingPrice), parseFloat(formData.offerPercentage) || 0) > 30 
                              ? 'text-green-600' 
                              : calculateMargin(parseFloat(formData.price), parseFloat(formData.buyingPrice), parseFloat(formData.offerPercentage) || 0) > 15 
                                ? 'text-yellow-600' 
                                : 'text-red-600'
                          }`}>
                            {calculateMargin(parseFloat(formData.price), parseFloat(formData.buyingPrice), parseFloat(formData.offerPercentage) || 0).toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Enter product description" 
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="images">Product Images</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
                <Button className="w-full" onClick={handleAddProduct}>Add Product</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Product Categories</CardTitle>
                <CardDescription>
                  Manage product categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Electronics</h4>
                      <p className="text-sm text-muted-foreground">12 products</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Footwear</h4>
                      <p className="text-sm text-muted-foreground">8 products</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Home & Kitchen</h4>
                      <p className="text-sm text-muted-foreground">15 products</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center space-x-2">
                  <Input placeholder="New category name" />
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Category
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
