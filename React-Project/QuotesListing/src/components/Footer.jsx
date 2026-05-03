import Socials from './Socials'

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-author">
          <img
            src="https://avatars.githubusercontent.com/u/183258392?v=4"
            alt="Ravi Ranjan Sharma"
          />
          <div>
            <div className="footer-name">Ravi Ranjan Sharma</div>
            <div className="footer-role">Learning & Growing with ChaiCode</div>
          </div>
        </div>
        <Socials />
      </div>
    </footer>
  );
}
