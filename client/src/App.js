import "./css/App.css";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Menu from "./component/Menu";
import MainPage from "./component/MainPage";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Menu />
      <MainPage />
      <Footer />
      <aside className="control-sidebar control-sidebar-dark"></aside>
    </div>
  );
}

export default App;
