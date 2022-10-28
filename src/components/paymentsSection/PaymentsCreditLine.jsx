import { useState } from 'react';
import { PaymentsModalCreditLine, PaymentProgressBar } from '../../components';
import { creditOperations, formatNumber } from '../../helpers';

export const PaymentsCreditLine = () => {
  const [modalIsOpened, setModalIsOpened] = useState(false);
  const [creditLine, setCreditLine] = useState(150000000);
  const creditSpent = 150000000
  const { creditAvailable, percentCreditSpent } = creditOperations(creditLine, creditSpent);

  const handleToggleModal = () => {
    setModalIsOpened(!modalIsOpened);
  };
  
  return (
    <>
      <div className="pb-7 grid grid-cols-2 gap-3">
        <h3 className="col-span-2 text-center text-black-700 font-medium sm:text-start lg:text-center xl:text-start">Linea de crédito</h3>
        <p className="col-span-2 text-center text-2xl font-bold text-pink sm:col-span-1 sm:text-start lg:col-span-2 lg:text-center xl:col-span-1 xl:text-start">${formatNumber(creditLine)}</p>
        <div className="col-span-2 justify-self-center sm:col-span-1 sm:justify-self-end lg:col-span-2 lg:justify-self-center xl:col-span-1 xl:justify-self-end">
          <button type="button" className="w-60 py-1 px-3 text-sm text-white bg-purple rounded-md sm:w-max lg:w-60 xl:w-max" onClick={ handleToggleModal }>Incrementar línea</button>
        </div>
        <div className="col-span-2">
          <div className="p-4 grid grid-cols-2 border rounded-lg">
            <p className="text-sm font-medium text-black-500">Consumido</p>
            <p className="text-end text-sm font-medium text-black-500">Disponible</p>
            <p className="font-bold">${formatNumber(creditSpent)}</p>
            <p className="text-end font-bold">${formatNumber(creditAvailable)}</p>
            <div className="col-span-2">
              <PaymentProgressBar progressPercentage={ percentCreditSpent }/>
            </div>
            <hr className="col-span-2 mt-2 mb-5" />
            <p className="text-sm font-medium text-black-500">Próxima deuda a pagar</p>
            <p className="text-end text-sm font-medium text-black-500">07 de octubre de 2021</p>
          </div>
        </div>
      </div>
      <PaymentsModalCreditLine isOpened={ modalIsOpened } setIsOpened={ setModalIsOpened } setCreditLine={ setCreditLine } creditLine={ creditLine } />
    </>
  )
}
