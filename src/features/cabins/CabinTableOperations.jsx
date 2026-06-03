import SortBy from 'ui/SortBy';
import Filter from 'ui/Filter';
import TableOperations from 'ui/TableOperations';

// Kontrolna traka iznad tabele kabina — filter i sortiranje.
// Ne menja podatke sama; samo piše izbor u URL (search params),
// a CabinTable čita te parametre i filtrira/sortira cabins niz.
function CabinTableOperations() {
  return (
    // Styled wrapper — horizontalno raspoređuje Filter i SortBy (flex + gap)
    <TableOperations>
      {/*
        Filter — grupa dugmadi za filtriranje po popustu.

        filterField='discount' → ključ u URL-u (?discount=...)
        CabinTable čita: searchParams.get('discount') || 'all'

        options — dozvoljene vrednosti:
          • 'all'           → prikaži sve kabine
          • 'no-discount'   → samo kabine gde je discount === 0
          • 'with-discount' → samo kabine gde je discount > 0
      */}
      <Filter
        filterField='discount'
        options={[
          { value: 'all', label: 'All' },
          { value: 'no-discount', label: 'No discount' },
          { value: 'with-discount', label: 'With discount' },
        ]}
      />

      {/*
        SortBy — padajući meni za sortiranje tabele.

        Piše u URL pod ključem 'sortBy' (podrazumevano u SortBy komponenti).
        Format vrednosti: 'polje-smer' (npr. 'name-asc')

        CabinTable parsira: const [field, direction] = sortBy.split('-')
          • field     → svojstvo objekta cabin (name, regularPrice, maxCapacity)
          • direction → 'asc' (rastuće) ili 'desc' (opadajuće)

        Sortiranje se radi na front-endu nad već učitanim nizom kabina.
      */}
      <SortBy
        options={[
          { value: 'name-asc', label: 'Sort by name (A-Z)' },
          { value: 'name-desc', label: 'Sort by name (Z-A)' },
          { value: 'regularPrice-asc', label: 'Sort by price (low first)' },
          {
            value: 'regularPrice-desc',
            label: 'Sort by price (high first)',
          },
          { value: 'maxCapacity-asc', label: 'Sort by capacity (low first)' },
          {
            value: 'maxCapacity-desc',
            label: 'Sort by capacity (high first)',
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
