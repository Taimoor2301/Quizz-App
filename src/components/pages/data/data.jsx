import { useState } from "react";

function bringData() {
  let [data, setData] = useState([]);

  useEffect(function () {
    fetch("https://the-trivia-api.com/v2/questions")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
}
