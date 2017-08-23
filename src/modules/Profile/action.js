export const saveProfile = params => ({
  type: 'SAVE_PROFILE',
  url: '/hw/insurance/add',
  method: 'POST',
  data: JSON.stringify(params),
});
