<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/anthonysgro/RoboHouse">
    <img src="public/assets/RoboHouseLogoCrop.png" alt="Logo" width="200" height="200" style="border-radius: 200px" >
  </a>

  <h3 align="center">RoboHouse</h3>

  <p align="center">
    A side-project to get an apartment quicker than everybody else...
    <br />
    <br />
    <a href="https://github.com/anthonysgro/RoboHouse">View Demo</a>
    ·
    <a href="https://github.com/anthonysgro/RoboHouse/issues">Report Bug</a>
    ·
    <a href="https://github.com/anthonysgro/RoboHouse/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)
Apartment hunting is a huge hassle, especially in New York City. I searched far and wide for a good way to automate the apartment hunting process, but it seemed impossible. Many sites had ways to identify scripting and bots. Others that didn't had lacklust listings. Thus I bring you, RoboHouse. I wanted to create an apartment bot so amazing that it'll be the last one you ever need -- I think this is it.

Here's why:

-   You should be able to have access to apartments as soon as they come up. Why miss out when even waiting 3 hours could cost you your dream apartment?
-   You shouldn't have to accept that botting is impossible on many rental sites. Where there's a will, there's a way!
-   You should be able to fully customize your preferences and see notifications for new listings at all times.

I will be adding more in the near future. You may also suggest changes by forking this repo and creating a pull request or opening an issue. Thanks!

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

Major Frameworks/Libraries:

-   [Node.js](https://nodejs.org/en/)
-   [Express](https://expressjs.com/)
-   [React](https://reactjs.org/)
-   [PostgreSQL](https://www.postgresql.org/)
-   [Sequelize](https://sequelize.org/)
-   [Webpack](https://webpack.js.org/)

API Integrations:

-   [ScraperAPI](https://www.scraperapi.com/)
-   [Twilio](https://www.twilio.com/)
-   [Slack](https://www.slack.com/)

Minor Libraries:

-   [Puppeteer](https://pptr.dev/)
-   [Cheerio](https://www.npmjs.com/package/cheerio)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Here are some instructions to get your project set up locally:

### Prerequisites

First, make sure you have the latest version of node and npm.

-   npm

    ```sh
    npm install npm@latest -g
    ```

-   postgres: Create a database titled "RoboHouse" through your preferred postgres client (psql, postico, datagrip, etc.)

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1.  Clone the repo

    ```sh
    git clone https://github.com/anthonysgro/RoboHouse.git
    ```

2.  Add `.gitignore` file if you want:

    ```
    node_modules
    .env
    .gitignore
    dist
    ```

3.  Add the following property to `.env`:

    ```
    APP_ENV=dev
    ```

4.  Get a free API Key at [https://scraperapi.com/](https://scraperapi.com/) and add the following properties to `.env`:

    ```
    PROXY_USERNAME=
    PROXY_PASSWORD=
    PROXY_SERVER=proxy-server.scraperapi.com
    PROXY_SERVER_PORT=8001
    ```

5.  For Slack notifications, follow the instructions here and create your own workspace and web app: [video](https://www.youtube.com/watch?v=nyaCol4IH5c). Add the following properties to `.env`:

    ```
    SLACK_APP_WEBHOOK_URL=
    SLACK_APP_WEBHOOK_URL_DEV=
    ```

    Create two channels to take advantage of different dev environments. Otherwise, just use the same webhook for both.

6.  For text notifications, create an account at [twilio](https://www.twilio.com/), add your number under Verified Caller ID's (and any other subscriber numbers), and add the following properties to .env:

    ```
    TWILIO_ACCOUNT_FRIEND_PHONE_NUMBER=
    TWILIO_ACCOUNT_MY_PHONE_NUMBER=
    TWILIO_ACCOUNT_PHONE_NUMBER=
    TWILIO_ACCOUNT_SID=
    TWILIO_ACCOUNT_TOKEN=
    ```

7.  Install NPM packages

    ```sh
    npm install
    ```

8.  Run `npm run start:dev` to run locally for dev environment

9.  Deploy to [heroku](https://dashboard.heroku.com/) for constant availability. Ensure that you add all environment variables to heroku config, changing `APP_ENV=prod`. You will also have to add the [Heroku Postgres Add-On](https://elements.heroku.com/addons/heroku-postgresql), and add the [puppeteer buildpack](https://github.com/jontewks/puppeteer-heroku-buildpack.git) to the project.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

TBD

<!-- Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources. -->

<!-- _For more examples, please refer to the [Documentation](https://example.com)_ -->

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

-   [x] Add basic scraping for one site
-   [x] Add continuous scraping with heartbeat
-   [x] Add database to tell if new listing appears
-   [x] Deploy live
-   [ ] Handle custom queries
-   [x] Handle Slack notifications
-   [x] Handle SMS notifications

See the [open issues](https://github.com/anthonysgro/RoboHouse/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Anthony Sgro - [@yaboysgro](https://twitter.com/yaboysgro)

Project Link: [https://github.com/anthonysgro/RoboHouse](https://github.com/anthonysgro/RoboHouse)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/anthonysgro/RoboHouse.svg?style=for-the-badge
[contributors-url]: https://github.com/anthonysgro/RoboHouse/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/anthonysgro/RoboHouse.svg?style=for-the-badge
[forks-url]: https://github.com/anthonysgro/RoboHouse/network/members
[stars-shield]: https://img.shields.io/github/stars/anthonysgro/RoboHouse.svg?style=for-the-badge
[stars-url]: https://github.com/anthonysgro/RoboHouse/stargazers
[issues-shield]: https://img.shields.io/github/issues/anthonysgro/RoboHouse.svg?style=for-the-badge
[issues-url]: https://github.com/anthonysgro/RoboHouse/issues
[license-shield]: https://img.shields.io/github/license/anthonysgro/RoboHouse.svg?style=for-the-badge
[license-url]: https://github.com/anthonysgro/RoboHouse/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/sgro
[product-screenshot]: public/assets/screenshot.png
