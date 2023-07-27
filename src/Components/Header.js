import {Dropdown, DropdownButton} from "react-bootstrap";
import {generateCodeChallenge, generateRandomString} from "../util";
import {API_AUTH} from "../api";
import {useAuth} from "./Auth";
import {Link} from "react-router-dom";

export default function Header() {
    const {token, isLoggedIn, logout, profile} = useAuth();

    // REDIRECT USER TO SPOTIFY
    async function redirectAndAuthWithSpotify() {
        const clientId = process.env.REACT_APP_CLIENT_ID;
        const redirectUri = 'http://127.0.0.1:3000';

        let codeVerifier = generateRandomString(128);

        await generateCodeChallenge(codeVerifier).then(codeChallenge => {
            let state = generateRandomString(16);
            let scope = 'user-read-private user-read-email user-library-read';

            localStorage.setItem('code_verifier', codeVerifier);

            let args = new URLSearchParams({
                response_type: 'code',
                client_id: clientId,
                scope: scope,
                redirect_uri: redirectUri,
                state: state,
                code_challenge_method: 'S256',
                code_challenge: codeChallenge
            });
        });

        let json_data = null;
        await fetch(API_AUTH, {
            method: "GET",
            mode: "cors"
        })
            .then(response => {
                console.dir(response)
                return response.json()
            })
            .then(responseJson => {
                console.dir(responseJson)
                return json_data = responseJson;
            })
            .catch(e => console.error(e))

        window.location = json_data.url;
    }

    const reflectionStyle = {
        transform: 'scaleX(-1)', // Flip horizontally
        color: 'rgba(0, 0, 0, 0.1)', // Lighter color for reflection
        display: 'inline-block',
        marginLeft: '0.5rem',
        margin: 0,
        fontWeight: 900,
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container d-flex align-items-center">
                <a className="navbar-brand" href="/">
                    <span style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <h1 style={{margin: 0, fontWeight: 900}} className="font-weight-bold">ECHO</h1>
                        <h1 style={reflectionStyle} className="font-weight-bold">ECHO</h1>
                    </span>
                </a>
                <div className="ml-auto">
                    {isLoggedIn ? (
                        <DropdownButton variant="outline-secondary" id="dropdown-basic-button"
                                        title={`Welcome, ${profile.display_name}`}>
                            <Dropdown.Item>
                                <Link to={"/dashboard/"}>
                                    My dashboard
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => logout()}>Log out</Dropdown.Item>
                        </DropdownButton>
                    ) : (
                        <DropdownButton variant="outline-secondary" id="dropdown-basic-button" title="Log in">
                            <Dropdown.Item
                                onClick={() => redirectAndAuthWithSpotify()}
                            >
                                Log in with Spotify
                            </Dropdown.Item>
                        </DropdownButton>
                    )}
                </div>
            </div>
        </nav>
    );
}
