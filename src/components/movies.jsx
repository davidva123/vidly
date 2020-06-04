import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/Like";
import "font-awesome/css/font-awesome.css";
import Pagination from "./common/Pagination";
class Movies extends Component {
  state = {
    movies: getMovies(),
  };
  eraseMovie = (selectedMovie) => {
    const movies = this.state.movies.filter((x) => x._id !== selectedMovie._id);
    this.setState({ movies });
  };

  handleLike = (selectedMovie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(selectedMovie);
    movies[index].liked = !movies[index].liked;
    this.setState({movies});
  };
  render() {
    const { length: count } = this.state.movies;
    if (count === 0) {
      return <p>There are no movies in the database.</p>;
    }
    return (
      <React.Fragment>
        {/* {this.numberOfMovies()} */}
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
            {this.state.movies.map((selectedMovie) => (
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
        <Pagination />
      </React.Fragment>
    );
  }

  // numberOfMovies() {
  //   return this.state.movies.length > 0
  //     ? `There are ${this.state.movies.length} movies in the queue`
  //     : `No movies in the queue`;
  // }
}

export default Movies;
