export const getTravelNotes = params => ({
  type: 'GET_TRAIL_LIST',
  url: '/hw/travelNote/list',
  method: 'POST',
  data: JSON.stringify(params),
});
