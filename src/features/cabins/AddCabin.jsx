// Uvozimo dugme (reusable UI komponenta) koje će služiti kao "okidač" za otvaranje modala
import Button from 'ui/Button';

// Uvozimo Modal kao tzv. "compound component" (složena komponenta).
// To znači da glavni Modal u sebi sadrži pod-komponente: Modal.Toggle i Modal.Window.
// Ovaj pattern omogućava da roditelj (Modal) deli stanje preko Context API-ja
// sa svojom decom, bez prosleđivanja propsa ručno.
import Modal from 'ui/Modal';

// Forma za kreiranje nove kabine — sadržaj koji će se pojaviti UNUTAR modala
import CreateCabinForm from './CreateCabinForm';

// Komponenta koja prikazuje dugme "Add new cabin" i, klikom na njega,
// otvara modal sa formom za dodavanje nove kabine.
function AddCabin() {
  return (
    // <Modal> je "wrapper" koji interno drži stanje o tome KOJI prozor je trenutno otvoren.
    // Sva njegova deca (Toggle i Window) imaju pristup tom stanju preko Context-a.
    <Modal>
      {/*
        Modal.Toggle je element koji "okida" otvaranje prozora.
        Prop `opens='new-cabin'` je IDENTIFIKATOR — kaže koji Window treba da se otvori.
        Ovaj string mora da se poklapa sa `name` propom kod Modal.Window ispod.
        Toggle obično klonira svoje dete (Button) i dodaje mu onClick handler
        koji postavlja "open name" u kontekstu na 'new-cabin'.
      */}
      <Modal.Toggle opens='new-cabin'>
        {/* Vidljivo dugme koje korisnik klikće da bi otvorio modal */}
        <Button>Add new cabin</Button>
      </Modal.Toggle>

      {/*
        Modal.Window je sam prozor (overlay + sadržaj) koji se prikazuje
        SAMO kada je trenutno otvoreni name === 'new-cabin'.
        Tako jedan Modal može imati više različitih Window-a, a Toggle bira koji.
      */}
      <Modal.Window name='new-cabin'>
        {/* Sadržaj prozora — forma za kreiranje nove kabine */}
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

// Default export omogućava da komponentu uvozimo bez vitičastih zagrada,
// npr. `import AddCabin from './AddCabin'`
export default AddCabin;
