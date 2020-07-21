import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/ui/Header";
import axios from "axios";
import { config } from "./config/config";
import CharacterGrid from "./components/characters/CharacterGrid";
import Search from "./components/ui/Search";
const App = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  //useEffect works like component did mount. fires off when the component is loaded
  useEffect(() => {
    //using another fxn because we want to make use of async await

    const fetchItems = async () => {
      const result = await axios(`${config.baseURL}?name=${query}`);

      console.log("api results", result.data);
      setItems(result.data);
      setIsLoading(false);
    };
    //call fetchItems to trigger it
    fetchItems();
  }, [query]);

  return (
    <div className="container">
      <Header />
      <Search getQuery={(q) => setQuery(q)} />
      <CharacterGrid isLoading={isLoading} items={items} />
    </div>
  );
};

export default App;
