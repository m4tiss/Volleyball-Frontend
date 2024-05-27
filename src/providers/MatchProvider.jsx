import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from '../config/axios';


const MatchContext = createContext();


export const MatchProvider = ({ children }) => {

  const [allMatches, setAllMatches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/observator/matches/all");
        const allmatches = res.data;
        console.log(allmatches);
        setAllMatches(allmatches);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  return (
    <MatchContext.Provider value={{ allMatches }}>
      {children}
    </MatchContext.Provider>
  );
};


export const useMatches = () => {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error('useMatches must be used within a UserProvider');
  }
  return context;
};
