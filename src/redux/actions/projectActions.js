import * as actionTypes from './actionTypes';

export function changeProject(project) {
    return { type: actionTypes.CHANGE_PROJECT, payload: project }
}

export function getProjectsSuccess(projects) {
    return { type: actionTypes.GET_PROJECTS_SUCCESS, payload: projects }
}

export function createProjectSuccess(project) {
    return { type: actionTypes.CREATE_PROJECT_SUCCESS, payload: project }
}

export function updateProjectSuccess(project) {
    return { type: actionTypes.UPDATE_PROJECT_SUCCESS, payload: project }
}

export function saveProjectApi(project) {
    return fetch("http://localhost:3000/projects/" + (project.id || ""), {
        method: project.id ? "PUT" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(project)
    })
        .then(handleResponse)
        .catch(handleError);
}

export function saveProject(project) {
    return function (dispatch) {
        return saveProjectApi(project).then(savedProject => {
            project.id
                ? dispatch(updateProjectSuccess(savedProject))
                : dispatch(createProjectSuccess(savedProject))
        })
            .catch(error => {
                throw error
            });
    };
}

export async function handleResponse(response) {
    if (response.ok) {
        return response.json();
    }

    const error = await response.text();
    throw new Error(error)
}

export function handleError(error) {
    console.error("Bir hata oluştu");
    alert("Bir hata oluştu");
    throw error;
}

export function getProjects() {
    return function (dispatch) {
        let url = "http://localhost:3000/projects";
        return fetch(url).then(response => response.json())
            .then(result => dispatch(getProjectsSuccess(result)))
    }
}