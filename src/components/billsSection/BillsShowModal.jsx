import { useRef } from 'react';
import { useClickOutside } from '../../hooks';
import { CloseIcon } from '../../icons';
import { useTranslation } from 'react-i18next';

export const BillsShowModal = ({ isOpened, setIsOpened, billsChecked, bills }) => {
  // Referencia al idioma seleccionado
  const [t] = useTranslation('global');
  
  // Referenciar el contenedor del modal
  const modalRef = useRef();
  
  // Filtrar el array de facturas en función de los checkbox activos
  const billsForShow = bills.filter( bill => billsChecked.includes(bill.folio) );
  
  // Cerrar modal
  const handleClick = () => {
    setIsOpened(false)
  }

  // Ejecutar función handleClick al hacer click por fuera de modalRef
  useClickOutside( modalRef, () => handleClick() );
    
  return (
    <div className={`${ isOpened ? 'flex' : 'hidden' } fixed top-0 left-0 px-5 w-screen h-screen justify-center items-center bg-black-900/50 z-10`}>
      <div ref={ modalRef } className="animate relative w-full max-w-xs p-5 py-10 bg-white rounded-lg sm:px-7">
        <button type="button" className="absolute top-3 right-3 text-black-700" onClick={ handleClick }>
          <CloseIcon/>
        </button>
        <div className="max-h-96 flex flex-col gap-6 overflow-auto scrollbar">

          { // Mostrar mensaje si no hay facturas seleccionadas
            (!billsForShow.length)
            ?
            <p className="py-10 text-center text-xl font-medium text-black-500">{ t("billsShowModal.message") }</p>
            :

            billsForShow.map( bill => { // Iterar sobre el array de facturas seleccionadas
              const { folio, proveedor, tipo, monto, fechaPago } = bill;
              return (
                <div key={ folio } className="text-black-300">
                  <h3 className="pb-5 text-center text-2xl font-medium text-black-700">{ t("billsShowModal.bill") } { folio }</h3>
                  <p>{ t("billsShowModal.provider") }:</p>
                  <p className="pb-2 font-medium text-black-500">{ proveedor }</p>
                  <p>{ t("billsShowModal.type") }:</p>
                  <p className="pb-2 font-medium text-black-500">{ tipo }</p >
                  <p>{ t("billsShowModal.amount") }:</p>
                  <p className="pb-2 font-medium text-black-500">{ monto }</p >
                  <p>{ t("billsShowModal.date") }:</p>
                  <p className="pb-2 font-medium text-black-500">{ fechaPago }</p>
                  <p>{ t("billsShowModal.details") }:</p>
                  <p className="pb-2 font-medium text-black-500">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                </div>
              )
            })
            
          }

        </div>
      </div>
    </div>
  )
}
