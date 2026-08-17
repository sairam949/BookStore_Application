import axios from 'axios';

const CATEGORIES = {
  fiction: 'fiction',
  scifi: 'science fiction',
  romance: 'romance',
  mystery: 'mystery thriller',
  fantasy: 'fantasy',
  biography: 'biography',
  history: 'history',
  education: 'education',
  business: 'business',
  technology: 'programming computer'
};

// Sample book prices based on category
const getPriceByCategory = (category) => {
  const basePrices = {
    fiction: { min: 250, max: 450 },
    scifi: { min: 300, max: 500 },
    romance: { min: 200, max: 400 },
    mystery: { min: 280, max: 480 },
    fantasy: { min: 350, max: 550 },
    biography: { min: 400, max: 700 },
    history: { min: 350, max: 600 },
    education: { min: 450, max: 800 },
    business: { min: 500, max: 900 },
    technology: { min: 600, max: 1200 }
  };
  
  const range = basePrices[category] || { min: 200, max: 500 };
  return (Math.random() * (range.max - range.min) + range.min).toFixed(2);
};

export const getBooks = async (category) => {
  try {
    const query = CATEGORIES[category] || category;
    
    const response = await axios.get('https://openlibrary.org/search.json', {
      params: {
        title: query,
        limit: 40,
        sort: 'rating',
        language: 'eng'
      },
      timeout: 10000
    });

    if (!response.data.docs || response.data.docs.length === 0) {
      console.warn(`No books found for category: ${category}`);
      return getDefaultBooks(category);
    }

    const books = response.data.docs
      .filter(book => 
        book.title && 
        book.author_name && 
        book.author_name[0]
      )
      .map((book, i) => ({
        id: book.key?.replace('/works/', '') || `book-${i}`,
        title: (book.title || 'Unknown Title').substring(0, 50),
        author: book.author_name?.[0] || 'Unknown Author',
        year: book.first_publish_year || new Date().getFullYear(),
        pages: book.number_of_pages_median || Math.floor(Math.random() * 400 + 150),
        price: getPriceByCategory(category),
        cover: book.cover_i 
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : `https://via.placeholder.com/200x300?text=${encodeURIComponent(book.title?.substring(0, 15))}`,
        description: book.first_sentence?.[0] || 'A great read',
        isbn: book.isbn?.[0] || '',
        rating: (book.ratings_average || 3.5 + Math.random() * 1.5).toFixed(1),
        ratingsCount: book.ratings_count || Math.floor(Math.random() * 5000 + 100)
      }))
      .slice(0, 24);

    return books.length > 0 ? books : getDefaultBooks(category);
    
  } catch (error) {
    console.error(`Error fetching books for ${category}:`, error.message);
    return getDefaultBooks(category);
  }
};

// Fallback books if API fails
const getDefaultBooks = (category) => {
  const defaultBooks = {
    fiction: [
      { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
      { title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
      { title: '1984', author: 'George Orwell', year: 1949 },
      { title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813 },
      { title: 'The Catcher in the Rye', author: 'J.D. Salinger', year: 1951 }
    ],
    scifi: [
      { title: 'Dune', author: 'Frank Herbert', year: 1965 },
      { title: 'Foundation', author: 'Isaac Asimov', year: 1951 },
      { title: 'Neuromancer', author: 'William Gibson', year: 1984 },
      { title: 'The Left Hand of Darkness', author: 'Ursula K. Le Guin', year: 1969 },
      { title: 'Hyperion', author: 'Dan Simmons', year: 1989 }
    ],
    romance: [
      { title: 'Outlander', author: 'Diana Gabaldon', year: 1991 },
      { title: 'The Notebook', author: 'Nicholas Sparks', year: 1996 },
      { title: 'Jane Eyre', author: 'Charlotte Brontë', year: 1847 },
      { title: 'Twilight', author: 'Stephenie Meyer', year: 2005 },
      { title: 'The Time Traveler\'s Wife', author: 'Audrey Niffenegger', year: 2003 }
    ],
    mystery: [
      { title: 'Murder on the Orient Express', author: 'Agatha Christie', year: 1934 },
      { title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson', year: 2005 },
      { title: 'Sherlock Holmes', author: 'Arthur Conan Doyle', year: 1887 },
      { title: 'The Da Vinci Code', author: 'Dan Brown', year: 2003 },
      { title: 'Gone Girl', author: 'Gillian Flynn', year: 2012 }
    ],
    fantasy: [
      { title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', year: 1954 },
      { title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', year: 1997 },
      { title: 'A Game of Thrones', author: 'George R.R. Martin', year: 1996 },
      { title: 'The Name of the Wind', author: 'Patrick Rothfuss', year: 2007 },
      { title: 'Mistborn', author: 'Brandon Sanderson', year: 2006 }
    ],
    biography: [
      { title: 'Steve Jobs', author: 'Walter Isaacson', year: 2011 },
      { title: 'Becoming', author: 'Michelle Obama', year: 2018 },
      { title: 'The Autobiography of Benjamin Franklin', author: 'Benjamin Franklin', year: 1791 },
      { title: 'I Know Why the Caged Bird Sings', author: 'Maya Angelou', year: 1969 },
      { title: 'Long Walk to Freedom', author: 'Nelson Mandela', year: 1994 }
    ],
    history: [
      { title: 'A Brief History of Time', author: 'Stephen Hawking', year: 1988 },
      { title: 'Sapiens', author: 'Yuval Noah Harari', year: 2011 },
      { title: 'The Rise and Fall of the Third Reich', author: 'William Shirer', year: 1960 },
      { title: 'A People\'s History of the United States', author: 'Howard Zinn', year: 1980 },
      { title: 'The Silk Roads', author: 'Peter Frankopan', year: 2015 }
    ],
    education: [
      { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', year: 2011 },
      { title: 'The Art of Learning', author: 'Josh Waitzkin', year: 2007 },
      { title: 'Educated', author: 'Tara Westover', year: 2018 },
      { title: 'Mindset', author: 'Carol Dweck', year: 2006 },
      { title: 'Deep Work', author: 'Cal Newport', year: 2016 }
    ],
    business: [
      { title: 'Zero to One', author: 'Peter Thiel', year: 2014 },
      { title: 'The Lean Startup', author: 'Eric Ries', year: 2011 },
      { title: 'Good to Great', author: 'Jim Collins', year: 2001 },
      { title: 'The 7 Habits of Highly Effective People', author: 'Stephen Covey', year: 1989 },
      { title: 'Sapiens in Business', author: 'Yuval Harari', year: 2015 }
    ],
    technology: [
      { title: 'The Code Breaker', author: 'Walter Isaacson', year: 2021 },
      { title: 'Cracking the Coding Interview', author: 'Gayle Laakmann', year: 2015 },
      { title: 'Clean Code', author: 'Robert Martin', year: 2008 },
      { title: 'The Pragmatic Programmer', author: 'David Thomas & Andrew Hunt', year: 1999 },
      { title: 'Design Patterns', author: 'Gang of Four', year: 1994 }
    ]
  };

  const categoryBooks = defaultBooks[category] || defaultBooks.fiction;
  
  return categoryBooks.map((book, i) => ({
    id: `default-${category}-${i}`,
    title: book.title,
    author: book.author,
    year: book.year,
    pages: Math.floor(Math.random() * 400 + 150),
    price: getPriceByCategory(category),
    cover: `https://via.placeholder.com/200x300?text=${encodeURIComponent(book.title.substring(0, 15))}`,
    description: `${book.title} by ${book.author}`,
    isbn: '',
    rating: (3.5 + Math.random() * 1.5).toFixed(1),
    ratingsCount: Math.floor(Math.random() * 5000 + 100)
  }));
};