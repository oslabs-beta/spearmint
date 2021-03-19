import { createContext } from 'react'; 
import { actionTypes } from '../actions/accTestCaseActions';

export const AccTestCaseContext = createContext([]);


export const accTestCaseState = {
  modalOpen: false,

  describeId: 1,
  itId: 1,
  statementId: 1,
  propId: 1,
  describeBlocks: {
    byId: {
      describe0: {
        id: 'describe0',
        text: '',
      },
    },
    allIds: ['describe0'],
  },
  itStatements: {
    byId: {
      it0: {
        id: 'it0',
        describeId: 'describe0',
        text: '',
      },
    },
    allIds: ['it0'],
  },
  fileName: '',
  filePath: '',
};

/* ---------------------------- Helper Functions ---------------------------- */

const createDescribeBlock = (describeId) => {
  return {
    id: describeId,
    text: '',
  };
};

const createItStatement = (describeId, itId) => ({
  id: itId,
  describeId,
  text: '',
});

const deleteChildren = (object, deletionId, lookup) => {
  const allIdCopy = object.allIds.filter((id) => object.byId[id][lookup] !== deletionId);

  object.allIds.forEach((id) => {
    if (object.byId[id][lookup] === deletionId) {
      delete object.byId[id];
    }
  });

  return allIdCopy;
};

/* ------------------------- Accessibility Test Case Reducer ------------------------ */
// ### where is this invoked -> returns an updated state based on state argument and current action
export const accTestCaseReducer = (state, action) => {
  Object.freeze(state);

  let describeBlocks;
  let itStatements;

  if (state && action) {
    describeBlocks = { ...state.describeBlocks };
    itStatements = { ...state.itStatements };
  }

  switch (action.type) {
    case actionTypes.ADD_DESCRIBE_BLOCK: {
      let updatedDescribeId = state.describeId;
      const describeId = `describe${state.describeId}`;

      return {
        ...state,
        describeId: ++updatedDescribeId,
        describeBlocks: {
          ...describeBlocks,
          byId: {
            ...describeBlocks.byId,
            [describeId]: createDescribeBlock(describeId),
          },
          allIds: [...(describeBlocks.allIds || []), describeId],
        },
      };
    }
    case actionTypes.DELETE_DESCRIBE_BLOCK: {
      const { describeId } = action;
      const byId = { ...describeBlocks.byId };
      delete byId[describeId];
      const allIds = describeBlocks.allIds.filter((id) => id !== describeId);

      const itStatementAllIds = deleteChildren(itStatements, describeId, 'describeId');

      return {
        ...state,
        describeBlocks: {
          ...describeBlocks,
          byId: {
            ...byId,
          },
          allIds: [...allIds],
        },
        itStatements: {
          ...itStatements,
          byId: {
            ...itStatements.byId,
          },
          allIds: [...itStatementAllIds],
        },
      };
    }
    case actionTypes.UPDATE_DESCRIBE_TEXT: {
      const { describeId, text } = action;
      const byIds = { ...describeBlocks.byId };
      const block = { ...describeBlocks.byId[describeId] };
      return {
        ...state,
        describeBlocks: {
          ...describeBlocks,
          byId: {
            ...byIds,
            [describeId]: {
              ...block,
              text,
            },
          },
        },
      };
    }
    case actionTypes.UPDATE_DESCRIBE_ORDER: {
      const { reorderedDescribe } = action;

      return {
        ...state,
        describeBlocks: {
          ...describeBlocks,
          allIds: reorderedDescribe,
        },
      };
    }
    case actionTypes.ADD_ITSTATEMENT: {
      const { describeId } = action;
      const itId = `it${state.itId}`;
      let updatedItId = state.itId;

      return {
        ...state,
        itId: ++updatedItId,
        itStatements: {
          ...itStatements,
          byId: {
            ...itStatements.byId,
            [itId]: createItStatement(describeId, itId),
          },
          allIds: [...(itStatements.allIds || []), itId],
        },
      };
    }
    case actionTypes.DELETE_ITSTATEMENT: {
      const { itId } = action;
      const byId = { ...itStatements.byId };
      delete byId[itId];
      const allIds = itStatements.allIds.filter((id) => id !== itId);

      return {
        ...state,
        itStatements: {
          ...itStatements,
          byId: {
            ...byId,
          },
          allIds: [...allIds],
        },
      };
    }
    case actionTypes.UPDATE_ITSTATEMENT_TEXT: {
      const { itId, text } = action;
      const byIds = { ...itStatements.byId };
      const block = { ...itStatements.byId[itId] };
      return {
        ...state,
        itStatements: {
          ...itStatements,
          byId: {
            ...byIds,
            [itId]: {
              ...block,
              text,
            },
          },
        },
      };
    }
    case actionTypes.UPDATE_ITSTATEMENT_ORDER: {
      const { reorderedIt } = action;

      return {
        ...state,
        itStatements: {
          ...itStatements,
          allIds: reorderedIt,
        },
      };
    }
    case actionTypes.CREATE_NEW_TEST: {
      return {
        ...state,
        describeBlocks: {
          byId: {},
          allIds: [],
        },
        itStatements: {
          byId: {},
          allIds: [],
        },
      };
    }
    case actionTypes.OPEN_INFO_MODAL: {
      return {
        ...state,
        modalOpen: true,
      };
    }
    case actionTypes.CLOSE_INFO_MODAL: {
      return {
        ...state,
        modalOpen: false,
      };
    }
    case actionTypes.UPDATE_FILE_PATH: {
      const { fileName, filePath } = action;
      return {
        ...state,
        fileName,
        filePath,
      };
    }
    default:
      return state;
  }
};
