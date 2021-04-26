import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';

import { ContainerState } from './types';
import { NodeElement, Position } from 'types/element';
import { Line } from 'types/line';
import { setData } from 'lib/helpers/localStorage';
import { newElement } from 'lib/helpers/element';
import { newLine } from 'lib/helpers/line';

interface AddElementType {
  mainElement: NodeElement;
  direction: string;
}

// The initial state of the Editor container
export const initialState: ContainerState = {
  listElements: [],
  listLines: [],
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    initialElement(state, action: PayloadAction<Position>) {
      const { x, y } = action.payload;
      const defaultElement: NodeElement = {
        x,
        y,
        content: '<p>Root element</p>',
        direction: {
          top: { text: 'top', linked: false },
          right: { text: 'right', linked: false },
          bottom: { text: 'bottom', linked: false },
          left: { text: 'left', linked: false },
        },
      };

      state.listElements = [defaultElement];
      setData('elements', state.listElements);
    },

    setListElements(
      state,
      action: PayloadAction<{ listElements: NodeElement[] }>,
    ) {
      const { listElements } = action.payload;
      state.listElements = listElements;
    },

    addElement(state, action: PayloadAction<AddElementType>) {
      const { mainElement, direction } = action.payload;
      const cloneListElements = [...state.listElements];

      //TODO: should be check id
      const indexMainElement = cloneListElements.findIndex(
        element => element.x === mainElement.x && element.y === mainElement.y,
      );

      const cloneDirection = {
        ...mainElement.direction,
      };
      cloneDirection[direction] = {
        ...cloneDirection[direction],
        linked: true,
      };

      //TODO: set id from server for new element and initial element
      const element = newElement(mainElement, direction);
      cloneListElements[indexMainElement] = {
        ...mainElement,
        direction: cloneDirection,
      };
      cloneListElements.push(element);

      //TODO: when call from api of this action success will set new link
      const line = newLine(mainElement.id, direction, element.id);

      state.listElements = cloneListElements;
      state.listLines.push(line);
      setData('elements', state.listElements);
      setData('lines', state.listLines);
    },

    updatePositionElement(state, action: PayloadAction<any>) {
      const { element, x, y } = action.payload;
      const cloneListElements = [...state.listElements];
      const indexElement = cloneListElements.findIndex(
        e => e.x === element.x && e.y === element.y,
      );

      cloneListElements[indexElement] = {
        ...element,
        x,
        y,
      };

      state.listElements = cloneListElements;
      setData('elements', state.listElements);
    },

    addLine(state, action: PayloadAction<Line>) {
      const { mainId, mainDirection, extraId } = action.payload;
      const line = newLine(mainId, mainDirection, extraId);
      state.listLines.push(line);
    },

    resetState() {
      setData('elements', []);
      setData('lines', []);
      return { ...initialState };
    },
  },
});

export const { actions, reducer, name: sliceKey } = editorSlice;
