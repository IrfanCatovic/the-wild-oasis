import { Outlet } from "react-router-dom";
// Outlet: mesto gde React Router ubacuje sadržaj trenutne rute (npr. Dashboard, Bookings…).
// Roditeljska ruta koristi AppLayout kao “okvir”, a deca rute se renderuju baš ovde.

import Sidebar from "./Sidebar";
// Leva traka sa navigacijom (linkovi ka stranicama aplikacije).

import Header from "./Header";
// Gornja traka (npr. logo, korisnik, podešavanja — zavisi od Header komponente).

import styled from "styled-components";
// CSS-in-JS: komponente koje nose svoje stilove; ne diraju globalni CSS osim varijabli kao --color-grey-50.

/*
 * AppLayout — glavni “korak” aplikacije posle prijave: jedan ekran podeljen na regione.
 * React Router (obično u App.jsx) mapira rute tako da unutrašnje stranice budu deca ove layout rute,
 * pa se u <Main> kroz <Outlet> menja samo centralni sadržaj, a Header i Sidebar ostaju fiksni.
 */

const StyledAppLayout = styled.div`
  /* CSS Grid: ceo viewport (100vh) podeljen u kolone i redove. */
  display: grid;
  /* Dve kolone: fiksna širina za sidebar (26rem) + ostatak prostora za glavni deo (1fr). */
  grid-template-columns: 26rem 1fr;
  /* Prvi red: koliko treba visine (auto). Drugi red: sve preostalo (1fr) — tipično za header + body. */
  grid-template-rows: auto 1fr;
  /* Visina celog layouta = visina prozora pregledača, bez skrolovanja cele stranice osim ako sadržaj traži. */
  height: 100vh;
`;

const Main = styled.main`
  /* Semantički <main>: primarni sadržaj stranice (ono što menja Outlet). */
  background-color: var(--color-grey-50);
  /* Unutrašnji razmak oko sadržaja rute — konzistentan “margin” unutar beležnice. */
  padding: 4rem 4.8rem 6.4rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      {/* Redosled dece + grid pravila: Header ide prvi u automatsko postavljanje ćelija; Sidebar u
          Sidebar.jsx ima grid-row: 1 / -1 pa zauzima oba reda u svojoj koloni (bez preklapanja sa
          Headerom bira se druga kolona); Main popunjava preostalu ćeliju. Ako promeniš red JSX-a ili
          dodaš grid-column na Header/Main, promeniće se i raspored blokova. */}
      <Header />
      <Sidebar />
      <Main>
        {/* Outlet: ovde React Router ubacuje trenutnu ugnježđenu rutu (sadržaj stranice). */}
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
