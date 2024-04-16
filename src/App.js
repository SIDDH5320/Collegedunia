import React, { useState, useEffect } from 'react';
import './styles.css'; // Import your CSS file
import InfiniteScroll from 'react-infinite-scroll-component';
import collegesData from './collegesData.json'; // Import the JSON file

function App() {
  const [colleges, setColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleRows, setVisibleRows] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  // Function to handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Function to load more rows
  const fetchMoreData = () => {
    if (visibleRows >= colleges.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setVisibleRows(prevVisibleRows => prevVisibleRows + 10);
    }, 1000);
  };

  // Load initial colleges from JSON on component mount
  useEffect(() => {
    setColleges(collegesData);
  }, []);

  // Filter colleges based on search term
  const filteredColleges = colleges.filter(college =>
    college.name.toLowerCase().includes(searchTerm)
  );

  // Function to render table rows
  const renderTableRows = () => {
    return filteredColleges.slice(0, visibleRows).map(college => (
      <tr key={college.name}>
        <td>{college.name}</td>
        <td>{college.rating}</td>
        <td>{college.fees}</td>
        <td>{college.userRating}</td>
        <td>{college.featured ? 'Yes' : 'No'}</td>
      </tr>
    ));
  };

  return (
    
   <>
   
    <div className="container">
    <h1>College Dunia List</h1>
      <input
        type="text"
        placeholder="Search by college name..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <InfiniteScroll
        dataLength={visibleRows}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>No more colleges to show</b>
          </p>
        }
      >
        <table>
          <thead>
            <tr>
              <th>College Name</th>
              <th>CollegeDunia Rating</th>
              <th>Fees</th>
              <th>User Review Rating</th>
              <th>Featured</th>
            </tr>
          </thead>
          <tbody>
            {renderTableRows()}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
   </>
  );
}

export default App;
