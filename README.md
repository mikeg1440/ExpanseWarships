[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/mikeg1440/ExpanseWarships">
    <img src="warships-frontend/public/TheExpanse_Emoji.png" alt="Site landing page" width="80" height="80">
  </a>

  <h3 align="center">Expanse Warships</h3>

  <p align="center">
    A mini turn based NFT browser game based on the show The Expanse
    <br />
    <a href="https://github.com/mikeg1440/ExpanseWarships"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/mikeg1440/ExpanseWarships">View Demo</a>
    ·
    <a href="https://github.com/mikeg1440/ExpanseWarships/issues">Report Bug</a>
    ·
    <a href="https://github.com/mikeg1440/ExpanseWarships/issues">Request Feature</a>

  </p>
</p>

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Dev Notes](#dev-notes)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)

<div align="center">
  <img src="https://github.com/mikeg1440/my-files/blob/master/images/ExpanseWarships/LandingCropped.png?raw=true" />
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

A mini turn based NFT browser game

## Dev Notes

Any updates to the contract must be followed by deploying the new contract and setting the new address within the front end `constants.js` file found in `warships-frontend/src/utils/`.

You can use the `update_contract.sh` file to do this in one step

Here's the flow of getting our web app connected to our deployed smart contract on the Rinkeby Testnet:

   - Copy latest deployed contract address, paste it in to our web app.
   - Copy the latest ABI file, paste it into our web app's directory. (Later, we will delve more into what an ABI is).
   - Import ethers.js to help us talk to our smart contract from the client.
   - Call a function on our contract to make it do something!
### Built With

* [Node](https://nodejs.org/en/)
* [OpenZeppelin](https://www.openzeppelin.com/)
* [Hardhat](https://hardhat.org/)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* node
* npm
```sh
npm install npm@latest -g
```
* yarn (optional but used for dev)
* hardhat

### Installation
 
1. Clone the repo
```sh
git clone https://github.com/mikeg1440/ExpanseWarships.git
```
2. Install NPM packages
```sh
yarn
```



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_



<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/mikeg1440/ExpanseWarships/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email

Project Link: [https://github.com/mikeg1440/ExpanseWarships](https://github.com/mikeg1440/ExpanseWarships)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* []()
* []()
* []()





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=flat-square
[contributors-url]: https://github.com/mikeg1440/ExpanseWarships/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=flat-square
[forks-url]: https://github.com/mikeg1440/ExpanseWarships/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=flat-square
[stars-url]: https://github.com/mikeg1440/ExpanseWarships/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=flat-square
[issues-url]: https://github.com/mikeg1440/ExpanseWarships/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=flat-square
[license-url]: https://github.com/mikeg1440/ExpanseWarships/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/
