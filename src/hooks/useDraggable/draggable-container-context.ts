import { createContext } from 'react';

interface DraggableContainerContextType {
  columnId: string | number;
}

const DraggableContainerContext = createContext<DraggableContainerContextType | null>(null);

export default DraggableContainerContext;