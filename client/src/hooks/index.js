import { useState, useEffect } from 'react';

export const useFetchPolls = () => {
  const [ polls, setPolls ] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

  const fetchPolls = async () => {
    setIsError(false);
    setIsLoading(true);


		try {
			let response = await fetch(`/polls`);
			let data = await response.json();
      setIsLoading(false);
			return setPolls(data);
		} catch (error) {
			setIsLoading(false);
			setIsError(true);
		}
  };
  
  useEffect(() => {
    fetchPolls();
  }, [])

  return [polls , isLoading, isError];
}