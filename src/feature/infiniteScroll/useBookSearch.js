import { useEffect } from "react";
import Axios from "axios";
import { useState } from "react";

function useBookSearch(query, pageNumber) {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setBooks([]);
  }, [query]);

  useEffect(() => {
    let cancel;
    setLoading(true);
    setError(false);
    Axios({
      method: "GET",
      url: "https://openlibrary.org/search.json",
      params: { q: query, page: pageNumber },
      cancelToken: new Axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        console.log(res.data);
        setBooks((prevBooks) => {
          // return [...new Set([...prevBooks, ...res.data.docs])];
          return [...prevBooks, ...res.data.docs];
        });
        setHasMore(res.data.docs.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (Axios.isCancel(e)) return;
        setError(true);
      });

    return () => cancel();
  }, [query, pageNumber]);

  return { loading, books, error, hasMore };
}
export default useBookSearch;
