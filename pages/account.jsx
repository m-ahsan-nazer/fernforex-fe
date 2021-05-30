import NavBarUser from "/components/navbaruser";

export default function AccountPage(){
    const tokens = JSON.parse(localStorage.getItem('tokens'));
    const user = JSON.parse(localStorage.getItem('user'));
    return(
        <>
        <NavBarUser/>
        <div className="container mt-5 mb-5">
        <h1>Profile</h1>
        <div>
        <p>My name is {user.name}</p>
        <p>My email is {user.email}</p>
        </div>
        <h2>Currency Transactions</h2>
        <div>
        <p>I want to buy ...</p>
        <p>I am selling ... </p>
        </div>
        </div>
        </>
    )
}