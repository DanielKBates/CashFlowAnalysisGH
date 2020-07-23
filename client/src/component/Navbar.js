import React from "react";
class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalHover: false
        }
    }
    toggleHover = () => {
        this.setState(prevState => ({
            modalHover: !prevState.modalHover
        }));
    }
    render() {
        const styles = {
            nav: {
                backgroundColor: "gray",
                borderBottom: "1px solid #000000",
            }

               
        }
        return (
            <div >
                <nav className="navbar navbar-expand-lg navbar-light" style={styles.nav}>
                    <a className="navbar-brand" href="#">
                        <img src=""
                            width="70"
                            height="60"
                            className="d-inline-block align-top"
                            loading="lazy"
                            alt="LOGO"
                        >

                        </img>
                    </a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item mr-2 ml-2">
                                <a className="nav-link" href="#">Home</a>
                            </li>
                            <li className="nav-item mr-2 ml-2">
                                <a className="nav-link" href="#">History</a>
                            </li>
                            <li className="nav-item mr-2 ml-2">
                                <a className="nav-link" href="#">Budget</a>
                            </li>
                        </ul>
                    </div>

                    <span className="mr-3">USER</span>
                    {this.state.modalHover ?
                        <svg className="bi bi-person-fill"
                            width="2%"
                            height="2%"
                            viewBox="0 0 16 16"
                            fill="#000000"
                            xmlns="http://www.w3.org/2000/svg"
                            onMouseLeave={this.toggleHover}>
                            <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg> :
                        <svg className="bi bi-person"
                            width="2%"
                            height="2%"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            onMouseEnter={this.toggleHover}>
                            <path fillRule="evenodd" d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        </svg>
                    }
                </nav>
            </div>
        )
    }
}
export default Nav;

