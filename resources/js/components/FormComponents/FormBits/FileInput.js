import React from 'react';

const FileInput = (props) => {
    const handleChange = (event) => {
        props.setFieldValue(props.name, event.target.files)
    }
    return (
        <div className="section">
            <div className="file-field input-field">
                <div className="btn purple">
                    <span>IMAGES</span>
                    <input type="file" multiple name={props.name} onChange={(e) => handleChange(e)} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
        </div>

    );
}
export default FileInput;