// CardsList.jsx

const CardList = () => {
    return (
      <div className="cf pa2">
        <div className="mt2 mb2">
          <p>Cards go here</p>
        </div>
      </div>
    )
  }
  
  export default CardList;

  const CardList = ({data}) => {
    return (
      <div className="cf pa2">
        <div className="mt2 mb2">
        // Using the data prop, we map over the list of products and render a Card component for each product
        {data.map((product) => (
          <Card key={product.id} {...product} />
        ))}
        </div>
      </div>
    )
  }

  // ....

  return (
    <div className="cf pa2">

      <div className="mt2 mb2">
        // Using the data prop, we map over the list of products and render a Card component for each product
        {data.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      
      //  Pagination Buttons
      <div className="flex items-center justify-center pa4">   
        <Button text="Previous" />
        <Button text="Next" />
      </div>
    </div>
  )

  // CardList.jsx
// Import the useState and useEffect hook
import React, { useState, useEffect } from "react";

// CardList.jsx
// define the limit state variable and set it to 10
const limit = 10;
// Define the default dataset, using slice to get the first 10 products
const defaultDataset = data.slice(0, limit);

// Define the offset state variable and set it to 0
const [offset, setOffset] = useState(0);
// Define the products state variable and set it to the default dataset
const [products, setProducts] = useState(defaultDataset);

// Define the handlePrevious function
const handlePrevious = () => {
  // set the offset to the previous 10 products
  setOffset(offset - 10);
}

// Define the handleNext function
const handleNext = () => {
  // set the offset to the next 10 products
  setOffset(offset + 10);
}

// Define the useEffect hook
// This hook will run every time the offset or limit state variables change
// It will update the products state variable to the next 10 products
useEffect(() => {
  // set the products state variable to the next 10 products
  setProducts(data.slice(offset, offset + limit));
}, [offset, limit, data]);

// CardList.jsx

// ...
      //  Pagination Buttons
      <div className="flex items-center justify-center pa4">   
        <Button text="Previous" handleClick={handlePrevious} />
        <Button text="Next" handleClick={handleNext} />
      </div>


import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search"; // Import Search component

const CardList = ({ data }) => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(data.slice(0, limit));
  const [searchTerm, setSearchTerm] = useState(""); // Store search term

  // Function to filter products by tag
  const filterTags = (searchValue) => {
    setSearchTerm(searchValue.toLowerCase()); // Normalize input for case-insensitive matching
    setOffset(0); // Reset pagination when filtering
  };

  // Update products whenever offset or searchTerm changes
  useEffect(() => {
    let filteredData = data;
    
    // Filter products by tags if searchTerm is not empty
    if (searchTerm) {
      filteredData = data.filter(product =>
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Apply pagination after filtering
    setProducts(filteredData.slice(offset, offset + limit));
  }, [offset, searchTerm, data]);

  // Pagination Handlers
  const handlePrevious = () => setOffset(Math.max(offset - limit, 0));
  const handleNext = () => setOffset(Math.min(offset + limit, data.length - limit));

  return (
    <div className="cf pa2">
      {/* Search Component */}
      <Search handleSearch={filterTags} />
      
      <div className="mt2 mb2">
        {products.length > 0 ? (
          products.map((product) => <Card key={product.id} {...product} />)
        ) : (
          <p>No products found.</p>
        )}
      </div>

      {/* Pagination Buttons */}
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={handlePrevious} />
        <Button text="Next" handleClick={handleNext} />
      </div>
    </div>
  );
};

export default CardList;

import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search"; // Import Search component

const CardList = ({ data }) => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // Store search term
  const [filteredData, setFilteredData] = useState(data); // Store filtered data
  const [products, setProducts] = useState(data.slice(0, limit)); // Paginated data

  // Function to filter products by tag
  const filterTags = (searchValue) => {
    const search = searchValue.toLowerCase();
    setSearchTerm(search);
    setOffset(0); // Reset pagination when filtering

    if (!search) {
      setFilteredData(data);
    } else {
      const filtered = data.filter(product =>
        product.tags.some(tag => tag.toLowerCase().includes(search))
      );
      setFilteredData(filtered);
    }
  };

  // Update products whenever offset or searchTerm changes
  useEffect(() => {
    setProducts(filteredData.slice(offset, offset + limit));
  }, [offset, filteredData]);

  // Unified pagination function
  const handlePagination = (direction) => {
    setOffset((prevOffset) => {
      const newOffset = direction === "next"
        ? Math.min(prevOffset + limit, filteredData.length - limit)
        : Math.max(prevOffset - limit, 0);
      return newOffset;
    });
  };

  const isLastPage = offset + limit >= filteredData.length;

  return (
    <div className="cf pa2">
      {/* Search Component */}
      <Search handleSearch={filterTags} />
      
      <div className="mt2 mb2">
        {products.length > 0 ? (
          products.map((product) => <Card key={product.id} {...product} />)
        ) : (
          <p>No products found.</p>
        )}
      </div>

      {/* Pagination Buttons */}
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => handlePagination("prev")} disabled={offset === 0} />
        <Button text="Next" handleClick={() => handlePagination("next")} disabled={isLastPage} />
      </div>
    </div>
  );
};

export default CardList;

