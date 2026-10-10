
import Navbar from "./compoenets/Navbar";
import Hero from "./compoenets/home/Hero";
import Movies from "./Movies/Movies";
import MovieDetails from "./Movies/MoviesDetails";
import Favorites from "./navbarlinks/Favorites";
import Watchlist from "./navbarlinks/Watchlist";
import About from "./navbarlinks/About";
import Search from "./Search/search";
import Footer from "./Footer/footer";

function App() {
  const path = window.location.pathname;

  if (path.startsWith("/movie/")) {
  const movieId = path.split("/")[2];

  return (
    <>
      <Navbar />
      <MovieDetails movieId={movieId} />
      <Footer />
    </>
  );
}

  let page;

  switch (path) {
    case "/search":
      page = <Search />;
      break;

    case "/favorites":
      page = <Favorites />;
      break;

    case "/watchlist":
      page = <Watchlist />;
      break;

    case "/about":
      page = <About />;
      break;

    default:
      return (
        <>
          <Navbar />
          <Hero />
          <Movies />
          <Footer />
        </>
      );
  }

  return (
    <>
      <Navbar />
      {page}
      <Footer />
    </>
  );
}

export default App;