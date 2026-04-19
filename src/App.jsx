import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
/*
 * BrowserRouter — omogućava rutiranje preko URL-a u pregledaču (history API).
 * Routes — kontejner: među svojom decom bira jednu Route čiji path odgovara trenutnom URL-u.
 * Route — mapira URL (path) na JSX koji treba da se prikaže (element).
 * Navigate — programska (ili deklarativna) promena rute; ovde replace da korisnik ne bi “Back”
 *   vraćao na prazan index umesto na dashboard.
 */

import GlobalStyles from "./styles/GlobalStyles";
// styled-components globalni reset + CSS varijable + osnovna tipografija za celu aplikaciju.

import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
// Stranice (page komponente) + zajednički layout (header, sidebar, <Outlet /> za sadržaj rute).

/*
 * App — korenska komponenta: obično se montira iz main.jsx na <div id="root">.
 * Ovde se definiše celokupna mapa URL → UI: koji delovi koriste isti layout, koji su “goli” ekrani,
 * i šta se dešava za nepoznat URL (*).
 */

function App() {
  return (
    <>
      {/* Fragment <> — grupiše više dece bez dodatnog DOM čvora (nije potreban wrapper div). */}
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          {/*
            Roditeljska Route bez path prop-a: nema svoj segment u URL-u, služi samo kao omotač.
            element={<AppLayout />} znači: za sve ugnježđene rute ispod, prvo renderuj AppLayout,
            a unutar njegovog <Outlet /> ubaci aktivno dete (dashboard, bookings, …).
          */}
          <Route element={<AppLayout />}>
            {/*
              index — “podrazumevana” ugnježđena ruta kad URL tačno odgovara roditelju (ovde /).
              Navigate to="dashboard" — odmah prebaci na /dashboard; replace zamenjuje istoriju
              tako da Back ne vraća na / koji bi opet redirectovao.
            */}
            <Route index element={<Navigate replace to="dashboard" />} />
            {/* Relativni path: u praksi /dashboard, /bookings, … (nasleđuju kontekst roditelja). */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
          </Route>

          {/*
            Login je van AppLayout grupe: na /login nema sidebara/headera iz layouta, samo Login stranica.
            Redosled u Routes je bitan za *: prvo se probaju specifičnije rute, pa tek na kraju hvatač.
          */}
          <Route path="login" element={<Login />} />
          {/* path="*" — bilo koji URL koji nije pokriven gore (404 stranica). */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
