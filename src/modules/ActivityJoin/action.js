export const getActivity = params => ({
    type: 'GET_ACTIVITY',
    url: '/hw/activity/get',
    method: 'POST',
    data: JSON.stringify(params),
});

export const joinActivity = params => ({
    type: 'ADD_JOIN',
    url: '/hw/join/add',
    method: 'POST',
    data: JSON.stringify(params),
})