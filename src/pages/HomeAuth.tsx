export function HomeAuth() {
    function handleHomePage() {
        sessionStorage.removeItem('token')
        window.location.href = '/'
    }

    return (
        <>
            <button onClick={handleHomePage}>Clique aqui para home</button>
            <h1>Hello, você logou na página!</h1>
        </>
    )
}