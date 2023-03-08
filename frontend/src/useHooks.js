import { useEffect, useState } from "react";

export function useCookie() {
  const [token, setToken] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/cookie')
      .then((res) => res.json())
      .then((res) => {
        if(res.user) {
          const name = res.user[0].toUpperCase()
          setToken(true);
          setName(name);
        }
      })
      .finally(() => setLoading(false))
  }, []);

  return { token, name, loading }
}