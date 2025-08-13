import React, { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { 
  BookOpen, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Filter,
  Upload,
  Download,
  Tag,
  Star,
  Eye,
  Copy,
  MoreHorizontal,
  Grid3X3,
  List,
  SortAsc,
  MapPin,
  Calendar,
  BarChart3,
  Image as ImageIcon,
  FileText
} from 'lucide-react';
import { mockBooksEnhanced, categories, conditions } from '../mockDataEnhanced';
import { useToast } from '../hooks/use-toast';

const EnhancedBookManagement = () => {
  const [books, setBooks] = useState(mockBooksEnhanced);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [viewMode, setViewMode] = useState('grid');
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    category: '',
    tags: [],
    isbn: '',
    quantity: 1,
    condition: 'Good',
    location: '',
    coverImages: [],
    description: '',
    publishedYear: new Date().getFullYear(),
    pages: 0
  });

  const { toast } = useToast();

  // Get all unique tags from books
  const allTags = useMemo(() => {
    const tags = new Set();
    books.forEach(book => {
      book.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, [books]);

  // Filter and sort books
  const filteredBooks = useMemo(() => {
    let filtered = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.isbn.includes(searchTerm);
      const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
      const matchesCondition = selectedCondition === 'all' || book.condition === selectedCondition;
      const matchesTag = selectedTag === 'all' || book.tags?.includes(selectedTag);
      
      return matchesSearch && matchesCategory && matchesCondition && matchesTag;
    });

    // Sort books
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'publishedYear':
          return b.publishedYear - a.publishedYear;
        case 'borrowCount':
          return (b.borrowCount || 0) - (a.borrowCount || 0);
        case 'available':
          return b.available - a.available;
        default:
          return 0;
      }
    });

    return filtered;
  }, [books, searchTerm, selectedCategory, selectedCondition, selectedTag, sortBy]);

  const handleAddBook = () => {
    if (!newBook.title || !newBook.author || !newBook.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const book = {
      id: Date.now(),
      ...newBook,
      available: newBook.quantity,
      addedDate: new Date().toISOString().split('T')[0],
      status: 'Available',
      rating: 0,
      borrowCount: 0,
      lastBorrowed: null,
      coverImages: newBook.coverImages.length > 0 ? newBook.coverImages : [
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop"
      ]
    };

    setBooks(prev => [...prev, book]);
    setNewBook({
      title: '',
      author: '',
      category: '',
      tags: [],
      isbn: '',
      quantity: 1,
      condition: 'Good',
      location: '',
      coverImages: [],
      description: '',
      publishedYear: new Date().getFullYear(),
      pages: 0
    });
    setIsAddBookOpen(false);
    
    toast({
      title: "Book Added",
      description: `"${book.title}" has been added to the library.`,
    });
  };

  const handleDeleteBook = (bookId) => {
    setBooks(prev => prev.filter(book => book.id !== bookId));
    toast({
      title: "Book Removed",
      description: "Book has been removed from the library.",
    });
  };

  const handleBulkAction = (action) => {
    if (selectedBooks.length === 0) {
      toast({
        title: "No Books Selected",
        description: "Please select books to perform bulk actions.",
        variant: "destructive"
      });
      return;
    }

    switch (action) {
      case 'delete':
        setBooks(prev => prev.filter(book => !selectedBooks.includes(book.id)));
        setSelectedBooks([]);
        toast({
          title: "Bulk Delete Complete",
          description: `${selectedBooks.length} books have been removed.`,
        });
        break;
      case 'export':
        toast({
          title: "Export Started",
          description: `Exporting ${selectedBooks.length} books to CSV.`,
        });
        break;
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Excellent': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Good': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Fair': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Poor': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'Damaged': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const BookCard = ({ book, isSelected, onSelect }) => (
    <Card className={`group hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700 ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
      <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
        <div className="flex">
          {book.coverImages.slice(0, 2).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${book.title} cover ${index + 1}`}
              className={`${book.coverImages.length > 1 ? 'w-1/2' : 'w-full'} h-full object-cover group-hover:scale-105 transition-transform duration-300`}
            />
          ))}
        </div>
        <div className="absolute top-2 left-2">
          <Checkbox
            checked={isSelected}
            onCheckedChange={onSelect}
            className="bg-white/90 border-white"
          />
        </div>
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <Badge variant={book.available > 0 ? "default" : "destructive"} className="bg-white/90 text-slate-800">
            {book.available}/{book.quantity}
          </Badge>
          <Badge className={getConditionColor(book.condition)}>
            {book.condition}
          </Badge>
        </div>
        <div className="absolute bottom-2 right-2">
          <Button variant="outline" size="sm" className="bg-white/90 hover:bg-white">
            <Eye className="h-3 w-3" />
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 line-clamp-2 flex-1">
            {book.title}
          </h3>
          <div className="flex items-center ml-2">
            <Star className="h-3 w-3 text-yellow-500 fill-current" />
            <span className="text-xs text-slate-600 ml-1">{book.rating || 0}</span>
          </div>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
          {book.author}
        </p>
        <div className="flex flex-wrap gap-1 mb-2">
          <Badge variant="outline" className="text-xs">{book.category}</Badge>
          {book.tags?.slice(0, 2).map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
          <span className="flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {book.location}
          </span>
          <span className="flex items-center">
            <BarChart3 className="h-3 w-3 mr-1" />
            {book.borrowCount || 0} borrows
          </span>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => {
              setSelectedBook(book);
              setIsEditOpen(true);
            }}
          >
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <Copy className="h-3 w-3" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleDeleteBook(book.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const BookListItem = ({ book, isSelected, onSelect }) => (
    <div className={`flex items-center space-x-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
      <Checkbox
        checked={isSelected}
        onCheckedChange={onSelect}
      />
      <div className="w-16 h-20 flex-shrink-0">
        <img
          src={book.coverImages[0]}
          alt={book.title}
          className="w-full h-full object-cover rounded"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800 dark:text-slate-100 truncate">
              {book.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {book.author}
            </p>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <Badge variant={book.available > 0 ? "default" : "destructive"}>
              {book.available}/{book.quantity}
            </Badge>
            <Badge className={getConditionColor(book.condition)}>
              {book.condition}
            </Badge>
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-2">
          <span className="text-xs text-slate-500 flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {book.location}
          </span>
          <span className="text-xs text-slate-500">
            ISBN: {book.isbn}
          </span>
          <span className="text-xs text-slate-500 flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {book.publishedYear}
          </span>
          <span className="text-xs text-slate-500 flex items-center">
            <BarChart3 className="h-3 w-3 mr-1" />
            {book.borrowCount || 0} borrows
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <Edit className="h-3 w-3" />
        </Button>
        <Button variant="outline" size="sm">
          <Eye className="h-3 w-3" />
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleDeleteBook(book.id)}
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Enhanced Book Management
              </CardTitle>
              <CardDescription>Advanced book catalog management with bulk operations</CardDescription>
            </div>
            <div className="flex gap-2">
              <Dialog open={isBulkUploadOpen} onOpenChange={setIsBulkUploadOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Bulk Import
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Bulk Book Import</DialogTitle>
                    <DialogDescription>
                      Upload a CSV file to import multiple books at once
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-600 dark:text-slate-400 mb-2">
                        Drag and drop your CSV file here, or click to browse
                      </p>
                      <Button variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">Import Books</Button>
                      <Button variant="outline">Download Template</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog open={isAddBookOpen} onOpenChange={setIsAddBookOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Book
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Book</DialogTitle>
                    <DialogDescription>
                      Enter comprehensive details for the new book
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          value={newBook.title}
                          onChange={(e) => setNewBook(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Enter book title"
                        />
                      </div>
                      <div>
                        <Label htmlFor="author">Author *</Label>
                        <Input
                          id="author"
                          value={newBook.author}
                          onChange={(e) => setNewBook(prev => ({ ...prev, author: e.target.value }))}
                          placeholder="Enter author name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select value={newBook.category} onValueChange={(value) => setNewBook(prev => ({ ...prev, category: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map(category => (
                              <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="condition">Condition</Label>
                        <Select value={newBook.condition} onValueChange={(value) => setNewBook(prev => ({ ...prev, condition: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {conditions.map(condition => (
                              <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="isbn">ISBN</Label>
                        <Input
                          id="isbn"
                          value={newBook.isbn}
                          onChange={(e) => setNewBook(prev => ({ ...prev, isbn: e.target.value }))}
                          placeholder="Enter ISBN"
                        />
                      </div>
                      <div>
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input
                          id="quantity"
                          type="number"
                          min="1"
                          value={newBook.quantity}
                          onChange={(e) => setNewBook(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={newBook.location}
                          onChange={(e) => setNewBook(prev => ({ ...prev, location: e.target.value }))}
                          placeholder="e.g., A-001, B-015"
                        />
                      </div>
                      <div>
                        <Label htmlFor="publishedYear">Published Year</Label>
                        <Input
                          id="publishedYear"
                          type="number"
                          value={newBook.publishedYear}
                          onChange={(e) => setNewBook(prev => ({ ...prev, publishedYear: parseInt(e.target.value) }))}
                        />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newBook.description}
                        onChange={(e) => setNewBook(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Enter book description"
                        rows={3}
                      />
                    </div>
                    <div className="col-span-2">
                      <Button onClick={handleAddBook} className="w-full">
                        Add Book to Library
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search by title, author, or ISBN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedCondition} onValueChange={setSelectedCondition}>
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conditions</SelectItem>
                {conditions.map(condition => (
                  <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder="Tags" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                {allTags.map(tag => (
                  <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Sort by Title</SelectItem>
                <SelectItem value="author">Sort by Author</SelectItem>
                <SelectItem value="publishedYear">Sort by Year</SelectItem>
                <SelectItem value="borrowCount">Sort by Popularity</SelectItem>
                <SelectItem value="available">Sort by Availability</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedBooks.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedBooks.length} book{selectedBooks.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleBulkAction('export')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Selected
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleBulkAction('delete')}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedBooks([])}
                >
                  Clear Selection
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Books Display */}
      <Card>
        <CardContent className="p-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map(book => (
                <BookCard
                  key={book.id}
                  book={book}
                  isSelected={selectedBooks.includes(book.id)}
                  onSelect={(checked) => {
                    if (checked) {
                      setSelectedBooks(prev => [...prev, book.id]);
                    } else {
                      setSelectedBooks(prev => prev.filter(id => id !== book.id));
                    }
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBooks.map(book => (
                <BookListItem
                  key={book.id}
                  book={book}
                  isSelected={selectedBooks.includes(book.id)}
                  onSelect={(checked) => {
                    if (checked) {
                      setSelectedBooks(prev => [...prev, book.id]);
                    } else {
                      setSelectedBooks(prev => prev.filter(id => id !== book.id));
                    }
                  }}
                />
              ))}
            </div>
          )}
          
          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400">
                No books found matching your criteria
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedBookManagement;