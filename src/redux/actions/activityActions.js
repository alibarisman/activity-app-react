import * as actionTypes from './actionTypes';

export function getActivitiesSuccess(activities) {
    return { type: actionTypes.GET_ACTIVITIES_SUCCESS, payload: activities }
}

export function createActivitySuccess(activity) {
    return { type: actionTypes.CREATE_ACTIVITY_SUCCESS, payload: activity }
}

export function updateActivitySuccess(activity) {
    return { type: actionTypes.UPDATE_ACTIVITY_SUCCESS, payload: activity }
}

export function saveActivityApi(activity) {
    return fetch("http://localhost:3000/activities/" + (activity.id || ""), {
        method: activity.id ? "PUT" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(activity)
    })
        .then(handleResponse)
        .catch(handleError);
}

export function saveActivity(activity) {
    return function (dispatch) {
        return saveActivityApi(activity).then(savedActivity => {
            activity.id
                ? dispatch(updateActivitySuccess(savedActivity))
                : dispatch(createActivitySuccess(savedActivity))
        })
            .catch(error => {
                throw error
            });
    };
}

export async function handleResponse(response){
    if(response.ok){
      return response.json();
    }
  
    const error = await response.text();
    throw new Error(error)
  }
  
  export function handleError(error){
    console.error("Bir hata oluştu");
    alert("Bir hata oluştu");
    throw error;
  }

export function getActivities(customerId) {
    return function (dispatch) {
        let url = "http://localhost:3000/activities";

        if (customerId) {
            url = url + "?customerId=" + customerId;
        }

        return fetch(url)
            .then(response => response.json())
            .then(result => dispatch(getActivitiesSuccess(result)))
    }
}

