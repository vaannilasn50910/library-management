import React, { useState } from 'react';
import { Book, User, History, LogIn, LogOut } from 'lucide-react';

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  status: 'available' | 'borrowed';
}

interface BorrowHistory {
  id: number;
  bookId: number;
  bookTitle: string;
  borrowDate: string;
  returnDate: string | null;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'books' | 'history'>('books');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const books: Book[] = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
      status: 'available'
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
      status: 'borrowed'
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=400",
      status: 'available'
    },
  ];

  const borrowHistory: BorrowHistory[] = [
    {
      id: 1,
      bookId: 2,
      bookTitle: "To Kill a Mockingbird",
      borrowDate: "2024-03-01",
      returnDate: null
    },
    {
      id: 2,
      bookId: 1,
      bookTitle: "The Great Gatsby",
      borrowDate: "2024-02-15",
      returnDate: "2024-02-28"
    },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, implement proper authentication
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <Book className="w-12 h-12 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800 ml-3">LibraryHub</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 flex items-center justify-center"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Book className="w-8 h-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-800">LibraryHub</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('books')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'books'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Book className="w-5 h-5 inline mr-1" />
                Books
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'history'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <History className="w-5 h-5 inline mr-1" />
                History
              </button>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5 inline mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeTab === 'books' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <div key={book.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
                  <p className="text-gray-600">{book.author}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        book.status === 'available'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {book.status}
                    </span>
                    <button
                      disabled={book.status === 'borrowed'}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        book.status === 'available'
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Borrow
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium text-gray-900">Borrowing History</h3>
            </div>
            <div className="border-t border-gray-200">
              <ul className="divide-y divide-gray-200">
                {borrowHistory.map((item) => (
                  <li key={item.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Book className="w-5 h-5 text-gray-400" />
                        <p className="ml-2 text-sm font-medium text-gray-900">
                          {item.bookTitle}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-500">
                          Borrowed: {item.borrowDate}
                        </div>
                        {item.returnDate ? (
                          <div className="text-sm text-gray-500">
                            Returned: {item.returnDate}
                          </div>
                        ) : (
                          <button className="px-3 py-1 rounded-md text-sm font-medium bg-green-100 text-green-800">
                            Return
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;