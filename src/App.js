import "./styles.css";
import {
  BrowserRouter, // should be single
  Routes, // can have multiple; even inside component but append "/*" in path of that compoent
  Route,
  Link,
  NavLink,
  Outlet,
  useParams,
  useNavigate,
  useSearchParams,
  Navigate
} from "react-router-dom";

/**
 * New to React router v6 from v5:
 * Upgraded all Switch to Routes
 * Removed <Redirect /> inside switch in v6
 * https://reactrouter.com/docs/en/v6/upgrading/v5 */

export default function App() {
  return (
    <BrowserRouter>
      <h1>React router v6</h1>
      <Routes>
        {/* In Home, use <Outlet /> to show children */}
        <Route path="/" element={<Layout />}>
          {/* index specifies default element */}
          <Route index element={<Welcome />} />

          {/* app */}
          <Route path="/app" element={<AppPage />}>
            <Route index element={<AppHome />} />

            {/* displays below with best match of path; not based on sequence;
            so following will render only if other paths aren't matched */}
            <Route path=":slug" element={<Other />} />

            {/* relative path doesn't start with / */}
            <Route path="about" element={<AppAbout />} />
            {/* absolute path starts with /; if you want to pass full path */}
            <Route path="/app/contact" element={<AppContact />} />

            <Route
              path="redirect-me"
              element={<Navigate replace to="/app/about" />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const Layout = () => {
  return (
    <div>
      <ol>
        <li>
          <Link to="/">Home (/)</Link>
        </li>
        <li>
          {/* relative path (no / in start) */}
          <Link to="app">App (/app)</Link>
        </li>
        <li>
          <Link to="no-match">404</Link>
        </li>
      </ol>
      <h4>Home (/)</h4>
      <fieldset>
        <legend>Selected page: (using &lt;Outlet /&gt;)</legend>
        <Outlet />
      </fieldset>
    </div>
  );
};

const Welcome = () => (
  <div>
    <h4>Welcome</h4>
    (added as index route so outlet won't be empty)
  </div>
);

const AppPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h4>App Home (/app)</h4>
      <ol>
        <li>
          {/* absolute path starts with "/" */}
          {/* navlink to get active link;
          it auto adds "active" unless pass as below fn or add style using style */}
          <NavLink
            style={({ isActive }) => ({ color: isActive ? "green" : "" })}
            className={({ isActive }) => (isActive ? "i-am-active" : "normal")}
            to="/app/about"
          >
            About (/app/about)
          </NavLink>
        </li>
        <li>
          {/* relative path (can be used for route path, link or navigate) */}
          <button
            onClick={() =>
              navigate("contact", { replace: false, state: { foo: "sent" } })
            }
            to="/app"
          >
            Contact (/app/contact)
          </button>
        </li>
        <li>
          {/* relative path (no / in start) */}
          <Link to="some-params">Params (/app/:slug)</Link>
        </li>
        <li>
          <Link to="redirect-me">Redirect to home (/app)</Link>
        </li>
      </ol>
      <fieldset>
        <legend>Children routes (Outlets) </legend>
        <Outlet />
      </fieldset>
    </div>
  );
};

const AppHome = () => <div>App: Default Home</div>;

const AppAbout = () => <div>App: About</div>;

const AppContact = () => <div>App: Contact</div>;

const NotFound = () => <div>404</div>;

const Other = () => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <p>params object:</p>
      <pre>{JSON.stringify(params, 4, null)}</pre>
      <p> search params value:</p>
      <button onClick={() => setSearchParams({ page: 2 })}>
        Set search params{" "}
      </button>
      <pre>Page: {searchParams.get("page")}</pre>
    </div>
  );
};
