const pendingHandler = (state, {
  status,
}) => ({
  ...state,
  ...status,
});

const successHandler = (state, {
  payload,
  status,
}) => ({
  ...state,
  ...status,
  ...payload.data,
});

const failureHandler = (state, {
  status,
}) => ({
  ...state,
  ...status,
});

export default (actionTypePrefix, initialState = {}, handlers = []) => (state, action) => {
  if (!state) {
    state = initialState; // eslint-disable-line
  }
  const hasActionHandler = handlers.hasOwnProperty(action.type); // eslint-disable-line
  if (hasActionHandler) {
    return handlers(action.type)(state, action);
  }
  if (!hasActionHandler) {
    switch (action.type) {
      case `${actionTypePrefix}_PENDING`:
        return pendingHandler(state, action);
      case `${actionTypePrefix}_SUCCESS`:
        return successHandler(state, action);
      case `${actionTypePrefix}_FAILURE`:
        return failureHandler(state, action);
      default:
        break;
    }
  }
  return state;
};
