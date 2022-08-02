<div id="top"></div>

<!-- PROJECT SHIELDS -->

[![LinkedIn][linkedin-shield]][linkedin-url-alex] [![LinkedIn][linkedin-shield]][linkedin-url-andrew]

<!-- PROJECT NAME AND SCREENSHOT -->
<br />
<div align="center">
  <h3 align="center">BASKETBAO</h3>
</div>

[![Product Name Screen Shot][product-screenshot]](https://basketbao.herokuapp.com/)

<!-- ABOUT THE PROJECT -->

## About the project

One-week full-stack React project just for fun. An exercise on mobile-friendly SPA (single-page applications) using React Hooks, Bootstrap, external API calls, backend routing and database calls. It was fun to make it. And the data is super didactic too! 🏀

<p align="right">(<a href="#top">back to top</a>)</p>

### Built with

-   [React.js](https://reactjs.org/)
-   [Express.js](https://expressjs.com/)
-   [MongoDB](https://www.mongodb.com/)
-   [Node.js](https://nodejs.org/en/)
-   [Bootstrap](https://getbootstrap.com/)
-   [balldontlie API](https://www.balldontlie.io/)
-   [axios](https://www.npmjs.com/package/axios)
-   [Heroku](https://www.heroku.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- INSTALLATION -->

## Installation

1. Clone the repo

    ```sh
    git clone https://github.com/aoaoberlin/basketbao.git
    ```

<p></p>

2. You'll need to set up the environment variables: a <em>.env</em> file is needed in the root folder (to set up <em>MONGODB_URI</em>), and <em>.env.development</em> and <em>.env.production</em> are needed inside the <em>frontend</em> folder to set up <em>REACT_APP_API_URL</em> (for development you might want to use <em>http://localhost:5005/api</em>; for production it might be something like <em>https://yourapp.herokuapp.com/api</em>)

<p></p>

3. You'll also need to set up a database and to feed it with data. We downloaded multiple data files from <em>balldontlie API</em>, then merged them into one big file and seeded our own database to prevent calling the external API again (as the data won't change in the near future and also because we needed more data than the restricted amounts that <em>balldontlie</em> would provide us per hour). After creating and seeding your DB, make sure to update your <em>.env</em> file as described above.

<p></p>

4. Run the following commands to install the NPM packages for both backend and frontend:

    ```sh
    npm install
    cd frontend
    npm install
    ```

<p></p>

5. To run the app, run

    ```sh
    npm run dev
    ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- THE APP -->

## Using the app

1. The app is pretty straightforward. We collected statistics from all NBA seasons (1979-2021) and separated them into six categories: points, assists, rebounds, steals, blocks and three-pointers made. We focused on single-season statistics; for instance, we can compare how the same player performed on different seasons.

<p></p>

2. For performance reasons, we trimmed the data: for each category, only the 500 first results will be fetched from the database. Also, we weeded out any data from players with less than 25 matches on a specific season.

<p></p>

3. Each category is displayed on a separate table. The tables are automatically sorted by their statistics, so the <em>Points</em> table will be sorted (descending) by points. You can also click on <em>Player</em>, <em>Season</em> and <em>Games</em> to sort each table by any of its columns, either descending or ascending. Remember, there will be 500 data points on each table, so the pagination will go from page 1 to page 50 on each table.

<p></p>

4. It's possible to sort by players or seasons. Searching by <em>Michael Jordan</em> will return only his statistics. If he never made it to the top 500 in any of the categories, he won't show up, as is the case in <em>Rebounds</em>, <em>Blocks</em> and <em>Three-Pointers Made</em>. But he's surely there on the <em>Points</em> table! You can also search by year or decade: <em>1986</em> or <em>198</em> (for 1980-1989) will give you your specific data.

<!-- MARKDOWN LINKS & IMAGES -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url-alex]: https://linkedin.com/in/alexandre-oliv/
[linkedin-url-andrew]: https://www.linkedin.com/in/andrew-oppo/
[product-screenshot]: images/screenshot.png
