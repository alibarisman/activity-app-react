import React from 'react';
import TextInput from '../toolbox/TextInput'
import SelectInput from '../toolbox/SelectInput';

const ActivityDetail = ({ customers, activity, onSave, onChange, errors }) => {
    
    return (
        <div className="container">
            <form onSubmit={onSave} xs="6">
                <h2>{activity.id ? "Update Activity" : "Add Activity"}</h2>
                <TextInput
                    type="text"
                    name="activityName"
                    label="Activity Name"
                    value={activity.activityName}
                    onChange={onChange}
                    error={errors.activityName} />
                <SelectInput
                    type="text"
                    name="customerId"
                    label="Customer"
                    value={activity.customerId || ""}
                    defaultOption="Select"
                    options={customers.map(customer => ({
                        value: customer.id,
                        text: customer.customerName
                    }))}
                    onChange={onChange}
                    error={errors.customerId} />
                <TextInput
                    type="date"
                    name="activityDate"
                    label="Activity Date"
                    value={activity.activityDate}
                    onChange={onChange}
                    error={errors.activityDate} />
                <TextInput
                    type="number"
                    name="duration"
                    label="Duration"
                    value={activity.duration}
                    onChange={onChange}
                    error={errors.duration} />
                <TextInput
                    type="text"
                    name="explanation"
                    label="Explanation"
                    value={activity.explanation}
                    onChange={onChange}
                    error={errors.explanation} />
                <button type="submit" className="btn btn-primary">Save Activity</button>
            </form>
        </div>
    )
}

export default ActivityDetail;
