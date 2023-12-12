

async function fetchWithToken(url, options = {}) {
    const token = localStorage.getItem('access_token'); 

 
    if (token) {
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        };
    }

    const response = await fetch(`${url}`, options);

    if (response.status === 401) {
        const refreshToken = localStorage.getItem('refresh_token'); 
        if (refreshToken) {
           
            const refreshResponse = await fetch(`http://127.0.0.1:8000/api/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh_token: refreshToken }),
            })
            
            console.log(refreshResponse);

            if (refreshResponse.ok) {
                const data = await refreshResponse.json();
                localStorage.setItem('access_token', data.access_token);
                return fetchWithToken(url, options);
            } else {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
            }
        }
    }

    return response;
}

export { fetchWithToken };