import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from '../config/axios';


const MatchContext = createContext();


export const MatchProvider = ({ children }) => {

  const [allMatches, setAllMatches] = useState([]);
  const [status, setStatus] = useState('ALL');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/observator/matches/all${status === 'ALL' ? '' : `/` + status}`);

        const allmatches = res.data;
        allmatches.sort((a, b) => new Date(b.match_date) - new Date(a.match_date));
        setAllMatches(allmatches);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [status]);


  return (
    <MatchContext.Provider value={{ allMatches, status, setStatus }}>
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
