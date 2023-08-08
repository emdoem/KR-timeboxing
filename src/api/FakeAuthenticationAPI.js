const FetchAuthenticationAPI = {
    login: async function(credentials) {
        const { email, password } = credentials;
        if (email === 'bob@gmail.com' && password === 'secret') {
            return {
                accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJvYkBnbWFpbC5jb20iLCJpYXQiOjE2OTE0OTM0NzksImV4cCI6MTY5MTQ5NzA3OSwic3ViIjoiMiJ9.5ulNzuEDQXyC6wE81OtKvOcqB7rW2mka8yHMkUAX3iI'
            }
        }
        throw new Error('Invalid credentials');
    }
}

export default FetchAuthenticationAPI;

