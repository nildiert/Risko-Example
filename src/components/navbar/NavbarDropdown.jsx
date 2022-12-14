import { useRef, useState } from 'react';
import { notifications } from '../../data';
import { useClickOutside } from '../../hooks';
import { ArrowDownIcon, BellIcon } from '../../icons';
import { useTranslation } from 'react-i18next';

export const NavbarDropdown = () => {
  // Referencia al idioma seleccionado
  const [t] = useTranslation('global');
  
  // Control sobre el estado del dropdown
  const [isOpened, setIsOpened] = useState(false);
  
  // Referenciar el botón que controla el despliegue del dropdown
  const buttonRef = useRef();

  // Abrir y cerrar el dropdown
  const handleClick = () => {
    setIsOpened(!isOpened);
  }

  // Cerrar el dropdown al hacer click por fuera de buttonRef
  useClickOutside( buttonRef, () => setIsOpened(false) );
  
  return (
    <div className="relative inline-flex">
      <button ref={ buttonRef } type="button" className="relative flex items-center gap-2 duration-300 hover:text-pink" onClick={ handleClick }>
        <BellIcon/>
        <span className="absolute left-5 bottom-4 w-4 h-4 text-sm text-white leading-tight bg-red-500 rounded-full">3</span>
        <ArrowDownIcon/>
      </button>
      <ul className={`${isOpened ? 'max-h-40' : 'max-h-0'} absolute top-10 right-0 w-max px-3 overflow-hidden bg-white rounded-lg shadow-lg z-10 transition-all ease-in-out duration-500`}>
        
        { // Iterar para crear cada una de las notificaciones
          notifications.map( (notification, index) => {
            const { id, icon } = notification;

            // Array con la descripción traducible de cada notificación
            const descriptions = t('navbarDropdown.notifications', { returnObjects: true});

            // Asociar cada notificación con su correspondiente descripción traducible
            const description = descriptions[index]
            return (
              <li key={ id } className="my-1 py-1 px-3 text-black-500 border-b duration-300 cursor-pointer hover:text-pink hover:bg-lightpurple" onClick={ () => setIsOpened(false) }>
                <a href='#' className="flex items-center gap-3" onClick={ handleClick }>
                  { icon }{ description }
                </a>
              </li>
            )
          })
        }

      </ul>
    </div>
  )
}
