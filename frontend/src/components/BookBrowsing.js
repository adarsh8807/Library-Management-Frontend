import React, { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Star, 
  Heart, 
  BookOpen, 
  Eye,
  Calendar,
  User,
  Award,
  ChevronLeft,
  ChevronRight,
  SortAsc,
  BookmarkPlus,
  Share2
} from 'lucide-react';
import { mockBooksEnhanced, categories } from '../mockDataEnhanced';
import { useToast } from '../hooks/use-toast';

const BookBrowsing = () => {
  const [books] = useState(mockBooksEnhanced);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedBook, setSelectedBook] = useState(null);
  const [isBookDetailOpen, setIsBookDetailOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { toast } = useToast();

  // Filter and sort books
  const filteredBooks = useMemo(() => {
    let filtered = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort books
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'popularity':
          return (b.borrowCount || 0) - (a.borrowCount || 0);
        case 'newest':
          return b.publishedYear - a.publishedYear;
        default:
          return 0;
      }
    });

    return filtered;
  }, [books, searchTerm, selectedCategory, sortBy]);

  const toggleWishlist = (bookId) => {
    const book = books.find(b => b.id === bookId);
    if (wishlist.includes(bookId)) {
      setWishlist(prev => prev.filter(id => id !== bookId));
      toast({
        title: "Removed from Wishlist",
        description: `"${book.title}" removed from your wishlist`,
      });
    } else {
      setWishlist(prev => [...prev, bookId]);
      toast({
        title: "Added to Wishlist",
        description: `"${book.title}" added to your wishlist`,
      });
    }
  };

  const handleBorrow = (book) => {
    if (book.available > 0) {
      toast({
        title: "Borrow Request Sent",
        description: `Your request to borrow "${book.title}" has been submitted`,
      });
    } else {
      toast({
        title: "Book Unavailable",
        description: `"${book.title}" is currently not available. Added to your waitlist.`,
        variant: "destructive"
      });
    }
  };

  const openBookDetail = (book) => {
    setSelectedBook(book);
    setCurrentImageIndex(0);
    setIsBookDetailOpen(true);
  };

  const getAvailabilityBadge = (book) => {
    if (book.available === 0) {
      return <Badge variant="destructive">Unavailable</Badge>;
    } else if (book.available <= 2) {
      return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400">Few Left</Badge>;
    } else {
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Available</Badge>;
    }
  };

  const BookCard = ({ book }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700">
      <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
        <img
          src={book.coverImages[0]}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={() => openBookDetail(book)}
        />
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {getAvailabilityBadge(book)}
          {book.rating && (
            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
              <Star className="h-3 w-3 mr-1 fill-current" />
              {book.rating}
            </Badge>
          )}
        </div>
        <div className="absolute top-2 left-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-white/90 hover:bg-white"
            onClick={() => toggleWishlist(book.id)}
          >
            <Heart className={`h-3 w-3 ${wishlist.includes(book.id) ? 'text-pink-500 fill-current' : ''}`} />
          </Button>
        </div>
        <div className="absolute bottom-2 right-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-white/90 hover:bg-white"
            onClick={() => openBookDetail(book)}
          >
            <Eye className="h-3 w-3" />
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-1 line-clamp-2 cursor-pointer hover:text-indigo-600"
            onClick={() => openBookDetail(book)}>
          {book.title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{book.author}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          <Badge variant="outline" className="text-xs">{book.category}</Badge>
          {book.tags?.slice(0, 2).map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
          <span>{book.publishedYear}</span>
          <span>{book.pages} pages</span>
          <span>{book.borrowCount || 0} borrows</span>
        </div>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => handleBorrow(book)}
            disabled={book.available === 0}
          >
            {book.available > 0 ? 'Borrow' : 'Waitlist'}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => toggleWishlist(book.id)}
          >
            <Heart className={`h-3 w-3 ${wishlist.includes(book.id) ? 'text-pink-500 fill-current' : ''}`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const BookListItem = ({ book }) => (
    <div className="flex items-center space-x-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      <div className="w-20 h-28 flex-shrink-0">
        <img
          src={book.coverImages[0]}
          alt={book.title}
          className="w-full h-full object-cover rounded cursor-pointer"
          onClick={() => openBookDetail(book)}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-1 cursor-pointer hover:text-indigo-600"
                onClick={() => openBookDetail(book)}>
              {book.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{book.author}</p>
            <p className="text-sm text-slate-500 mb-2 line-clamp-2">{book.description}</p>
            <div className="flex flex-wrap gap-1 mb-2">
              <Badge variant="outline" className="text-xs">{book.category}</Badge>
              {book.tags?.slice(0, 3).map(tag => (
                <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2 ml-4">
            {getAvailabilityBadge(book)}
            {book.rating && (
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span className="text-sm">{book.rating}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs text-slate-500">
            <span>{book.publishedYear}</span>
            <span>{book.pages} pages</span>
            <span>{book.borrowCount || 0} borrows</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toggleWishlist(book.id)}
            >
              <Heart className={`h-3 w-3 ${wishlist.includes(book.id) ? 'text-pink-500 fill-current' : ''}`} />
            </Button>
            <Button 
              size="sm"
              onClick={() => handleBorrow(book)}
              disabled={book.available === 0}
            >
              {book.available > 0 ? 'Borrow' : 'Waitlist'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            Browse Books
          </CardTitle>
          <CardDescription>Discover your next favorite book from our collection</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search by title, author, or tags..."
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
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Sort by Title</SelectItem>
                <SelectItem value="author">Sort by Author</SelectItem>
                <SelectItem value="rating">Sort by Rating</SelectItem>
                <SelectItem value="popularity">Sort by Popularity</SelectItem>
                <SelectItem value="newest">Sort by Newest</SelectItem>
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

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Showing {filteredBooks.length} of {books.length} books
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {wishlist.length} items in wishlist
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Books Display */}
      <Card>
        <CardContent className="p-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBooks.map(book => (
                <BookListItem key={book.id} book={book} />
              ))}
            </div>
          )}
          
          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                No books found matching your criteria
              </p>
              <p className="text-sm text-slate-500">
                Try adjusting your search terms or filters
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Book Detail Modal */}
      <Dialog open={isBookDetailOpen} onOpenChange={setIsBookDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedBook && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedBook.title}</DialogTitle>
                <DialogDescription>by {selectedBook.author}</DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Book Images */}
                <div className="space-y-4">
                  <div className="aspect-[3/4] relative overflow-hidden rounded-lg">
                    <img
                      src={selectedBook.coverImages[currentImageIndex]}
                      alt={selectedBook.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {selectedBook.coverImages.length > 1 && (
                    <div className="flex justify-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
                        disabled={currentImageIndex === 0}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="flex items-center text-sm">
                        {currentImageIndex + 1} of {selectedBook.coverImages.length}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentImageIndex(Math.min(selectedBook.coverImages.length - 1, currentImageIndex + 1))}
                        disabled={currentImageIndex === selectedBook.coverImages.length - 1}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Book Details */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    {getAvailabilityBadge(selectedBook)}
                    {selectedBook.rating && (
                      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        {selectedBook.rating}
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-slate-600 dark:text-slate-400">Category:</span>
                      <p>{selectedBook.category}</p>
                    </div>
                    <div>
                      <span className="font-medium text-slate-600 dark:text-slate-400">Published:</span>
                      <p>{selectedBook.publishedYear}</p>
                    </div>
                    <div>
                      <span className="font-medium text-slate-600 dark:text-slate-400">Pages:</span>
                      <p>{selectedBook.pages}</p>
                    </div>
                    <div>
                      <span className="font-medium text-slate-600 dark:text-slate-400">Times Borrowed:</span>
                      <p>{selectedBook.borrowCount || 0}</p>
                    </div>
                    <div>
                      <span className="font-medium text-slate-600 dark:text-slate-400">ISBN:</span>
                      <p>{selectedBook.isbn}</p>
                    </div>
                    <div>
                      <span className="font-medium text-slate-600 dark:text-slate-400">Location:</span>
                      <p>{selectedBook.location}</p>
                    </div>
                  </div>

                  {selectedBook.tags && selectedBook.tags.length > 0 && (
                    <div>
                      <span className="font-medium text-slate-600 dark:text-slate-400 block mb-2">Tags:</span>
                      <div className="flex flex-wrap gap-1">
                        {selectedBook.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <span className="font-medium text-slate-600 dark:text-slate-400 block mb-2">Description:</span>
                    <p className="text-sm text-slate-700 dark:text-slate-300">{selectedBook.description}</p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button 
                      className="flex-1"
                      onClick={() => handleBorrow(selectedBook)}
                      disabled={selectedBook.available === 0}
                    >
                      {selectedBook.available > 0 ? 'Borrow Book' : 'Join Waitlist'}
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => toggleWishlist(selectedBook.id)}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${wishlist.includes(selectedBook.id) ? 'text-pink-500 fill-current' : ''}`} />
                      {wishlist.includes(selectedBook.id) ? 'Remove' : 'Wishlist'}
                    </Button>
                    <Button variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookBrowsing;