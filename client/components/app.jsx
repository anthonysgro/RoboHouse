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

        this.startScraping = this.startScraping.bind(this);
    }

    state = {
        dropdownMenuStyle: {
            display: "none",
        },
    };

    startScraping = async () => {
        console.log("Starting to scrape...");
        await axios.get("/api/robohouse");
    };

    handleToggleDropdownMenu = () => {
        let newState = Object.assign({}, this.state);
        if (newState.dropdownMenuStyle.display === "none") {
            newState.dropdownMenuStyle = { display: "flex" };
        } else {
            newState.dropdownMenuStyle = { display: "none" };
        }

        this.setState(newState);
    };

    render() {
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
                    <Header size="huge">RoboHouse</Header>
                    <p className="lead">
                        Start scraping by clicking the button below:
                    </p>

                    <Button onClick={this.startScraping}>Start Scraping</Button>
                </Container>
            </div>
        );
    }
}

export default App;
