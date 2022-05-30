import React, { Component } from "react";
import {
    Button,
    Container,
    Grid,
    Header,
    Icon,
    Menu,
    Image,
} from "semantic-ui-react";

import axios from "axios";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownMenuStyle: {
                display: "none",
            },
            status: "STARTING",
        };

        this.startScraping = this.startScraping.bind(this);
    }

    componentDidMount = async () => {
        const { data: status } = await axios.get("/status");
        await this.setState({ ...this.state, status });
    };

    startScraping = async () => {
        console.log("Starting to scrape...");
        const { data: status } = await axios.get("/api/robohouse");
        await this.setState({ ...this.state, status });
    };

    handleToggleDropdownMenu = () => {
        // let newState = Object.assign({}, this.state);
        // if (newState.dropdownMenuStyle.display === "none") {
        //     newState.dropdownMenuStyle = { display: "flex" };
        // } else {
        //     newState.dropdownMenuStyle = { display: "none" };
        // }
        // this.setState(newState);
    };

    render() {
        const { status } = this.state;
        return (
            <div className="App">
                <Grid padded className="tablet computer only">
                    <Menu borderless fluid inverted size="huge">
                        <Container></Container>
                    </Menu>
                </Grid>
                <Grid padded className="mobile only">
                    <Menu borderless fluid inverted size="huge">
                        <Menu.Item header as="a" href="#root">
                            RoboHouse
                        </Menu.Item>
                        <Menu.Menu position="right">
                            <Menu.Item>
                                <Button
                                    icon
                                    inverted
                                    basic
                                    toggle
                                    onClick={this.handleToggleDropdownMenu}
                                >
                                    <Icon name="content" />
                                </Button>
                            </Menu.Item>
                        </Menu.Menu>
                        <Menu
                            borderless
                            fluid
                            inverted
                            vertical
                            style={this.state.dropdownMenuStyle}
                        >
                            <Menu.Item active as="a" href="#root">
                                Home
                            </Menu.Item>
                            <Menu.Item as="a" href="#root">
                                About
                            </Menu.Item>
                            <Menu.Item as="a" href="#root">
                                Contact
                            </Menu.Item>
                        </Menu>
                    </Menu>
                </Grid>
                <Container text textAlign="center">
                    <Image
                        src="/assets/RoboHouseLogoCrop.png"
                        size="medium"
                        centered
                        circular
                        id="logo"
                    ></Image>
                    <Header size="huge">RoboHouse</Header>
                    <div className="lead">App Status:</div>
                    {status === "STARTING" ? (
                        <Icon
                            name="spinner"
                            color="yellow"
                            loading
                            size="large"
                        />
                    ) : status === "ON" ? (
                        <Icon name="check circle" color="green" size="large" />
                    ) : (
                        <Icon name="warning circle" color="red" size="large" />
                    )}
                    <div> </div>

                    <br />
                    <p className="lead">Manual Restart:</p>
                    <Button onClick={this.startScraping}>Start Scraping</Button>
                </Container>
            </div>
        );
    }
}

export default App;
