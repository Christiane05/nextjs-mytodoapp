// src/components/Toggle.js
import { updateStatus } from '@/lib/queries';
import React, { useEffect, useState } from 'react';

// Définir une interface pour les props du composant Toggle
interface ToggleProps {
    status: boolean;  // Le statut de la tâche (true ou false)
    onToggleChange: (newStatus: boolean) => void;  // La fonction appelée lorsque l'état du toggle change
  }

export default function Toggle({ status, onToggleChange }: ToggleProps) {
  const [isChecked, setIsChecked] = useState(false);
  


   // Utilise useEffect pour synchroniser isChecked avec status
   useEffect(() => {
    setIsChecked(status);  // Met à jour isChecked lorsque le statut change (par exemple, après la mise à jour de la base de données)
  }, [status]);

  //const handleToggle = () => {
  //  setIsChecked(!isChecked);
  //};

  const handleToggle = () => {
    const newStatus = !isChecked;        // on inverse
    setIsChecked(newStatus);             // on change l'état local
    onToggleChange(newStatus);           // on informe le parent
  };
  
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="hidden"
        checked={isChecked}
        //onChange={() => onToggleChange(!status)} // Lorsque l'utilisateur change, on met à jour le statut
        onChange={handleToggle}
      />
      <div
        className={`w-10 h-6 ${isChecked ? 'bg-blue-500' : 'bg-gray-300'} rounded-full transition-colors duration-300 ease-in-out`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out transform ${
            isChecked ? 'translate-x-4' : 'translate-x-0'
          }`}
        ></div>
      </div>
    </label>
  );
}
