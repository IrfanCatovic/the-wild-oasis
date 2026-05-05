import { formatDistance, parseISO } from 'date-fns';
import { differenceInDays } from 'date-fns/esm';

// Racuna razliku u danima izmedju dva datuma.
// String(...) omogucava da funkcija radi i sa Date objektima i sa stringovima iz Supabase-a.
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

// Pretvara datum u citljiv tekst relativan na danasnji dan, npr. "3 days ago" ili "In 2 days".
export const formatDistanceFromNow = (dateStr) =>
  // parseISO pretvara ISO string iz baze u Date objekat koji date-fns moze formatirati.
  formatDistance(parseISO(dateStr), new Date(), {
    // Dodaje "ago" za prosle datume ili "in" za buduce datume.
    addSuffix: true,
  })
    // Uklanja "about" iz teksta da rezultat bude kraci.
    .replace('about ', '')
    // Pretvara "in" u "In" da buduci datumi pocinju velikim slovom.
    .replace('in', 'In');

// Vraca danasnji datum kao ISO string koji Supabase moze koristiti u query-jima.
// Vrijeme se resetuje da se ISO string ne mijenja na svakom renderu zbog sekundi/milisekundi.
export const getToday = function (options = {}) {
  const today = new Date();

  // Ako trazimo kraj dana, postavljamo vrijeme na 23:59:59.999.
  // Ovo je korisno za poredjenje sa created_at vrijednostima iz Supabase-a.
  if (options?.end)
    // Zadnji trenutak danasnjeg dana po UTC vremenu.
    today.setUTCHours(23, 59, 59, 999);
  // Inace koristimo pocetak dana da dobijemo stabilan "today" ISO string.
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

// Formatira broj kao iznos u americkim dolarima, npr. 2500 -> "$2,500.00".
export const formatCurrency = (value) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
    value
  );
