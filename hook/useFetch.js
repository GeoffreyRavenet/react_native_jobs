import { useState, useEffect } from "react";
import axios from "axios";
import { REACT_APP_RAPID_API_KEY } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const rapidApiKey = REACT_APP_RAPID_API_KEY;

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const storageKey = `data_${endpoint}`;
      const storedData = await AsyncStorage.getItem(storageKey);

      if (storedData) {
        // Les données existent déjà dans le stockage, vous pouvez les utiliser
        const parsedData = JSON.parse(storedData);
        setData(parsedData);
        setIsLoading(false);
      } else {
        // Les données n'existent pas, effectuez l'appel API
        const response = await axios.request(options);
        const responseData = response.data.data;

        // Stockez les données dans AsyncStorage
        await AsyncStorage.setItem(storageKey, JSON.stringify(responseData));

        setData(responseData);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };
  return { data, isLoading, error, refetch };
};

export default useFetch;
