import { useState, useEffect } from 'react';

export const useFetchPolls = () => {
  const [ polls, setPolls ] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

  const fetchPolls = async () => {
    setIsError(false);
    setIsLoading(true);
    
		try {
      let response = await fetch(`/api/polls`);
      if (response.status === 401) {
        alert('Please log in');
        setIsLoading(false);
        setIsError(true);
      }else if (response.ok) {
        let data = await response.json();
        setIsLoading(false);
        return setPolls(data);
      }
		} catch (error) {
			setIsLoading(false);
      setIsError(true);
      console.error(error);
		}
  };
  
  useEffect(() => {
    fetchPolls().then(() => setIsLoading(false));
  }, [])


  return [polls , isLoading, isError];
}