// app/page.tsx (Home page)
import "../styles/style.css";
import ScrollZoomComponent from "./components/ScrollZoomComponent";

export default function Home() {
  return (
    <div>
      <div>
        <h1>Welcome to My Blog</h1>
        <p>This is the home page of the blog.</p>
      </div>
      <ScrollZoomComponent />
    </div>
  );
}
