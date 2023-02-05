# Dance For Everyone

## Table of Contents

- Introduction
- Technologies Used
- Getting Started
- API Endpoints
- Running the App
- Deployment
- Contribution

## Introduction

Welcome to Dance For Everyone, a web application designed to make learning dance more accessible for all. The application uses web-components built with lit-element and typescript, as well as machine learning models from TensorFlow and ml5 to provide users with an interactive and personalized dance learning experience.

## Getting Started

To get started with the Dance For Everyone backend, you will first need to clone the repository and install the necessary dependencies.

```bash
git clone https://github.com/JuanDAC/dance-for-everyone-api
cd backend
npm install
```

## Technologies Used

This application uses a variety of technologies to provide users with a seamless experience. The technologies used in the backend include:

- Typescript: A typed superset of JavaScript that provides optional static typing, making it easier to catch errors and improve code quality.

- TensorFlow: An open-source machine learning library that provides a wide range of tools and resources for building machine learning models.

- TensorFlow YouTube API V3: A module that allows for easy integration of YouTube data into TensorFlow models.

- ml5: A high-level, user-friendly library for machine learning that makes it easy to train and use models in JavaScript.

## API Endpoints

The following are the API endpoints available in the project:

- GET /videos: Retrieves a list of all videos
- POST /videos: Uploads a new video
- PUT /videos/:id: Updates a video
- DELETE /videos/:id: Deletes a video

## Running the Application

To run the application, you will need to start the backend server. This can be done by running the following command:

```bash
npm start
This will start the server and begin listening for incoming requests.
```

## YouTube Data

The application utilizes YouTube Data API v3 to fetch video data for the purpose of training machine learning models. In order to use this feature, you will need to set up a project in the Google Developers Console and generate an API key. The API key should be placed in a file named .env in the root directory of the project, in the following format:

```bash
YOUTUBE_API_KEY=YOUR_API_KEY
```

## Machine Learning

The application uses machine learning models from TensorFlow and ml5 to provide users with an interactive and personalized dance learning experience. These models are trained using data from YouTube videos and Posenet.

## Deployment

This application is intended to be deployed on a Node.js server. Additional steps may be necessary depending on the specific hosting environment.

## Contributing

If you are interested in contributing to the development of Dance For Everyone, please see the CONTRIBUTING.md file for information on how to get involved.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

We would like to thank the following open-source projects for their contributions to the development of Dance For Everyone:

- TensorFlow
- ml5
- YouTube Data API v3
- Contact
<!-- For any inquiries or issues, please contact us at danceforeveryonegame@gmail.com. -->
