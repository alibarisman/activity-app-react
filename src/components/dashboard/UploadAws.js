import React, { Component } from 'react';
import S3Uploader from 'react-aws-s3-uploader';

class App extends Component {

    state = {
        file: '',
    }

    handleFile = (file) => {
        this.setState({
            file
        });
    }

    render() {
        return (
            <S3Uploader
                buttonName="Upload File"
                bucketRegion="us-east-1"
                albumBucketName="activityapp1"
                IdentityPoolId="us-east-1:36f304ed-6ce3-4eff-8aa0-ca4b34e7fb3b"
                handleFile={this.handleFile}
            />
        );
    }
}

export default App;