const BASE_URL = "http://localhost:5000"

export function login(username, password) {
    let endpoint = BASE_URL + '/login'

    let data = fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    }).then(res => {
        if(res.ok) {
            localStorage.setItem('token-myapp', res.json())
            return {
                message: 'Success'
            }
        }
    })

    return {
        message: 'Unauthorized'
    }
}