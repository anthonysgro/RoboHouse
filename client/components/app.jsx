import React, { Component } from "react";
import {
    Button,
    Segment,
    Grid,
    Header,
    Icon,
    Menu,
    Image,
    Popup,
} from "semantic-ui-react";

import axios from "axios";
import questionMark from "../../public/assets/question-mark.png";
import RoboHouseLogo from "../../public/assets/RoboHouseLogoCrop.png";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

    clickHerokuLogs = async () => {};

    render() {
        const { status } = this.state;
        return (
            <div className="App">
                <Segment textAlign="center" raised className="main-segment">
                    <Image
                        src={RoboHouseLogo}
                        size="medium"
                        centered
                        circular
                        id="logo"
                    ></Image>
                    <Header size="huge" className="robo-header">
                        RoboHouse
                    </Header>
                    <div className="lead status">App Status:</div>
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

                    <br />
                    <Popup
                        trigger={
                            <a
                                href="https://dashboard.heroku.com/apps/robohouse/logs"
                                target="_blank"
                            >
                                <Image
                                    src={questionMark}
                                    alt=""
                                    style={{
                                        width: "14px",
                                        height: "auto",
                                        filter: "opacity(40%)",
                                        position: "relative",
                                        top: "-1px",
                                        marginTop: "1rem",
                                    }}
                                    avatar
                                />
                            </a>
                        }
                        position="bottom center"
                        className="popup"
                        content="View logs on Heroku"
                        inverted
                    />
                </Segment>
            </div>
        );
    }
}

export default App;
