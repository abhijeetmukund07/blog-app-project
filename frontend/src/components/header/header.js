import "./header.css";
import headerImg from "../../images/headerimage.png"

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleLg">BLOG</span>
      </div>
      <img
        className="headerImg"
        src={headerImg}
        alt="backgroundmage"
      />
    </div>
  );
}