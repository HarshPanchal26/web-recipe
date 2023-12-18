# Recipe Book App: MERN Stack Demo

Welcome to the Recipe Book app, a demonstration of a Recipe Book application developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. This app allows you to explore and discover a variety of recipes.

## Getting Started

The project is structured into two main parts for better organization:

### Frontend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/HarshPanchal26/web-recipe.git
    ```

2. Navigate to the "client" directory:

    ```bash
    cd client
    ```

3. Install dependencies using your preferred package manager. In this example, we use `pnpm`:

    ```bash
    pnpm install
    ```

4. Start the frontend server:

    ```bash
    pnpm start
    ```

### Backend Setup

1. Move back to the main project directory:

    ```bash
    cd ..
    ```

2. Navigate to the "server" directory:

    ```bash
    cd server
    ```

3. Install backend dependencies:

    ```bash
    pnpm install
    ```

4. Start the backend server:

    ```bash
    nodemon app.js    # or pnpm start
    ```

5. In a separate terminal, start the frontend server from the "client" directory:

    ```bash
    cd client
    pnpm start
    ```

Now, you are all set to explore a world of delicious recipes using this web app!

## Important Notes

- The web app relies on a third-party API. The free version of this API has limitations, allowing only 100 requests per day. If the daily limit is reached, users will need to wait until the next day to resume using the app.

- Ensure all necessary details, including database connection information, are provided in the `.env` file.

Feel free to contribute, report issues, or suggest enhancements to make this project even better!
