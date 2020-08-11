import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCustomers } from "../../redux/actions/customerActions";
import { getProjects } from "../../redux/actions/projectActions"
import { saveActivity } from "../../redux/actions/activityActions";
import ActivityDetail from "./ActivityDetail";

function AddOrUpdateActivity({
    activities,
    customers,
    projects,
    getActivities,
    getCustomers,
    getProjects,
    saveActivity,
    history,
    ...props
}) {
    const [activity, setActivity] = useState({ ...props.activity });
    const [errors, setErrors] = useState({});
    const [projectList, setProjectList] = useState([]);
    
    useEffect(() => {
        if (customers.length === 0) {
            getCustomers();
        }
        if(projects.length === 0) {
            getProjects();
        }
        setActivity({ ...props.activity });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.activity]);

    function handleChange(event) {

        if(event.target.name === "customerId") {
            let projectList = projects.filter(projectList => projectList.customerId === Number(event.target.value)) || null;
            setProjectList(projectList);
        }

        const { name, value } = event.target;
        setActivity(previousActivity => ({
            ...previousActivity,
            [name]: name === "customerId" ? parseInt(value, 10) : value
        }));

        validate(name, value);
        
    }

    function validate(name, value) {
        switch (name) {
            case "activityName":
                if (name === "activityName" && value === "") {
                    setErrors(previousErrors => ({
                        ...previousErrors,
                        activityName: "Aktivite ismi girilmelidir"
                    }));
                } else {
                    setErrors(previousErrors => ({
                        ...previousErrors,
                        activityName: ""
                    }));
                }
                break;
            case "customerId":
                if (name === "customerId" && value === "") {
                    setErrors(previousErrors => ({
                        ...previousErrors,
                        customerId: "Müşteri seçilmelidir."
                    }));
                } else {
                    setErrors(previousErrors => ({
                        ...previousErrors,
                        customerId: ""
                    }));
                }
                break;
            case "projectId":
                if (name === "projectId" && value === "") {
                    setErrors(previousErrors => ({
                        ...previousErrors,
                        projectId: "Proje seçilmelidir."
                    }));
                } else {
                    setErrors(previousErrors => ({
                        ...previousErrors,
                        projectId: ""
                        }));
                    }
                    break;
            case "activityDate":
                if (name === "activityDate" && value === "") {
                    setErrors(previousErrors => ({
                        ...previousErrors,
                        activityDate: "Aktivite tarihi girilmelidir."
                    }));
                } else {
                    setErrors(previousErrors => ({
                        ...previousErrors,
                        activityDate: ""
                    }));
                }
                break;
            case "duration":
                if (name === "duration" && value === "") {
                    setErrors(previousErrors => ({
                        ...previousErrors,
                        duration: "Zaman bilgisi girilmelidir."
                    }));
                } else {
                    setErrors(previousErrors => ({
                        ...previousErrors,
                        duration: ""
                    }));
                }
                break;
            case "explanation":
                if (name === "explanation" && value === "") {
                    setErrors(previousErrors => ({
                        ...previousErrors,
                        explanation: "Açıklama girilmelidir."
                    }));
                } else {
                    setErrors(previousErrors => ({
                        ...previousErrors,
                        explanation: ""
                    }));
                }
                break;
            default:
                break;
        }
    }

    function handleSave(event) {
        event.preventDefault();
        saveActivity(activity).then(() => {
            history.push("/activity");
        });
    }

    return (
        <ActivityDetail
            activity={activity}
            customers={customers}
            projects={projectList}
            onChange={handleChange}
            onSave={handleSave}
            errors={errors}
        />
    );
}

export function getActivityById(activities, activityId) {
    let activity = activities.find(activity => activity.id === Number(activityId)) || null;
    return activity;
}

function mapStateToProps(state, ownProps) {
    const activityId = ownProps.match.params.activityId;
    const activity =
        activityId && state.activityListReducer.length > 0
            ? getActivityById(state.activityListReducer, activityId)
            : {};
    return {
        activity,
        activities: state.activityListReducer,
        customers: state.customerListReducer,
        projects: state.projectListReducer
    };
}

const mapDispatchToProps = {
    getCustomers,
    getProjects,
    saveActivity
};

export default connect(mapStateToProps,mapDispatchToProps)(AddOrUpdateActivity);