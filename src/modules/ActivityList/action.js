export const getActivities = params => ({
  type: 'GET_ACTIVITY_LIST',
  url: '/hw/activity/list',
  method: 'POST',
  data: JSON.stringify(params),
});
