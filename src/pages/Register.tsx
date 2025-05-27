export function Register() {
    function handleHomePage() {
        window.location.href = '/'
    }

    return (
        <>
            <button onClick={handleHomePage}>Clique aqui para home</button>
            <h1>Hello, aqui você colocará seus dados para registro!</h1>
        </>
    )
}