import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/Like";
import "font-awesome/css/font-awesome.css";
import Pagination from "./common/Pagination";

import { paginate } from "../utils/paginate";
class Movies extends Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
    pageSize: 4,
  };
  eraseMovie = (selectedMovie) => {
    const movies = this.state.movies.filter((x) => x._id !== selectedMovie._id);
    this.setState({ movies });
  };

  handleLike = (selectedMovie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(selectedMovie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies:allMovies } = this.state;
    if (count === 0) {
      return <p>There are no movies in the database.</p>;
    }

const movies = paginate(allMovies,currentPage,pageSize);
    return (
      <React.Fragment>
        
        <p>There are {count} movies available.</p>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th>Like</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((selectedMovie) => (
              <tr key={selectedMovie._id}>
                <td>{selectedMovie.title}</td>
                <td>{selectedMovie.genre.name}</td>
                <td>{selectedMovie.numberInStock}</td>
                <td>{selectedMovie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={selectedMovie.liked}
                    onClick={() => this.handleLike(selectedMovie)}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.eraseMovie(selectedMovie)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
