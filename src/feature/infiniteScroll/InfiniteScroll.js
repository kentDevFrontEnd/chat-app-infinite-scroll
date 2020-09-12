import React, { useCallback, useRef, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Search from "./Search";
import useBookSearch from "./useBookSearch";

function InfiniteScroll() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const observer = useRef();
  const { loading, books, error, hasMore } = useBookSearch(query, pageNumber);

  const lastBooksElRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("visible");
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const getSearchTerm = (term) => {
    console.log(term);
    setQuery(term.searchTerm);
  };

  console.log(hasMore);

  let titleOfBooks;

  if (books !== undefined && books.length > 0) {
    titleOfBooks = books.map((b) => b.title);
  } else {
    titleOfBooks = [];
  }
  return (
    <Container>
      <Row>
        <Col md={4} className="ml-auto">
          <Search getSearchTerm={getSearchTerm} />
          <ul className="list-group">
            {titleOfBooks.map((title, index) => {
              if (titleOfBooks.length === index + 1) {
                return (
                  <li
                    ref={lastBooksElRef}
                    className="list-group-item"
                    key={title + index}
                  >
                    {title}
                  </li>
                );
              } else {
                return (
                  <li className="list-group-item" key={title + index}>
                    {title}
                  </li>
                );
              }
            })}
          </ul>
          <div>{loading && "Loading..."}</div>
          <div>{error && "Error..."}</div>
        </Col>
      </Row>
    </Container>
  );
}

export default InfiniteScroll;
